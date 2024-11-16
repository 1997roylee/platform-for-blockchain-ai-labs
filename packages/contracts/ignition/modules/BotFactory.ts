// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const mockBot = {
  name: "TestBot",
  description: "A test bot",
  apiEndpoint: "http://localhost:3000/api/bot",
  icon: "https://qph.cf2.poecdn.net/main-thumb-pb-3002-200-vcmrcgoloaktppabmdfsgeczaixswmxt.jpeg",
  // version: BigInt(1),
  fee: ethers.parseEther("0.01"),
};

const BotFactoryModule = buildModule("BotFactoryModule", (m) => {
  const botFactory = m.contract("BotFactory", [
    m.getParameter<string>("deployer"),
  ]);

  // Create a sample CallOption using OptionFactory
  const sampleRegistry = m.call(botFactory, "createRegistry", [
    mockBot.name,
    mockBot.description,
    mockBot.icon,
    mockBot.apiEndpoint,
    ethers.parseEther("0.1"), // 0.1 Tokens per option
  ]);

  // Retrieve option address from emitted event
  const registryAddress = m.readEventArgument(
    sampleRegistry,
    "RegistryCreated",
    "registry"
  );
  // You can use `contractAt` to get a contract Future for an existing contract
  const botRegistry = m.contractAt("BotRegistry", registryAddress);

  return { botFactory, botRegistry };
});

export default BotFactoryModule;
