import { brand, footer } from "@/lib/site";
import { Logo } from "./Logo";
import { Icon } from "./icons";
import { GoldDivider } from "./ui";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-gold/15 bg-noir pt-16 pb-28 lg:pb-12">
      <div className="container-luxe">
        <div className="flex flex-col items-center text-center">
          <Logo size="md" />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/55">
            {footer.about}
          </p>

          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 px-5 py-2.5 text-sm text-cream/85 transition-colors hover:border-gold hover:text-gold"
          >
            <Icon name="instagram" width={18} height={18} />
            {brand.instagram}
          </a>

          <GoldDivider className="my-10 w-full max-w-sm" />

          <nav
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
            aria-label="Liens légaux"
          >
            {footer.legalLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-xs text-cream/50 transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <p className="mt-8 text-xs text-cream/35">
            © {year} {brand.name} — {brand.tagline}. Tous droits réservés. ·
            Fait avec soin au Maroc 🇲🇦
          </p>
        </div>
      </div>
    </footer>
  );
}
