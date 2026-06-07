import { testimonials, hero } from "@/lib/site";
import { Icon } from "./icons";
import { SectionHeading, Stars } from "./ui";
import { Reveal, Stagger, StaggerItem } from "./motion";

export function Testimonials() {
  return (
    <section
      id="avis"
      className="relative border-y border-gold/10 bg-noir-100/40 py-20 sm:py-28"
    >
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Elles ont testé VALON"
          title={
            <>
              Plus de 5 000 Marocaines{" "}
              <span className="text-gold-gradient">transformées</span>
            </>
          }
        />

        <Reveal className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Stars rating={hero.rating} size={22} />
          <p className="text-sm text-cream/70">
            <strong className="font-semibold text-cream">
              {hero.rating.toFixed(1)}/5
            </strong>{" "}
            · {hero.reviewsCount.toLocaleString("fr-MA")} avis vérifiés
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name} className="h-full">
              <figure className="card-luxe flex h-full flex-col hover:border-gold/30">
                <div className="mb-4 flex items-center justify-between">
                  <Stars rating={t.rating} />
                  <Icon
                    name="check"
                    width={18}
                    height={18}
                    className="text-gold/70"
                  />
                </div>
                {t.highlight && (
                  <p className="font-serif text-lg font-semibold text-cream">
                    «&nbsp;{t.highlight}&nbsp;»
                  </p>
                )}
                <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-cream/70">
                  {t.text}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-gold/10 pt-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient text-sm font-bold text-noir">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-cream">
                      {t.name}
                    </span>
                    <span className="block text-xs text-cream/50">
                      {t.city} · Cliente vérifiée
                    </span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
