import type { Metadata } from 'next';
import { Poppins, Open_Sans } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LuxCareer Help — Job Seeking & Employee Relocation Luxembourg',
  description:
    'LuxCareer Help connects job seekers from Africa, the UAE, and Asia with verified employers in Luxembourg and supports you through every step of the visa process.',
  icons: { icon: '/image.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable}`}>
      <body style={{ fontFamily: 'var(--font-open-sans), Open Sans, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
