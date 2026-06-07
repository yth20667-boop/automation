/**
 * Source unique de vérité pour tout le contenu de la landing page VALON.
 * Modifiez le copywriting, les prix, les offres et les chemins d'images ici.
 *
 * 👉 POUR UTILISER VOS PHOTOS RÉELLES : déposez-les dans /public/images
 *    puis remplacez simplement les chemins ".svg" ci-dessous (objet `images`).
 */

export const PRICE = 649; // Prix promo d'un coffret (DH)
export const COMPARE_AT = 899; // Prix d'ancrage barré (DH)
export const CURRENCY = "MAD";

export const brand = {
  name: "VALON",
  tagline: "Hair Care",
  instagram: "@valon.hair.care",
  instagramUrl: "https://instagram.com/valon.hair.care",
  // Numéro de contact affiché (modifiable)
  phoneDisplay: "+212 6 12 34 56 78",
  email: "contact@valon.ma",
};

export const product = {
  name: "Coffret VALON — Shampooing Nourrissant & Sérum Fortifiant",
  shortName: "Coffret Soin Cheveux VALON",
  description:
    "Le rituel kératine & huile d'argan qui nourrit en profondeur, fortifie la fibre et répare les cheveux abîmés. Shampooing Nourrissant & Fortifiant 250 ml + Sérum Fortifiant Cheveux 75 ml. Pour tous types de cheveux.",
  items: [
    {
      title: "Shampooing Nourrissant & Fortifiant",
      volume: "250 ml",
      blurb:
        "Lave en douceur sans agresser, nourrit la fibre et prépare le cheveu à recevoir les actifs réparateurs.",
    },
    {
      title: "Sérum Fortifiant Cheveux",
      volume: "75 ml",
      blurb:
        "Concentré de kératine et d'huile d'argan qui scelle l'hydratation, gaine la fibre et révèle une brillance miroir.",
    },
  ],
};

/** Chemins des visuels. Remplacez par vos vraies photos (mêmes clés). */
export const images = {
  coffret: "/images/coffret.svg", // Visuel héro : le coffret ouvert
  box: "/images/box.svg", // Boîte fermée
  shampoo: "/images/shampoo.svg", // Flacon shampooing seul
  serum: "/images/serum.svg", // Flacon sérum seul
  before: "/images/before.svg", // Avant
  after: "/images/after.svg", // Après
  og: "/opengraph-image", // Aperçu réseaux sociaux (généré dynamiquement par next/og)
};

export const trustBadges = [
  { icon: "truck", label: "Livraison gratuite", sub: "Partout au Maroc" },
  { icon: "cash", label: "Paiement à la livraison", sub: "Payez à réception" },
  { icon: "shield", label: "Satisfait ou remboursé", sub: "Garantie 14 jours" },
];

export const hero = {
  eyebrow: "VALON — Hair Care",
  title: "Redonnez vie à vos cheveux abîmés en 14 jours",
  highlight: "14 jours",
  subtitle:
    "Le rituel à la kératine & huile d'argan qui nourrit en profondeur, stoppe la casse et révèle des cheveux forts, brillants et soyeux — sans passer chez le coiffeur.",
  ctaPrimary: "Je commande mon coffret",
  ctaSecondary: "Voir comment ça marche",
  socialProof: "Déjà plus de 5 000 Marocaines conquises",
  rating: 4.9,
  reviewsCount: 2143,
};

