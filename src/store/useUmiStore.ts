import {
  Signer,
  Umi,
  createNoopSigner,
  createNullSigner,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createSignerFromWalletAdapter } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { WalletAdapter } from "@solana/wallet-adapter-base";
import { create } from "zustand";

interface UmiState {
  umi: Umi;
  signer: Signer | undefined;
  updateSigner: (signer: WalletAdapter) => void;
}

const useUmiStore = create<UmiState>()((set) => ({
  umi: createUmi("http://127.0.0.1:8899").use(
    signerIdentity(
      createNoopSigner(publicKey("11111111111111111111111111111111"))
    )
  ),
  signer: undefined,
  updateSigner: (signer) => {
    console.log("updateSigner");
    set(() => ({ signer: createSignerFromWalletAdapter(signer) }));
  },
}));

export default useUmiStore;
