import { expect } from "chai";
import { ethers } from "hardhat";

const PROXY_ETHUSD = "0x26690F9f17FdC26D419371315bc17950a0FC90eD";

describe("Data Feed", function () {
  it("Should change the proxy", async function () {
    const DataFeedReader = await ethers.getContractFactory("DataFeedReader");
    const contract = await DataFeedReader.deploy();
    await contract.deployed();

    // eslint-disable-next-line no-unused-expressions
    await contract.setProxyAddress(PROXY_ETHUSD);

    expect(await contract.proxyAddress()).equal(PROXY_ETHUSD);
  });
});