export const problem = {
  eyebrow: "Le problème",
  title: "Vos cheveux méritent tellement mieux",
  intro:
    "Pollution, fer à lisser, colorations, eau calcaire… Chaque jour, votre fibre capillaire s'épuise. Et plus vous attendez, plus les dégâts s'installent.",
  points: [
    {
      title: "Cheveux secs et rêches",
      text: "Une sensation de paille au toucher, des longueurs qui boivent les soins sans jamais être rassasiées.",
      icon: "drought",
    },
    {
      title: "Casse & fourches",
      text: "Des pointes qui se dédoublent, des cheveux qui cassent au brossage et refusent de pousser.",
      icon: "broken",
    },
    {
      title: "Chute à chaque douche",
      text: "Des poignées de cheveux dans la brosse et la douche qui vous serrent le cœur chaque matin.",
      icon: "fall",
    },
    {
      title: "Cheveux ternes & plats",
      text: "Plus aucune brillance, des cheveux sans vie qui retombent et qu'aucune coiffure ne sauve.",
      icon: "dull",
    },
  ],
  conclusion:
    "Les shampooings de supermarché masquent le problème… puis l'aggravent. Vos cheveux n'ont pas besoin de plus de produits. Ils ont besoin du bon rituel.",
};

export const solution = {
  eyebrow: "La solution VALON",
  title: "Deux gestes. Un rituel. Des cheveux transformés.",
  intro:
    "VALON réunit dans un coffret élégant les deux soins essentiels pour réparer, fortifier et sublimer vos cheveux — formulés à la kératine et à l'huile d'argan pure du Maroc.",
  steps: [
    {
      step: "01",
      title: "Lavez & nourrissez",
      text: "Le Shampooing Nourrissant & Fortifiant nettoie en douceur et infuse la fibre d'actifs réparateurs dès le premier geste.",
    },
    {
      step: "02",
      title: "Scellez & sublimez",
      text: "Le Sérum Fortifiant gaine chaque cheveu, scelle l'hydratation et révèle une brillance et une douceur incomparables.",
    },
  ],
};

export const benefits = [
  {
    title: "Nutrition intense",
    text: "Nourrit la fibre en profondeur, de la racine aux pointes, pour des cheveux gorgés d'hydratation.",
    icon: "drop",
  },
  {
    title: "Anti-casse renforcé",
    text: "La kératine reconstruit la structure du cheveu et réduit visiblement la casse et les fourches.",
    icon: "shield-hair",
  },
  {
    title: "Réduit la chute",
    text: "Fortifie le cuir chevelu et la racine pour limiter la chute et stimuler des cheveux plus denses.",
    icon: "leaf",
  },
  {
    title: "Brillance miroir",
    text: "L'huile d'argan révèle un éclat lumineux et une fibre lisse qui capte la lumière.",
    icon: "sparkle",
  },
  {
    title: "Douceur soyeuse",
    text: "Des cheveux souples, démêlables et incroyablement doux au toucher dès la première utilisation.",
    icon: "feather",
  },
  {
    title: "Tous types de cheveux",
    text: "Lisses, bouclés, crépus, colorés ou fragilisés : un rituel pensé pour toutes les chevelures.",
    icon: "heart",
  },
];

export const ingredients = {
  eyebrow: "Pourquoi ça marche",
  title: "La science de la nature, au service de vos cheveux",
  intro:
    "Pas de promesses en l'air : chaque actif de VALON est choisi pour une raison précise et agit en synergie.",
  list: [
    {
      name: "Kératine",
      role: "Reconstruit la fibre",
      text: "Protéine naturelle dont vos cheveux sont composés. Elle comble les zones abîmées, renforce la structure et redonne résistance et élasticité.",
      icon: "molecule",
    },
    {
      name: "Huile d'argan",
      role: "Nourrit & protège",
      text: "L'or liquide du Maroc, riche en vitamine E et acides gras essentiels. Elle hydrate intensément, assouplit et fait briller sans alourdir.",
      icon: "argan",
    },
    {
      name: "Actifs végétaux",
      role: "Fortifient & apaisent",
      text: "Un complexe de plantes et de vitamines qui apaise le cuir chevelu, stimule la racine et fortifie le cheveu jour après jour.",
      icon: "plant",
    },
  ],
  note: "Formulé sans cruauté envers les animaux. Convient aux cheveux colorés.",
};

