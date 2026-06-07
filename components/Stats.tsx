import { stats } from "@/lib/site";
import { Stagger, StaggerItem } from "./motion";

/** Bande de preuve sociale chiffrée, juste après le hero. */
export function Stats() {
  return (
    <section
      aria-label="VALON en chiffres"
      className="relative border-y border-gold/15 bg-noir-100/50 py-10 sm:py-12"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[100px]" />
      <div className="container-luxe relative">
        <Stagger className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <StaggerItem
              key={s.label}
              className={`text-center ${
                i < stats.length - 1
                  ? "md:border-r md:border-gold/15"
                  : ""
              }`}
            >
              <div className="text-gold-gradient font-serif text-3xl font-bold sm:text-4xl">
                {s.value}
              </div>
              <div className="mx-auto mt-1.5 max-w-[10rem] text-xs uppercase tracking-wider text-cream/55 sm:text-sm">
                {s.label}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
