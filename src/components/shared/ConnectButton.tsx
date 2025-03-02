"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ConnectButton() {
  const { open,  } = useAppKit();
  const { isConnected,  } = useAppKitAccount();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && isConnected ? (
        <appkit-button />
      ) : (
        <Button className="bg-color5 rounded-lg transition-all font-medium font-inter duration-200 hover:bg-color2 text-white"
        onClick={() => {
            open()
          }}
        >
        Connect Wallet
      </Button>
      )}
    </>
  );
}
