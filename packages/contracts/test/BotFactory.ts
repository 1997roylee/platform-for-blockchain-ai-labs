// test/BotFactory.test.ts
import { expect } from "chai";
import { BotFactory, BotRegistry } from "../typechain-types";
import hre from "hardhat";
import { ethers } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("BotFactory", function () {
  let botFactory: BotFactory;
  let owner: HardhatEthersSigner, user: HardhatEthersSigner;

  const mockBot = {
    name: "TestBot",
    apiEndpoint: "http://localhost:3000/api/bot",
    icon: "https://qph.cf2.poecdn.net/main-thumb-pb-3002-200-vcmrcgoloaktppabmdfsgeczaixswmxt.jpeg",
    // version: BigInt(1),
    fee: ethers.parseEther("0.01"),
  };

  //   async function deployBotFactoryFixture() {
  //     const [owner] = await hre.ethers.getSigners();

  //     const botFactory = await hre.ethers.deployContract("BotFactory", [owner]);

  //     return {
  //       botFactory,
  //       owner,
  //     };
  //   }

  beforeEach(async function () {
    [owner, user] = await hre.ethers.getSigners();
    botFactory = await hre.ethers.deployContract("BotFactory", [owner]);
    // const BotFactory = await ethers.getContractAt("BotFactory");
    // botFactory = await BotFactory.deploy(owner.address);
    await botFactory.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await botFactory.owner()).to.equal(owner.address);
    });
  });

  describe("createRegistry", function () {
    it("Should create a new registry", async function () {
      const tx = await botFactory.createRegistry(
        mockBot.name,
        mockBot.icon,
        mockBot.apiEndpoint,
        mockBot.fee
      );

      const receipt = await tx.wait();
      const event = receipt?.logs.find(
        (e: any) => e.eventName === "RegistryCreated"
      );

      if (!event) {
        throw new Error("Event not found");
      }

      expect(event).to.not.be.undefined;
      const creator = (event as ethers.EventLog).args[1];
      expect(creator).to.equal(owner.address);
    });

    // it("Should only allow owner to create registry", async function () {
    //   expect(
    //     await botFactory
    //       .connect(user)
    //       .createRegistry(
    //         mockBot.name,
    //         mockBot.apiInfo,
    //         mockBot.version,
    //         mockBot.fee
    //       )
    //   ).to.be.reverted;
    // });

    it("Should track created registries", async function () {
      await botFactory.createRegistry(
        mockBot.name,
        mockBot.icon,
        mockBot.apiEndpoint,
        mockBot.fee
      );

      const registries = await botFactory.getRegistries();
      expect(registries.length).to.equal(1);
    });

    it("Should create registry with correct parameters", async function () {
      const tx = await botFactory.createRegistry(
        mockBot.name,
        mockBot.icon,
        mockBot.apiEndpoint,
        mockBot.fee
      );

      const receipt = await tx.wait();
      const event = receipt?.logs.find(
        (e: any) => e.eventName === "RegistryCreated"
      );

      const registryAddress = (event as ethers.EventLog)?.args[0];
      const registry = await hre.ethers.getContractAt(
        "BotRegistry",
        registryAddress
      );

      const metadata = await registry.metadata();
      expect(metadata.name).to.equal(mockBot.name);
      expect(metadata.icon).to.equal(mockBot.icon);
      expect(metadata.apiEndpoint).to.equal(mockBot.apiEndpoint);
      expect(metadata.fee).to.equal(mockBot.fee);
      expect(metadata.creator).to.equal(owner.address);
    });
  });
});
