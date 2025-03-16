import { AppKit } from "@/connection";
import "@/styles/globals.css";
import { getMetadata } from "@/utils/getMetadata";
import type { ReactNode } from "react";
import { Toaster } from "sonner";


export const metadata = getMetadata({
  title: "EulerFi",
  description:
    "EulerFi is a decentralized protocol that pairs an algorithmically stabilized endogenous asset with a pegged stablecoin. It delivers predictable, risk-managed returns through volatility-reducing algorithms and incentivizes long-term commitment with tiered rewards and withdrawal penalties, making it appealing for both high-net-worth and everyday investors",
});

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AppKit>
        <body className={`antialiased h-full bg-color1`}>
          {children}
          <Toaster richColors position="top-right" />
        </body>
      </AppKit>
    </html>
  );
}
