import { HardhatRuntimeEnvironment } from "hardhat/types";
import { BotFactory } from "../typechain-types";
// import{BigNumberish} from 'ethers'

async function main() {
  const hre: HardhatRuntimeEnvironment = require("hardhat");
  const factoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const BotFactory = await hre.ethers.getContractFactory("BotFactory");
  const botFactory = BotFactory.attach(factoryAddress) as BotFactory;

  const tx = await botFactory.createRegistry(
    "Demo",
    "http://localhost:3000/api/bot",
    BigInt(0),
    BigInt(100)
  );
  const receipt = await tx.wait();
  console.log(receipt);

  // const registries = await botFactory.getRegistries();
  // console.log(registries);
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
