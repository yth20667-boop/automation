"use client";

import { formatPrice } from "@/lib/format";
import { PRICE, COMPARE_AT } from "@/lib/site";
import { CtaButton } from "./CtaButton";

/** Barre CTA fixe en bas d'écran, visible en permanence sur mobile. */
export function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/20 bg-noir/95 backdrop-blur-md lg:hidden"
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
