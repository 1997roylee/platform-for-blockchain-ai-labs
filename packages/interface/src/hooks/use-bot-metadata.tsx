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
        name: "fee",
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
      icon: data?.[1],
      apiEndpoint: data?.[2],
      fee: data?.[3],
      creator: data?.[4],
    };
  }, [data]);
  return {
    data: formattedData,
    ...rest,
  };
}
