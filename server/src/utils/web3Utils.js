import Web3 from 'web3';
import CONTRACT_ABI_JSON from '../contracts/escrowContractABI.json' with { type: "json" }; // Ensure ABI is imported for contract interaction
import CONTRACT_BYTECODE_JSON from '../contracts/escrowContractBYTECODE.json' with { type: "json" };
import Project from '../models/projectModel.js';
import User from '../models/userModel.js';
import "dotenv/config"

const CONTRACT_ABI = CONTRACT_ABI_JSON.abi
const CONTRACT_BYTECODE = CONTRACT_BYTECODE_JSON.bytecode

const web3 = new Web3(new Web3.providers.HttpProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`, {
    headers: [
        {
            name: 'Authorization',
            value: `Basic ${Buffer.from(`${process.env.INFURA_PROJECT_ID}:${process.env.INFURA_SECRET_KEY}`).toString('base64')}`
        }
    ]
}));// metamask here? 
//`https://ethereum.stackexchange.com/questions/67145/how-to-connect-web3-with-metamask`

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

        // Encode the transaction data to call releaseFunds with the specified wallet address
        const txData = contract.methods.releaseFunds(walletAddress).encodeABI();

        // Step 4: Define the transaction parameters
        const txParams = {
            to: contractAddress,
            data: txData,
            gas: await contract.methods.releaseFunds(walletAddress).estimateGas(), // Estimate gas required
            chainId: await web3.eth.getChainId(),
        };

        // Step 5: Sign the transaction with the private key from .env
        const signedTx = await web3.eth.accounts.signTransaction(txParams, `0x${process.env.WALLET_PRIVATE_KEY}`);

        // Step 6: Send the signed transaction to the network
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log(`Funds released to ${walletAddress} for project ID ${projectId}. Transaction hash: ${receipt.transactionHash}`);
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