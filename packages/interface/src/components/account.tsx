"use client";

import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AccountBalance from "./account-wallet";
import AccountSheet from "./account-sheet";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Skeleton } from "./ui/skeleton";

export default function Account() {
  const { data: session } = useSession();

  const { data } = useQuery({
    queryKey: ["Account"],
    queryFn: async () => {
      return (await fetch("/api/wallets").then((res) => res.json())) as {
        id: string;
      }[];
    },
    enabled: !!session?.user,
  });

  const primaryAddress = useMemo(() => {
    if (!data) return undefined;

    return data[0].id;
  }, [data]);

  if (!session?.user) {
    return (
      <Link href="/login">
        <Button size="lg">Login</Button>
      </Link>
    );
  }

  if (!primaryAddress)
    return (
      <div>
        <Skeleton className="w-24 h-12" />
      </div>
    );

  return (
    <AccountSheet address={primaryAddress}>
      <AccountBalance address={primaryAddress} />
    </AccountSheet>
  );
}
