import { IconName } from 'lucide-react/dynamic';
import { create } from 'zustand';

export type PageItem = {
  name: string;
  href: string;
  icon: IconName;
};

interface GlobalStore {
  activePage: PageItem;
  pages: PageItem[];
  setActivePage: (page: PageItem) => void;
}
export const useGlobalStore = create<GlobalStore>((set, get) => ({
  pages: [
    { name: 'Dashboard', href: '/', icon: 'layout-dashboard' },
    { name: 'Products', href: '/products', icon: 'shopping-cart' },
    { name: 'Recipes', href: '/recipes', icon: 'utensils' },
    { name: 'Carts', href: '/carts', icon: 'shopping-cart' },
  ],
  activePage: { name: 'Dashboard', href: '/', icon: 'layout-dashboard' },
  setActivePage: (page: PageItem) => set({ activePage: page }),
}))