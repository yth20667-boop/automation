"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";
import { PRICE, COMPARE_AT } from "@/lib/site";
import { CtaButton } from "./CtaButton";

/**
 * Barre CTA fixe en bas d'écran sur mobile.
 * Se masque automatiquement quand le formulaire de commande est visible
 * (évite de recouvrir le CTA du formulaire et la redondance).
 */
export function MobileCtaBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = document.getElementById("commander");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-noir/95 backdrop-blur-md transition-transform duration-500 ease-luxe lg:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-2.5">
        <div className="leading-tight">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-gold">
              {formatPrice(PRICE)}
            </span>
            <span className="text-xs text-cream/40 line-through">
              {formatPrice(COMPARE_AT)}
            </span>
          </div>
          <span className="text-[0.65rem] uppercase tracking-wider text-cream/60">
            Paiement à la livraison
          </span>
        </div>
        <CtaButton className="flex-1 !max-w-[60%] !px-4 !py-3 !text-xs">
          Commander
        </CtaButton>
      </div>
    </div>
  );
}
