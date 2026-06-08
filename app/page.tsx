import { Header } from "@/components/Header";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Benefits } from "@/components/Benefits";
import { Ingredients } from "@/components/Ingredients";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Testimonials } from "@/components/Testimonials";
import { Offer } from "@/components/Offer";
import { Urgency } from "@/components/Urgency";
import { OrderForm } from "@/components/OrderForm";
import { Guarantee } from "@/components/Guarantee";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { PRICE, product, hero, images } from "@/lib/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function ProductJsonLd() {
  const priceValidUntil = `${new Date().getFullYear() + 1}-12-31`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [`${SITE_URL}/opengraph-image`, `${SITE_URL}${images.mainProduct}`],
    description: product.description,
    brand: { "@type": "Brand", name: "VALON" },
    category: "Hair Care",
    offers: {
      "@type": "Offer",
      url: SITE_URL,
      priceCurrency: "MAD",
      price: PRICE,
      priceValidUntil,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0,
          currency: "MAD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "MA",
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: hero.rating,
      reviewCount: hero.reviewsCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <ProductJsonLd />
      <Header />
      <main>
        <Hero />
        <Stats />
        <Problem />
        <Solution />
        <Benefits />
        <Ingredients />
        <BeforeAfter />
        <Testimonials />
        <Offer />
        <Urgency />
        <OrderForm />
        <Guarantee />
        <Faq />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
