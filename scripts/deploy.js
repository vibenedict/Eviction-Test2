// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const nft = await hre.ethers.deployContract("NFT");

  await nft.waitForDeployment()

  console.log("NFT contract deployed to: " + JSON.stringify(nft));
  storeContractData(nft);
}

function storeContractData(contract) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/Nft-address.json",
    JSON.stringify({ Nft: contract.address }, undefined, 2)
  );

  const artifacts = hre.artifacts.readArtifactSync("NFT");

  fs.writeFileSync(
    contractsDir + "/Nft.json",
    JSON.stringify(artifacts, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
