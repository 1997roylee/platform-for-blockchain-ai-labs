import { createStore } from "zustand";

export interface AccountStore {
  wallet: {
    id: string;
    address: string;
  };
  setWallet: (wallet: { id: string; address: string }) => void;
}

export function craeteAccountStore() {
  return createStore<AccountStore>((set) => ({
    wallet: {
      id: "",
      address: "",
    },
    setWallet: (wallet) => {
      set({ wallet });
    },
  }));
}
