import Image from "next/image";
import { beforeAfter, images } from "@/lib/site";
import { SectionHeading } from "./ui";
import { Reveal } from "./motion";

const pair = [
  { src: images.before, label: beforeAfter.beforeLabel, gold: false },
  { src: images.after, label: beforeAfter.afterLabel, gold: true },
];

export function BeforeAfter() {
  return (
    <section id="resultats" className="relative py-20 sm:py-28">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={beforeAfter.eyebrow}
          title={beforeAfter.title}
          intro={beforeAfter.intro}
        />

        <Reveal className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
          {pair.map((item) => (
            <figure
              key={item.label}
              className="group relative overflow-hidden rounded-3xl border border-gold/20 shadow-soft"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={item.src}
                  alt={
                    item.gold
                      ? "Cheveux réparés, forts et brillants après 14 jours de rituel VALON"
                      : "Cheveux secs, ternes et abîmés avant le rituel VALON"
                  }
                  fill
                  sizes="(max-width: 640px) 92vw, 420px"
                  className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent" />
              </div>
              <figcaption
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium backdrop-blur-sm ${
                  item.gold
                    ? "border-gold/50 bg-noir/75 text-gold-light"
                    : "border-cream/25 bg-noir/75 text-cream/85"
                }`}
              >
                {item.label}
              </figcaption>
            </figure>
          ))}
        </Reveal>

        <p className="mt-4 text-center text-xs text-cream/40">
          {beforeAfter.disclaimer}
        </p>
      </div>
    </section>
  );
}
