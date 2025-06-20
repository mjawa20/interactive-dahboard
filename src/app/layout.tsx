
import type { Metadata } from 'next';
import './globals.css';
import PageLayout from '@/components/templates/PageLayout';

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
      <body className="bg-gray-50">
        <PageLayout>
          {children}
        </PageLayout>
      </body>
    </html>
  );
}
