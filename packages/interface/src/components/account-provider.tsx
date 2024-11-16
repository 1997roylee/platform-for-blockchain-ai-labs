"use client";

import { createContext, PropsWithChildren, useState } from "react";
import { AccountStore, craeteAccountStore } from "../stores/account";
import { StoreApi } from "zustand";

export const AccountContext = createContext<StoreApi<AccountStore> | null>(
  null,
);

export default function AccountProvider({ children }: PropsWithChildren) {
  const [store] = useState(() => craeteAccountStore());

  return (
    <AccountContext.Provider value={store}>{children}</AccountContext.Provider>
  );
}
