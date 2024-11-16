import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    "https://api.studio.thegraph.com/query/25032/ethglobal/version/latest",
  ],
  documents: ["graphqls/**"],
  generates: {
    "graphqls/sdk.ts": {
      plugins: [
        "typescript-graphql-request",
        "typescript",
        "typescript-operations",
      ],
    },
  },
};

export default config;
