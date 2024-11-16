"use client";
import BotAvatar from "@/components/bot-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import useBotStore from "@/hooks/use-bot-store";
import useTotalSubscribers from "@/hooks/use-total-subscribers";
import { formatWalletAddress } from "@/lib/format";
import { getAddress } from "viem";

export type BotHeaderProps = {
  botId: string;
};
export default function BotHeader({ botId }: BotHeaderProps) {
  const { bot } = useBotStore();
  const { isPending, data: totalSubscribers = BigInt(0) } = useTotalSubscribers(
    getAddress(botId),
  );

  console.log("totalSubscribers", totalSubscribers);
  // const totalSubscribers = 204000;
  return (
    <div className="rounded-2xl flex flex-col gap-1 p-3 bg-gray-50">
      <div className="flex gap-3 mb-3">
        <div className="w-24">
          {bot ? (
            <BotAvatar src={bot.icon} alt={bot.name} />
          ) : (
            <Skeleton className="w-24 h-24" />
          )}
        </div>
        <div className="flex flex-col gap-1">
          {bot ? <p>{bot.name}</p> : <Skeleton className="w-20 h-6" />}
          {bot ? (
            <p className="text-sm">by @{formatWalletAddress(bot.creator)}</p>
          ) : (
            <Skeleton className="w-24 h-6" />
          )}
        </div>
      </div>
      <div className="text-sm text-gray-700">
        {Number(totalSubscribers)} followers
      </div>
      <div className="text-sm">{bot?.description}</div>
      <div className="text-sm">1 credit per message</div>
    </div>
  );
}
