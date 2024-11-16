"use server";
import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";

const apiKeyName = process.env.CDK_KEY_ID || "";
const privateKey = process.env.CDK_PRIVATE_KEY?.replace(/\\n/g, "\n") || "";

Coinbase.configure({
  apiKeyName: apiKeyName,
  privateKey: privateKey,
});

export async function createWallet() {
  try {
    const wallet = await Wallet.create({
        networkId: Coinbase.networks.BaseMainnet
    });
    console.log(`Wallet successfully created: `, wallet.toString());
    return wallet;
  } catch (error) {
    console.error(error);
  }

  return null;
}
