"use client";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { scroll, scrollSepolia } from "@reown/appkit/networks";
import { ReactNode } from "react";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

const metadata = {
  name: "EulerFi",
  description:
    "EulerFi is a decentralized protocol that pairs an algorithmically stabilized endogenous asset with a pegged stablecoin. It delivers predictable, risk-managed returns through volatility-reducing algorithms and incentivizes long-term commitment with tiered rewards and withdrawal penalties, making it appealing for both high-net-worth and everyday investors",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [scroll, scrollSepolia],
  projectId,
  features: {
    analytics: true,
  },
   themeMode: 'light'
});

export function AppKit({ children }: { children: ReactNode }) {
  return children;
}
