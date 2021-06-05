const Color = artifacts.require("./Color.sol");

module.exports = function(deployer) {
  deployer.deploy(Color);
};
