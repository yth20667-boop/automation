import { benefits } from "@/lib/site";
import { Icon } from "./icons";
import { SectionHeading } from "./ui";
import { Stagger, StaggerItem } from "./motion";

export function Benefits() {
  return (
    <section id="benefices" className="relative py-20 sm:py-28">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Les bénéfices"
          title={
            <>
              Tout ce que vos cheveux{" "}
              <span className="text-gold-gradient">attendaient</span>
            </>
          }
          intro="Un seul rituel, des résultats sur tous les fronts — de la racine aux pointes."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <StaggerItem key={b.title}>
              <article className="card-luxe group relative h-full overflow-hidden hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold">
                <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/5 blur-2xl transition-opacity group-hover:opacity-100" />
                <span className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-gradient text-noir shadow-gold">
                  <Icon name={b.icon} width={26} height={26} strokeWidth={1.7} />
                </span>
                <h3 className="relative text-xl font-semibold text-cream">
                  {b.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-cream/65">
                  {b.text}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
