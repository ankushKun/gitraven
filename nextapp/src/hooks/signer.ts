// Convert wagmi/viem `WalletClient` to ethers `Signer`
import { useMemo } from "react";
import { useWalletClient } from "wagmi";
import { providers } from "ethers";

function walletClientToSigner(walletClient: any) {
    const { account, chain, transport } = walletClient;
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    };
    const provider = new providers.Web3Provider(transport, network);
    const signer = provider.getSigner(account.address);
    return signer;
}

export function useSigner({ chainId }: any = {}) {
    const { data: walletClient } = useWalletClient({ chainId });
    return useMemo(
        () => (walletClient ? walletClientToSigner(walletClient) : undefined),
        [walletClient]
    );
}