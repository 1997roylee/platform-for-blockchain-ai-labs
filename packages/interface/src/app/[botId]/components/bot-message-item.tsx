import { cn } from "@/lib/utils";
import { Message } from "@/stores/chat";

export type BotMessageItemProps = {
  message: Message;
};

export default function BotMessageItem({ message }: BotMessageItemProps) {
  const isBot = message.role === "BOT";
  return (
    <div
      className={cn("flex flex-col gap-1", isBot ? "items-start" : "items-end")}
    >
      <p>{isBot ? "Bot" : "You"}</p>
      <div className={cn("inline-flex", isBot ? "text-left" : "text-right")}>
        <div className="rounded-xl bg-gray-100 p-3">{message.text}</div>
      </div>
    </div>
  );
}
