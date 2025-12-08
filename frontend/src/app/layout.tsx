// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

// Import your components
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NetSecure",
  description: "Security tools & remote work guides.",
  icons: {
  icon: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
  ],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Top Navigation */}
        <MainNav />

        {/* Page content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
