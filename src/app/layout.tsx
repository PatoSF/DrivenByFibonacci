import "@/styles/globals.css";
import Nav from "@/components/shared/NavBar";
import ClientLayout from "./ClientLayout";
import { getMetadata } from "@/utils/getMetadata";
import MaxWrapper from "@/components/shared/MaxWrapper";
import { Footer } from "@/components/shared/Footer";

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
        className={`antialiased bg-color1`}
      >
        {/* ClientLayout handles the spline preloader */}
        <ClientLayout>
          <MaxWrapper>
            <Nav />
            <main className="w-full">
              {children}
            </main>
            <Footer />
          </MaxWrapper>
        </ClientLayout>
      </body>
    </html>
  );
}
