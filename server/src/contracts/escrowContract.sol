// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    address public employer;
    address public thirdParty;
    uint256 public deadline;
    bool public isFundPresent;
    uint256 public amt;

    constructor(address _thirdParty, uint256 _deadlineInSecs) payable {
        require(msg.value > 0, "Amount must be greater than zero");
        
        employer = msg.sender;
        thirdParty = _thirdParty;
        deadline = block.timestamp + _deadlineInSecs;
        amt = msg.value;
        isFundPresent = true;
    }

    modifier onlyThirdParty() {
        require(msg.sender == thirdParty, "Only third party can call this function");
        _;
    }

    function releaseFunds(address payable _payee) external onlyThirdParty {
        require(isFundPresent, "No funds to release");
        require(block.timestamp <= deadline, "Deadline has passed");
        
        isFundPresent = false;
        _payee.transfer(amt);
        // selfdestruct(payable(thirdParty));
    }

    function refundFunds() external onlyThirdParty {
        require(isFundPresent, "No funds to refund");
        require(block.timestamp > deadline, "Deadline has not passed yet");
        
        isFundPresent = false;
        payable(employer).transfer(amt);
        // selfdestruct(payable(thirdParty));
    }
}
