# VALON — Hair Care · Landing page COD

Landing page mono-page **ultra premium** et orientée conversion pour le coffret de
soin capillaire **VALON** (Shampooing Nourrissant 250 ml + Sérum Fortifiant 75 ml),
vendu au Maroc en **paiement à la livraison (COD)**.

Objectif unique : transformer un visiteur venu de Facebook / Instagram / TikTok Ads
en **commande remplie** dans le formulaire.

---

## ✨ Stack technique

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (direction artistique noir & or sur-mesure)
- **Framer Motion** (toutes les animations & micro-interactions)
- **next/font** (Playfair Display pour les titres, Inter pour le corps)
- **next/image** (visuels optimisés)
- **API Route** `/api/order` → Conversions API (CAPI) + webhook commande
- **Meta Pixel** + **CAPI** avec déduplication par `event_id`
- SEO complet : métadonnées FR, Open Graph / Twitter, **JSON-LD Product**,
  `sitemap.xml`, `robots.txt`, image OG générée dynamiquement.

---

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Créer le fichier d'environnement
cp .env.example .env.local
#    puis renseignez vos valeurs (voir section ci-dessous)

# 3. Lancer en développement
npm run dev          # http://localhost:3000

# 4. Build de production
npm run build && npm run start
```

> La page fonctionne **sans aucune variable d'environnement** (le Pixel, le CAPI et
> le webhook sont simplement désactivés / ignorés proprement). Configurez-les pour
> activer le tracking et la réception des commandes.

---

## 🔑 Variables d'environnement

Copiez `.env.example` → `.env.local` et remplissez :

| Variable | Côté | Rôle |
| --- | --- | --- |
| `NEXT_PUBLIC_FB_PIXEL_ID` | **client** | ID du Pixel Meta. Events Manager → votre Pixel → ID. |
| `FB_CAPI_TOKEN` | **serveur (secret)** | Token CAPI. Events Manager → Paramètres → API de conversions → Générer un token. |
| `FB_TEST_EVENT_CODE` | serveur | (Optionnel) Code de test pour « Test des événements ». À vider en prod. |
| `ORDER_WEBHOOK_URL` | serveur | URL de destination des commandes (Make / Zapier / Google Sheets / CRM). |
| `NEXT_PUBLIC_SITE_URL` | client | URL publique du site (SEO, canonical, OG, CAPI). Ex : `https://valon-haircare.ma` |

⚠️ Les secrets (`FB_CAPI_TOKEN`, `ORDER_WEBHOOK_URL`, `FB_TEST_EVENT_CODE`) ne sont
**jamais** exposés au navigateur — ils ne sont lus que dans l'API Route serveur.
`.env.local` est ignoré par Git.

### Où mettre quoi ?

- **Pixel ID** → `NEXT_PUBLIC_FB_PIXEL_ID`. Il est injecté dans le `<head>` via
  `components/FacebookPixel.tsx` et utilisé par tous les événements client.
- **Token CAPI** → `FB_CAPI_TOKEN`. Utilisé uniquement dans `app/api/order/route.ts`
  pour l'appel serveur à `graph.facebook.com`.

---

## 📦 Brancher la destination des commandes

À chaque commande, l'API `/api/order` envoie un **POST JSON** vers `ORDER_WEBHOOK_URL`
avec ce format :

```json
{
  "name": "Sara Bennani",
  "phone": "+212612345678",
  "city": "Casablanca",
  "address": "12 Rue des Fleurs, Maarif",
  "offerId": "pack-2",
  "offerLabel": "2 Coffrets",
  "quantity": 2,
  "value": 1099,
  "currency": "MAD",
  "eventId": "f2c1...",
  "createdAt": "2026-06-07T22:14:31.057Z"
}
```

Exemples de destinations :
- **Make.com / Zapier** : créez un scénario « Webhook → Google Sheets / Email / CRM »
  et collez l'URL du webhook dans `ORDER_WEBHOOK_URL`.
- **Google Sheets** : déployez un **Google Apps Script** en Web App qui ajoute une ligne,
  et utilisez son URL `/exec`.
- **CRM** : pointez vers votre endpoint d'ingestion de leads.

> 🛟 **Filet de sécurité** : chaque commande est aussi écrite dans les logs serveur
> (`[VALON][order] {...}`). L'API renvoie toujours `200` au client (même si le CAPI ou
> le webhook échoue) afin de **ne jamais perdre un client** pour un souci de tracking.
> Adaptez ce comportement dans `app/api/order/route.ts` si vous préférez bloquer.

---

## 📊 Pixel Meta + Conversions API (déduplication)

Chaque événement client génère un `eventID`. Pour l'achat, **le même `event_id` est
partagé** entre le Pixel (navigateur) et le CAPI (serveur) → Meta déduplique
automatiquement.

