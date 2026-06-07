"use client";

import type { ReactNode } from "react";
import { Icon } from "./icons";
import { trackPixelOnce, productContents } from "@/lib/pixel";

/** Fait défiler en douceur jusqu'au formulaire de commande. */
export function scrollToOrder() {
  if (typeof document === "undefined") return;
  const el = document.getElementById("commander");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * CTA principal réutilisable : défile vers le formulaire et déclenche
 * l'événement AddToCart (une fois) côté Pixel.
 */
export function CtaButton({
  children,
  variant = "gold",
  className = "",
  withArrow = true,
  focusField,
}: {
  children: ReactNode;
  variant?: "gold" | "outline";
  className?: string;
  withArrow?: boolean;
  /** id du champ à focaliser après le scroll (ex: "nom"). */
  focusField?: string;
}) {
  const handleClick = () => {
    trackPixelOnce("AddToCart", {
      ...productContents(1),
      value: 649,
      currency: "MAD",
    });
    scrollToOrder();
    if (focusField) {
      window.setTimeout(() => {
        document.getElementById(focusField)?.focus();
      }, 700);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${variant === "gold" ? "btn-gold" : "btn-outline"} ${className}`}
    >
      <span>{children}</span>
      {withArrow && <Icon name="arrow-right" width={18} height={18} />}
    </button>
  );
}
