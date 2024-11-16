// import { Address } from "viem";
import BotItem from "./bot-item";
import { RegistriesData } from "../../../graphqls/type";

export type BotsListProps = {
  data: RegistriesData;
};
export default function BotsList({ data }: BotsListProps) {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-3">
      {data.map((registry) => {
        return <BotItem registry={registry} key={registry.id} />;
      })}
    </div>
  );
}
