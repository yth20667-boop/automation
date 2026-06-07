"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { beforeAfter, images } from "@/lib/site";
import { SectionHeading } from "./ui";
import { Reveal } from "./motion";
import { Icon } from "./icons";

export function BeforeAfter() {
  const [pos, setPos] = useState(52);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(3, Math.min(97, pct)));
  }, []);

  return (
    <section id="resultats" className="relative py-20 sm:py-28">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={beforeAfter.eyebrow}
          title={beforeAfter.title}
          intro={beforeAfter.intro}
        />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div
            ref={ref}
            className="relative aspect-[7/5] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl border border-gold/20 shadow-soft"
            onPointerDown={(e) => {
              dragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              setFromClientX(e.clientX);
            }}
            onPointerMove={(e) => {
              if (dragging.current) setFromClientX(e.clientX);
            }}
            onPointerUp={(e) => {
              dragging.current = false;
              e.currentTarget.releasePointerCapture(e.pointerId);
            }}
          >
            {/* APRÈS (base) */}
            <Image
              src={images.after}
              alt="Cheveux forts, brillants et soyeux après 14 jours de rituel VALON"
              fill
              sizes="(max-width: 768px) 92vw, 768px"
              className="pointer-events-none object-cover"
              draggable={false}
            />
            <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-gold/40 bg-noir/70 px-3 py-1 text-xs font-medium text-gold-light backdrop-blur-sm">
              {beforeAfter.afterLabel}
            </span>

            {/* AVANT (clippé) */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <Image
                src={images.before}
                alt="Cheveux secs, cassants et ternes avant le rituel VALON"
                fill
                sizes="(max-width: 768px) 92vw, 768px"
                className="object-cover"
                draggable={false}
              />
              <span className="absolute left-3 top-3 rounded-full border border-cream/20 bg-noir/70 px-3 py-1 text-xs font-medium text-cream/80 backdrop-blur-sm">
                {beforeAfter.beforeLabel}
              </span>
            </div>

            {/* Poignée */}
            <div
              className="absolute inset-y-0 z-10 w-0.5 bg-gold-gradient"
              style={{ left: `${pos}%` }}
            >
              <div
                role="slider"
                aria-label="Comparer avant et après"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") setPos((p) => Math.max(3, p - 4));
                  if (e.key === "ArrowRight") setPos((p) => Math.min(97, p + 4));
                }}
                className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-gold bg-noir text-gold shadow-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
              >
                <Icon name="arrow-right" width={16} height={16} className="-mr-1" />
                <Icon name="arrow-right" width={16} height={16} className="-ml-2 rotate-180" />
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-cream/40">
            {beforeAfter.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
