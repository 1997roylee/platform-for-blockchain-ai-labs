import { GraphQLClient, RequestOptions } from "graphql-request";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
type GraphQLClientRequestHeaders = RequestOptions["requestHeaders"];
export const RegistryFragmentFragmentDoc = gql`
  fragment RegistryFragment on Registry {
    id
    factory {
      id
    }
    creator
    blockNumber
    blockTimestamp
    transactionHash
    name
    icon
    description
    agentId
  }
`;
export const FactoriesDocument = gql`
  query Factories {
    factories(first: 100) {
      id
      registryCount
      totalFeesETH
      totalFeesUSD
      registries {
        ...RegistryFragment
      }
    }
  }
  ${RegistryFragmentFragmentDoc}
`;
export const FactoryDocument = gql`
  query Factory($id: ID!) {
    factory(id: $id) {
      id
      registryCount
      totalFeesETH
      totalFeesUSD
      registries {
        ...RegistryFragment
      }
    }
  }
  ${RegistryFragmentFragmentDoc}
`;
export const RegistriesDocument = gql`
  query Registries {
    registries(first: 100) {
      ...RegistryFragment
    }
  }
  ${RegistryFragmentFragmentDoc}
`;
export const RegistryDocument = gql`
  query Registry($id: ID!) {
    registry(id: $id) {
      ...RegistryFragment
    }
  }
  ${RegistryFragmentFragmentDoc}
`;
export const PurchasesDocument = gql`
  query Purchases($buyer: Bytes!) {
    purchases(first: 20, where: { buyer: $buyer }) {
      id
      registry {
        ...RegistryFragment
      }
      buyer
      credits
      costs
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
  ${RegistryFragmentFragmentDoc}
`;
export const PurchaseDocument = gql`
  query Purchase($id: ID!) {
    purchase(id: $id) {
      id
      registry {
        ...RegistryFragment
      }
      buyer
      credits
      costs
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
  ${RegistryFragmentFragmentDoc}
`;
export const SpendsDocument = gql`
  query Spends($spender: Bytes!) {
    spends(first: 20, where: { spender: $spender }) {
      id
      registry {
        ...RegistryFragment
      }
      spender
      credits
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
  ${RegistryFragmentFragmentDoc}
`;
export const UserDocument = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      totalCredits
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    Factories(
      variables?: FactoriesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<FactoriesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FactoriesQuery>(FactoriesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "Factories",
        "query",
        variables,
      );
    },
    Factory(
      variables: FactoryQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<FactoryQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FactoryQuery>(FactoryDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "Factory",
        "query",
        variables,
      );
    },
    Registries(
      variables?: RegistriesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<RegistriesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RegistriesQuery>(RegistriesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "Registries",
        "query",
        variables,
      );
    },
    Registry(
      variables: RegistryQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<RegistryQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RegistryQuery>(RegistryDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "Registry",
        "query",
        variables,
      );
    },
    Purchases(
      variables: PurchasesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<PurchasesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PurchasesQuery>(PurchasesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "Purchases",
        "query",
        variables,
      );
    },
    Purchase(
      variables: PurchaseQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<PurchaseQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PurchaseQuery>(PurchaseDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "Purchase",
        "query",
        variables,
      );
    },
    Spends(
      variables: SpendsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<SpendsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SpendsQuery>(SpendsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "Spends",
        "query",
        variables,
      );
    },
    User(
      variables: UserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<UserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UserQuery>(UserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "User",
        "query",
        variables,
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigDecimal: { input: any; output: any };
  BigInt: { input: any; output: any };
  Bytes: { input: any; output: any };
  Int8: { input: any; output: any };
  Timestamp: { input: any; output: any };
};

export enum Aggregation_Interval {
  Day = "day",
  Hour = "hour",
}

export type BlockChangedFilter = {
  number_gte: Scalars["Int"]["input"];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars["Bytes"]["input"]>;
  number?: InputMaybe<Scalars["Int"]["input"]>;
  number_gte?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Factory = {
  __typename?: "Factory";
  id: Scalars["ID"]["output"];
  registries: Array<Registry>;
  registryCount: Scalars["BigInt"]["output"];
  totalFeesETH: Scalars["BigDecimal"]["output"];
  totalFeesUSD: Scalars["BigDecimal"]["output"];
};

export type FactoryRegistriesArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Registry_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Registry_Filter>;
};

export type Factory_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Factory_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Factory_Filter>>>;
  registries_?: InputMaybe<Registry_Filter>;
  registryCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  registryCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  registryCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  registryCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  registryCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  registryCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  registryCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  registryCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalFeesETH?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesETH_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesETH_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesETH_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalFeesETH_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesETH_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesETH_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesETH_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalFeesUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalFeesUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum Factory_OrderBy {
  Id = "id",
  Registries = "registries",
  RegistryCount = "registryCount",
  TotalFeesEth = "totalFeesETH",
  TotalFeesUsd = "totalFeesUSD",
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type Purchase = {
  __typename?: "Purchase";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  buyer: Scalars["Bytes"]["output"];
  costs: Scalars["BigInt"]["output"];
  credits: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  registry: Registry;
  transactionHash: Scalars["Bytes"]["output"];
};

export type Purchase_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Purchase_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  buyer?: InputMaybe<Scalars["Bytes"]["input"]>;
  buyer_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  buyer_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  buyer_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  buyer_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  buyer_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  buyer_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  buyer_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  buyer_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  buyer_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  costs?: InputMaybe<Scalars["BigInt"]["input"]>;
  costs_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  costs_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  costs_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  costs_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  costs_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  costs_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  costs_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  credits?: InputMaybe<Scalars["BigInt"]["input"]>;
  credits_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  credits_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  credits_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  credits_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  credits_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  credits_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  credits_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Purchase_Filter>>>;
  registry?: InputMaybe<Scalars["String"]["input"]>;
  registry_?: InputMaybe<Registry_Filter>;
  registry_contains?: InputMaybe<Scalars["String"]["input"]>;
  registry_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  registry_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  registry_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  registry_gt?: InputMaybe<Scalars["String"]["input"]>;
  registry_gte?: InputMaybe<Scalars["String"]["input"]>;
  registry_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  registry_lt?: InputMaybe<Scalars["String"]["input"]>;
  registry_lte?: InputMaybe<Scalars["String"]["input"]>;
  registry_not?: InputMaybe<Scalars["String"]["input"]>;
  registry_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  registry_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  registry_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  registry_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  registry_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  registry_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  registry_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  registry_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  registry_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum Purchase_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Buyer = "buyer",
  Costs = "costs",
  Credits = "credits",
  Id = "id",
  Registry = "registry",
  RegistryAgentId = "registry__agentId",
  RegistryBlockNumber = "registry__blockNumber",
  RegistryBlockTimestamp = "registry__blockTimestamp",
  RegistryCreator = "registry__creator",
  RegistryDescription = "registry__description",
  RegistryIcon = "registry__icon",
  RegistryId = "registry__id",
  RegistryName = "registry__name",
  RegistryTransactionHash = "registry__transactionHash",
  TransactionHash = "transactionHash",
}

export type Query = {
  __typename?: "Query";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  factories: Array<Factory>;
  factory?: Maybe<Factory>;
  purchase?: Maybe<Purchase>;
  purchases: Array<Purchase>;
  registries: Array<Registry>;
  registry?: Maybe<Registry>;
  spend?: Maybe<Spend>;
  spends: Array<Spend>;
  user?: Maybe<User>;
  users: Array<User>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryFactoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Factory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Factory_Filter>;
};

export type QueryFactoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPurchaseArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPurchasesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Purchase_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Purchase_Filter>;
};

