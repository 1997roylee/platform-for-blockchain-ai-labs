"use client";
import { useState } from "react";
import useChatStore from "./use-chat-store";
import useBotStore from "./use-bot-store";
import toast from "react-hot-toast";
import { spendCredit } from "@/app/[botId]/action";

export default function useChat() {
  const { bot } = useBotStore();
  const { credits, messages, addMessage } = useChatStore();
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    console.log("sendMessage", message);
    if (!bot) throw new Error("Bot not found");

    if (credits <= 0 || !credits) {
      addMessage({
        text: "You don't have enough credits to send a message.",
        role: "BOT",
        timestamp: Date.now(),
        id: Math.random().toString(),
      });
      toast.error("You don't have enough credits to send a message.");
      return;
    }

    setIsLoading(true);
    addMessage({
      text: message,
      role: "USER",
      timestamp: Date.now(),
      id: Math.random().toString(),
    });
    const response = await fetch(bot.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    await spendCredit(bot.id);

    const text = await response.text();
    const parsedMessages = text
      .trim()
      .split("\n")
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch (error) {
          console.error("Failed to parse line as JSON:", line, error);
          return null;
        }
      })
      .filter(Boolean);

    console.log("parsedMessages", parsedMessages);
    addMessage({
      text: parsedMessages[0].data,
      role: "BOT",
      timestamp: Date.now(),
      id: Math.random().toString(),
    });
    setIsLoading(false);
  };

  return {
    isLoading,
    messages,
    sendMessage,
  };
}
