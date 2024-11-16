import { BotContext } from "@/components/bot-provider";
import { useContext } from "react";
import { useStore } from "zustand";

export default function useBotStore() {
  const context = useContext(BotContext);

  if (!context) {
    throw new Error("useBotStore must be used within a BotProvider");
  }

  return useStore(context);
}
