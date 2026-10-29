import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SitePreferencesProvider } from '@/components/SitePreferences';

export const metadata = {
  title: 'Hang Zhou — Portfolio',
  description: 'Interactive Media Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--page)] text-gray-200 py-16">
        <SitePreferencesProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        </SitePreferencesProvider>
      </body>
    </html>
  );
}