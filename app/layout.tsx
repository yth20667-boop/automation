import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { FacebookPixel } from "@/components/FacebookPixel";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Coffret Soin Cheveux VALON – Shampoing Kératine & Argan | Livraison Maroc",
  description:
    "Réparez vos cheveux abîmés en 14 jours avec le coffret VALON : Shampooing Nourrissant 250 ml + Sérum Fortifiant 75 ml à la kératine et huile d'argan. 649 DH au lieu de 899 DH. Livraison gratuite, paiement à la livraison partout au Maroc.",
  keywords: [
    "soin cheveux Maroc",
    "shampoing kératine",
    "huile d'argan cheveux",
    "sérum fortifiant cheveux",
    "VALON hair care",
    "coffret cheveux",
    "anti chute cheveux",
    "paiement à la livraison Maroc",
    "cheveux abîmés",
  ],
  authors: [{ name: "VALON — Hair Care" }],
  creator: "VALON — Hair Care",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: SITE_URL,
    siteName: "VALON — Hair Care",
    title: "Coffret Soin Cheveux VALON – Kératine & Huile d'Argan",
    description:
      "Le rituel qui répare, fortifie et sublime vos cheveux en 14 jours. 649 DH · Livraison gratuite · Paiement à la livraison partout au Maroc.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coffret Soin Cheveux VALON – Kératine & Huile d'Argan",
    description:
      "Réparez vos cheveux abîmés en 14 jours. 649 DH · Livraison gratuite · Paiement à la livraison au Maroc.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "beauty",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B0B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans">
        <FacebookPixel />
        {children}
      </body>
    </html>
  );
}
