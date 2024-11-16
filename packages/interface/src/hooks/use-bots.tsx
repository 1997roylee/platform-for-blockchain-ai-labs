// import { FACTORY_ADDRESS } from "@/constants/addresses";
// import { useReadContract } from "wagmi";
import request from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { RegistriesDocument, RegistriesQuery } from "../../graphqls/sdk";
import { SUBGRAPH_API_ENDPOINT } from "@/constants/subgraph";
// const abi = [
//   {
//     inputs: [],
//     name: "getRegistries",
//     outputs: [
//       {
//         internalType: "address[]",
//         name: "",
//         type: "address[]",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
// ] as const;

export default function useBots() {
  return useQuery({
    queryKey: ["BotList"],
    queryFn: async () => {
      const response = await request<RegistriesQuery>(
        SUBGRAPH_API_ENDPOINT,
        RegistriesDocument,
      );

      return response.registries;
    },
  });
  // return useReadContract({
  //   abi,
  //   address: FACTORY_ADDRESS,
  //   functionName: "getRegistries",
  // });
}
