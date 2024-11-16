"use client";
import useBotMetadata from "@/hooks/use-bot-metadata";
import useBotStore from "@/hooks/use-bot-store";
import { PropsWithChildren, useEffect } from "react";
import { getAddress } from "viem";

export interface BotWrapperProps {
  botId: string;
}

export default function BotWrapper({
  botId,
  children,
}: BotWrapperProps & PropsWithChildren) {
  const { setBot } = useBotStore();
  const { data } = useBotMetadata(getAddress(botId));

  useEffect(() => {
    if (data) {
      setBot(data);
    }
  }, [data]);
  return <>{children}</>;
}
