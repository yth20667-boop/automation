import Image from "next/image";
import { beforeAfter, images } from "@/lib/site";
import { SectionHeading } from "./ui";
import { Reveal } from "./motion";

export function BeforeAfter() {
  return (
    <section id="resultats" className="relative py-20 sm:py-28">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={beforeAfter.eyebrow}
          title={beforeAfter.title}
          intro={beforeAfter.intro}
        />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-gold/20 shadow-soft sm:aspect-[16/10]">
            <Image
              src={images.hairResult}
              alt="Résultat VALON : cheveux réparés, forts et brillants après 14 jours de rituel"
              fill
              sizes="(max-width: 768px) 92vw, 768px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/50 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gold/40 bg-noir/75 px-4 py-1.5 text-xs font-medium text-gold-light backdrop-blur-sm">
              Résultats après 14 jours d'utilisation
            </span>
          </div>
          <p className="mt-4 text-center text-xs text-cream/40">
            {beforeAfter.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
