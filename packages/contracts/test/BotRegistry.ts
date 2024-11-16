// test/BotRegistry.test.ts
import { expect } from "chai";
import hre from "hardhat";
import { BotRegistry } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, parseEther } from "ethers";

describe("BotRegistry", function () {
  let botRegistry: BotRegistry;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;
  const MIN_STAKE = ethers.parseEther("0.01");
  // const CREDITS_PER_MONTH = 30;
  // const SECONDS_PER_MONTH = 30 * 24 * 60 * 60;

  const mockBot = {
    name: "TestBot",
    description: "A test bot",
    apiEndpoint: "http://localhost:3000/api/bot",
    icon: "https://qph.cf2.poecdn.net/main-thumb-pb-3002-200-vcmrcgoloaktppabmdfsgeczaixswmxt.jpeg",
    // version: BigInt(1),
    credits: BigInt(30),
  };

  beforeEach(async function () {
    [owner, user] = await hre.ethers.getSigners();
    const botFactory = await hre.ethers.deployContract("BotFactory", [owner]);
    await botFactory.waitForDeployment();

    const tx = await botFactory.createRegistry(
      mockBot.name,
      mockBot.description,
      mockBot.icon,
      mockBot.apiEndpoint,
      // mockBot.credits,
    );

    const receipt = await tx.wait();

    const event = receipt?.logs.find(
      (e: any) => e.eventName === "RegistryCreated",
    );

    const registryAddress = (event as ethers.EventLog)?.args[0];
    botRegistry = await hre.ethers.getContractAt(
      "BotRegistry",
      registryAddress,
    );
  });

  describe("Staking", function () {
    it("Should allow staking with minimum amount", async function () {
      await expect(
        botRegistry.connect(user).buyCredits(30, { value: MIN_STAKE }),
      )
        .to.emit(botRegistry, "CreditsPurchased")
        .withArgs(user.address, BigInt(30), BigInt(30) * parseEther("0.0001"));

      expect(await botRegistry.userCredits(user.address)).to.equal(30);
    });

    it("Should reject stake below minimum amount", async function () {
      await expect(
        botRegistry
          .connect(user)
          .buyCredits(30, { value: MIN_STAKE / BigInt(20) }),
      ).to.be.revertedWith("Insufficient payment");
    });
  });

  // describe("Credit Management", function () {
  //   beforeEach(async function () {
  //     await botRegistry.connect(user).subscribe({ value: MIN_STAKE });
  //     await time.increase(SECONDS_PER_MONTH);
  //     await botRegistry.recalculateCredits(user.address);
  //   });

  //   it("Should allow spending earned credits", async function () {
  //     const spendAmount = 10;
  //     await botRegistry.connect(user).spendCredits(spendAmount);

  //     expect(await botRegistry.userCredits(user.address)).to.equal(
  //       CREDITS_PER_MONTH - spendAmount,
  //     );
  //   });

  //   it("Should not allow spending more than available credits", async function () {
  //     await expect(
  //       botRegistry.connect(user).spendCredits(CREDITS_PER_MONTH + 1),
  //     ).to.be.revertedWith("Insufficient credits");
  //   });

  //   it("Should correctly report credit balance", async function () {
  //     expect(await botRegistry.getCreditsBalance(user.address)).to.equal(
  //       CREDITS_PER_MONTH,
  //     );
  //   });
  // });
});
