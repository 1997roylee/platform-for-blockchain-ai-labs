"use server";
import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";

export async function createWallet() {
  const apiKeyName = process.env.CDK_KEY_ID || "";
  const privateKey = process.env.CDK_PRIVATE_KEY?.replace(/\\n/g, "\n") || "";

  Coinbase.configure({
    apiKeyName: apiKeyName,
    privateKey: privateKey,
  });

  try {
    const wallet = await Wallet.create({
      networkId: Coinbase.networks.BaseMainnet,
    });
    console.log(`Wallet successfully created: `, wallet.toString());
  } catch (error) {
    console.error(error);
  }

  return false;
}
