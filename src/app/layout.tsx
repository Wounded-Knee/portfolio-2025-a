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
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
