"use client";

import { useEffect, useState } from "react";
import { urgency } from "@/lib/site";
import { Icon } from "./icons";
import { Reveal } from "./motion";
import { CtaButton } from "./CtaButton";

function timeToMidnight() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(24, 0, 0, 0);
  const diff = Math.max(0, end.getTime() - now.getTime());
  return {
    h: Math.floor(diff / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1000),
  };
}

const pad = (n: number) => n.toString().padStart(2, "0");

function CountBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-gold/25 bg-noir/70 font-serif text-3xl font-semibold text-gold tabular-nums shadow-inner-gold sm:h-20 sm:w-20 sm:text-4xl">
        {pad(value)}
      </div>
      <span className="mt-2 text-[0.65rem] uppercase tracking-wider2 text-cream/55">
        {label}
      </span>
    </div>
  );
}

export function Urgency() {
  const [mounted, setMounted] = useState(false);
  const [t, setT] = useState({ h: 0, m: 0, s: 0 });
  const [orders, setOrders] = useState(urgency.stockTotal);

  useEffect(() => {
    setMounted(true);
    setT(timeToMidnight());
    // Compteur de commandes du jour, proportionnel à l'heure + légère progression.
    const hour = new Date().getHours();
    setOrders(64 + Math.floor((hour / 24) * 120));

    const tick = setInterval(() => setT(timeToMidnight()), 1000);
    const orderTick = setInterval(
      () => setOrders((o) => o + 1),
      28_000 + Math.floor(Math.random() * 20_000)
    );
    return () => {
      clearInterval(tick);
      clearInterval(orderTick);
    };
  }, []);

  const stockPct = Math.round(
    ((urgency.stockTotal - urgency.stockLeft) / urgency.stockTotal) * 100
  );

  return (
    <section id="urgence" className="relative py-16 sm:py-20">
      <div className="container-luxe">
        <Reveal>
          <div className="ring-gold-gradient relative overflow-hidden rounded-3xl p-8 text-center shadow-soft sm:p-10">
            <div className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold/10 blur-[90px]" />

            <span className="eyebrow justify-center">
              <Icon name="flame" width={15} height={15} />
              {urgency.eyebrow}
            </span>
            <h2 className="mx-auto mt-4 max-w-xl font-serif text-2xl font-semibold text-cream sm:text-3xl">
              {urgency.title}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-cream/65">
              {urgency.text}
            </p>

            {/* Compte à rebours */}
            <div className="mt-8 flex items-center justify-center gap-3 sm:gap-5">
              <CountBox value={mounted ? t.h : 0} label="Heures" />
              <span className="font-serif text-3xl text-gold/50">:</span>
              <CountBox value={mounted ? t.m : 0} label="Minutes" />
              <span className="font-serif text-3xl text-gold/50">:</span>
              <CountBox value={mounted ? t.s : 0} label="Secondes" />
            </div>

            {/* Stock + commandes */}
            <div className="mx-auto mt-9 max-w-md">
              <div className="flex items-center justify-between text-xs text-cream/65">
                <span>{urgency.stockLabel}</span>
                <span className="font-semibold text-gold">
                  Plus que {urgency.stockLeft} coffrets
                </span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-noir/80">
                <div
                  className="h-full rounded-full bg-gold-gradient transition-all duration-700"
                  style={{ width: `${stockPct}%` }}
                />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-noir/60 px-4 py-2 text-sm text-cream/80">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
              </span>
              <strong className="font-semibold text-gold tabular-nums">
                {mounted ? orders : "—"}
              </strong>
              {urgency.ordersTodayLabel}
            </div>

            <div className="mt-8">
              <CtaButton>Réserver mon coffret maintenant</CtaButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
