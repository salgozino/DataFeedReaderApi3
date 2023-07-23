import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  const DataFeedReader = await ethers.getContractFactory("DataFeedReader");
  const dataFeedReader = await DataFeedReader.deploy();

  await dataFeedReader.deployed();

  console.log("Data Feed Reader deployed to:", dataFeedReader.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
