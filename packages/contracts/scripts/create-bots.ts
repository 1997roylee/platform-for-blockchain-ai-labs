import hre from "hardhat";

const mockBots = [
  {
    name: "Token Bot",
    description:
      "Deploy and manage ERC20 tokens with customizable parameters. Features include minting, burning, and transfer controls.",
    agentId: "normal",
    icon: "http://localhost:3000/coin.webp",
  },
  {
    name: "1Inch Bot",
    description:
      "Real-time price queries from 1inch DEX aggregator. Get best rates, liquidity analysis, and price impact calculations.",
    agentId: "1inch",
    icon: "http://localhost:3000/1inch.webp",
  },
  {
    name: "Uniswap",
    description:
      "Create and manage liquidity pools on Uniswap V3. Earn fees and rewards from trading activity.",
    agentId: "uniswap",
    icon: "http://localhost:3000/uniswap.png",
  },
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
    "0xAfa9CdC683045f23990A7d4Aaf5D8C41C6881796",
  );

  for (const bot of mockBots) {
    const tx = await botFactory.createRegistry(
      bot.name,
      bot.description,
      bot.icon,
      bot.agentId,
      // BigInt(30),
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
