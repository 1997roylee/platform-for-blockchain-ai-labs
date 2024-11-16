// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const mockBot = {
  name: "TestBot",
  description: "A test bot",
  apiEndpoint: "http://0.0.0.0:8000/chat",
  icon: "https://qph.cf2.poecdn.net/main-thumb-pb-3002-200-vcmrcgoloaktppabmdfsgeczaixswmxt.jpeg",
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
    BigInt(30)
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
