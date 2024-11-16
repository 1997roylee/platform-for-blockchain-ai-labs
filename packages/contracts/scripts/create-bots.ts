import hre from "hardhat";

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

async function main() {
  const botFactory = await hre.ethers.getContractAt(
    "BotFactory",
    "0x5b0683a95951dAc71f7F07c5Af21021c3ba20F1F",
  );

  for (const bot of mockBots) {
    const tx = await botFactory.createRegistry(
      bot.name,
      bot.description,
      bot.icon,
      bot.agentId,
      BigInt(30),
    );
    await tx.wait();
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
