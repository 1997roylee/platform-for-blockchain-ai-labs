import { HardhatRuntimeEnvironment } from "hardhat/types";
// import { uploadToIPFS } from "./ipfs_upload";
// import OptionModule from "../ignition/modules/CallOption";
import BotFactoryModule from "../ignition/modules/BotFactory";

async function main() {
  const hre: HardhatRuntimeEnvironment = require("hardhat");
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const result = await hre.ignition.deploy(BotFactoryModule, {
    parameters: {
      BotFactoryModule: {
        deployer: deployer.address,
      },
    },
  });
  console.log("result", result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
