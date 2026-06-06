import { type ServiceResponse } from './api';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  submittedAt: string;
}

const STORAGE_KEY = 'exestudio_contact_submissions';

/**
 * 🚀 CONFIGURACIÓN DEL ENDPOINT DE TRANSMISIÓN DE CORREO
 * Extraído desde las variables de entorno de Vite (.env.local) para mantener la seguridad en producción.
 */
const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || "";

export const contactService = {
  /**
   * Envía los datos del formulario de contacto hacia la pasarela conectada a exes.tudio.v1@gmail.com
   */
  async submitContactForm(data: Omit<ContactSubmission, 'id' | 'submittedAt'>): Promise<ServiceResponse<ContactSubmission>> {
    const newSubmission: ContactSubmission = {
      ...data,
      id: `contact_${Math.random().toString(36).substr(2, 9)}`,
      submittedAt: new Date().toISOString(),
    };

    try {
      // Validamos preventivamente que el endpoint esté configurado antes de lanzar la petición HTTP
      if (!FORM_ENDPOINT) {
        throw new Error('El endpoint de transmisión (VITE_CONTACT_FORM_ENDPOINT) no está configurado en las variables de entorno.');
      }

      // 📡 Petición HTTP Real mediante Fetch API hacia el servicio de mensajería externo
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `🔥 Nueva Transmisión desde EXE Studio - ${data.name}`,
          nombre: data.name,
          email: data.email,
          empresa: data.company || 'No especificada',
          mensaje: data.message,
          _to: 'exestudio.dev@gmail.com' // Unificado al nuevo correo oficial de la organización
        }),
      });

      // Validamos si el servidor externo procesó correctamente la solicitud HTTP
      if (!response.ok) {
        throw new Error('La pasarela de correos rechazó la transmisión.');
      }

      // Sincronización perimetral local anti-SSR (Solo corre en el cliente)
      if (typeof window !== 'undefined') {
        try {
          const existing = this.getContactMessages();
          existing.push(newSubmission);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
        } catch (e) {
          console.error('Error al guardar contacto en localStorage:', e);
        }
      }

      return {
        success: true,
        data: newSubmission,
        message: 'Mensaje transmitido y cifrado con éxito hacia el buzón de destino.'
      };

    } catch (error) {
      console.error('Error crítico detectado en la capa de transmisión de servicio:', error);
      
      return {
        success: false,
        message: error instanceof Error ? error.message : 'No se pudo establecer conexión con el canal de mensajería externa.'
      };
    }
  },

  /**
   * Obtiene el historial de mensajes de contacto persistidos localmente
   */
  getContactMessages(): ContactSubmission[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error al leer contactos de localStorage:', e);
      return [];
    }
  },

  /**
   * Limpia el almacenamiento de mensajes local
   */
  clearContactMessages(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
};