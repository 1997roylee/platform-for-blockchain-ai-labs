"use client";

import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AccountBalance from "./account-wallet";

export default function Account() {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <Link href="/login">
        <Button size="lg">Login</Button>
      </Link>
    );
  }

  return <AccountBalance />;
}
