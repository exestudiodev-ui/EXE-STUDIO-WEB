import { z } from 'zod';

const peruPhoneRegex = /^(\+51\s?)?9\d{8}$/;

export const businessQuoteSchema = z.object({
  businessName: z
    .string()
    .min(2, 'Ingresa el nombre del negocio (mín. 2 caracteres)'),
  industry: z
    .string()
    .min(2, 'Selecciona o escribe tu industria/sector'),
  website: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === '' || /^https?:\/\/.+/i.test(val),
      'Ingresa una URL válida (ej: https://miempresa.com)'
    ),
  description: z
    .string()
    .min(20, 'Describe tu proyecto con al menos 20 caracteres'),
  goals: z
    .string()
    .min(10, 'Indica los objetivos del proyecto (mín. 10 caracteres)'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  currency: z.enum(['USD', 'PEN']),
  contactName: z
    .string()
    .min(2, 'Ingresa tu nombre completo'),
  contactEmail: z
    .string()
    .email('Ingresa un correo electrónico válido'),
  contactPhone: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === '' || peruPhoneRegex.test(val.replace(/\s/g, '')),
      'Teléfono inválido. Usa formato +51 9XX XXX XXX'
    ),
  contactPosition: z.string().optional(),
  ruc: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === '' || /^\d{11}$/.test(val.replace(/\D/g, '')),
      'El RUC debe tener 11 dígitos'
    ),
});

export type BusinessQuoteFormData = z.infer<typeof businessQuoteSchema>;

export function validateBusinessQuote(data: unknown): {
  success: boolean;
  data?: BusinessQuoteFormData;
  errors?: Partial<Record<keyof BusinessQuoteFormData, string>>;
} {
  const result = businessQuoteSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Partial<Record<keyof BusinessQuoteFormData, string>> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof BusinessQuoteFormData;
    if (!errors[key]) {
      errors[key] = issue.message;
    }
  }
  return { success: false, errors };
}
