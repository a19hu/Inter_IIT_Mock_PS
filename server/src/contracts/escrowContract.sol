// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    address public employer;            // The person who initiates the project (owner)
    address public thirdParty;          // Trusted third party to arbitrate
    uint public amount;                 // Total escrow amount
    uint public deadline;               // Project deadline in Unix timestamp
    bool public isReleased;             // Track if funds are released

    // Track the status of the project
    enum ProjectStatus { Pending, Approved, Completed, Refunded }
    ProjectStatus public status;

    // Struct to track each freelancer
    struct Freelancer {
        address payable wallet;         // Freelancer's wallet address
    }

    mapping(address => Freelancer) public freelancers;
    address[] public freelancerAddresses;  // Store freelancer addresses for easy iteration

    event FundsDeposited(address indexed employer, uint amount);
    event FundsReleased(address indexed freelancer, uint amount);
    event FundsRefunded(address indexed employer, uint amount);

    modifier onlyEmployer() {
        require(msg.sender == employer, "Only the employer can call this.");
        _;
    }

    modifier onlyThirdParty() {
        require(msg.sender == thirdParty, "Only the third party can call this.");
        _;
    }

    constructor(address[] memory _freelancers, address _thirdParty) payable {
        require(msg.value > 0, "No funds sent for escrow.");
        
        employer = msg.sender;
        thirdParty = _thirdParty;
        amount = msg.value;
        deadline = block.timestamp + 1 minutes; // Set deadline to one minute from now
        status = ProjectStatus.Pending;
        isReleased = false;

        // Initialize freelancers
        for (uint i = 0; i < _freelancers.length; i++) {
            freelancers[_freelancers[i]] = Freelancer({
                wallet: payable(_freelancers[i])
            });
            freelancerAddresses.push(_freelancers[i]);
        }

        emit FundsDeposited(employer, amount);
    }

    // Function to release funds to the specified freelancer
    function releaseFunds(address _freelancer) public onlyThirdParty {
        require(status == ProjectStatus.Pending, "Project is not pending.");
        require(!isReleased, "Funds already released.");
        require(block.timestamp <= deadline, "Deadline has passed.");
        require(freelancers[_freelancer].wallet != address(0), "Invalid freelancer.");

        // Remove the check for approval status
        // Directly mark the status as completed and release funds
        isReleased = true;  // Prevent further releases
        status = ProjectStatus.Completed; // Mark project status as completed

        freelancers[_freelancer].wallet.transfer(amount);  // Transfer funds to freelancer

        emit FundsReleased(_freelancer, amount);
    }

    // Function to refund the employer if the deadline passes and no PR was approved
    function refundEmployer() public onlyEmployer {
        require(status == ProjectStatus.Pending, "Project is not pending.");
        require(block.timestamp > deadline, "Deadline has not passed.");
        require(!isReleased, "Funds already released.");

        isReleased = true;  // Prevent future releases or refunds
        status = ProjectStatus.Refunded;

        payable(employer).transfer(amount);  // Refund funds to the employer

        emit FundsRefunded(employer, amount);
    }


    // View function to get the list of freelancers
    function getFreelancerAddresses() public view returns (address[] memory) {
        return freelancerAddresses;
    }

    // New function to get details of a specific freelancer
    function getFreelancerDetails(address _freelancer) public view returns (address wallet) {
        require(freelancers[_freelancer].wallet != address(0), "Invalid freelancer.");
        Freelancer memory freelancer = freelancers[_freelancer];
        return (freelancer.wallet);
    }

    // New function to get all freelancers
    function getAllFreelancers() public view returns (Freelancer[] memory) {
        Freelancer[] memory allFreelancers = new Freelancer[](freelancerAddresses.length);
        for (uint i = 0; i < freelancerAddresses.length; i++) {
            allFreelancers[i] = freelancers[freelancerAddresses[i]];
        }
        return allFreelancers;
    }
}
