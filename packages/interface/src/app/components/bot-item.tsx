"use client";
// import { Address } from "viem";
// import { useMemo } from "react";
import Link from "next/link";
import BotAvatar from "@/components/bot-avatar";
// import useBotMetadata from "@/hooks/use-bot-metadata";
import { RegistriesData } from "../../../graphqls/type";

export default function BotItem({ registry }: { registry: RegistriesData[0] }) {
  // const {  data: bot } = useBotMetadata(address);

  // console.log("bot", registry);
  return (
    <Link href={`/${registry.id}`}>
      <div className="rounded-xl border p-3 hover:bg-gray-50 cursor-pointer gap-3 flex">
        <div className="w-20 min-w-20">
          <BotAvatar src={registry.icon} alt={registry.name} />
        </div>
        <div className="flex-1 overflow-hidden">
          <p>{registry.name}</p>
          <p
            className="w-full text-sm truncate max-w-full"
            style={{
              WebkitLineClamp: 3,
            }}
          >
            {registry.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
