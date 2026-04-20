import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Groupe AMETRA — De la conception à l'intégration",
    template: "%s | Groupe AMETRA",
  },
  description:
    "Groupe AMETRA, expert en ingénierie mécanique, électrique, électronique et intégration de systèmes dans les secteurs de la défense, l'aéronautique, le spatial, le nucléaire et le ferroviaire.",
  keywords: ["AMETRA", "ingénierie", "intégration systèmes", "défense", "aéronautique", "nucléaire"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Groupe AMETRA",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${barlow.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
