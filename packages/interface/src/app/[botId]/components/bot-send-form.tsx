"use client";
import SearchBar from "@/app/components/search-bar";
import useChat from "@/hooks/use-chat";
import SubscribeBot from "./subscribe-bot";
import useChatStore from "@/hooks/use-chat-store";

export default function BotSendForm({ botId }: { botId: string }) {
  const { sendMessage } = useChat();
  const { credits } = useChatStore();

  const isSubscribed = credits >= 0;

  return (
    <>
      {!isSubscribed && <SubscribeBot botId={botId} />}
      <SearchBar onSubmit={sendMessage} disabled={isSubscribed} />
      <p>Your credit remains: {credits}</p>
    </>
  );
}
