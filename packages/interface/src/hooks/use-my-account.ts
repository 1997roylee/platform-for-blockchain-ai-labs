"use client";
import { useQuery } from "@tanstack/react-query";

export default function useMyAccount() {
  return useQuery({
    queryKey: ["Account"],
    queryFn: async () => {
      return (await fetch("/api/wallets").then((res) => res.json())) as {
        id: string;
      }[];
    },
  });
}
