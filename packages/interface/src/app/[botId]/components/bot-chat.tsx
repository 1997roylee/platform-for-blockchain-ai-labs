"use client";
import useChat from "@/hooks/use-chat";
import BotMessageItem from "./bot-message-item";

export default function BotChat() {
  const { messages } = useChat();
  return (
    <div className="flex-grow overflow-y-scroll flex-col flex gap-3 py-4">
      {messages.map((message, index) => {
        return <BotMessageItem message={message} key={message.id} />;
      })}
    </div>
  );
}
