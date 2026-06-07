/** Utilitaires de formatage et de validation (prix, téléphone marocain). */

/** Formate un montant en dirhams : 1099 -> "1 099 DH" (espace fine insécable). */
export function formatPrice(amount: number): string {
  const formatted = new Intl.NumberFormat("fr-MA", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${formatted} DH`;
}

/** Nettoie un numéro de toute mise en forme (espaces, points, tirets, parenthèses). */
export function stripPhone(input: string): string {
  return input.replace(/[\s().-]/g, "");
}

/**
 * Valide un numéro de téléphone marocain.
 * Accepté : 06XXXXXXXX, 07XXXXXXXX, +2126XXXXXXXX, +2127XXXXXXXX, 002126/7XXXXXXXX, 2126/7XXXXXXXX
 */
export function isValidMoroccanPhone(input: string): boolean {
  const p = stripPhone(input);
  return (
    /^0[67]\d{8}$/.test(p) ||
    /^\+212[67]\d{8}$/.test(p) ||
    /^00212[67]\d{8}$/.test(p) ||
    /^212[67]\d{8}$/.test(p)
  );
}

/**
 * Normalise vers le format E.164 (+212XXXXXXXXX) — requis pour le hachage CAPI.
 * Retourne null si le numéro est invalide.
 */
export function normalizeMoroccanPhone(input: string): string | null {
  const p = stripPhone(input);
  if (!isValidMoroccanPhone(p)) return null;
  if (p.startsWith("+212")) return p;
  if (p.startsWith("00212")) return "+212" + p.slice(5);
  if (p.startsWith("212")) return "+" + p;
  if (p.startsWith("0")) return "+212" + p.slice(1);
  return null;
}
