"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { offers, type Offer, brand } from "@/lib/site";
import { formatPrice, isValidMoroccanPhone } from "@/lib/format";
import {
  generateEventId,
  getFbc,
  getFbp,
  productContents,
  trackPixel,
  trackPixelOnce,
} from "@/lib/pixel";
import { Icon } from "./icons";
import { Reveal } from "./motion";

type Fields = { name: string; phone: string; city: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function OrderForm() {
  const [offerId, setOfferId] = useState<string>(offers[0].id);
  const [fields, setFields] = useState<Fields>({
    name: "",
    phone: "",
    city: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const eventIdRef = useRef<string | null>(null);
  const purchaseFired = useRef(false);

  const offer = useMemo<Offer>(
    () => offers.find((o) => o.id === offerId) ?? offers[0],
    [offerId]
  );

  function update<K extends keyof Fields>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    trackPixelOnce("InitiateCheckout", {
      ...productContents(offer.qty),
      value: offer.price,
      currency: "MAD",
    });
  }

  function onFirstFocus() {
    trackPixelOnce("AddToCart", {
      ...productContents(offer.qty),
      value: offer.price,
      currency: "MAD",
    });
  }

  function validate(): boolean {
    const e: Errors = {};
    if (fields.name.trim().length < 3)
      e.name = "Veuillez saisir votre nom complet.";
    if (!isValidMoroccanPhone(fields.phone))
      e.phone = "Numéro invalide. Format : 06 ou 07 suivi de 8 chiffres.";
    if (fields.city.trim().length < 2)
      e.city = "Veuillez indiquer votre ville.";
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = document.getElementById(Object.keys(e)[0]);
      first?.focus();
      return false;
    }
    return true;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (status === "submitting" || status === "success") return;
    if (!validate()) return;

    setStatus("submitting");

    // event_id unique partagé Pixel <-> CAPI (déduplication)
    if (!eventIdRef.current) eventIdRef.current = generateEventId();
    const eventId = eventIdRef.current;

    // 1) Pixel "Purchase" côté client (une seule fois)
    if (!purchaseFired.current) {
      trackPixel(
        "Purchase",
        {
          value: offer.price,
          currency: "MAD",
          ...productContents(offer.qty),
        },
        eventId
      );
      purchaseFired.current = true;
    }

    // 2) POST vers l'API avec le MÊME event_id
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          offerId: offer.id,
          offerLabel: offer.label,
          quantity: offer.qty,
          value: offer.price,
          currency: "MAD",
          eventId,
          fbp: getFbp(),
          fbc: getFbc(),
          eventSourceUrl:
            typeof window !== "undefined" ? window.location.href : "",
          contents: [{ id: "valon-coffret", quantity: offer.qty }],
        }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("success");
      window.scrollTo({
        top: (document.getElementById("commander")?.offsetTop ?? 0) - 80,
        behavior: "smooth",
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="commander" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <div className="container-luxe relative max-w-2xl">
        <Reveal className="text-center">
          <span className="eyebrow justify-center">Commander</span>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-cream sm:text-4xl">
            Finalisez votre commande
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-cream/65">
            Remplissez le formulaire, nous vous appelons pour confirmer. Vous
            payez à la réception — aucun paiement en ligne.
          </p>
        </Reveal>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <SuccessCard key="success" offer={offer} />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="ring-gold-gradient mt-10 rounded-3xl p-6 shadow-soft sm:p-8"
            >
              <form onSubmit={handleSubmit} noValidate>
                {/* Sélection de l'offre */}
                <fieldset>
                  <legend className="field-label mb-3 text-base font-semibold">
                    1. Choisissez votre offre
                  </legend>
                  <div className="grid gap-3">
                    {offers.map((o) => (
                      <OfferCard
                        key={o.id}
                        offer={o}
                        selected={o.id === offerId}
                        onSelect={() => setOfferId(o.id)}
                      />
                    ))}
                  </div>
                </fieldset>

                {/* Coordonnées */}
                <div className="mt-7">
                  <p className="field-label mb-3 text-base font-semibold">
                    2. Vos coordonnées de livraison
                  </p>
                  <div className="space-y-4">
                    <Field
                      id="name"
                      label="Nom complet"
                      value={fields.name}
                      error={errors.name}
                      autoComplete="name"
                      placeholder="Ex : Sara Bennani"
                      onFocus={onFirstFocus}
                      onChange={(v) => update("name", v)}
                    />
                    <Field
                      id="phone"
                      label="Téléphone"
                      type="tel"
                      inputMode="tel"
                      value={fields.phone}
                      error={errors.phone}
                      autoComplete="tel"
                      placeholder="06 12 34 56 78"
                      onFocus={onFirstFocus}
                      onChange={(v) => update("phone", v)}
                    />
                    <Field
                      id="city"
                      label="Ville"
                      value={fields.city}
                      error={errors.city}
                      autoComplete="address-level2"
                      placeholder="Ex : Casablanca"
                      onFocus={onFirstFocus}
                      onChange={(v) => update("city", v)}
                    />
                  </div>
                </div>

                {/* Total dynamique */}
                <div className="mt-7 rounded-2xl border border-gold/25 bg-noir/50 p-5">
                  <div className="flex items-center justify-between text-sm text-cream/70">
                    <span>{offer.label}</span>
                    <span>{formatPrice(offer.price)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-cream/70">
                    <span>Livraison</span>
                    <span className="font-medium text-gold">Gratuite</span>
                  </div>
                  {offer.save > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-cream/70">Vous économisez</span>
                      <span className="font-medium text-gold-light">
                        {formatPrice(offer.save)}
                      </span>
                    </div>
                  )}
                  <div className="mt-3 flex items-center justify-between border-t border-gold/15 pt-3">
                    <span className="font-serif text-lg font-semibold text-cream">
                      Total à payer à la livraison
                    </span>
                    <span className="font-serif text-2xl font-bold text-gold">
                      {formatPrice(offer.price)}
                    </span>
                  </div>
                </div>

                {status === "error" && (
                  <p className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    Une erreur est survenue lors de l'envoi. Réessayez ou
                    appelez-nous au {brand.phoneDisplay}.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-gold mt-6 w-full !py-4 text-center disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-noir/40 border-t-noir" />
                      Envoi en cours…
                    </span>
                  ) : (
                    <span>Confirmer ma commande — Paiement à la livraison</span>
                  )}
                </button>

                <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-cream/55">
                  <li className="flex items-center gap-1.5">
                    <Icon name="lock" width={14} height={14} className="text-gold" />
                    Données confidentielles
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Icon name="cash" width={14} height={14} className="text-gold" />
                    Paiement à la livraison
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Icon name="shield" width={14} height={14} className="text-gold" />
                    Satisfait ou remboursé
                  </li>
                </ul>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* --------------------------- Sous-composants --------------------------- */

function OfferCard({
  offer,
  selected,
  onSelect,
}: {
  offer: Offer;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      className={`relative flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all duration-300 ${
        selected
          ? "border-gold bg-gold/10 shadow-gold"
          : "border-gold/20 bg-noir/40 hover:border-gold/45"
      }`}
    >
      <input
        type="radio"
        name="offer"
        value={offer.id}
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
          selected ? "border-gold" : "border-cream/30"
        }`}
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-gold" />}
      </span>

      <span className="flex-1">
        <span className="flex items-center gap-2">
          <span className="font-semibold text-cream">{offer.label}</span>
          {offer.badge && (
            <span
              className={`rounded-full px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider ${
                offer.bestValue
                  ? "bg-gold-gradient text-noir"
                  : "border border-gold/40 text-gold-light"
              }`}
            >
              {offer.badge}
            </span>
          )}
        </span>
        {offer.qty > 1 && (
          <span className="mt-0.5 block text-xs text-cream/55">
            {formatPrice(offer.perUnit)} / coffret · livraison gratuite
          </span>
        )}
      </span>

      <span className="text-right">
        <span className="block font-serif text-lg font-bold text-gold">
          {formatPrice(offer.price)}
        </span>
        {offer.save > 0 && (
          <span className="block text-[0.7rem] font-medium text-gold-light">
            Économisez {formatPrice(offer.save)}
          </span>
        )}
      </span>
    </label>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  onFocus,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
  textarea = false,
}: {
  id: keyof Fields;
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onFocus?: () => void;
  type?: string;
  inputMode?: "text" | "tel" | "email";
  autoComplete?: string;
  placeholder?: string;
  textarea?: boolean;
}) {
  const cls = `field-input ${error ? "field-input-error" : ""}`;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} <span className="text-gold">*</span>
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          autoComplete={autoComplete}
          placeholder={placeholder}
          rows={2}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${cls} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cls}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessCard({ offer }: { offer: Offer }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="ring-gold-gradient mt-10 rounded-3xl p-8 text-center shadow-soft sm:p-10"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold-gradient text-noir shadow-gold"
      >
        <Icon name="check" width={40} height={40} strokeWidth={2.4} />
      </motion.span>

      <h3 className="mt-6 font-serif text-2xl font-semibold text-cream sm:text-3xl">
        Merci ! Votre commande est confirmée
      </h3>
      <p className="mx-auto mt-3 max-w-md text-sm text-cream/70">
        Nous vous appellerons bientôt pour confirmer les détails de la livraison.
        Vous réglerez <strong className="text-gold">{formatPrice(offer.price)}</strong>{" "}
        en espèces à la réception de votre coffret VALON.
      </p>

      <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-2xl border border-gold/25 bg-noir/50 px-5 py-3 text-sm">
        <Icon name="gift" width={20} height={20} className="text-gold" />
        <span className="text-cream/80">
          {offer.label} · <span className="font-semibold text-gold">Paiement à la livraison</span>
        </span>
      </div>

      <p className="mt-6 text-xs text-cream/50">
        Suivez-nous sur Instagram{" "}
        <a
          href={brand.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:underline"
        >
          {brand.instagram}
        </a>
      </p>
    </motion.div>
  );
}
