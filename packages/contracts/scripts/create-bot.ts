import { HardhatRuntimeEnvironment } from "hardhat/types";
// import { BotFactory } from "../typechain-types";
// import{BigNumberish} from 'ethers'
const mockBot = {
  name: "TestBot",
  description: "A test bot",
  apiEndpoint: "http://localhost:3000/api/bot",
  icon: "https://qph.cf2.poecdn.net/main-thumb-pb-3002-200-vcmrcgoloaktppabmdfsgeczaixswmxt.jpeg",
  // version: BigInt(1),
  credits: BigInt(30),
};

async function main() {
  const hre: HardhatRuntimeEnvironment = require("hardhat");
  const [owner] = await hre.ethers.getSigners();
  console.log("owner", owner.address);
  const factoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const botFactory = await hre.ethers.getContractAt(
    "BotFactory",
    factoryAddress
  );
  const registry = await botFactory
    .connect(owner)
    .createRegistry(
      mockBot.name,
      mockBot.description,
      mockBot.icon,
      mockBot.apiEndpoint,
      mockBot.credits
    );

  console.log("registry", registry);

  const registries = await botFactory.getRegistries();
  console.log(registries);
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
