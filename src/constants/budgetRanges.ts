import type { Currency } from '@/lib/currency';

export interface BudgetRange {
  slug: string;
  labelUsd: string;
  labelPen: string;
}

export const BUDGET_RANGES: BudgetRange[] = [
  {
    slug: 'under-3k',
    labelUsd: 'Menos de $3,000',
    labelPen: 'Menos de S/ 11,000',
  },
  {
    slug: '3k-8k',
    labelUsd: '$3,000 – $8,000',
    labelPen: 'S/ 11,000 – S/ 30,000',
  },
  {
    slug: '8k-20k',
    labelUsd: '$8,000 – $20,000',
    labelPen: 'S/ 30,000 – S/ 75,000',
  },
  {
    slug: '20k-50k',
    labelUsd: '$20,000 – $50,000',
    labelPen: 'S/ 75,000 – S/ 185,000',
  },
  {
    slug: '50k+',
    labelUsd: 'Más de $50,000',
    labelPen: 'Más de S/ 185,000',
  },
];

export function getBudgetLabel(slug: string, currency: Currency): string {
  const range = BUDGET_RANGES.find((r) => r.slug === slug);
  if (!range) return slug;
  return currency === 'PEN' ? range.labelPen : range.labelUsd;
}

export const TIMELINE_OPTIONS = [
  { value: 'urgent', label: 'Urgente (2-4 semanas) — proyectos acotados' },
  { value: 'normal', label: 'Estándar (1-3 meses)' },
  { value: 'flexible', label: 'Flexible (3-6 meses)' },
  { value: 'undefined', label: 'Aún no lo tengo definido' },
] as const;

export const PRICING_DISCLAIMER =
  'Precios referenciales. Propuesta final sujeta a alcance. IGV 18% no incluido.';
