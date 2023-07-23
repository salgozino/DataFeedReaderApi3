import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "solidity-coverage";
import { PK, blockscoutApiKey } from "./secrets.json";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const FORK_GNOSIS = false;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      chainId: 31337,
      forking: FORK_GNOSIS
        ? {
            url: "https://rpc.gnosischain.com",
          }
        : undefined,
      loggingEnabled: !!FORK_GNOSIS,
    },
    gnosis: {
      url: "https://rpc.gnosischain.com/",
      accounts: [PK],
      chainId: 100,
      gasPrice: 5000000000,
    },
  },
  etherscan: {
    apiKey: blockscoutApiKey,
  },
};

export default config;
