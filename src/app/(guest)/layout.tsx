import "@/styles/globals.css";
import Nav from "@/components/shared/NavBar";
import { getMetadata } from "@/utils/getMetadata";
import MaxWrapper from "@/components/shared/MaxWrapper";
import { Footer } from "@/components/shared/Footer";
import { Toaster } from "sonner";

export const metadata = getMetadata({
  title: "EulerFi",
  description: "EulerFi is a decentralized protocol that pairs an algorithmically stabilized endogenous asset with a pegged stablecoin. It delivers predictable, risk-managed returns through volatility-reducing algorithms and incentivizes long-term commitment with tiered rewards and withdrawal penalties, making it appealing for both high-net-worth and everyday investors",
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
        <MaxWrapper>
          <Nav />
          <main className="w-full">
            {children}
          </main>
          <Footer />
          <Toaster richColors position="top-right" />
        </MaxWrapper>
      </body>
    </html>
  );
}
