import { useQuery } from "@tanstack/react-query";
import { PurchasesDocument, PurchasesQuery } from "../../graphqls/sdk";
import request from "graphql-request";
import { SUBGRAPH_API_ENDPOINT } from "@/constants/subgraph";

export default function usePurchaseHistory(buyer: string) {
  return useQuery({
    queryKey: ["Purchase", buyer],
    enabled: !!buyer,
    refetchInterval: 15 * 1000,
    queryFn: async () => {
      const response = await request<PurchasesQuery>(
        SUBGRAPH_API_ENDPOINT,
        PurchasesDocument,
        {
          buyer,
        },
      );

      return response.purchases;
    },
  });
}
