import { Button } from "./ui/button";
import WalletWrapper from "./wallet-wrapper";

export default function Headers() {
  return (
    <div className="flex p-3 justify-between items-center">
      <div>AI x Crypto</div>
      {/* <Button>

      </Button> */}
      <WalletWrapper />
    </div>
  );
}
