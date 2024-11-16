"use client";
import SearchBar from "./components/search-bar";
import BotsList from "./components/bots-list";
import useBots from "@/hooks/use-bots";

export default function Home() {
  const { isLoading, data: botList = [] } = useBots();

  console.log("botList", botList);
  return (
    <div className='container mx-auto'>
      <div className="flex flex-col gap-3">
        <div>AI X Crypto</div>
        <SearchBar />
        <BotsList data={botList ?? []} />
        {/* <BotsList /> */}
      </div>

      {/* <Button onClick={handleCreateWallet}>Create wallet</Button> */}
    </div>
  );
}
