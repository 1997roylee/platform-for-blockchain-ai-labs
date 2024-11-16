import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { UserDocument, UserQuery } from "../../graphqls/sdk";
import { SUBGRAPH_API_ENDPOINT } from "@/constants/subgraph";

export default function useTotalCredits(id: string) {
  return useQuery({
    queryKey: ["TotalCredits", id],
    queryFn: async () => {
      const response = await request<UserQuery>(
        SUBGRAPH_API_ENDPOINT,
        UserDocument,
        {
          id: id.toLowerCase(),
        },
      );

      return response.user;
    },
  });
}
