"use client";
import useBotCredit from "@/hooks/use-bot-credit";
import useBotMetadata from "@/hooks/use-bot-metadata";
import useBotStore from "@/hooks/use-bot-store";
import useChatStore from "@/hooks/use-chat-store";
import useMyAccount from "@/hooks/use-my-account";
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
  const { setCredits } = useChatStore();
  const { data: account } = useMyAccount();
  const { data: credits } = useBotCredit(
    getAddress(botId),
    account ? getAddress(account?.[0]?.id) : undefined,
  );
  const { data } = useBotMetadata(getAddress(botId));

  useEffect(() => {
    if (data) {
      setBot({
        ...data,
        id: botId,
      });
    }
  }, [data]);

  console.log("credits", credits);
  useEffect(() => {
    if (credits) {
      console.log("credits", credits);
      setCredits(Number(credits));
    }
  }, [credits]);
  // console.log("credits", credits);
  return <>{children}</>;
}
