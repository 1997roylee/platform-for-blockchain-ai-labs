import Link from "next/link";
import Wallet from "./account";

export default function Headers() {
  return (
    <div className="flex p-3 justify-between items-center">
      <Link href="/">
        <div>AI x Crypto</div>
      </Link>
      {/* <Button>

      </Button> */}
      {/* <WalletWrapper /> */}
      <Wallet />
    </div>
  );
}
