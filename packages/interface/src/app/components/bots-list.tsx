import { Address } from "viem";
import BotItem from "./bot-item";

export type BotsListProps = {
  data: Address[];
};
export default function BotsList({ data }: BotsListProps) {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-3 gap-3">
      {data.map((address) => {
        return <BotItem address={address} key={address} />;
      })}
    </div>
  );
}