export type QueryRegistriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Registry_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Registry_Filter>;
};

export type QueryRegistryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerySpendArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerySpendsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Spend_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Spend_Filter>;
};

export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type Registry = {
  __typename?: "Registry";
  agentId: Scalars["String"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  creator: Scalars["Bytes"]["output"];
  description: Scalars["String"]["output"];
  factory: Factory;
  icon: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  purchases: Array<Purchase>;
  spends: Array<Spend>;
  transactionHash: Scalars["Bytes"]["output"];
};

export type RegistryPurchasesArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Purchase_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Purchase_Filter>;
};

export type RegistrySpendsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Spend_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Spend_Filter>;
};

export type Registry_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  agentId?: InputMaybe<Scalars["String"]["input"]>;
  agentId_contains?: InputMaybe<Scalars["String"]["input"]>;
  agentId_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  agentId_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  agentId_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  agentId_gt?: InputMaybe<Scalars["String"]["input"]>;
  agentId_gte?: InputMaybe<Scalars["String"]["input"]>;
  agentId_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  agentId_lt?: InputMaybe<Scalars["String"]["input"]>;
  agentId_lte?: InputMaybe<Scalars["String"]["input"]>;
  agentId_not?: InputMaybe<Scalars["String"]["input"]>;
  agentId_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  agentId_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  agentId_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  agentId_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  agentId_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  agentId_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  agentId_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  agentId_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  agentId_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  and?: InputMaybe<Array<InputMaybe<Registry_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  creator?: InputMaybe<Scalars["Bytes"]["input"]>;
  creator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  creator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  creator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  creator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  creator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  creator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  creator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  creator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  creator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  description_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  description_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_gt?: InputMaybe<Scalars["String"]["input"]>;
  description_gte?: InputMaybe<Scalars["String"]["input"]>;
  description_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  description_lt?: InputMaybe<Scalars["String"]["input"]>;
  description_lte?: InputMaybe<Scalars["String"]["input"]>;
  description_not?: InputMaybe<Scalars["String"]["input"]>;
  description_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  description_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  description_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  description_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  description_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factory?: InputMaybe<Scalars["String"]["input"]>;
  factory_?: InputMaybe<Factory_Filter>;
  factory_contains?: InputMaybe<Scalars["String"]["input"]>;
  factory_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factory_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  factory_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factory_gt?: InputMaybe<Scalars["String"]["input"]>;
  factory_gte?: InputMaybe<Scalars["String"]["input"]>;
  factory_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  factory_lt?: InputMaybe<Scalars["String"]["input"]>;
  factory_lte?: InputMaybe<Scalars["String"]["input"]>;
  factory_not?: InputMaybe<Scalars["String"]["input"]>;
  factory_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  factory_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factory_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  factory_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factory_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  factory_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  factory_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factory_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  factory_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  icon?: InputMaybe<Scalars["String"]["input"]>;
  icon_contains?: InputMaybe<Scalars["String"]["input"]>;
  icon_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  icon_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  icon_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  icon_gt?: InputMaybe<Scalars["String"]["input"]>;
  icon_gte?: InputMaybe<Scalars["String"]["input"]>;
  icon_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  icon_lt?: InputMaybe<Scalars["String"]["input"]>;
  icon_lte?: InputMaybe<Scalars["String"]["input"]>;
  icon_not?: InputMaybe<Scalars["String"]["input"]>;
  icon_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  icon_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  icon_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  icon_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  icon_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  icon_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  icon_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  icon_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  icon_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  name_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_gt?: InputMaybe<Scalars["String"]["input"]>;
  name_gte?: InputMaybe<Scalars["String"]["input"]>;
  name_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_lt?: InputMaybe<Scalars["String"]["input"]>;
  name_lte?: InputMaybe<Scalars["String"]["input"]>;
  name_not?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Registry_Filter>>>;
  purchases_?: InputMaybe<Purchase_Filter>;
  spends_?: InputMaybe<Spend_Filter>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum Registry_OrderBy {
  AgentId = "agentId",
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Creator = "creator",
  Description = "description",
  Factory = "factory",
  FactoryId = "factory__id",
  FactoryRegistryCount = "factory__registryCount",
  FactoryTotalFeesEth = "factory__totalFeesETH",
  FactoryTotalFeesUsd = "factory__totalFeesUSD",
  Icon = "icon",
  Id = "id",
  Name = "name",
  Purchases = "purchases",
  Spends = "spends",
  TransactionHash = "transactionHash",
}

