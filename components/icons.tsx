import type { SVGProps } from "react";

/** Jeu d'icônes ligne, élégantes, en currentColor. */
const paths: Record<string, React.ReactNode> = {
  // Réassurance
  truck: (
    <>
      <path d="M3 7h11v8H3z" />
      <path d="M14 10h4l3 3v2h-7z" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17.5" cy="17.5" r="1.8" />
    </>
  ),
  cash: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6 9.5h.01M18 14.5h.01" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4.5" />
    </>
  ),
  // Problème
  drought: (
    <>
      <path d="M12 3s5 5.5 5 9.5a5 5 0 0 1-10 0C7 8.5 12 3 12 3z" />
      <path d="M9.5 12.5c.4 1.2 1.4 2 2.8 2.2" />
    </>
  ),
  broken: (
    <>
      <path d="M5 4l4 6-3 1 5 9" />
      <path d="M19 4l-4 6 3 1-2 4" />
    </>
  ),
  fall: (
    <>
      <path d="M12 3v9" />
      <path d="M8 9l4 4 4-4" />
      <path d="M5 19h14" />
      <path d="M7 16c1.5 1 3 1.5 5 1.5s3.5-.5 5-1.5" />
    </>
  ),
  dull: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M18.5 5.5l-1.4 1.4M6.9 17.1l-1.4 1.4" opacity="0.5" />
    </>
  ),
  // Bénéfices
  drop: (
    <>
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0C6 9.5 12 3 12 3z" />
    </>
  ),
  "shield-hair": (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M12 8v8M9.5 9.5v5M14.5 9.5v5" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19C4 12 9 5 19 5c0 10-7 15-14 14z" />
      <path d="M9 15c2-3 5-5 8-6" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
      <path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
    </>
  ),
  feather: (
    <>
      <path d="M20 4C14 4 9 9 6 16l-2 4" />
      <path d="M20 4c0 7-4 11-10 12" />
      <path d="M16 8l-6 6M19 9h-4M15 13h-4" opacity="0.7" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-7-4.4-9.2-8.6C1.2 8.3 2.8 5.5 5.7 5.5c1.9 0 3.2 1.1 4.3 2.6 1.1-1.5 2.4-2.6 4.3-2.6 2.9 0 4.5 2.8 2.9 5.9C19 15.6 12 20 12 20z" />
    </>
  ),
  // Ingrédients
  molecule: (
    <>
      <circle cx="6" cy="7" r="2" />
      <circle cx="18" cy="9" r="2" />
      <circle cx="9" cy="17" r="2" />
      <circle cx="16" cy="17.5" r="1.6" />
      <path d="M7.7 8.4l5.6 6.4M8 8l8 .8M10.7 16.2l4-1" />
    </>
  ),
  argan: (
    <>
      <path d="M12 21c4 0 6-3 6-7 0-5-6-11-6-11S6 9 6 14c0 4 2 7 6 7z" />
      <path d="M12 21V9M12 13l3-3M12 16l-3-3" opacity="0.7" />
    </>
  ),
  plant: (
    <>
      <path d="M12 21v-8" />
      <path d="M12 13c-3 0-5-2-5-5 3 0 5 2 5 5z" />
      <path d="M12 11c0-3 2-5 5-5 0 3-2 5-5 5z" />
      <path d="M7 21h10" />
    </>
  ),
  // Divers
  star: <path d="M12 3.2l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.9 6.7 19.6l1.2-6L3.4 9.5l6-.7z" />,
  check: <path d="M5 12.5l4.2 4.3L19 7" />,
  "chevron-down": <path d="M6 9l6 6 6-6" />,
  "arrow-right": (
    <>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  phone: (
    <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4z" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  gift: (
    <>
      <rect x="4" y="9" width="16" height="11" rx="1.5" />
      <path d="M4 12h16M12 9v11" />
      <path d="M12 9C9 9 7 7.5 8 5.5 9 4 11 5 12 9c1-4 3-5 4-3.5C17 7.5 15 9 12 9z" />
    </>
  ),
  flame: (
    <path d="M12 3c1 3-1 4-2 6-1 1.6-.5 3 .5 4 0-1 .8-1.8 1.5-2.3.5 2 2.5 2.8 2.5 5a4.5 4.5 0 1 1-9 0c0-2.6 2-3.6 2-6C8 7 10 5 12 3z" />
  ),
  whatsapp: (
    <>
      <path d="M4 20l1.3-4A8 8 0 1 1 8 18.6z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.2 1.2-.8.1-.4-.1-.7-.4-.9l-1.2-.6c-.3-.1-.6 0-.8.2l-.3.4c-1-.4-1.8-1.2-2.2-2.2l.4-.3c.2-.2.3-.5.2-.8l-.6-1.2c-.2-.3-.5-.5-.9-.4-.6.2-.8.6-.8 1.2z" fill="currentColor" stroke="none" />
    </>
  ),
};

export function Icon({
  name,
  ...props
}: { name: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] ?? null}
    </svg>
  );
}
