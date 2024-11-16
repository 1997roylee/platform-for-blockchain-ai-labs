import { Bot } from "@/hooks/use-bot-metadata";
import { createStore } from "zustand";

export interface BotStore {
  bot: (Bot & { id: string }) | null;
  setBot: (bot: Bot & { id: string }) => void;
}

export function craeteBotStore() {
  return createStore<BotStore>((set) => ({
    bot: null,
    setBot: (bot) => {
      set({ bot });
    },
  }));
}
