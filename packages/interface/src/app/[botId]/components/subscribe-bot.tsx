"use client";

import { Button } from "@/components/ui/button";
// import useChatStore from "@/hooks/use-chat-store";
import useSafeServerAction from "use-safe-server-action";
import { subscribeBot } from "../actions";
import toast from "react-hot-toast";

export default function SubscribeBot({ botId }: { botId: string }) {
  const {
    mutateAsync,
    state: { isLoading },
  } = useSafeServerAction(subscribeBot);

  const handleSubscribe = async () => {
    const resposne = await mutateAsync(botId);
    if (resposne.ok) {
      toast.success("Subscribed successfully");
    } else {
      toast.error(resposne?.data?.message ?? "");
    }
    console.log("response", resposne);
  };

  return (
    <div className="flex justify-center my-3">
      <Button size="lg" onClick={handleSubscribe} disabled={isLoading}>
        {isLoading ? "Subscribing..." : "Subscribe (0.001 ETH)"}
      </Button>
    </div>
  );
}
