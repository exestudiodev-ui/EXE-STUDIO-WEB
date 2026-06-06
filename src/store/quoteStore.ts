import { create } from 'zustand';

interface QuoteState {
  isModalOpen: boolean;
  isSubmitted: boolean;
  prefilledDescription: string;
  setModalOpen: (open: boolean) => void;
  setSubmitted: () => void;
  setPrefilledDescription: (text: string) => void;
  openQuoteModal: (description?: string) => void;
  reset: () => void;
}

export const useQuoteStore = create<QuoteState>((set) => ({
  isModalOpen: false,
  isSubmitted: false,
  prefilledDescription: '',
  setModalOpen: (open) => set({ isModalOpen: open }),
  setSubmitted: () => set({ isSubmitted: true }),
  setPrefilledDescription: (text) => set({ prefilledDescription: text }),
  openQuoteModal: (description) =>
    set({
      isModalOpen: true,
      isSubmitted: false,
      prefilledDescription: description ?? '',
    }),
  reset: () =>
    set({
      isSubmitted: false,
      prefilledDescription: '',
      isModalOpen: false,
    }),
}));
