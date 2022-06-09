const SimpleStorage = artifacts.require("./MyToken.sol");

contract("MyToken", (accounts) => {
  it("all tokens should be in my account", async () => {
    const instance = await SimpleStorage.deployed();
    const total = await instance.totalSupply();
    const balance = await instance.balanceOf(accounts[0]);
    assert.equal(total.toString(), balance.toString(), "The balance was not the same");
  });
});
