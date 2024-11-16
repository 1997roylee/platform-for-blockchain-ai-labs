import { Bot } from "@/hooks/use-bot-metadata";
import { createStore } from "zustand";

export interface BotStore {
  bot: Bot | null;
  setBot: (bot: Bot) => void;
}

export function craeteBotStore() {
  return createStore<BotStore>((set) => ({
    bot: null,
    setBot: (bot: Bot) => {
      set({ bot });
    },
  }));
}
