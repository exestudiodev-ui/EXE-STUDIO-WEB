import { create } from 'zustand';

interface NavigationStore {
  isNavHidden: boolean;
  isMobileViewport: boolean;
  setNavHidden: (hidden: boolean) => void;
  setMobileViewport: (mobile: boolean) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  isNavHidden: false,
  isMobileViewport: false,
  setNavHidden: (hidden) => set({ isNavHidden: hidden }),
  setMobileViewport: (mobile) => set({ isMobileViewport: mobile }),
}));

export const selectShowFloatingNav = (state: NavigationStore) =>
  state.isMobileViewport && state.isNavHidden;
