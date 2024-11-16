"use client";

import { createContext, PropsWithChildren, useState } from "react";
import { StoreApi } from "zustand";
import { ChatStore, createChatStore } from "@/stores/chat";

export const ChatContext = createContext<StoreApi<ChatStore> | null>(null);

export default function ChatProvider({ children }: PropsWithChildren) {
  const [store] = useState(() => createChatStore());
  return <ChatContext.Provider value={store}>{children}</ChatContext.Provider>;
}
