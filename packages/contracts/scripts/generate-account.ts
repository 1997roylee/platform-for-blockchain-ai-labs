import { ethers } from "ethers";
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

function generateAccount() {
  // Generate a new random account
  const wallet = ethers.Wallet.createRandom();

  console.log("New account generated:");
  console.log("Address:", wallet.address);
  console.log("Private Key:", wallet.privateKey);

  // Update the .env file
  const envPath = ".env";
  let envContent = fs.readFileSync(envPath, "utf8");
  envContent = envContent.replace(
    /SEPOLIA_PRIVATE_KEY=.*/,
    `SEPOLIA_PRIVATE_KEY=${wallet.privateKey}`
  );
  fs.writeFileSync(envPath, envContent);

  console.log("\n.env file updated with new private key.");
  console.log("Please keep your mnemonic phrase safe and secret!");
}

generateAccount();
