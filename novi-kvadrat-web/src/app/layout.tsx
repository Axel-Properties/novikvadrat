import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalHeader } from "@/components/layout/conditional-header";
import { ConditionalFooter } from "@/components/layout/conditional-footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Novi Kvadrat - Real Estate Platform in Serbia",
  description: "Find your perfect property in Serbia. New developments (novogradnja), apartments for sale and rent in Belgrade, Novi Sad, and across Serbia.",
  keywords: "nekretnine, srbija, beograd, novi sad, stanovi, novogradnja, prodaja, izdavanje, real estate, serbia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <ConditionalHeader />
          <main className="flex-1">
            {children}
          </main>
          <ConditionalFooter />
        </div>
      </body>
    </html>
  );
}