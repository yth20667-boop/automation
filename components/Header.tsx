"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { CtaButton } from "./CtaButton";

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
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/15 bg-noir/85 backdrop-blur-md shadow-soft"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-[68px] items-center justify-between">
        <a href="#top" aria-label="VALON — Hair Care, retour en haut">
          <Logo size="sm" />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          <a href="#solution" className="text-sm text-cream/75 transition-colors hover:text-gold">
            Le coffret
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
    </motion.header>
  );
}
