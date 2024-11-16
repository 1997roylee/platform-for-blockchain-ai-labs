"use client";

import { createContext, PropsWithChildren, useState } from "react";
import { BotStore, craeteBotStore } from "../stores/bot";
import { StoreApi } from "zustand";

export const BotContext = createContext<StoreApi<BotStore> | null>(null);

export default function BotProvider({ children }: PropsWithChildren) {
  const [store] = useState(() => craeteBotStore());
  return <BotContext.Provider value={store}>{children}</BotContext.Provider>;
}
