export const INDUSTRIES = [
  'Comercio / Retail',
  'Restaurantes y gastronomía',
  'Salud y clínicas',
  'Educación',
  'Inmobiliaria',
  'Turismo y hotelería',
  'Tecnología / Software',
  'Manufactura e industria',
  'Servicios profesionales',
  'E-commerce',
  'Finanzas / Fintech',
  'Agronegocios',
  'Logística y transporte',
  'ONG / Sector público',
] as const;

export type IndustryOption = (typeof INDUSTRIES)[number];

export const INDUSTRY_OTHER = 'Otro';
