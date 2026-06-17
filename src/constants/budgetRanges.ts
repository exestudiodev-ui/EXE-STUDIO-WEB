import type { Currency } from '@/lib/currency';

export interface BudgetRange {
  slug: string;
  labelUsd: string;
  labelPen: string;
}

export const BUDGET_RANGES: BudgetRange[] = [
  {
    slug: 'under-3k',
    labelUsd: 'Menos de $320 – $650',
    labelPen: 'Menos de S/ 1,200 – S/ 2,500',
  },
  {
    slug: '3k-8k',
    labelUsd: '$400 – $950',
    labelPen: 'S/ 1,500 – S/ 3,500',
  },
  {
    slug: '8k-20k',
    labelUsd: '$1,500 – $3,200',
    labelPen: 'S/ 5,500 – S/ 12,000',
  },
  {
    slug: '20k-50k',
    labelUsd: '$1,600 – $4,000',
    labelPen: 'S/ 6,000 – S/ 15,000',
  },
  {
    slug: '50k+',
    labelUsd: '$2,100 – $4,800',
    labelPen: 'S/ 8,000 – S/ 18,000',
  },
  {
    slug: '50k+',
    labelUsd: '$4,000 – $9,300+',
    labelPen: 'S/ 15,000 – S/ 35,000+',
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
