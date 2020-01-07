var Tokens = artifacts.require("./Tokens.sol");

module.exports = function(deployer) {
  deployer.deploy(Tokens, 5);
};
