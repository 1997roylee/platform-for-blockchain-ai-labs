"use client";
import useAccountStore from "@/hooks/use-account-store";
import useBotCredit from "@/hooks/use-bot-credit";
import useBotMetadata from "@/hooks/use-bot-metadata";
import useBotStore from "@/hooks/use-bot-store";
import useChatStore from "@/hooks/use-chat-store";
// import useMyAccount from "@/hooks/use-my-account";
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
  const { wallet } = useAccountStore();
  const { setCredits } = useChatStore();
  // const { data: account } = useMyAccount();
  const { data: credits } = useBotCredit(
    getAddress(botId),
    wallet.id ? getAddress(wallet.address) : undefined,
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
