import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthCheck from "@/components/AuthCheck";
import AuthInitializer from '@/components/AuthInitializer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlanMyTrip - Discover Amazing Tours",
  description: "Find and book the best tours for your next adventure",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          <AuthInitializer />
          <AuthCheck>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow bg-gray-50">{children}</main>
              <Footer />
            </div>
          </AuthCheck>
        </ReduxProvider>
      </body>
    </html>
  );
}
