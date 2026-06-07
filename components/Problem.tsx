import { problem } from "@/lib/site";
import { Icon } from "./icons";
import { SectionHeading } from "./ui";
import { Reveal, Stagger, StaggerItem } from "./motion";

export function Problem() {
  return (
    <section id="probleme" className="relative py-20 sm:py-28">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={problem.eyebrow}
          title={problem.title}
          intro={problem.intro}
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problem.points.map((p) => (
            <StaggerItem key={p.title}>
              <article className="card-luxe group h-full hover:border-gold/40 hover:shadow-gold">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-gold/25 bg-gold/5 text-gold transition-colors group-hover:bg-gold/10">
                  <Icon name={p.icon} width={24} height={24} />
                </span>
                <h3 className="text-lg font-semibold text-cream">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">
                  {p.text}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-balance text-lg font-medium leading-relaxed text-cream/85 sm:text-xl">
            <span className="text-gold-gradient font-serif">
              {problem.conclusion}
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
