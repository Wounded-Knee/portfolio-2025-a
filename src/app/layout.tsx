import type { Metadata } from "next";
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
      { url: '/favicon.ico', type: 'image/gif' },
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/gif" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/gif" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
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
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
