import * as dotenv from "dotenv";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@openzeppelin/hardhat-upgrades";

dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: "0.8.12",
  networks: {
    apothem: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      apothem: "abc",
      devnet: "abc",
      xdc: "abc",
    },
    customChains: [
      {
        network: "apothem",
        chainId: 51,
        urls: {
          apiURL: "https://abapi.blocksscan.io/api",
          browserURL: "https://apothembeta.blocksscan.io/",
        },
      },
      {
        network: "devnet",
        chainId: 551,
        urls: {
          apiURL: "https://devnetapi.blocksscan.io/api",
          browserURL: "https://devnet.blocksscan.io/",
        },
      },
      {
        network: "xdc",
        chainId: 50,
        urls: {
          apiURL: "https://bapi.blocksscan.io/api",
          browserURL: "https://beta.blocksscan.io/",
        },
      },
    ],
  },
};
export default config;
