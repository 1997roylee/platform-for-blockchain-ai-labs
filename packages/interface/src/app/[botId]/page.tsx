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
  return (
    <ChatProvider>
      <BotProvider>
        <BotWrapper botId={botId}>
          <div
            className="flex flex-col"
            style={{
              height: "calc(100vh - 72px)",
            }}
          >
            <div className="flex-1 overflow-y-scroll overflow-x-hidden pt-4">
              <div className="mx-auto container ">
                <BotHeader botId={botId} />
                <BotChat />
              </div>
            </div>
            <div className="py-3 mx-auto container">
              <BotSendForm botId={botId} />
            </div>
          </div>
        </BotWrapper>
      </BotProvider>
    </ChatProvider>
  );
}
