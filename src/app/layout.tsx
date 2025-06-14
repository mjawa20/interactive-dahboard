import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/organisms/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Interactive Dashboard',
  description: 'Interactive Dashboard with DummyJSON API',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 flex h-screen`}>
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