export type Spend = {
  __typename?: "Spend";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  credits: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  registry: Registry;
  spender: Scalars["Bytes"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type Spend_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Spend_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  credits?: InputMaybe<Scalars["BigInt"]["input"]>;
  credits_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  credits_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  credits_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  credits_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  credits_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  credits_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  credits_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Spend_Filter>>>;
  registry?: InputMaybe<Scalars["String"]["input"]>;
  registry_?: InputMaybe<Registry_Filter>;
  registry_contains?: InputMaybe<Scalars["String"]["input"]>;
  registry_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  registry_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  registry_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  registry_gt?: InputMaybe<Scalars["String"]["input"]>;
  registry_gte?: InputMaybe<Scalars["String"]["input"]>;
  registry_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  registry_lt?: InputMaybe<Scalars["String"]["input"]>;
  registry_lte?: InputMaybe<Scalars["String"]["input"]>;
  registry_not?: InputMaybe<Scalars["String"]["input"]>;
  registry_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  registry_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  registry_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  registry_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  registry_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  registry_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  registry_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  registry_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  registry_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  spender?: InputMaybe<Scalars["Bytes"]["input"]>;
  spender_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  spender_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  spender_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  spender_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  spender_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  spender_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  spender_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  spender_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  spender_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum Spend_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Credits = "credits",
  Id = "id",
  Registry = "registry",
  RegistryAgentId = "registry__agentId",
  RegistryBlockNumber = "registry__blockNumber",
  RegistryBlockTimestamp = "registry__blockTimestamp",
  RegistryCreator = "registry__creator",
  RegistryDescription = "registry__description",
  RegistryIcon = "registry__icon",
  RegistryId = "registry__id",
  RegistryName = "registry__name",
  RegistryTransactionHash = "registry__transactionHash",
  Spender = "spender",
  TransactionHash = "transactionHash",
}

export type Subscription = {
  __typename?: "Subscription";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  factories: Array<Factory>;
  factory?: Maybe<Factory>;
  purchase?: Maybe<Purchase>;
  purchases: Array<Purchase>;
  registries: Array<Registry>;
  registry?: Maybe<Registry>;
  spend?: Maybe<Spend>;
  spends: Array<Spend>;
  user?: Maybe<User>;
  users: Array<User>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionFactoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Factory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Factory_Filter>;
};

export type SubscriptionFactoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPurchaseArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPurchasesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Purchase_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Purchase_Filter>;
};

