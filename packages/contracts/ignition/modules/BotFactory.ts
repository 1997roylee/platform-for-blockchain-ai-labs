// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const mockBots = [
  {
    name: "Token Bot",
    description:
      "Deploy and manage ERC20 tokens with customizable parameters. Features include minting, burning, and transfer controls.",
    agentId: "token",
    icon: "https://qph.cf2.poecdn.net/main-thumb-pb-3002-200-vcmrcgoloaktppabmdfsgeczaixswmxt.jpeg",
  },
  {
    name: "1Inch Bot",
    description:
      "Real-time price queries from 1inch DEX aggregator. Get best rates, liquidity analysis, and price impact calculations.",
    agentId: "1inch",
    icon: "http://localhost:3000/1inch.webp",
  },
  // {
  //   name: "NFT Forge",
  //   description: "Create and deploy NFT collections with customizable metadata, royalties, and minting strategies.",
  //   agentId: "nft",
  //   icon: "https://qph.cf2.poecdn.net/main-thumb-pb-3002-200-vcmrcgoloaktppabmdfsgeczaixswmxt.jpeg",
  // },
  {
    name: "Blockscout Bot",
    description:
      "Automated trading bot with support for limit orders, DCA strategies, and arbitrage opportunities across DEXes.",
    agentId: "trade",
    icon: "http://localhost:3000/Blockscout.avif",
  },
];

const BotFactoryModule = buildModule("BotFactoryModule", (m) => {
  const botFactory = m.contract("BotFactory", [
    m.getParameter<string>("deployer"),
  ]);

  // Create a sample CallOption using OptionFactory
  // const sampleRegistry = m.call(botFactory, "createRegistry", [
  //   mockBots[0].name,
  //   mockBots[0].description,
  //   mockBots[0].icon,
  //   mockBots[0].agentId,
  //   BigInt(30),
  // ]);

  return { botFactory };
});

export default BotFactoryModule;
