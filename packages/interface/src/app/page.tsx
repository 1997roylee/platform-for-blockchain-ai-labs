"use client";
import SearchBar from "./components/search-bar";
import BotsList from "./components/bots-list";
import useBots from "@/hooks/use-bots";
import SkeletonBotList from "./components/skeleton-bot-list";
import { Address } from "viem";

export default function Home() {
  const { isLoading, data: botList = [] } = useBots();

  // console.log("botList", botList);
  return (
    <div className="px-3">
      <div className="flex flex-col gap-12">
        <div className="flex-col container gap-6 mx-auto max-w-4xl">
          <div className="mt-10 ">
            <div className="font-medium text-2xl text-center py-6">
              AI X Crypto
            </div>
          </div>
          <SearchBar />
        </div>

        <div className="container mx-auto">
          <div>Official bots</div>
          {isLoading ? (
            <SkeletonBotList />
          ) : (
            <BotsList data={(botList as Address[]) ?? []} />
          )}
        </div>
      </div>

      {/* <Button onClick={handleCreateWallet}>Create wallet</Button> */}
    </div>
  );
}
