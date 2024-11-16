import { Wallet } from "@coinbase/coinbase-sdk";
import { decryptSeed } from "../crypto";
import prisma from "../prisma";
import "./coinbase";

export async function getWallet(userId: string) {
  const walletRecord = await prisma.wallet.findFirstOrThrow({
    where: {
      userId: userId,
    },
  });

  const seed = decryptSeed(walletRecord.encryptedSeed);
  const wallet = await Wallet.fetch(walletRecord.walletId);
  wallet.setSeed(seed as string);

  return wallet;
}