export const beforeAfter = {
  eyebrow: "Avant / Après",
  title: "Le résultat parle de lui-même",
  intro:
    "Glissez le curseur pour découvrir la transformation après 14 jours de rituel VALON.",
  beforeLabel: "Avant",
  afterLabel: "Après 14 jours",
  disclaimer:
    "Résultats illustratifs. Les résultats peuvent varier selon la nature et l'état initial des cheveux.",
};

export type Testimonial = {
  name: string;
  city: string;
  initials: string;
  text: string;
  rating: number;
  highlight?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Sanaa B.",
    city: "Casablanca",
    initials: "SB",
    rating: 5,
    highlight: "Mes cheveux ont arrêté de tomber",
    text: "Après 2 semaines, la différence est incroyable. Mes cheveux tombent beaucoup moins et ils sont tellement plus doux. Je ne reviens plus en arrière.",
  },
  {
    name: "Imane T.",
    city: "Marrakech",
    initials: "IT",
    rating: 5,
    highlight: "Une brillance que je n'avais plus depuis des années",
    text: "J'ai les cheveux colorés et très secs. Le sérum a tout changé : brillance, douceur, plus de fourches. Le coffret en vaut vraiment la peine.",
  },
  {
    name: "Khadija R.",
    city: "Rabat",
    initials: "KR",
    rating: 5,
    highlight: "Enfin un produit qui tient ses promesses",
    text: "J'étais sceptique avec le paiement à la livraison, mais tout était parfait. Produit de luxe, livraison rapide. Mes cheveux sont métamorphosés.",
  },
  {
    name: "Fatima Zahra E.",
    city: "Tanger",
    initials: "FZ",
    rating: 5,
    highlight: "Mes boucles sont enfin définies",
    text: "Cheveux bouclés et indisciplinés depuis toujours. Avec VALON, mes boucles sont souples, hydratées et brillantes. Toute ma famille a remarqué.",
  },
  {
    name: "Salma O.",
    city: "Fès",
    initials: "SO",
    rating: 5,
    highlight: "La casse a quasiment disparu",
    text: "Je perdais énormément de longueur à cause de la casse. En un mois, mes cheveux sont plus forts et poussent enfin. Merci VALON !",
  },
  {
    name: "Nawal H.",
    city: "Agadir",
    initials: "NH",
    rating: 5,
    highlight: "Le coffret parfait à offrir",
    text: "Je l'ai commandé pour ma mère et finalement j'en ai repris un pour moi. L'odeur, la texture, le packaging… tout respire le luxe.",
  },
];

export type Offer = {
  id: string;
  qty: number;
  price: number; // Total en DH
  compareAt: number; // Prix de référence barré
  save: number; // Économie en DH
  label: string;
  perUnit: number;
  badge?: string;
  popular?: boolean;
  bestValue?: boolean;
};

export const offers: Offer[] = [
  {
    id: "pack-1",
    qty: 1,
    price: 649,
    compareAt: 899,
    save: 250,
    perUnit: 649,
    label: "1 Coffret",
  },
  {
    id: "pack-2",
    qty: 2,
    price: 1099,
    compareAt: 1298,
    save: 199,
    perUnit: 550,
    label: "2 Coffrets",
    badge: "Le plus choisi",
    popular: true,
  },
  {
    id: "pack-3",
    qty: 3,
    price: 1499,
    compareAt: 1947,
    save: 448,
    perUnit: 500,
    label: "3 Coffrets",
    badge: "Meilleure valeur",
    bestValue: true,
  },
];

export const offerSection = {
  eyebrow: "L'offre",
  title: "Votre rituel VALON, à prix de lancement",
  intro: "Tout ce que vous recevez dans votre coffret premium :",
  includes: [
    "Shampooing Nourrissant & Fortifiant — 250 ml",
    "Sérum Fortifiant Cheveux — 75 ml",
    "Coffret cadeau premium VALON",
    "Guide du rituel parfait offert",
    "Livraison gratuite partout au Maroc",
    "Garantie satisfait ou remboursé 14 jours",
  ],
};

