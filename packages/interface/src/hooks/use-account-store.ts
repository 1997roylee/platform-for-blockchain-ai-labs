import { AccountContext } from "@/components/account-provider";
import { useContext } from "react";
import { useStore } from "zustand";

export default function useAccountStore() {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error("useAccountStore must be used within a AccountProvider");
  }

  return useStore(context);
}
