"use client";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/components/Navbar";
import { ThemeProvider } from "@/context/themeContext";
import { useEffect } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

// export const metadata: Metadata = {
//   title: "Lit Library",
//   description: "The Only Book App You Need",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
 {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js")
        .then(registration => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch(error => {
          console.log("Service Worker registration failed:", error);
        });
    }
  }, []);
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={cn("min-h-screen bg-background antialiased", poppins)}>
        <ThemeProvider>
          <AuthProvider>
          <Sidebar />
          {children}
        </AuthProvider>
        </ThemeProvider>
        
      </body>
    </html>
  );
}
