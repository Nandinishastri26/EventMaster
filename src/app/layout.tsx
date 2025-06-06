'use client'
import "./globals.css";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "../../lib/supabaseClient";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionContextProvider supabaseClient={supabase}>
          <Navbar />
          <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </SessionContextProvider>
      </body>
    </html>
  );
}
