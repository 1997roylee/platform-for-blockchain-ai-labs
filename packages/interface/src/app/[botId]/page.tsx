import BotChat from "./components/bot-chat";
import BotHeader from "./components/bot-header";
import BotSendForm from "./components/bot-send-form";
import BotWrapper from "./components/bot-wrapper";

export default function Page({
  params: { botId },
}: {
  params: { botId: string };
}) {
  console.log("botId", botId);
  return (
    <BotWrapper botId={botId}>
      <div className="flex flex-col flex-1">
        <BotHeader />
        <BotChat/>
        {/* <div className="flex-1 flex-grow"></div> */}
        <div className="pb-10">
          <BotSendForm />
        </div>
      </div>
    </BotWrapper>
  );
}
