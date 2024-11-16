const hre = require("hardhat");

async function main() {
  // Get the contract to deploy
  const pyMintNFTEthUsdt = await hre.ethers.getContractFactory("py_mintNFT_ethusdt");

  // Replace with the actual Pyth contract address and ETH/USD price ID
  const pythAddress = "0x0708325268dF9F66270F1401206434524814508b";
  const ethUsdPriceId = "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace";

  // Deploy the contract
  console.log("Deploying contract...");
  const pyMintNFTEthUsdtContract = await pyMintNFTEthUsdt.deploy(pythAddress, ethUsdPriceId);

  // Wait for deployment to complete
  await pyMintNFTEthUsdtContract.waitForDeployment();

  console.log("py_mintNFT_ethusdt deployed to:", await pyMintNFTEthUsdtContract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  // 0x92AbD65AAc2459DA322A075Ce20495381D8CD1E6