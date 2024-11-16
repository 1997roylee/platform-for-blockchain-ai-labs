"use client";
import { Button } from "@/components/ui/button";
import { FACTORY_ADDRESS } from "@/constants/addresses";
import {
    useConfig,
  usePublicClient,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useState } from "react";
import { getConfig } from "@/lib/wagmi";

const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "apiInfo",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    name: "createRegistry",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
export default function Page() {
  const { writeContractAsync } = useWriteContract();

  const client = usePublicClient();
  const config = useConfig();
  //   const {mutateAsync} =useWriteContract({
  //     address: FACTORY_ADDRESS,
  //     abi,
  //     function: "createRegistry",
  //   });

  const handleCreate = async () => {
    const tx = await writeContractAsync({
      address: FACTORY_ADDRESS,
      abi,
      functionName: "createRegistry",
      args: ["name", "apiInfo", 1, BigInt(100)],
    });
    await waitForTransactionReceipt(config, {
      hash: tx,
    });
  };

  return (
    <div>
      <Button onClick={handleCreate}>Create</Button>
    </div>
  );
}