export type SubscriptionRegistriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Registry_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Registry_Filter>;
};

export type SubscriptionRegistryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionSpendArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionSpendsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Spend_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Spend_Filter>;
};

export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"]["output"];
  totalCredits: Scalars["BigInt"]["output"];
};

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  totalCredits?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalCredits_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalCredits_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalCredits_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalCredits_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalCredits_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalCredits_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalCredits_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum User_OrderBy {
  Id = "id",
  TotalCredits = "totalCredits",
}

export type _Block_ = {
  __typename?: "_Block_";
  /** The hash of the block */
  hash?: Maybe<Scalars["Bytes"]["output"]>;
  /** The block number */
  number: Scalars["Int"]["output"];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars["Bytes"]["output"]>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars["Int"]["output"]>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: "_Meta_";
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars["String"]["output"];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars["Boolean"]["output"];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = "deny",
}

export type RegistryFragmentFragment = {
  __typename?: "Registry";
  id: string;
  creator: any;
  blockNumber: any;
  blockTimestamp: any;
  transactionHash: any;
  name: string;
  icon: string;
  description: string;
  agentId: string;
  factory: { __typename?: "Factory"; id: string };
};

export type FactoriesQueryVariables = Exact<{ [key: string]: never }>;

export type FactoriesQuery = {
  __typename?: "Query";
  factories: Array<{
    __typename?: "Factory";
    id: string;
    registryCount: any;
    totalFeesETH: any;
    totalFeesUSD: any;
    registries: Array<{
      __typename?: "Registry";
      id: string;
      creator: any;
      blockNumber: any;
      blockTimestamp: any;
      transactionHash: any;
      name: string;
      icon: string;
      description: string;
      agentId: string;
      factory: { __typename?: "Factory"; id: string };
    }>;
  }>;
};

