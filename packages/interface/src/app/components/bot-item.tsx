"use client";
import { Address } from "viem";
import { useMemo } from "react";
import Link from "next/link";
import BotAvatar from "@/components/bot-avatar";
import useBotMetadata from "@/hooks/use-bot-metadata";

export default function BotItem({address}: {address: Address}) {
    const {isPending, data: bot} = useBotMetadata(address)

    return (
     <Link href={`/${address}`}>
      <div className="rounded-xl border flex p-3 hover:bg-gray-50 cursor-pointer">
        <div className="w-24">
            <BotAvatar src={bot?.icon} alt={bot?.name} />
        </div>
        <div>
          <p>{bot?.name}</p>
          <p>Description</p>
        </div>
      </div>
      </Link>
    );
  }