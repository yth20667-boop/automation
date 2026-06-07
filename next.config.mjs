/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Nos visuels produit livrés par défaut sont des SVG vectoriels premium.
    // Pour utiliser vos photos réelles (JPG/PNG/WebP), déposez-les dans /public/images
    // et mettez à jour les chemins dans lib/site.ts.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
  },
  // Le lint est exécuté séparément via `npm run lint` afin de ne jamais bloquer le build de prod.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
