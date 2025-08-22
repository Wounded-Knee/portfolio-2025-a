import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Joel Kramer - Senior Full-Stack Software Engineer",
  description: "Frontend-focused Senior Full-Stack Software Engineer with expertise in React, Next.js, TypeScript, and modern web technologies.",
  keywords: ["Software Engineer", "Full-Stack", "Frontend", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Joel Kramer" }],
  creator: "Joel Kramer",
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "Joel Kramer - Senior Full-Stack Software Engineer",
    description: "Frontend-focused Senior Full-Stack Software Engineer with expertise in React, Next.js, TypeScript, and modern web technologies.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joel Kramer - Senior Full-Stack Software Engineer",
    description: "Frontend-focused Senior Full-Stack Software Engineer with expertise in React, Next.js, TypeScript, and modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning={true}>
      {/* suppressHydrationWarning prevents hydration mismatch from theme script that modifies html class (light/dark) */}
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" type="image/x-icon" href="/favicon.ico" />
        {/* Adobe Fonts - Cinzel */}
        <link rel="stylesheet" href="https://use.typekit.net/get8iyo.css" />
        {/* Theme initialization script to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var shouldBeDark = theme === 'dark' || (!theme && prefersDark);
                  
                  if (shouldBeDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // Fallback to light theme if localStorage is not available
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
          suppressHydrationWarning={true}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Skip to main content link for screen readers */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
