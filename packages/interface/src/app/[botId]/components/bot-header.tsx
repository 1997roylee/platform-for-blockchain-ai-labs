"use client";
import BotAvatar from "@/components/bot-avatar";
import useBotStore from "@/hooks/use-bot-store";

export default function BotHeader() {
  const { bot } = useBotStore();
  const totalSubscribers = 204000;
  return (
    <div className="rounded-2xl bg-gray-50 flex flex-col gap-1 p-3">
      <div className="flex gap-3 mb-3">
        <div className="w-24">
          <BotAvatar src={bot?.icon} alt={bot?.name} />
        </div>
        <div>
          <p>{bot?.name}</p>
          <p>by 1234</p>
        </div>
      </div>
      <div className="text-sm">{totalSubscribers} followers</div>
      <div className="text-sm">{bot?.description}</div>
    </div>
  );
}
