"use client";
import { useReadContract } from "wagmi";
import { Address } from "viem";
import { useMemo } from "react";

const abi = [
  {
    inputs: [],
    name: "metadata",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "icon",
        type: "string",
      },
      {
        internalType: "string",
        name: "apiEndpoint",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "credits",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export type Bot = {
  name: string;
  description: string;
  icon: string;
  apiEndpoint: string;
  creator: Address;
  credits: BigInt;
};

export default function useBotMetadata(address: Address) {
  const { data, ...rest } = useReadContract({
    abi,
    address,
    functionName: "metadata",
  });

  const formattedData = useMemo(() => {
    if (!data) return null;

    return {
      name: data?.[0],
      description: data?.[1],
      icon: data?.[2],
      apiEndpoint: data?.[3],
      credits: data?.[4],
      creator: data?.[5],
    } as Bot;
  }, [data]);
  return {
    data: formattedData,
    ...rest,
  };
}
