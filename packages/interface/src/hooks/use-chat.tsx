"use client";
import { useState } from "react";
import useChatStore from "./use-chat-store";
import useBotStore from "./use-bot-store";
import toast from "react-hot-toast";

export default function useChat() {
  const { bot } = useBotStore();
  const { credits, messages, addMessage } = useChatStore();
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
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
    // onSuccess(parsedMessages);
    // return { messages: parsedMessages, error: null };

    // .then(async (response) => {
    //     // Get the readable stream from the response body
    //     const stream = response.body;

    //     if (!stream) return;
    //     // Get the reader from the stream
    //     const reader = stream.getReader();
    //     let message: string = "";

    //     const decoder = new TextDecoder();

    //     // Process stream chunks
    //     const processChunk = (value: Uint8Array) => {
    //       // Convert buffer to text
    //       const chunk = decoder.decode(value, { stream: true });
    //       message += chunk;

    //       // Split on newlines to handle complete messages
    //       const lines = message.split("\n");

    //       // Process all complete lines except last (may be partial)
    //       for (let i = 0; i < lines.length - 1; i++) {
    //         const line = lines[i].trim();
    //         if (line) {
    //           try {
    //             const data = JSON.parse(line);
    //             console.log("Processed message:", data);
    //           } catch (e) {
    //             console.log("Raw text:", line);
    //           }
    //         }
    //       }

    //       // Keep last potentially partial line
    //       message = lines[lines.length - 1];
    //       console.log("message", message);
    //     };

    //     while (true) {
    //       const { done, value } = await reader.read();

    //       if (value) {
    //         processChunk(value);
    //       }

    //       if (done) {
    //         setIsLoading(false);
    //         console.log("message", message);
    //         // addMessage({
    //         //   text: message,
    //         //   role: "BOT",
    //         //   timestamp: Date.now(),
    //         //   id: Math.random().toString(),
    //         // });
    //         // Do something with last chunk of data then exit reader
    //         return;
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     // Log the error
    //     console.error(error);
    //     setIsLoading(false);
    //   });
  };

  return {
    isLoading,
    messages,
    sendMessage,
  };
}
