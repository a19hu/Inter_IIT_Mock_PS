import Web3 from 'web3';
import { CONTRACT_BYTECODE, CONTRACT_ABI } from '../contracts/escrowContractABI.json'; // Ensure ABI is imported for contract interaction
import Project from '../models/projectModel.js';
import User from '../models/userModel.js';
import "dotenv/config"

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

// Function to deploy the Escrow contract
export const deploySmartContract = async (projectid) => {
    try {
        // Connect to Ethereum provider
        const project = await Project.findById(projectid);
        if (!project) throw new Error('Project not found.');

        const amount = project.amountInWei; // Amount in Wei (should already be in the correct format)
        const thirdParty = process.env.APP_WALLET; // Important: third party wallet address
        const deadlineInSecs = project.deadline;

        // Get the account that will deploy the contract
        const accounts = await web3.eth.getAccounts(); // Use an unlocked account or a wallet with sufficient funds
        const deployerAccount = accounts[0]; // Assume the first account is the deployer

        // Create the contract instance
        const contract = new web3.eth.Contract(CONTRACT_ABI); // ABI is needed for contract interactions

        // Deploy the contract with specified parameters
        const deployTx = contract.deploy({
            data: CONTRACT_BYTECODE,
            arguments: [thirdParty, deadlineInSecs],
        });

        // Estimate gas for the transaction
        const gasEstimate = await deployTx.estimateGas({ from: deployerAccount, value: amount });

        // Send the transaction
        const deployedContract = await deployTx.send({
            from: deployerAccount,
            gas: gasEstimate,
            value: amount, // Send Ether with the transaction if required
        });

        // Log contract address and transaction hash
        console.log(`Contract deployed at address: ${deployedContract.options.address}`);
        console.log(`Transaction hash: ${deployedContract.transactionHash}`);

        return deployedContract.options.address; // Return contract address for further use
    } catch (error) {
        console.error('Error deploying smart contract:', error);
        throw new Error('Smart contract deployment failed.');
    }
};

// Function to trigger the releaseFunds function on the smart contract
export const triggerSmartContract = async (projectId, freelancerGithubName) => {
    try {
        // Step 1: Find the smart contract address associated with the project
        const contractAddress = await getContractAddressByProjectId(projectId);
        if (!contractAddress) {
            console.error(`Smart contract address for project ID ${projectId} not found.`);
            return;
        }

        // Step 2: Get the wallet address linked to the freelancer's GitHub username
        const walletAddress = await getWalletAddressByGithubUsername(freelancerGithubName);
        if (!walletAddress) {
            console.error(`Wallet address for GitHub username ${freelancerGithubName} not found.`);
            return;
        }

        // Step 3: Create a contract instance and call releaseFunds
        const contract = new web3.eth.Contract(CONTRACT_BYTECODE, contractAddress);

        // Assume that the account performing the transaction is unlocked or is using MetaMask or similar for transaction signing
        const accounts = await web3.eth.getAccounts(); // Replace with appropriate signing account or method
        const fromAccount = accounts[0]; // Assuming the first account is used

        // Call releaseFunds on the contract, passing the wallet address as the payee
        const tx = await contract.methods.releaseFunds(walletAddress).send({ from: fromAccount });

        console.log(`Funds released to ${walletAddress} for project ID ${projectId}. Transaction hash: ${tx.transactionHash}`);
    } catch (error) {
        console.error(`Error triggering smart contract for project ID ${projectId}:`, error);
    }
};

export const getContractAddressByProjectId = async (projectId) => {
    try {
        const project = await Project.findById(projectId).select('smartContractAddress');
        return project ? project.smartContractAddress : null; // Return the contract address or null if not found
    } catch (error) {
        console.error(`Error fetching contract address for project ID ${projectId}:`, error);
        throw new Error('Could not retrieve contract address.');
    }
};

export const getWalletAddressByGithubUsername = async (githubUsername) => {
    try {
        const user = await User.findOne({ githubId: githubUsername }).select('walletAddress');
        return user ? user.walletAddress : null; // Return the wallet address or null if not found
    } catch (error) {
        console.error(`Error fetching wallet address for GitHub username ${githubUsername}:`, error);
        throw new Error('Could not retrieve wallet address.');
    }
};