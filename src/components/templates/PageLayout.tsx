'use client'

import Sidebar from "@/components/organisms/Sidebar";
import Navbar from "@/components/organisms/Navbar";
import { usePathname } from "next/navigation";
import { useGlobalStore } from "@/store";
import { useEffect } from "react";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { pages, setActivePage } = useGlobalStore();

  useEffect(() => {
    const page = pages.find((page) => page.href === pathname);
    if (page) {
      setActivePage(page);
    }
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex flex-col w-full">
        <Navbar />
        <div className='overflow-auto'>
          <div className='mx-auto max-w-6xl p-3'>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}