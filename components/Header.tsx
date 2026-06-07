"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { CtaButton } from "./CtaButton";

const announce = [
  "Livraison gratuite partout au Maroc",
  "Paiement à la livraison",
  "Satisfait ou remboursé — 14 jours",
  "Kératine & Huile d'Argan",
];

function MarqueeSeq() {
  return (
    <div className="flex shrink-0 items-center">
      {announce.map((t) => (
        <span key={t} className="flex items-center">
          <span className="px-6 text-[0.68rem] font-medium uppercase tracking-wider2 text-noir/85">
            {t}
          </span>
          <span className="h-1 w-1 rotate-45 bg-noir/40" />
        </span>
      ))}
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Bandeau promo défilant (se replie au scroll) */}
      <div
        className={`overflow-hidden bg-gold-gradient transition-all duration-500 ease-luxe ${
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        }`}
      >
        <div className="flex overflow-hidden py-1.5" aria-hidden="true">
          <div className="flex shrink-0 animate-marquee">
            <MarqueeSeq />
            <MarqueeSeq />
          </div>
        </div>
      </div>

      {/* Barre de navigation */}
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-gold/15 bg-noir/85 shadow-soft backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-luxe flex h-[64px] items-center justify-between">
          <a href="#top" aria-label="VALON — Hair Care, retour en haut">
            <Logo size="sm" />
          </a>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Navigation principale"
          >
            <a href="#solution" className="text-sm text-cream/75 transition-colors hover:text-gold">
              Le coffret
            </a>
            <a href="#resultats" className="text-sm text-cream/75 transition-colors hover:text-gold">
              Résultats
            </a>
            <a href="#avis" className="text-sm text-cream/75 transition-colors hover:text-gold">
              Avis
            </a>
            <a href="#faq" className="text-sm text-cream/75 transition-colors hover:text-gold">
              FAQ
            </a>
          </nav>

          <CtaButton className="!px-5 !py-2.5 !text-xs" withArrow={false}>
            Commander
          </CtaButton>
        </div>
      </div>
    </motion.header>
  );
}
