import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/organisms/Sidebar';
import Navbar from '@/components/organisms/Navbar';

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
      <body className={`${inter.className} bg-gray-50 flex h-screen overflow-hidden`}>
        <Sidebar />
        <main className="flex flex-col w-full">
          <Navbar />
          <div className='overflow-auto'>
            <div className='mx-auto max-w-6xl p-3'>

              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
