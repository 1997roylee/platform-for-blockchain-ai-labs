// import prisma from "@/lib/prisma";
// import { getWallet } from "@/lib/server/wallet";
import { NextResponse } from "next/server";
import "@/lib/server/coinbase";
import prisma from "@/lib/prisma";
import { decryptSeed } from "@/lib/crypto";
import { Wallet } from "@coinbase/coinbase-sdk";
export async function POST(
  _: Request,
  { params: { walletId } }: { params: { walletId: string } },
) {
  // const wallet = await getWallet(walletId);
  const walletRecord = await prisma.wallet.findFirstOrThrow({
    where: {
      walletId,
    },
  });

  const seed = decryptSeed(walletRecord.encryptedSeed);
  const wallet = await Wallet.fetch(walletRecord.walletId);
  wallet.setSeed(seed as string);

  if (!wallet) {
    return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
  }

  console.log("seed", seed);
  const walletData = wallet.export();
  return NextResponse.json(walletData);
}
