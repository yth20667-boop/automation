import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { normalizeMoroccanPhone } from "@/lib/format";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GRAPH_VERSION = "v19.0";

/** Hachage SHA-256 (minuscules + trim) attendu par Meta pour les données utilisateur. */
function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

type OrderPayload = {
  name?: string;
  phone?: string;
  city?: string;
  address?: string;
  offerId?: string;
  offerLabel?: string;
  quantity?: number;
  value?: number;
  currency?: string;
  eventId?: string;
  fbp?: string;
  fbc?: string;
  eventSourceUrl?: string;
  contents?: Array<{ id: string; quantity: number }>;
};

export async function POST(req: Request) {
  let body: OrderPayload;
  try {
    body = (await req.json()) as OrderPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête invalide." },
      { status: 400 }
    );
  }

  const { name, phone, city } = body;

  // --- Validation côté serveur (adresse non requise : checkout rapide) ---
  if (!name || !phone || !city) {
    return NextResponse.json(
      { ok: false, error: "Champs obligatoires manquants." },
      { status: 400 }
    );
  }
  const normPhone = normalizeMoroccanPhone(String(phone));
  if (!normPhone) {
    return NextResponse.json(
      { ok: false, error: "Numéro de téléphone marocain invalide." },
      { status: 400 }
    );
  }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const quantity = Number(body.quantity) || 1;
  const value = Number(body.value) || 0;
  const currency = body.currency || "MAD";

  const order = {
    name: String(name).trim(),
    phone: normPhone,
    city: String(city).trim(),
    offerId: body.offerId ?? null,
    offerLabel: body.offerLabel ?? null,
    quantity,
    value,
    currency,
    eventId: body.eventId ?? null,
    createdAt: new Date().toISOString(),
  };

  // --- Filet de sécurité : la commande est toujours tracée dans les logs ---
  console.log("[VALON][order]", JSON.stringify(order));

  // En-têtes utiles pour la qualité de correspondance CAPI
  const forwardedFor = req.headers.get("x-forwarded-for");
  const clientIp =
    forwardedFor?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    undefined;
  const userAgent = req.headers.get("user-agent") || undefined;

  // --- 1) Conversions API (CAPI) côté serveur ---
  const capi = await sendCapiPurchase({
    phone: normPhone,
    firstName: order.name.split(" ")[0],
    city: order.city,
    value,
    currency,
    contents: body.contents ?? [{ id: "valon-coffret", quantity }],
    eventId: order.eventId ?? undefined,
    eventSourceUrl: body.eventSourceUrl || SITE_URL,
    fbp: body.fbp,
    fbc: body.fbc,
    clientIp,
    userAgent,
  }).catch((e) => ({ ok: false, error: String(e) }));

  // --- 2) Transmission vers la destination des commandes (webhook configurable) ---
  const forwarded = await forwardToWebhook(order).catch((e) => ({
    ok: false,
    error: String(e),
  }));

  // On renvoie toujours 200 : la commande est capturée (logs + webhook),
  // on ne bloque jamais le client pour un souci de tracking/CRM.
  return NextResponse.json({ ok: true, capi, forwarded });
}

/** Envoie l'événement Purchase à la Conversions API de Meta. */
async function sendCapiPurchase(p: {
  phone: string;
  firstName?: string;
  city?: string;
  value: number;
  currency: string;
  contents: Array<{ id: string; quantity: number }>;
  eventId?: string;
  eventSourceUrl: string;
  fbp?: string;
  fbc?: string;
  clientIp?: string;
  userAgent?: string;
}) {
  const PIXEL_ID =
    process.env.NEXT_PUBLIC_FB_PIXEL_ID || "1275266954687591";
  const TOKEN = process.env.FB_CAPI_TOKEN;
  if (!PIXEL_ID || !TOKEN) {
    return {
      ok: false,
      skipped: true,
      reason: "NEXT_PUBLIC_FB_PIXEL_ID ou FB_CAPI_TOKEN non configuré.",
    };
  }

  const phoneDigits = p.phone.replace(/[^0-9]/g, ""); // ex: 212612345678
  const user_data: Record<string, unknown> = {
    ph: [sha256(phoneDigits)],
    country: [sha256("ma")],
  };
  if (p.firstName) user_data.fn = [sha256(p.firstName)];
  if (p.city) user_data.ct = [sha256(p.city.replace(/\s+/g, ""))];
  if (p.fbp) user_data.fbp = p.fbp;
  if (p.fbc) user_data.fbc = p.fbc;
  if (p.clientIp) user_data.client_ip_address = p.clientIp;
  if (p.userAgent) user_data.client_user_agent = p.userAgent;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: p.eventId,
        action_source: "website",
        event_source_url: p.eventSourceUrl,
        user_data,
        custom_data: {
          value: p.value,
          currency: p.currency,
          content_type: "product",
          contents: p.contents,
        },
      },
    ],
  };
  if (process.env.FB_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.FB_TEST_EVENT_CODE;
  }

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(
    TOKEN
  )}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("[VALON][capi] échec", res.status, JSON.stringify(json));
  }
  return { ok: res.ok, status: res.status, response: json };
}

/** Transmet la commande brute vers Make/Zapier/Google Sheets/CRM. */
async function forwardToWebhook(order: Record<string, unknown>) {
  const url = process.env.ORDER_WEBHOOK_URL;
  if (!url) {
    return { ok: false, skipped: true, reason: "ORDER_WEBHOOK_URL non configuré." };
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) {
    console.error("[VALON][webhook] échec", res.status);
  }
  return { ok: res.ok, status: res.status };
}
