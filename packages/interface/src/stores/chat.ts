import { createStore } from "zustand";

export type Message = {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
};
export interface ChatStore {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
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
  }));
}
