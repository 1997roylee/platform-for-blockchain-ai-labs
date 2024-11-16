"use client";

import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AccountBalance from "./account-wallet";
import AccountSheet from "./account-sheet";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import useAccountStore from "@/hooks/use-account-store";

export default function Account() {
  const { data: session } = useSession();
  const { setWallet, wallet } = useAccountStore();

  const { data, isPending } = useQuery({
    queryKey: ["Account"],
    queryFn: async () => {
      return (await fetch("/api/wallets").then((res) => res.json())) as {
        id: string;
        primaryAddress: string;
      };
    },
    enabled: !!session?.user,
  });

  console.log("wallet", data);

  useEffect(() => {
    if (data) {
      setWallet({
        id: data.id,
        address: data.primaryAddress,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (session?.user && wallet?.id) {
    return (
      <AccountSheet address={wallet.address}>
        <AccountBalance address={wallet.address} />
      </AccountSheet>
    );
  }


  // console.log("data", data)
  if (isPending)
    return (
      <div>
        <Skeleton className="w-24 h-12" />
      </div>
    );

  return (
    <Link href="/login">
      <Button size="lg">Login</Button>
    </Link>
  );
}
