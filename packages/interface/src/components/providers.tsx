"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { type State, WagmiProvider } from "wagmi";
// import { OnchainKitProvider } from "@coinbase/onchainkit";
import { getConfig } from "@/lib/wagmi";
// import { base } from "wagmi/chains";

export default function Providers(
  props: {
    initialState?: State;
  } & PropsWithChildren
) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        {props.children}
        {/* <OnchainKitProvider chain={base}>{props.children}</OnchainKitProvider> */}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
