import { createStore } from "zustand";

export type Message = {
  id: string;
  text: string;
  role: "USER" | "BOT";
  timestamp: number;
};
export interface ChatStore {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  credits: number;
  setCredits: (credits: number) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export function createChatStore() {
  return createStore<ChatStore>((set) => ({
    messages: [],
    setMessages: (messages) => {
      set({ messages });
    },
    addMessage: (message) => {
      set((state) => ({ messages: [...state.messages, message] }));
    },
    credits: 0,
    setCredits: (credits) => {
      set({ credits });
    },
    isLoading: false,
    setIsLoading: (isLoading) => {
      set({ isLoading });
    },
  }));
}
