
import { Sora, Nunito_Sans, Inter } from "next/font/google";
import "@/styles/globals.css";
import Nav from "@/components/shared/nav-bar";
import ClientLayout from "./ClientLayout";
import { getMetadata } from "@/utils/getMetadata";
import MaxWrapper from "@/components/shared/MaxWrapper";

export const soraFont = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const nunitoSansFont = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = getMetadata({
  title: "Driven By Fibonacci",
  description: "Driven by Fibonacci is a decentralized protocol that pairs an algorithmically stabilized endogenous asset with a pegged stablecoin. It delivers predictable, risk-managed returns through volatility-reducing algorithms and incentivizes long-term commitment with tiered rewards and withdrawal penalties, making it appealing for both high-net-worth and everyday investors",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased bg-[#ffefe4]`}
      >
        {/* ClientLayout handles the spline preloader */}
        <ClientLayout>
          <MaxWrapper>
            <Nav />
            <main className="w-full">
              {children}
            </main>
          </MaxWrapper>
        </ClientLayout>
      </body>
    </html>
  );
}
