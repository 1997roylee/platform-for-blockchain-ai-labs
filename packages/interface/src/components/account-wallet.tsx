"use client";

import { decryptSeed } from "@/lib/crypto";
import { formatWalletAddress } from "@/lib/format";
import { Address, Wallet } from "@coinbase/coinbase-sdk";
import { useQuery } from "@tanstack/react-query";
import Avatar from "boring-avatars";
import { useMemo } from "react";

export default function AccountBalance() {
  const { isPending, data } = useQuery({
    queryKey: ["Account"],
    queryFn: async () => {
      return (await fetch("/api/wallets").then((res) => res.json())) as {
        id: string;
      }[];
    },
  });

  console.log(data, "data");
  const primaryAddress = useMemo(() => {
    if (!data) return null;

    return data[0].id;
  }, [data]);

  return (
    <div className="flex gap-3 items-center cursor-pointer hover:bg-gray-50 rounded-full py-1 px-3">
      <div className="">
        {primaryAddress ? formatWalletAddress(primaryAddress) : null}
      </div>
      <Avatar name="Alice Paul" variant="beam" size={48} />
    </div>
  );
}
