import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { Nunito_Sans, Sora } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const ninutoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const sora = Sora({
  variable: '--font-sora',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Подорожники',
  description:
    'Спільнота мандрівників, де зможна ділитися своїми історіями та отримувати натхнення для нових пригод',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${ninutoSans.variable} ${sora.variable}`}>
        <TanStackProvider>
          <main>{children}</main>
          <Toaster position='top-right' />
        </TanStackProvider>
      </body>
    </html>
  );
}
