"use client";
import SearchBar from "@/app/components/search-bar";
import useChat from "@/hooks/use-chat";

export default function BotSendForm() {
  const { sendMessage } = useChat();
  return <SearchBar onSubmit={sendMessage} />;
}
