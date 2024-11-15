// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BotFactoryModule = buildModule("BotFactoryModule", (m) => {
  const owner = m.getAccount(1);
  
  const botFactory = m.contract("BotFactory", [owner]);

  return { botFactory };
});

export default BotFactoryModule;
