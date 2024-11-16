import BotAvatar from "@/components/bot-avatar";

export default function BotHeader() {
  return (
    <div className="rounded-2xl bg-gray-50 p-3">
      <div className="flex gap-3">
        <div className="w-24">
          <BotAvatar />
        </div>
        <div>
          <p>Assistant</p>
          <p>by 1234</p>
        </div>
      </div>
      <div>204k followers</div>
      <div className="flex"></div>
      <div>
        General-purpose assistant bot. For queries requiring up-to-date
        information, it can access real-time data from the web for more accurate
        answers.
      </div>
    </div>
  );
}
