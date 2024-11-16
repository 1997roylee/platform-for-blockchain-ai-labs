"use client";
import { useReadContract } from "wagmi";
import { Address } from "viem";
const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getCreditsBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export default function useBotCredit(botId: Address, walletAddress?: Address) {
  return useReadContract({
    abi,
    address: botId,
    functionName: "getCreditsBalance",
    args: walletAddress ? [walletAddress] : undefined,
    query: {
      enabled: !!walletAddress,
      refetchInterval: 15 * 1000,
    },
  });
}