export type FactoryQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type FactoryQuery = {
  __typename?: "Query";
  factory?: {
    __typename?: "Factory";
    id: string;
    registryCount: any;
    totalFeesETH: any;
    totalFeesUSD: any;
    registries: Array<{
      __typename?: "Registry";
      id: string;
      creator: any;
      blockNumber: any;
      blockTimestamp: any;
      transactionHash: any;
      name: string;
      icon: string;
      description: string;
      agentId: string;
      factory: { __typename?: "Factory"; id: string };
    }>;
  } | null;
};

export type RegistriesQueryVariables = Exact<{ [key: string]: never }>;

export type RegistriesQuery = {
  __typename?: "Query";
  registries: Array<{
    __typename?: "Registry";
    id: string;
    creator: any;
    blockNumber: any;
    blockTimestamp: any;
    transactionHash: any;
    name: string;
    icon: string;
    description: string;
    agentId: string;
    factory: { __typename?: "Factory"; id: string };
  }>;
};

export type RegistryQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type RegistryQuery = {
  __typename?: "Query";
  registry?: {
    __typename?: "Registry";
    id: string;
    creator: any;
    blockNumber: any;
    blockTimestamp: any;
    transactionHash: any;
    name: string;
    icon: string;
    description: string;
    agentId: string;
    factory: { __typename?: "Factory"; id: string };
  } | null;
};

export type PurchasesQueryVariables = Exact<{
  buyer: Scalars["Bytes"]["input"];
}>;

export type PurchasesQuery = {
  __typename?: "Query";
  purchases: Array<{
    __typename?: "Purchase";
    id: string;
    buyer: any;
    credits: any;
    costs: any;
    blockNumber: any;
    blockTimestamp: any;
    transactionHash: any;
    registry: {
      __typename?: "Registry";
      id: string;
      creator: any;
      blockNumber: any;
      blockTimestamp: any;
      transactionHash: any;
      name: string;
      icon: string;
      description: string;
      agentId: string;
      factory: { __typename?: "Factory"; id: string };
    };
  }>;
};

export type PurchaseQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type PurchaseQuery = {
  __typename?: "Query";
  purchase?: {
    __typename?: "Purchase";
    id: string;
    buyer: any;
    credits: any;
    costs: any;
    blockNumber: any;
    blockTimestamp: any;
    transactionHash: any;
    registry: {
      __typename?: "Registry";
      id: string;
      creator: any;
      blockNumber: any;
      blockTimestamp: any;
      transactionHash: any;
      name: string;
      icon: string;
      description: string;
      agentId: string;
      factory: { __typename?: "Factory"; id: string };
    };
  } | null;
};

export type SpendsQueryVariables = Exact<{
  spender: Scalars["Bytes"]["input"];
}>;

export type SpendsQuery = {
  __typename?: "Query";
  spends: Array<{
    __typename?: "Spend";
    id: string;
    spender: any;
    credits: any;
    blockNumber: any;
    blockTimestamp: any;
    transactionHash: any;
    registry: {
      __typename?: "Registry";
      id: string;
      creator: any;
      blockNumber: any;
      blockTimestamp: any;
      transactionHash: any;
      name: string;
      icon: string;
      description: string;
      agentId: string;
      factory: { __typename?: "Factory"; id: string };
    };
  }>;
};

export type UserQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type UserQuery = {
  __typename?: "Query";
  user?: { __typename?: "User"; id: string; totalCredits: any } | null;
};
