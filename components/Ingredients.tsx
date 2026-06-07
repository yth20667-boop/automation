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
              <article className="ring-gold-gradient relative flex h-full flex-col rounded-2xl p-7 shadow-card">
                <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold">
                  <Icon name={ing.icon} width={30} height={30} />
                </span>
                <span className="text-xs font-medium uppercase tracking-wider2 text-gold">
                  {ing.role}
                </span>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-cream">
                  {ing.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">
                  {ing.text}
                </p>
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
