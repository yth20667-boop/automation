import { guarantee } from "@/lib/site";
import { Icon } from "./icons";
import { Reveal } from "./motion";
import { CtaButton } from "./CtaButton";

function Seal() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-40 w-40 sm:h-48 sm:w-48"
      role="img"
      aria-label="Garantie satisfait ou remboursé 14 jours"
    >
      <defs>
        <linearGradient id="seal_gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F0DA94" />
          <stop offset="0.5" stopColor="#C9A227" />
          <stop offset="1" stopColor="#9C7C16" />
        </linearGradient>
        <path
          id="seal_circle"
          d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
        />
      </defs>
      <circle cx="100" cy="100" r="92" fill="none" stroke="url(#seal_gold)" strokeWidth="1.5" opacity="0.6" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="url(#seal_gold)" strokeWidth="1" strokeDasharray="2 4" opacity="0.7" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="url(#seal_gold)" strokeWidth="1" opacity="0.5" />
      <text
        fontFamily="Inter, Arial, sans-serif"
        fontSize="11"
        letterSpacing="3"
        fill="#C9A227"
        fontWeight="600"
      >
        <textPath href="#seal_circle" startOffset="2%">
          ★ SATISFAIT OU REMBOURSÉ ★ GARANTIE VALON
        </textPath>
      </text>
      <text x="100" y="92" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="42" fontWeight="700" fill="url(#seal_gold)">
        14
      </text>
      <text x="100" y="116" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="13" letterSpacing="5" fill="#E4C76B">
        JOURS
      </text>
    </svg>
  );
}

export function Guarantee() {
  return (
    <section id="garantie" className="relative py-20 sm:py-28">
      <div className="container-luxe">
        <Reveal>
          <div className="ring-gold-gradient grid items-center gap-8 rounded-3xl p-8 shadow-soft sm:p-10 md:grid-cols-[auto,1fr] md:gap-12">
            <div className="mx-auto shrink-0 animate-pulse-soft [animation-duration:4s]">
              <Seal />
            </div>
            <div className="text-center md:text-left">
              <span className="eyebrow justify-center md:justify-start">
                {guarantee.eyebrow}
              </span>
              <h2 className="mt-4 font-serif text-2xl font-semibold text-cream sm:text-3xl">
                {guarantee.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-cream/70 sm:text-base">
                {guarantee.text}
              </p>
              <ul className="mt-6 space-y-3">
                {guarantee.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center justify-center gap-3 text-sm text-cream/85 md:justify-start"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <Icon name="check" width={14} height={14} strokeWidth={2.2} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-7 grid grid-cols-3 gap-3 border-t border-gold/10 pt-6">
                {[
                  { icon: "cash", label: "Paiement à la réception" },
                  { icon: "truck", label: "Livraison 24–72h" },
                  { icon: "phone", label: "Service client à l'écoute" },
                ].map((r) => (
                  <div
                    key={r.label}
                    className="flex flex-col items-center gap-2 text-center"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold">
                      <Icon name={r.icon} width={18} height={18} />
                    </span>
                    <span className="text-[0.72rem] leading-tight text-cream/65">
                      {r.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center md:justify-start">
                <CtaButton>Commander sans risque</CtaButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
