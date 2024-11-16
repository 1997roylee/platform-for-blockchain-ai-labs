"use client";
import useChat from "@/hooks/use-chat";
import BotMessageItem from "./bot-message-item";
import { useEffect } from "react";
import LoadingDots from "./bot-loading";

export default function BotChat() {
  const { messages, isLoading } = useChat();

  useEffect(() => {
    document
      .querySelector("#chat")
      ?.scrollTo(0, document.querySelector("#chat")?.scrollHeight ?? 0);
  }, [messages.length]);
  return (
    <div className="flex-grow flex-col flex gap-3 py-4">
      {messages.map((message) => {
        return <BotMessageItem key={message.id} message={message} />;
      })}

      {isLoading && (
        <div className="inline-flex">
          <div className="p-3 rounded-xl bg-gray-100">
            <LoadingDots />
          </div>
        </div>
      )}
      {/* {isLoading && <div className="text-center">Loading...</div>} */}
    </div>
  );
}
