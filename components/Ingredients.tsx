import Image from "next/image";
import { ingredients } from "@/lib/site";
import { Icon } from "./icons";
import { SectionHeading } from "./ui";
import { Reveal, Stagger, StaggerItem } from "./motion";

export function Ingredients() {
  return (
    <section
      id="ingredients"
      className="relative border-y border-gold/10 bg-noir-100/40 py-20 sm:py-28"
    >
      <div className="container-luxe">
        <SectionHeading
          eyebrow={ingredients.eyebrow}
          title={ingredients.title}
          intro={ingredients.intro}
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {ingredients.list.map((ing) => (
            <StaggerItem key={ing.name} className="h-full">
              <article className="ring-gold-gradient relative flex h-full flex-col overflow-hidden rounded-2xl shadow-card">
                {/* Visuel */}
                <div className="relative h-48 w-full overflow-hidden">
                  {ing.image ? (
                    <Image
                      src={ing.image}
                      alt={`${ing.name} — actif clé des soins VALON`}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover transition-transform duration-700 ease-luxe hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-noir-50 to-noir-200">
                      <Icon
                        name={ing.icon}
                        width={52}
                        height={52}
                        className="text-gold/70"
                      />
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/40 to-transparent" />
                </div>

                {/* Contenu */}
                <div className="flex flex-1 flex-col p-7">
                  <span className="text-xs font-medium uppercase tracking-wider2 text-gold">
                    {ing.role}
                  </span>
                  <h3 className="mt-1 font-serif text-2xl font-semibold text-cream">
                    {ing.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/65">
                    {ing.text}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 flex items-center justify-center">
          <span className="badge-trust">
            <Icon name="check" width={16} height={16} className="text-gold" />
            {ingredients.note}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
