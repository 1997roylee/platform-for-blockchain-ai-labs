"use client";

import { formatWalletAddress } from "@/lib/format";
import Avatar from "boring-avatars";
import { useBalance } from "wagmi";
import { getAddress } from "viem";

export default function AccountBalance({ address }: { address: string }) {
  const { isPending, data: balance } = useBalance({
    address: getAddress(address),
    query: {
      enabled: !!address,
      refetchInterval: 15 * 1000,
    },
  });

  return (
    <div className="flex gap-3 items-center cursor-pointer hover:bg-gray-50 rounded-full py-1 px-3">
      <div className="text-right">
        <div>{address ? formatWalletAddress(address) : null}</div>
        <div>{isPending ? 0 : Number(balance?.formatted).toFixed(6)} ETH</div>
      </div>
      <Avatar name={address} variant="beam" size={48} />
    </div>
  );
}
