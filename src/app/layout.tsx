import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SkillSwap - EduPair',
  description: 'A peer-to-peer learning network where students teach what they know, learn what they do not, and earn credits to unlock more knowledge.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="flex items-center justify-between p-6">
          <Link href="/" className="text-2xl font-bold text-primary">
            SkillSwap
          </Link>
          <div className="flex space-x-4">
            <Link href="/profile" className="hover:text-secondary">
              Profile
            </Link>
            <Link href="/offer-session" className="hover:text-secondary">
              Offer Session
            </Link>
            <Link href="/browse" className="hover:text-secondary">
              Browse
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}


