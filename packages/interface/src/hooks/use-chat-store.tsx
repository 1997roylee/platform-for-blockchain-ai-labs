import { ChatContext } from "@/components/chat-provider";
import { useContext } from "react";
import { useStore } from "zustand";

export default function useChatStore() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChatStore must be used within a ChatProvider");
  }

  return useStore(context);
}
