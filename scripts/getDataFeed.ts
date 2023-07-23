import { ethers } from "hardhat";

async function main() {
  const dataReader = "0x242948bB3161D59e6d0D929b8839Cb869FcE25d9";
  const PROXY_ETHUSD = "0x26690F9f17FdC26D419371315bc17950a0FC90eD";
  // We get the contract to deploy
  const DataFeedReader = await ethers.getContractFactory("DataFeedReader");
  const dataFeedReader = DataFeedReader.attach(dataReader);

  if (
    (await dataFeedReader.proxyAddress()) ===
    "0x0000000000000000000000000000000000000000"
  ) {
    console.log("Defining proxy address to ETH-USD Data Feed");
    await dataFeedReader.setProxyAddress(PROXY_ETHUSD);
  }
  const { value, timestamp } = await dataFeedReader.readDataFeed();

  console.log(
    `At ${timestamp.toString()} the ETH-USD price is ${ethers.utils.formatEther(
      value
    )}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
