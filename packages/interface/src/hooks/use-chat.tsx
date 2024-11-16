"use client";
import useChatStore from "./use-chat-store";

export default function useChat() {
  const { messages, addMessage } = useChatStore();
  return {
    messages,
    sendMessage: (message: string) => {
      console.log("sending message", message);
      addMessage({
        text: message,
        sender: "user",
        timestamp: Date.now(),
        id: Math.random().toString(),
      });
    },
  };
}
