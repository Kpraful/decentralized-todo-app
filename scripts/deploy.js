const hre = require("hardhat");

async function main() {
  const TodoApp = await hre.ethers.getContractFactory("TodoApp");

  // Set unlockTime to 1 hour from now (for example)
  const unlockTime = Math.floor(Date.now() / 1000) + 3600;  // 1 hour from current timestamp

  // Deploy the contract with unlockTime
  const todoApp = await TodoApp.deploy(unlockTime);

  await todoApp.waitForDeployment();
  console.log("TodoApp contract deployed to:", await todoApp.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
