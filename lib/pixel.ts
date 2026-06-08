/**
 * Helpers Facebook/Meta Pixel CÔTÉ CLIENT.
 * Le pixel de base est injecté dans app/layout.tsx via next/script.
 * Chaque événement envoie un `eventID` pour la déduplication avec le CAPI serveur.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

// L'ID du Pixel est une valeur publique : on fournit une valeur par défaut
// pour que le tracking client fonctionne même sans variable d'env configurée.
export const PIXEL_ID =
  process.env.NEXT_PUBLIC_FB_PIXEL_ID || "1275266954687591";

/** Génère un identifiant d'événement unique (partagé Pixel + CAPI). */
export function generateEventId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

/** Lit un cookie côté navigateur. */
export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  return match ? decodeURIComponent(match[2]) : undefined;
}

/** Cookie _fbp posé par le Pixel (browser id). */
export function getFbp(): string | undefined {
  return getCookie("_fbp");
}

/**
 * Cookie _fbc (click id). S'il est absent mais qu'un `fbclid` est présent
 * dans l'URL, on le reconstruit au format attendu par Meta.
 */
export function getFbc(): string | undefined {
  const existing = getCookie("_fbc");
  if (existing) return existing;
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  if (fbclid) {
    return `fb.1.${Date.now()}.${fbclid}`;
  }
  return undefined;
}

type PixelParams = Record<string, unknown>;

/** Envoie un événement standard au Pixel avec un eventID de déduplication. */
export function trackPixel(
  eventName: string,
  params: PixelParams = {},
  eventId?: string
): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (eventId) {
    window.fbq("track", eventName, params, { eventID: eventId });
  } else {
    window.fbq("track", eventName, params);
  }
}

/**
 * Déclenche un événement une seule fois par chargement de page
 * (utile pour ViewContent, AddToCart, InitiateCheckout déclenchés
 * depuis plusieurs endroits). Chaque appel utilise un eventID dédié.
 */
const firedOnce = new Set<string>();
export function trackPixelOnce(
  eventName: string,
  params: PixelParams = {}
): void {
  if (firedOnce.has(eventName)) return;
  firedOnce.add(eventName);
  trackPixel(eventName, params, generateEventId());
}

/** Contenu produit standard pour les événements (ViewContent, AddToCart, etc.). */
export function productContents(quantity = 1) {
  return {
    content_type: "product",
    content_name: "Coffret VALON Hair Care",
    content_ids: ["valon-coffret"],
    contents: [{ id: "valon-coffret", quantity }],
  };
}
