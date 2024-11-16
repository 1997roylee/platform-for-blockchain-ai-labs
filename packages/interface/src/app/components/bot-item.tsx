"use client";
import { Address } from "viem";
// import { useMemo } from "react";
import Link from "next/link";
import BotAvatar from "@/components/bot-avatar";
import useBotMetadata from "@/hooks/use-bot-metadata";

export default function BotItem({ address }: { address: Address }) {
  const {  data: bot } = useBotMetadata(address);

  console.log("bot", bot);
  return (
    <Link href={`/${address}`}>
      <div className="rounded-xl border p-3 hover:bg-gray-50 cursor-pointer gap-3 flex">
        <div className="w-20 min-w-20">
          <BotAvatar src={bot?.icon} alt={bot?.name} />
        </div>
        <div className='flex-1 overflow-hidden'>
          <p>{bot?.name}</p>
          <p className="w-full text-sm truncate max-w-full" style={{
            WebkitLineClamp: 3
          }}>{bot?.description}</p>
        </div>
      </div>
    </Link>
  );
}
