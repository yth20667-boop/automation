"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/lib/site";
import { Icon } from "./icons";
import { SectionHeading } from "./ui";
import { Reveal } from "./motion";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-t border-gold/10 bg-noir-100/40 py-20 sm:py-28"
    >
      <div className="container-luxe max-w-3xl">
        <SectionHeading
          eyebrow="Questions fréquentes"
          title="Tout ce que vous devez savoir"
        />

        <Reveal className="mt-12 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen
                    ? "border-gold/40 bg-noir/60"
                    : "border-gold/15 bg-noir/30"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-medium text-cream">{item.q}</span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-gold transition-all duration-300 ${
                        isOpen ? "rotate-180 border-gold bg-gold/10" : "border-gold/30"
                      }`}
                    >
                      <Icon name="chevron-down" width={16} height={16} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-cream/70">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
