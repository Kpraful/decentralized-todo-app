require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28", // Specify the Solidity version for your project
  networks: {
    hardhat: {} // Use Hardhat's built-in local Ethereum network for testing
  }
};
