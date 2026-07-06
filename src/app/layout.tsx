import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QuoteProvider } from "@/context/quote-context";
import { QuoteBar } from "@/components/quote-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S.P. Enterprises — Product Catalogue",
  description: "Diwali lights, rechargeable fans, solar lanterns and more, from S.P. Enterprises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QuoteProvider>
          {children}
          <QuoteBar />
        </QuoteProvider>
      </body>
    </html>
  );
}
