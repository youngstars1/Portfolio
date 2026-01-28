import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Import Inter and Outfit
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YoungStars Design | Agencia Digital & Desarrollo Web",
  description: "Impulsamos tu marca con diseño web, branding, flyers y marketing digital. Soluciones profesionales en Chile.",
  keywords: "Desarrollo Web, Diseño Gráfico, Agencia Digital, Chile, Flyers, Branding, Soporte Técnico",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-deep-black`}
      >
        {children}
      </body>
    </html>
  );
}
