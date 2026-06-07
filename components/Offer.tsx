import Image from "next/image";
import { offerSection, images, PRICE, COMPARE_AT } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import { Icon } from "./icons";
import { SectionHeading } from "./ui";
import { Reveal } from "./motion";
import { CtaButton } from "./CtaButton";

export function Offer() {
  return (
    <section id="offre" className="relative py-20 sm:py-28">
      <div className="container-luxe">
        <SectionHeading eyebrow={offerSection.eyebrow} title={offerSection.title} />

        <Reveal className="mx-auto mt-12 max-w-4xl">
          <div className="ring-gold-gradient grid overflow-hidden rounded-3xl shadow-soft md:grid-cols-2">
            {/* Visuel */}
            <div className="relative flex items-center justify-center bg-gradient-to-b from-noir-50/70 to-noir-200/90 p-8">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-3/5 w-3/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[80px]" />
              <Image
                src={images.coffret}
                alt="Coffret VALON : shampooing nourrissant 250 ml et sérum fortifiant 75 ml"
                width={760}
                height={580}
                sizes="(max-width: 768px) 80vw, 380px"
                className="relative h-auto w-full max-w-[380px]"
              />
              <span className="absolute left-5 top-5 rounded-full bg-gold-gradient px-3 py-1 text-xs font-bold uppercase tracking-wider text-noir shadow-gold">
                Édition luxe
              </span>
            </div>

            {/* Détails */}
            <div className="flex flex-col justify-center bg-noir-200/60 p-8 sm:p-10">
              <h3 className="font-serif text-2xl font-semibold text-cream">
                Coffret Rituel VALON
              </h3>
              <p className="mt-1 text-sm text-cream/60">{offerSection.intro}</p>

              <ul className="mt-5 space-y-2.5">
                {offerSection.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-cream/80">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <Icon name="check" width={13} height={13} strokeWidth={2.2} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex items-end gap-3">
                <span className="text-cream/40 line-through decoration-gold/40">
                  {formatPrice(COMPARE_AT)}
                </span>
                <span className="font-serif text-4xl font-semibold text-gold">
                  {formatPrice(PRICE)}
                </span>
                <span className="mb-1 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-gold-light">
                  -{Math.round(((COMPARE_AT - PRICE) / COMPARE_AT) * 100)}%
                </span>
              </div>

              <CtaButton className="mt-6 w-full">Je profite de l'offre</CtaButton>

              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-cream/55">
                <Icon name="truck" width={15} height={15} className="text-gold" />
                Livraison gratuite · Paiement à la livraison
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
