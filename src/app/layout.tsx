import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import { MudraProvider } from '@/context/MudraContext';
import { Header } from '@/components/Header';
import Link from 'next/link';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MudraMind | Calm Mind, Focus, & Stress Management with Yoga Mudras',
  description:
    'Explore yoga mudras as simple, tactile hand exercises to support focus, stress management, breathing, and healthy daily habits. Grounded in embodied cognition.',
  keywords: [
    'yoga mudra',
    'mindfulness gestures',
    'stress relief hand exercises',
    'focus exercises',
    'embodied cognition',
    'wellness habits',
  ],
  authors: [{ name: 'MudraMind Team' }],
  openGraph: {
    title: 'MudraMind | Calming Hand Gestures & Mindfulness Practice',
    description: 'Learn simple hand exercises to support daily calm and cognitive focus.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-wellness-bg text-wellness-fg selection:bg-sky-200/50 dark:selection:bg-sky-800/30">
        <MudraProvider>
          {/* Main Layout Header */}
          <Header />

          {/* Main Page Render Area */}
          <main className="flex-grow flex flex-col">{children}</main>

          {/* App-Wide Footer */}
          <footer className="w-full bg-sage-50/50 dark:bg-black/35 border-t border-glass-border py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo and Tagline */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-sage-500 to-sky-400 text-white font-bold">
                      M
                    </span>
                    <span className="font-outfit font-bold text-lg text-sage-800 dark:text-sage-100">
                      Mudra<span className="text-sky-500">Mind</span>
                    </span>
                  </div>
                  <p className="text-sm text-sage-500 max-w-sm">
                    Introducing traditional hand exercises as clean, accessible habits to support somatic grounding, focus, and modern stress management.
                  </p>
                </div>

                {/* Navigation Links */}
                <div>
                  <h4 className="text-xs font-semibold text-sage-400 uppercase tracking-wider mb-4">Explore</h4>
                  <ul className="space-y-2 text-sm text-sage-600 dark:text-sage-300">
                    <li>
                      <Link href="/library" className="hover:text-sky-500 transition-colors">Mudra Library</Link>
                    </li>
                    <li>
                      <Link href="/practice" className="hover:text-sky-500 transition-colors">Daily Routines</Link>
                    </li>
                    <li>
                      <Link href="/learn" className="hover:text-sky-500 transition-colors">Science & Learning</Link>
                    </li>
                    <li>
                      <Link href="/research" className="hover:text-sky-500 transition-colors">Literature References</Link>
                    </li>
                  </ul>
                </div>

                {/* Support & Legal */}
                <div>
                  <h4 className="text-xs font-semibold text-sage-400 uppercase tracking-wider mb-4">About</h4>
                  <ul className="space-y-2 text-sm text-sage-600 dark:text-sage-300">
                    <li>
                      <Link href="/about" className="hover:text-sky-500 transition-colors">About MudraMind</Link>
                    </li>
                    <li>
                      <Link href="/about#disclaimer" className="hover:text-sky-500 transition-colors font-medium text-amber-600 dark:text-accent-amber">Medical Disclaimer</Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Comprehensive Medical / Scientific Disclaimer Box */}
              <div className="mt-8 pt-8 border-t border-sage-100 dark:border-sage-900/60">
                <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-xs text-sage-500 dark:text-sage-400 space-y-2 leading-relaxed">
                  <p className="font-semibold text-accent-amber-dark dark:text-accent-amber text-[13px] mb-1">
                    Medical and Scientific Disclaimer:
                  </p>
                  <p>
                    The content on MudraMind, including hand mudra instructions, wellness routines, and references to research, is provided solely for educational and general wellness information. Mudras are gentle somatic hand exercises that may act as helpful mindfulness anchors and stretch activities; they are <strong>not</strong> medical treatments, diagnostic tools, or therapeutic cures for any physical or mental health condition.
                  </p>
                  <p>
                    These practices have not been validated as primary clinical therapies by major global drug and medicine regulators. Do not use mudras or mindfulness exercises to delay or replace professional medical advice, diagnosis, or treatment. Always consult a qualified medical professional for health questions or conditions.
                  </p>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-sage-400 gap-4">
                  <p>&copy; {new Date().getFullYear()} MudraMind. Supporting healthy workplace breaks and somatic awareness.</p>
                  <p className="flex gap-4">
                    <span>Designed for wellness</span>
                    <span>PWA Supported</span>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </MudraProvider>
      </body>
    </html>
  );
}
