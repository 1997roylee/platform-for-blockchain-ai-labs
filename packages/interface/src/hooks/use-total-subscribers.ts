"use client";
// import { Address } from "@coinbase/coinbase-sdk";
import { useReadContract } from "wagmi";
import { Address } from "viem";

const abi = [
  {
    inputs: [],
    name: "getTotalSubscribers",
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

export default function useTotalSubscribers(botId: Address) {
  return useReadContract({
    abi,
    address: botId,
    functionName: "getTotalSubscribers",
    // query: {
    //     enabled: true,
    // },
  });
}
