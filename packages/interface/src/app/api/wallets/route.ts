import "@/lib/server/coinbase";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decryptSeed } from "@/lib/crypto";
import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";

export async function GET() {
  const session = await auth();

  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const walletRecord = await prisma.wallet.findFirstOrThrow({
    where: {
      userId: session.user.id,
    },
  });

  console.log("wallet", walletRecord);
  const seed = decryptSeed(walletRecord.encryptedSeed);
  const wallet = await Wallet.fetch(walletRecord.walletId);
  wallet.setSeed(seed as string);
  // Get the address object
  const addresses = await wallet.listAddresses();

  //  const balance = await wallet.getBalance(Coinbase.assets.Eth)
  // let balances = await wallet.listBalances();

  // console.log("balance", balances)

  return NextResponse.json(addresses);
}
