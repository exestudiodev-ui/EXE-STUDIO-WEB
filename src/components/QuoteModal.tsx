import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { quoteService } from '@/services/quoteService';
import { useQuoteStore } from '@/store/quoteStore';
import { useCurrencyStore } from '@/store/currencyStore';
import { CurrencyToggle } from '@/components/CurrencyToggle';
import {
  BUDGET_RANGES,
  TIMELINE_OPTIONS,
  PRICING_DISCLAIMER,
} from '@/constants/budgetRanges';
import {
  validateBusinessQuote,
  type BusinessQuoteFormData,
} from '@/lib/quoteFormSchema';
import {
  CheckCircle2,
  Send,
  Building2,
  User,
  FileText,
  Loader2,
  Globe,
  FileSpreadsheet,
  Briefcase,
  Mail,
  Phone,
} from 'lucide-react';

const initialFormData: BusinessQuoteFormData = {
  businessName: '',
  industry: '',
  website: '',
  description: '',
  goals: '',
  budget: '',
  timeline: '',
  currency: 'USD',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  contactPosition: '',
  ruc: '',
};

const inputClass = 'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 font-inter text-sm focus:border-cyan-accent focus:outline-none focus:shadow-[0_0_10px_rgba(0,212,255,0.1)] transition-all';
const inputErrorClass = 'border-red-500/50 focus:border-red-500/50 focus:shadow-[0_0_10px_rgba(239,68,68,0.1)]';
const selectClass = `${inputClass} appearance-none bg-[#020b13] [&>option]:bg-[#020b13] [&>option]:text-white`;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-400 font-inter">{message}</p>;
}

