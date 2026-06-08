import Image from "next/image";
import { solution, product, images } from "@/lib/site";
import { Icon } from "./icons";
import { SectionHeading } from "./ui";
import { Reveal, Stagger, StaggerItem } from "./motion";

export function Solution() {
  return (
    <section
      id="solution"
      className="relative border-y border-gold/10 bg-noir-100/40 py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />
      <div className="container-luxe relative">
        <SectionHeading
          eyebrow={solution.eyebrow}
          title={solution.title}
          intro={solution.intro}
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Visuel : le coffret */}
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-gold/15 bg-gradient-to-b from-noir-50/60 to-noir-200/80 shadow-card">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={images.productBox}
                  alt="Coffret VALON — Shampooing Nourrissant 250 ml & Sérum Fortifiant 75 ml"
                  fill
                  sizes="(max-width: 1024px) 90vw, 520px"
                  className="object-cover"
                />
              </div>
              <p className="py-5 text-center text-xs uppercase tracking-luxe text-gold/80">
                Le coffret complet
              </p>
            </div>
          </Reveal>

          {/* Contenu du coffret */}
          <Stagger className="space-y-4">
            {product.items.map((item) => (
              <StaggerItem key={item.title}>
                <article className="card-luxe flex items-start gap-4 hover:border-gold/35">
                  <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                    <Icon name="drop" width={22} height={22} />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-serif text-xl font-semibold text-cream">
                        {item.title}
                      </h3>
                      <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-gold-light">
                        {item.volume}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-cream/65">
                      {item.blurb}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Texture du sérum */}
        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-3xl border border-gold/15 shadow-card">
            <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
              <Image
                src={images.serumTexture}
                alt="Texture du Sérum Fortifiant VALON — concentré de kératine et d'huile d'argan"
                fill
                sizes="(max-width: 1200px) 92vw, 1100px"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-noir via-noir/55 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-10">
              <span className="text-xs uppercase tracking-luxe text-gold">
                La texture
              </span>
              <h3 className="mt-2 max-w-xs font-serif text-2xl font-semibold text-cream sm:max-w-sm sm:text-3xl">
                Un sérum riche, jamais gras
              </h3>
              <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-cream/75 sm:max-w-xs">
                Concentré de kératine et d'huile d'argan qui pénètre
                instantanément pour gainer la fibre et révéler la brillance.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Les deux gestes du rituel */}
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {solution.steps.map((s) => (
            <StaggerItem key={s.step}>
              <div className="relative h-full overflow-hidden rounded-2xl border border-gold/15 bg-noir-200/60 p-7">
                <span className="absolute -right-2 -top-4 font-serif text-7xl font-bold text-gold/10">
                  {s.step}
                </span>
                <h3 className="relative text-lg font-semibold text-gold">
                  {s.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-cream/70">
                  {s.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
