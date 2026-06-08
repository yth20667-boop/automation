"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { hero, trustBadges, images, PRICE, COMPARE_AT } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import { Icon } from "./icons";
import { Stars } from "./ui";
import { CtaButton } from "./CtaButton";
import { trackPixelOnce, productContents } from "@/lib/pixel";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.15 + i * 0.12 },
  }),
};

export function Hero() {
  useEffect(() => {
    trackPixelOnce("ViewContent", {
      ...productContents(1),
      value: PRICE,
      currency: "MAD",
    });
  }, []);

  const [before, after] = hero.title.split(hero.highlight);

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-noir-radial pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24"
    >
      {/* halos dorés décoratifs */}
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-60" />
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-[460px] w-[460px] rounded-full bg-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-gold/5 blur-[120px]" />

      <div className="container-luxe relative grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        {/* Colonne texte */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="eyebrow mb-6 justify-center lg:justify-start"
          >
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-balance font-serif text-4xl font-semibold leading-[1.08] text-cream sm:text-5xl lg:text-[3.6rem]"
          >
            {before}
            <span className="text-gold-gradient">{hero.highlight}</span>
            {after}
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg lg:mx-0"
          >
            {hero.subtitle}
          </motion.p>

          {/* Prix */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex items-center justify-center gap-4 lg:justify-start"
          >
            <span className="text-cream/40 line-through decoration-gold/40 sm:text-lg">
              {formatPrice(COMPARE_AT)}
            </span>
            <span className="font-serif text-4xl font-semibold text-gold sm:text-5xl">
              {formatPrice(PRICE)}
            </span>
            <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold-light">
              Économisez {formatPrice(COMPARE_AT - PRICE)}
            </span>
          </motion.div>

          {/* CTA */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <CtaButton className="w-full sm:w-auto">{hero.ctaPrimary}</CtaButton>
            <a href="#solution" className="btn-outline w-full sm:w-auto">
              {hero.ctaSecondary}
            </a>
          </motion.div>

          {/* Preuve sociale */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-7 flex flex-col items-center gap-2 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Stars rating={hero.rating} />
            <span className="text-sm text-cream/60">
              <strong className="font-semibold text-cream/90">
                {hero.rating.toFixed(1)}/5
              </strong>{" "}
              · {hero.socialProof}
            </span>
          </motion.div>
        </div>

        {/* Colonne visuel produit */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="order-1 lg:order-2"
        >
          <div className="relative mx-auto max-w-[520px]">
            {/* lueur derrière le produit */}
            <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[90px]" />
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              className="relative"
            >
              <Image
                src={images.mainProduct}
                alt="Coffret de soin capillaire VALON — shampooing nourrissant 250 ml et sérum fortifiant 75 ml à la kératine et huile d'argan"
                width={760}
                height={760}
                priority
                sizes="(max-width: 1024px) 90vw, 520px"
                className="h-auto w-full rounded-3xl drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
              />
            </motion.div>

            {/* badge flottant */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
              className="absolute right-0 top-6 rounded-2xl border border-gold/25 bg-noir/80 px-4 py-3 text-left shadow-card backdrop-blur-sm sm:right-2"
            >
              <div className="flex items-center gap-2 text-gold">
                <Icon name="sparkle" width={18} height={18} />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Kératine + Argan
                </span>
              </div>
              <p className="mt-1 text-[0.7rem] text-cream/60">
                Réparation visible en 14 jours
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bandeau badges réassurance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7, ease: EASE }}
        className="container-luxe relative mt-12 lg:mt-16"
      >
        <div className="hairline mb-8" />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {trustBadges.map((b) => (
            <li
              key={b.label}
              className="flex items-center justify-center gap-3 rounded-xl border border-gold/10 bg-noir-100/50 px-4 py-3 text-left sm:justify-start"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                <Icon name={b.icon} width={20} height={20} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-cream">
                  {b.label}
                </span>
                <span className="block text-xs text-cream/55">{b.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
