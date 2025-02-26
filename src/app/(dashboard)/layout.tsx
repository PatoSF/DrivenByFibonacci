"use client";

import { Footer } from "@/components/shared/Footer";
import Nav from "@/components/shared/NavBar";
import "@/styles/globals.css";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased h-full bg-color1`}>
        {/* <Nav  /> */}
        <div className="min-h-screen">{children}</div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
