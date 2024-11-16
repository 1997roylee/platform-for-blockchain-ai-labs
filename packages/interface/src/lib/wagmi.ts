import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { localhost, baseSepolia } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

export function getConfig() {
  return createConfig({
    chains: [localhost], // add baseSepolia for testing
    connectors: [
      injected(),
      coinbaseWallet({
        appName: "Create Wagmi",
        preference: "smartWalletOnly",
      }),
      // coinbaseWallet({
      //   appName: "OnchainKit",
      //   preference: "smartWalletOnly",
      //   version: "4",
      // }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [localhost.id]: http("http://localhost:8545"),
      [baseSepolia.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
