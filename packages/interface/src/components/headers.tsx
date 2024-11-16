import Link from "next/link";
import Wallet from "./account";

export default function Headers() {
  return (
    <div className="flex p-3 justify-between items-center bg-gray-50 border-b">
      <Link href="/">
        <div>P4B - AI Labs</div>
      </Link>
      <Wallet />
    </div>
  );
}
