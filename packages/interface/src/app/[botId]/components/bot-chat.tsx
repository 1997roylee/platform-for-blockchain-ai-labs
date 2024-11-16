"use client";
import useChat from "@/hooks/use-chat";
import BotMessageItem from "./bot-message-item";

export default function BotChat() {
  const { messages, isLoading } = useChat();
  return (
    <div className="flex-grow flex-col flex gap-3 py-4">
      {messages.map((message, index) => {
        return <BotMessageItem key={message.id} message={message} />;
      })}
      {isLoading && <div className="text-center">Loading...</div>}
    </div>
  );
}