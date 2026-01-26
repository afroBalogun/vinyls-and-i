import type { Metadata } from "next";
import { Agdasima, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/auth-provider/client";
import PlaybackClock from "@/components/PlaybackClock";
import LoadingProvider from "@/components/LoadingProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const agdasima = Agdasima({
  variable: "--font-agdasima",
  subsets: ["latin"],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: "Vinyls and I",
  description: "A digital archive dedicated to the intersection of tactile sound and modern prose.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${agdasima.variable} antialiased bg-primary text-secondary transition-colors duration-500 ease-in-out flex flex-col `}
      >
        <LoadingProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1 min-h-screen">
              {children}
            </main>
            <Footer />
            <PlaybackClock />
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
