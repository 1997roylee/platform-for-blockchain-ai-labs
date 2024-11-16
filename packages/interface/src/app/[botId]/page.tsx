import ChatProvider from "@/components/chat-provider";
import BotChat from "./components/bot-chat";
import BotHeader from "./components/bot-header";
import BotSendForm from "./components/bot-send-form";
import BotWrapper from "./components/bot-wrapper";
import BotProvider from "@/components/bot-provider";

export default function Page({
  params: { botId },
}: {
  params: { botId: string };
}) {
  console.log("botId", botId);
  return (
    <ChatProvider>
      <BotProvider>
        <BotWrapper botId={botId}>
          <div className="flex flex-col flex-1">
            <BotHeader />
            <BotChat />
            <div className="pb-10">
              <BotSendForm />
            </div>
          </div>
        </BotWrapper>
      </BotProvider>
    </ChatProvider>
  );
}
