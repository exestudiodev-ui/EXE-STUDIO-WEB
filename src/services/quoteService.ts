import { type ServiceResponse } from './api';

export interface QuoteSubmission {
  id: string;
  projectType: string;
  projectLabel: string;
  features: { id: string; label: string; price: number }[];
  techPreference: string;
  contactData: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    notes?: string;
  };
  totalBudget: number;
  submittedAt: string;
}

export interface BusinessQuoteSubmission {
  id: string;
  businessData: {
    businessName: string;
    industry: string;
    website?: string;
    description: string;
    goals: string;
    budget?: string;
    timeline?: string;
    currency: 'USD' | 'PEN';
    contactName: string;
    contactEmail: string;
    contactPhone?: string;
    contactPosition?: string;
    ruc?: string;
  };
  submittedAt: string;
}

const BUSINESS_QUOTE_STORAGE_KEY = 'exestudio_business_quote_submissions';

export const quoteService = {
  /**
   * Envía una cotización estructurada del formulario de negocio directo a Formspree
   */
  async submitBusinessQuote(data: Omit<BusinessQuoteSubmission, 'id' | 'submittedAt'>): Promise<ServiceResponse<BusinessQuoteSubmission>> {
    const newSubmission: BusinessQuoteSubmission = {
      ...data,
      id: `biz_quote_${Math.random().toString(36).substr(2, 9)}`,
      submittedAt: new Date().toISOString(),
    };

    // 📡 Evaluación segura dentro del método ejecutor
    const endpoint = import.meta.env.VITE_QUOTE_FORM_ENDPOINT || "";
    console.log("🚀 [quoteService] Intentando enviar a el Endpoint:", endpoint);

    try {
      if (!endpoint) {
        throw new Error('La variable VITE_QUOTE_FORM_ENDPOINT no está cargada en el cliente Vite.');
      }

      const bData = data.businessData;

      // TRANSMISIÓN HTTP REAL HACIA FORMSPREE
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `🚀 Nueva Cotización Web - ${bData.businessName}`,
          email: bData.contactEmail, // Mapeo explícito para que Formspree detecte el remitente nativamente
          empresa: bData.businessName,
          sector: bData.industry,
          ruc: bData.ruc || 'No registra RUC',
          sitio_web: bData.website || 'No registra Web',
          descripcion: bData.description,
          objetivos: bData.goals,
          presupuesto: bData.budget || 'Bajo evaluación',
          tiempo_estimado: bData.timeline || 'Flexible',
          moneda: bData.currency,
          contacto_nombre: bData.contactName,
          contacto_cargo: bData.contactPosition || 'No especificado',
          contacto_whatsapp: bData.contactPhone || 'No registrado',
        }),
      });

      console.log("📡 [quoteService] Respuesta del servidor Formspree:", response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ [quoteService] Detalles del rechazo de Formspree:", errorData);
        throw new Error('Formspree rechazó la solicitud de cotización.');
      }

      // Persistencia en LocalStorage local
      if (typeof window !== 'undefined') {
        try {
          const existing = this.getBusinessQuoteSubmissions();
          existing.push(newSubmission);
          localStorage.setItem(BUSINESS_QUOTE_STORAGE_KEY, JSON.stringify(existing));
        } catch (e) {
          console.error('Error en localStorage local:', e);
        }
      }

      return {
        success: true,
        data: newSubmission,
        message: 'La cotización se ha procesado y transmitido con éxito.'
      };

    } catch (error) {
      console.error('💥 [quoteService] Error crítico detectado:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error inesperado al enviar la cotización.'
      };
    }
  },

  getBusinessQuoteSubmissions(): BusinessQuoteSubmission[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(BUSINESS_QUOTE_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) { return []; }
  },

  clearBusinessQuoteSubmissions(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(BUSINESS_QUOTE_STORAGE_KEY);
    }
  },
};