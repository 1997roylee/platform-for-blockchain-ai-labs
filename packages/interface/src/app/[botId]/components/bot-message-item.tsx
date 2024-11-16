import { Message } from "@/stores/chat";

export type BotMessageItemProps = {
  message: Message;
};

export default function BotMessageItem({ message }: BotMessageItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex">
        <p>Text</p>
      </div>
      <div className="rounded-xl bg-gray-100 p-3 inline-flex text-left">
        {message.text}
      </div>
    </div>
  );
}
