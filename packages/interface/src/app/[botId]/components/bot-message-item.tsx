import { cn } from "@/lib/utils";
import { Message } from "@/stores/chat";
import { useMemo } from "react";

export type BotMessageItemProps = {
  message: Message;
};

export default function BotMessageItem({ message }: BotMessageItemProps) {
  const isBot = message.role === "BOT";
  const formattedMessage = useMemo(() => {
    if (
      message.text.startsWith("'''html") &&
      message.text.endsWith("'''html")
    ) {
      return (
        <div
          className="flex gap-3"
          dangerouslySetInnerHTML={{
            __html: message.text.slice(7, message.text.length - 7),
          }}
        />
      );
    }

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = message.text.split(urlRegex);

    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            {part}
          </a>
        );
      }
      return <div key={i}>{part}</div>;
    });
  }, [message.text]);

  return (
    <div
      className={cn("flex flex-col gap-1", isBot ? "items-start" : "items-end")}
    >
      <p>{isBot ? "Bot" : "You"}</p>
      <div className={cn("inline-flex", isBot ? "text-left" : "text-right")}>
        <div className="whitespace-pre-wrap rounded-xl bg-gray-100 p-3 break-all text-wrap max-w-xl md:ax-w-lg">
          {formattedMessage}
        </div>
      </div>
    </div>
  );
}
