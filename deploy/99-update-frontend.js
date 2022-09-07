const { ethers, network } = require("hardhat");
const fs = require("fs");

const FRONTEND_ADDRESS_FILE =
  "../nextjs-smartcontract-lottery/constants/contractAddresses.json";
const FRONTEND_ABI_FILE = "../nextjs-smartcontract-lottery/constants/abi.json";

module.exports = async function () {
  if (process.env.UPDATE_FRONTEND) {
    console.log("updating frontend...");
    updateContractAddresses();
    updateAbi();
  }
};
async function updateAbi() {
  const raffle = await ethers.getContract("Raffle");
  fs.writeFileSync(
    FRONTEND_ABI_FILE,
    raffle.interface.format(ethers.utils.FormatTypes.json)
  );
}

async function updateContractAddresses() {
  const raffle = await ethers.getContract("Raffle");
  const chainId = network.config.chainId.toString();
  const currentAddresses = JSON.parse(
    fs.readFileSync(FRONTEND_ADDRESS_FILE, "utf-8")
  );
  if (chainId in currentAddresses) {
    if (!contractAddress[chainId].includes(raffle.address)) {
      currentAddresses[chainId].push(raffle.address);
    }
  }
  {
    currentAddresses[chainId] = [raffle.address];
  }
  fs.writeFileSync(FRONTEND_ADDRESS_FILE, JSON.stringify(currentAddresses));
}

module.exports.tags = ["all", "frontend"];
