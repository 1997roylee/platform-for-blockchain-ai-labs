import { useQuery } from "@tanstack/react-query";
import { SpendsDocument, SpendsQuery } from "../../graphqls/sdk";
import request from "graphql-request";
import { SUBGRAPH_API_ENDPOINT } from "@/constants/subgraph";

export default function useSpendHistory(spender: string) {
  return useQuery({
    queryKey: ["SpendHistory", spender],
    enabled: !!spender,
    refetchInterval: 15 * 1000,
    queryFn: async () => {
      const response = await request<SpendsQuery>(
        SUBGRAPH_API_ENDPOINT,
        SpendsDocument,
        {
          spender,
        },
      );

      return response.spends;
    },
  });
}
