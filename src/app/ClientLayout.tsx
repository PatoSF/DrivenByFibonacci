'use client';

import { ReactNode, useState } from 'react';
import Preloader from '@/components/shared/Preloader';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Preloader onLoadComplete={() => setLoading(false)} />
      <div 
        className={`
          min-h-screen w-full
          transition-opacity duration-500 
          ${loading ? 'opacity-0' : 'opacity-100'}
        `}
      >
        {children}
      </div>
    </>
  );
}