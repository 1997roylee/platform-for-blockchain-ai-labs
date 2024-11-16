import { FACTORY_ADDRESS } from "@/constants/addresses";
import { DEFAULT_CHAIN_ID } from "@/constants/chain";
import { useReadContract } from "wagmi";

const abi = [
  {
    inputs: [],
    name: "getRegistries",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export default function useBots() {
  return useReadContract({
    abi,
    address: FACTORY_ADDRESS,
    functionName: "getRegistries",
  });
}
