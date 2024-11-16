"use client";
import SearchBar from "./components/search-bar";
import BotsList from "./components/bots-list";
import useBots from "@/hooks/use-bots";

export default function Home() {
  const { isLoading, data: botList = [] } = useBots();

  console.log("botList", botList);
  return (
    <div className="">
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
          <BotsList data={botList ?? []} />
        </div>
      </div>

      {/* <Button onClick={handleCreateWallet}>Create wallet</Button> */}
    </div>
  );
}