| Événement | Déclenchement | Côté |
| --- | --- | --- |
| `PageView` | chargement de la page | client |
| `ViewContent` | affichage du hero | client |
| `AddToCart` | clic sur un CTA / focus du formulaire | client |
| `InitiateCheckout` | début de saisie du formulaire | client |
| `Purchase` | soumission du formulaire | **client + CAPI serveur (dédupliqué)** |

Côté serveur (`app/api/order/route.ts`), l'événement `Purchase` est envoyé à
`https://graph.facebook.com/v19.0/{PIXEL_ID}/events` avec :
- `event_id` identique à celui du Pixel,
- `action_source: "website"`, `event_source_url`,
- `user_data` : **téléphone haché en SHA-256** (`ph`), + `fn`, `ct`, `country`,
  `fbp` / `fbc`, `client_ip_address`, `client_user_agent` (meilleure correspondance),
- `custom_data` : `value`, `currency: "MAD"`, `contents`.

Pour vérifier : renseignez `FB_TEST_EVENT_CODE` et regardez Events Manager →
**Test des événements**.

---

## 🖼️ Remplacer les visuels par vos vraies photos

Les visuels livrés par défaut sont des **SVG vectoriels premium** (flacons noir & or,
coffret, avant/après) dans `public/images/`. Pour utiliser vos **photos réelles** :

1. Déposez vos fichiers (JPG/PNG/WebP) dans `public/images/`.
2. Mettez à jour les chemins dans **`lib/site.ts`** (objet `images`) :

   ```ts
   export const images = {
     coffret: "/images/mon-coffret.jpg",
     shampoo: "/images/mon-shampoing.jpg",
     serum:   "/images/mon-serum.jpg",
     before:  "/images/avant.jpg",
     after:   "/images/apres.jpg",
     og:      "/opengraph-image",
   };
   ```

C'est tout — `next/image` s'occupe de l'optimisation. (Les photos `.jpg/.png` n'ont
pas besoin de l'option `dangerouslyAllowSVG`, qui ne sert qu'à nos SVG par défaut.)

---

## ✍️ Personnaliser le contenu

Tout le **copywriting**, les **prix**, les **offres**, les **témoignages** et la **FAQ**
sont centralisés dans **`lib/site.ts`** — un seul fichier à éditer, aucun texte en dur
dans les composants.

- Prix : `PRICE`, `COMPARE_AT`
- Offres / packs : `offers`
- Témoignages : `testimonials`
- FAQ : `faqs`
- Urgence (stock, compteur) : `urgency`
- Marque & contacts : `brand`

---

## 🗂️ Structure du projet

```
app/
  layout.tsx            # fonts, métadonnées SEO, Pixel de base
  page.tsx              # assemble les sections + JSON-LD Product
  globals.css           # design system (Tailwind + utilitaires luxe)
  opengraph-image.tsx   # image OG/Twitter générée dynamiquement (PNG)
  twitter-image.tsx
  robots.ts / sitemap.ts
  api/order/route.ts    # réception commande → CAPI + webhook
components/
  Header, MobileCtaBar, Hero, Problem, Solution, Benefits,
  Ingredients, BeforeAfter, Testimonials, Offer, Urgency,
  OrderForm, Guarantee, Faq, Footer            # sections
  FacebookPixel, CtaButton, Logo, icons, motion, ui  # briques réutilisables
lib/
  site.ts    # 🎯 tout le contenu / données
  pixel.ts   # helpers Pixel client (eventID, fbp/fbc, trackOnce)
  format.ts  # formatage prix + validation téléphone marocain
public/images/  # visuels SVG (à remplacer par vos photos)
```

---

## 🌐 Déploiement (Vercel recommandé)

1. Poussez le repo sur GitHub.
2. Importez le projet sur **Vercel**.
3. Ajoutez les variables d'environnement (section ci-dessus) dans les
   *Project Settings → Environment Variables*.
4. Déployez. Pensez à définir `NEXT_PUBLIC_SITE_URL` sur votre domaine final.

---

## ✅ Checklist avant mise en ligne

- [ ] Remplacer les visuels par les vraies photos produit (`public/images/` + `lib/site.ts`)
- [ ] Renseigner `NEXT_PUBLIC_FB_PIXEL_ID` et `FB_CAPI_TOKEN`
- [ ] Brancher `ORDER_WEBHOOK_URL` (Make / Sheets / CRM) et tester une vraie commande
- [ ] Définir `NEXT_PUBLIC_SITE_URL` (domaine de production)
- [ ] Vérifier les événements dans Events Manager (Test des événements)
- [ ] Compléter les pages légales (liens dans le footer)
- [ ] Mettre à jour le numéro de contact (`brand.phoneDisplay` dans `lib/site.ts`)
