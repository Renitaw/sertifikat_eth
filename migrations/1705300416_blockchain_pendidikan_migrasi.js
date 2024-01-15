const BlockchainPendidikan = artifacts.require("BlockchainPendidikan");

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(BlockchainPendidikan);
};
