'use client';
import { useGlobalStore } from "@/store";

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const { isShowMobileSidebar } = useGlobalStore();
  return (
    <aside className={`${isShowMobileSidebar ? 'block' : 'hidden lg:hidden!'} min-w-64 bg-primary-900 border-r border-gray-200 h-screen z-50 transition-transform duration-300 ease-in-out lg:block fixed top-0 left-0 lg:static lg:z-auto`}>
      {children}
    </aside>
  );
}
