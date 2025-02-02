'use client'

import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { scroll, scrollSepolia } from '@reown/appkit/networks'
import { ReactNode } from 'react'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

const metadata = {
  name: 'My Website',
  description: '',
  url: '',
  icons: ['']
}

createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [scroll, scrollSepolia],
  projectId,
  features: {
    analytics: true
  }
})

export function AppKit({ children }: { children: ReactNode }) {
    return children;
  }