"use client";
import { Button } from "@/components/ui/button";
import { createWallet } from "./actions";
import SearchBar from "./components/search-bar";
import BotsList from "./components/bots-list";
import useBots from "@/hooks/use-bots";

export default function Home() {
  // const { mutateAsync } = useSafeServerAction(createWallet);
  const handleCreateWallet = async () => {
    await createWallet();
  };

  const {isLoading, data: botList} = useBots();

  console.log("botList", botList)
  return (
    <div>
      <div className="flex flex-col gap-3">
        <div>AI X Crypto</div>
        <SearchBar />
        <BotsList />
        <BotsList />
      </div>

      {/* <Button onClick={handleCreateWallet}>Create wallet</Button> */}
    </div>
  );
}