function BusinessForm() {
  const currency = useCurrencyStore((s) => s.currency);
  const setSubmitted = useQuoteStore((s) => s.setSubmitted);
  const prefilledDescription = useQuoteStore((s) => s.prefilledDescription);
  
  const [formData, setFormData] = useState<BusinessQuoteFormData>({
    ...initialFormData,
    currency,
    description: prefilledDescription || initialFormData.description,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BusinessQuoteFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  useEffect(() => {
    setFormData((prev) => ({ ...prev, currency }));
  }, [currency]);

  const updateField = <K extends keyof BusinessQuoteFormData>(field: K, value: BusinessQuoteFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const getInputClass = (fieldName: keyof BusinessQuoteFormData) => {
    return `${inputClass} ${errors[fieldName] ? inputErrorClass : ''}`;
  };

  const validateStep = () => {
    const currentErrors: Partial<Record<keyof BusinessQuoteFormData, string>> = {};

    if (step === 1) {
      if (!formData.businessName?.trim()) currentErrors.businessName = 'El nombre del negocio es requerido';
      if (!formData.industry?.trim()) currentErrors.industry = 'El sector de negocio es requerido';
      
      if (Object.keys(currentErrors).length > 0) {
        setErrors(currentErrors);
        toast.error('Completa los campos requeridos para continuar');
        return false;
      }
    }

    if (step === 2) {
      if (!formData.description?.trim()) currentErrors.description = 'La descripción es requerida';
      if (!formData.goals?.trim()) currentErrors.goals = 'Los objetivos son requeridos';
      
      if (Object.keys(currentErrors).length > 0) {
        setErrors(currentErrors);
        toast.error('Completa los requerimientos del proyecto');
        return false;
      }
    }

    return true;
  };

  const nextStep = () => { if (validateStep()) setStep((p) => Math.min(p + 1, totalSteps)); };
  const prevStep = () => setStep((p) => Math.max(p - 1, 1));

  const handleSendQuote = async () => {
    console.log("🟢 [1/4] Iniciando proceso de envío. Estado actual de formData:", formData);

    // 🛠️ Sanitización de strings vacíos
    const sanitizedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        typeof value === 'string' && value.trim() === '' ? undefined : value
      ])
    );

    const payload = { ...sanitizedData, currency };
    console.log("🔍 [2/4] Payload sanitizado listo para Zod:", payload);
    
    const validation = validateBusinessQuote(payload as any);

    if (!validation.success) {
      // 🔥 ESTO TE DIRÁ SI ZOD ESTÁ BLOQUEANDO EL FORMULARIO Y POR QUÉ CAMPO
      console.error("❌ [BLOQUEO DE VALIDACIÓN] Zod rechazó el payload. Errores detectados:", validation.errors);
      setErrors((validation.errors as any) ?? {});
      toast.error('Revisa las alertas en rojo antes de enviar');
      return;
    }

    console.log("✅ [3/4] Validación de Zod exitosa. Pasando al servicio...");
    setIsSubmitting(true);
    
    try {
      const response = await quoteService.submitBusinessQuote({
        businessData: {
          businessName: formData.businessName,
          industry: formData.industry,
          website: formData.website?.trim() || undefined,
          description: formData.description,
          goals: formData.goals,
          budget: formData.budget || undefined,
          timeline: formData.timeline || undefined,
          currency: currency as 'USD' | 'PEN',
          contactName: formData.contactName,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone?.trim() || undefined,
          contactPosition: formData.contactPosition?.trim() || undefined,
          ruc: formData.ruc?.trim() || undefined,
        },
      });

      console.log("📊 [4/4] Respuesta final del servicio recibida en UI:", response);

      if (response.success) {
        setSubmitted();
        toast.success('¡Cotización enviada con éxito!');
      } else {
        console.warn("⚠️ El servicio devolvió success: false ->", response.message);
        toast.error(response.message || 'Error del servidor');
      }
    } catch (error) {
      console.error("💥 Excepción crítica atrapada en el bloque catch de la UI:", error);
      toast.error('Fallo en la comunicación con el servidor');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Indicador de Progreso */}
      <div className="flex items-center justify-between mb-8 relative px-2">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 -z-10"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-cyan-accent transition-all duration-500 -z-10" 
          style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
        
        {[1, 2, 3].map((num) => (
          <div 
            key={num} 
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-space font-bold transition-all duration-300 ${
              step >= num 
                ? 'bg-cyan-accent text-deep-space shadow-[0_0_15px_rgba(0,212,255,0.4)]' 
                : 'bg-deep-space border border-white/20 text-white/50'
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.25 }}
        >
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-space font-bold text-lg text-white flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-cyan-accent" /> Datos de la Empresa
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-text mb-2">Nombre Comercial / Razón Social *</label>
                  <input type="text" value={formData.businessName} onChange={(e) => updateField('businessName', e.target.value)} className={getInputClass('businessName')} placeholder="Ej: Mi Empresa S.A.C." />
                  <FieldError message={errors.businessName} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-text mb-2">Industria / Sector de Negocio *</label>
                  <input list="industries" value={formData.industry} onChange={(e) => updateField('industry', e.target.value)} className={getInputClass('industry')} placeholder="Selecciona o escribe..." />
                  <datalist id="industries">
                    <option value="Tecnología" />
                    <option value="Salud y Medicina" />
                    <option value="Comercio / Retail" />
                    <option value="Hotel/Hostal" />
                    <option value="Restaurante" />
                    <option value="Inmobiliaria" />
                  </datalist>
                  <FieldError message={errors.industry} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-text mb-2 flex items-center gap-1.5"><FileSpreadsheet className="w-3.5 h-3.5 text-white/40" /> RUC (Opcional)</label>
                  <input type="text" maxLength={11} value={formData.ruc} onChange={(e) => updateField('ruc', e.target.value.replace(/\D/g, ''))} className={getInputClass('ruc')} placeholder="Ej: 20123456789" />
                  <FieldError message={errors.ruc} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-text mb-2 flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-white/40" /> Sitio Web (Opcional)</label>
                  <input type="url" value={formData.website} onChange={(e) => updateField('website', e.target.value)} className={getInputClass('website')} placeholder="https://ejemplo.com" />
                  <FieldError message={errors.website} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-text mb-2">Presupuesto Estimado de Inversión</label>
                  <select value={formData.budget ?? ''} onChange={(e) => updateField('budget', e.target.value)} className={`${selectClass} ${errors.budget ? inputErrorClass : ''}`}>
                    <option value="" className="bg-[#020b13]">Selecciona un rango</option>
                    {BUDGET_RANGES.map((range: any) => (
                      <option key={range.slug || range.id || range.value} value={range.slug || range.value} className="bg-[#020b13]">
                        {currency === 'PEN' ? range.labelPen : range.labelUsd}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors.budget} />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-space font-bold text-lg text-white flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-cyan-accent" /> Detalles del Proyecto
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-text mb-2">¿Qué requerimientos o secciones necesitas en tu plataforma? *</label>
                  <textarea value={formData.description} onChange={(e) => updateField('description', e.target.value)} rows={4} className={getInputClass('description')} placeholder="Describe detalladamente las funcionalidades..." />
                  <FieldError message={errors.description} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-text mb-2">¿Cuáles son tus objetivos comerciales a cumplir? *</label>
                  <textarea value={formData.goals} onChange={(e) => updateField('goals', e.target.value)} rows={3} className={getInputClass('goals')} placeholder="Ej: Digitalizar procesos de reserva, captar más leads..." />
                  <FieldError message={errors.goals} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-text mb-2">Tiempo Estimado de Desarrollo</label>
                  <select value={formData.timeline ?? ''} onChange={(e) => updateField('timeline', e.target.value)} className={`${selectClass} ${errors.timeline ? inputErrorClass : ''}`}>
                    <option value="" className="bg-[#020b13]">Selecciona una opción</option>
                    {TIMELINE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#020b13]">{opt.label}</option>
                    ))}
                  </select>
                  <FieldError message={errors.timeline} />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-space font-bold text-lg text-white flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-cyan-accent" /> Datos de Contacto Directo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-text mb-2">Nombre Completo *</label>
                  <input type="text" value={formData.contactName} onChange={(e) => updateField('contactName', e.target.value)} className={getInputClass('contactName')} placeholder="Ej: Carlos Mendoza" />
                  <FieldError message={errors.contactName} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-text mb-2 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-white/40" /> Cargo u Ocupación (Opcional)</label>
                  <input type="text" value={formData.contactPosition} onChange={(e) => updateField('contactPosition', e.target.value)} className={getInputClass('contactPosition')} placeholder="Ej: Administrador" />
                  <FieldError message={errors.contactPosition} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-text mb-2 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-white/40" /> Correo Electrónico Corporativo *</label>
                  <input type="email" value={formData.contactEmail} onChange={(e) => updateField('contactEmail', e.target.value)} className={getInputClass('contactEmail')} placeholder="contacto@empresa.com" />
                  <FieldError message={errors.contactEmail} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-text mb-2 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-white/40" /> Número de WhatsApp *</label>
                  <input type="tel" value={formData.contactPhone} onChange={(e) => updateField('contactPhone', e.target.value)} className={getInputClass('contactPhone')} placeholder="Ej: 942108694" />
                  <FieldError message={errors.contactPhone} />
                </div>
              </div>
              <p className="text-[11px] text-slate-text/60 mt-4 leading-relaxed">{PRICING_DISCLAIMER}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-4 pt-6 border-t border-white/10 mt-6">
        {step > 1 && (
          <button type="button" onClick={prevStep} className="px-6 py-3 rounded-full border border-white/20 text-white text-xs font-space tracking-widest hover:bg-white/5 transition-all uppercase">
            Atrás
          </button>
        )}
        {step < totalSteps ? (
          <button type="button" onClick={nextStep} className="flex-1 font-inter font-semibold text-xs uppercase tracking-[0.1em] bg-cyan-accent text-deep-space px-6 py-3 rounded-full hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all text-center">
            Siguiente
          </button>
        ) : (
          <button type="button" onClick={handleSendQuote} disabled={isSubmitting} className="flex-1 font-inter font-semibold text-xs uppercase tracking-[0.1em] bg-cyan-accent text-deep-space px-6 py-3 rounded-full hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} 
            Confirmar y Enviar
          </button>
        )}
      </div>
    </div>
  );
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="w-20 h-20 rounded-full bg-cyan-accent/20 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="w-10 h-10 text-cyan-accent" strokeWidth={1.5} />
      </motion.div>
      <h3 className="font-space font-bold text-2xl text-cyan-accent mb-3">¡Gracias por tu interés!</h3>
      <p className="font-inter font-light text-slate-text mb-6">Hemos recibido tu solicitud.<br />Te contactaremos en un plazo de 24 horas hábiles.</p>
      <button type="button" onClick={onClose} className="font-inter font-medium text-xs uppercase tracking-[0.1em] bg-cyan-accent text-deep-space px-8 py-3 rounded-full hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all">
        Cerrar
      </button>
    </div>
  );
}

export function QuoteModal() {
  // ✅ TIPADO ESTRICTO: Selectores conectados limpiamente con la interfaz del store
  const isOpen = useQuoteStore((state) => state.isModalOpen);
  const isSubmitted = useQuoteStore((state) => state.isSubmitted);
  const setModalOpen = useQuoteStore((state) => state.setModalOpen);
  const resetStore = useQuoteStore((state) => state.reset);
  const currency = useCurrencyStore((state) => state.currency);
  const setCurrency = useCurrencyStore((state) => state.setCurrency);

  const handleClose = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => {
      resetStore();
    }, 300);
  }, [setModalOpen, resetStore]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <div className="absolute inset-0 bg-[rgba(2,11,19,0.9)] backdrop-blur-xl" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.05, 0.7, 0.1, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-deep-space/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden flex flex-col"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white hover:text-cyan-accent transition-all"
              aria-label="Cerrar"
            >
              <span className="text-2xl leading-none">&times;</span>
            </button>

            {!isSubmitted && (
              <div className="px-6 pt-6 pb-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="font-space font-bold text-xl text-white mb-1">Solicitar Cotización</h2>
                  <p className="font-inter text-xs text-slate-text">Cuéntanos sobre tu proyecto. Atendemos clientes en todo el Perú.</p>
                </div>
                <div className="pr-10">
                  <CurrencyToggle currency={currency} onChange={setCurrency} />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isSubmitted ? 'success' : 'form'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {isSubmitted ? <SuccessState onClose={handleClose} /> : <BusinessForm />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}