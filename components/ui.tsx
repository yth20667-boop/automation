import { Icon } from "./icons";
import { Reveal } from "./motion";

/** Filet doré horizontal avec losange central optionnel. */
export function GoldDivider({
  className = "",
  diamond = true,
}: {
  className?: string;
  diamond?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      aria-hidden="true"
    >
      <span className="hairline h-px w-16 sm:w-24" />
      {diamond && <span className="h-1.5 w-1.5 rotate-45 bg-gold" />}
      <span className="hairline h-px w-16 sm:w-24" />
    </div>
  );
}

/** Étoiles de notation. */
export function Stars({
  rating = 5,
  className = "",
  size = 16,
}: {
  rating?: number;
  className?: string;
  size?: number;
}) {
  const full = Math.round(rating);
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-gold ${className}`}
      role="img"
      aria-label={`Note ${rating} sur 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="star"
          width={size}
          height={size}
          fill={i < full ? "currentColor" : "none"}
          stroke="currentColor"
          className={i < full ? "" : "opacity-30"}
        />
      ))}
    </span>
  );
}

/** En-tête de section : sur-titre + titre + intro, centrés et révélés au scroll. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <Reveal className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow && <span className="eyebrow mb-5">{eyebrow}</span>}
      <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] text-cream sm:text-4xl md:text-[2.7rem]">
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
