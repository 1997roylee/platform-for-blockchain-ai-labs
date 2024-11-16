"use client";
import useBotMetadata from "@/hooks/use-bot-metadata";
import { PropsWithChildren } from "react";
import { getAddress } from "viem";

export interface BotWrapperProps {
  botId: string;
}

export default function BotWrapper({
  botId,
  children,
}: BotWrapperProps & PropsWithChildren) {
  const { data } = useBotMetadata(getAddress(botId));

  console.log("data", data);
  return <>{children}</>;
}
