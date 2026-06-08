/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Images servies en statique (sans passer par l'optimiseur /_next/image).
    // → Fiabilité maximale pour les SVG ET les photos JPG, comportement
    //   identique en local et sur Vercel (évite les erreurs 400 sur les SVG).
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Le lint est exécuté séparément via `npm run lint` afin de ne jamais bloquer le build de prod.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
