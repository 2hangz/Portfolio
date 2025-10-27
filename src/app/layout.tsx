import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Hang Zhou — Portfolio',
  description: 'Interactive Media Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f0f] text-gray-200 py-16">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}