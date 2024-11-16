import "@/lib/server/coinbase";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decryptSeed } from "@/lib/crypto";
import { Wallet } from "@coinbase/coinbase-sdk";

export async function GET() {
  const session = await auth();

  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const walletRecord = await prisma.wallet.findFirstOrThrow({
    where: {
      userId: session.user.id,
    },
  });

  const seed = decryptSeed(walletRecord.encryptedSeed);
  const wallet = await Wallet.fetch(walletRecord.walletId);
  wallet.setSeed(seed as string);
  console.log("wallet", wallet.getId());
  const addresses = await wallet.listAddresses();

  return NextResponse.json({
    id: wallet.getId(),
    primaryAddress: addresses[0].getId(),
  });
}