export const urgency = {
  eyebrow: "Offre limitée",
  title: "Prix de lancement — pour une durée limitée",
  text: "Le prix promotionnel de 649 DH (au lieu de 899 DH) prend fin bientôt. Profitez-en avant la remise à zéro du compteur.",
  stockLabel: "Stock restant à ce prix",
  stockLeft: 37,
  stockTotal: 120,
  ordersTodayLabel: "commandes passées aujourd'hui",
};

export const guarantee = {
  eyebrow: "Zéro risque",
  title: "Satisfait ou intégralement remboursé",
  text: "Nous sommes convaincus que VALON va transformer vos cheveux. Si vous n'êtes pas pleinement satisfaite sous 14 jours, contactez-nous : nous vous remboursons. Vous ne payez qu'à la livraison, vous ne risquez absolument rien.",
  points: [
    "Vous payez uniquement à la réception du colis",
    "14 jours pour être convaincue, ou remboursée",
    "Un service client marocain à votre écoute",
  ],
};

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Comment se passe le paiement à la livraison ?",
    a: "C'est très simple : vous ne payez rien en ligne. Vous réglez en espèces directement au livreur, au moment où vous recevez votre coffret VALON. Aucune carte bancaire n'est nécessaire.",
  },
  {
    q: "Quels sont les délais de livraison ?",
    a: "La livraison est gratuite partout au Maroc. Comptez en général 24 à 72 h selon votre ville. Notre équipe vous appelle pour confirmer votre commande avant l'expédition.",
  },
  {
    q: "Le coffret convient-il à mon type de cheveux ?",
    a: "Oui. VALON est formulé pour tous les types de cheveux : lisses, ondulés, bouclés, crépus, colorés ou fragilisés. La kératine et l'huile d'argan agissent sur toutes les natures de cheveux.",
  },
  {
    q: "Comment utiliser le coffret VALON ?",
    a: "Lavez vos cheveux avec le Shampooing Nourrissant & Fortifiant, rincez. Sur cheveux essorés, appliquez quelques gouttes de Sérum Fortifiant sur les longueurs et pointes, sans rincer. Utilisez le rituel 2 à 3 fois par semaine pour des résultats optimaux.",
  },
  {
    q: "En combien de temps voit-on les résultats ?",
    a: "Dès la première utilisation, vos cheveux sont plus doux et brillants. Pour la réparation en profondeur, la réduction de la casse et de la chute, comptez environ 14 jours d'utilisation régulière.",
  },
  {
    q: "Les produits sont-ils naturels et sûrs ?",
    a: "VALON est formulé à base de kératine, d'huile d'argan pure du Maroc et d'actifs végétaux. Sans test sur les animaux et adapté aux cheveux colorés. Pour usage externe uniquement.",
  },
  {
    q: "Puis-je commander plusieurs coffrets ?",
    a: "Bien sûr ! Profitez de nos packs 2 et 3 coffrets pour économiser jusqu'à 448 DH — idéal pour faire une cure complète ou offrir à vos proches.",
  },
];

export const footer = {
  about:
    "VALON — Hair Care. Des soins capillaires de luxe, formulés à la kératine et à l'huile d'argan du Maroc, pour des cheveux forts, sains et lumineux.",
  legalLinks: [
    { label: "Mentions légales", href: "#" },
    { label: "Politique de confidentialité", href: "#" },
    { label: "Conditions générales de vente", href: "#" },
    { label: "Politique de remboursement", href: "#" },
  ],
};

export const stats = [
  { value: "5 000+", label: "clientes conquises" },
  { value: "4,9/5", label: "note moyenne" },
  { value: "98 %", label: "recommandent VALON" },
  { value: "14 j", label: "satisfait ou remboursé" },
];
