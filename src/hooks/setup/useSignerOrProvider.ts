import { readOnlyProvider } from "./../../constant/readOnlyProvider";
import { useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider, Signer, Provider, Eip1193Provider } from "ethers";
import { useEffect, useMemo, useState } from "react";

/**
 * Custom hook to manage an Ethereum signer or provider.
 *
 * This hook returns an object containing a signer, a provider,
 * and a read-only provider. It utilizes the `useAppKitProvider`
 * to obtain a wallet provider and creates an `ethers` BrowserProvider
 * using this wallet provider. Additionally, it handles the updating
 * of the signer when the provider changes or when there is an address change.
 *
 * Returns:
 * - `signer`: The current Ethereum signer, or null if not available.
 * - `provider`: The `ethers` BrowserProvider derived from the wallet provider, or null if not available.
 * - `readOnlyProvider`: A read-only JsonRpcProvider for interacting with the Ethereum network.
 */

const useSignerOrProvider = () => {
  const [signer, setSigner] = useState<Signer | null>(null);
  const { walletProvider } = useAppKitProvider("eip155");

  const provider = useMemo(() => {
    if (!walletProvider) return null;
    return new BrowserProvider(walletProvider as unknown as Eip1193Provider);
  }, [walletProvider]);

  useEffect(() => {
    if (!provider) {
      setSigner(null);
      return;
    }

    const updateSigner = async () => {
      try {
        const newSigner = await provider.getSigner();
        const newAddress = await newSigner.getAddress();

        if (!signer) {
          setSigner(newSigner);
          return;
        }

        const currentAddress = await signer.getAddress();
        if (newAddress !== currentAddress) {
          setSigner(newSigner);
        }
      } catch (error) {
        console.error("Error updating signer:", error);
        setSigner(null);
      }
    };

    updateSigner();
  }, [provider, signer]);

  return {
    signer,
    provider,
    readOnlyProvider: readOnlyProvider as Provider,
  };
};

export default useSignerOrProvider;
