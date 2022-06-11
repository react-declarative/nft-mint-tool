// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

contract SendMoneyExample {

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function recieveMoney() public payable {
        // require(msg.sender.balance >= msg.value, "Insufficient Balance"); lol
    }

    function withdrawMoney() public {
        owner.transfer(this.getBalance());
    }
    
    function withdrawMoneyTo(address payable _to) public {
        _to.transfer(this.getBalance());
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

}
