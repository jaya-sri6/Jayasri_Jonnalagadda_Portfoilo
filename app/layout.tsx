import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Jayasri Jonnalagadda — AI Systems Engineer',
  description: 'Portfolio of Jayasri Jonnalagadda, an AI Systems Engineer, Software Engineer, and Full Stack Developer.',
  keywords: ['Jayasri Jonnalagadda', 'AI systems engineer', 'software engineer', 'machine learning', 'portfolio'],
  openGraph: { title: 'Jayasri Jonnalagadda — AI Systems Engineer', description: 'Building AI Infrastructure, Distributed Systems, and Intelligent Applications.', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="dark"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
