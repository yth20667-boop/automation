import { brand } from "@/lib/site";

export function Logo({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const wordmark =
    size === "lg"
      ? "text-4xl sm:text-5xl"
      : size === "sm"
        ? "text-xl"
        : "text-2xl";
  const sub =
    size === "lg"
      ? "text-[0.7rem] tracking-[0.45em]"
      : "text-[0.55rem] tracking-[0.4em]";

  return (
    <span
      className={`inline-flex flex-col items-center leading-none ${className}`}
      aria-label={`${brand.name} ${brand.tagline}`}
    >
      <span
        className={`font-serif font-semibold text-gold-gradient ${wordmark}`}
        style={{ letterSpacing: "0.14em" }}
      >
        {brand.name}
      </span>
      <span className="mt-1 flex w-full items-center justify-center gap-2">
        <span className="h-px flex-1 bg-gold/40" />
        <span className={`font-sans uppercase text-gold/90 ${sub}`}>
          {brand.tagline}
        </span>
        <span className="h-px flex-1 bg-gold/40" />
      </span>
    </span>
  );
}
