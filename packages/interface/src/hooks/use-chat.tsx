import { useState } from "react";

export default function useChat() {
  const [messages, setMessages] = useState<
    {
      message: string;
      from: "user" | "bot";
    }[]
  >([]);
  return {
    messages,
    sendMessage: (message: string) => {
      console.log("sending message", message);
      setMessages((prev) => [...prev, { message, from: "user" }]);
    },
  };
}
