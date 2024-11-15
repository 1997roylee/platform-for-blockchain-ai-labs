import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ignition-ethers";
import '@typechain/hardhat'
import '@nomicfoundation/hardhat-ethers'
import '@nomicfoundation/hardhat-chai-matchers'
import 'dotenv/config'

const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    baseSepolia: {
      url: "https://base-sepolia.g.alchemy.com/v2/HDIO_5FgvyH7m0MGUURagJu0h1EfKzfN",
      chainId: 84532,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};

export default config;
