### Project Design: Trustless Freelancer Contribution Platform (Web3)

This project is focused on creating a decentralized platform where freelancers can contribute to projects and get paid automatically using smart contracts once the contribution is approved. Below is the comprehensive plan that covers architecture, features, API design, models, team allocation, and the workflow over a 10-day period.

---

### Key Features of the Platform:

1. **User Authentication:**
   - **GitHub OAuth**: Freelancers authenticate using their GitHub account.
   - **MetaMask Wallet Integration**: Freelancers connect their Ethereum wallet via MetaMask.  

2. **Project Contribution:**
   - **Request Contribution**: Freelancers can request to contribute to an open project.
   - **Contribution Approval**: Employers approve the contribution, which automatically triggers the creation of a smart contract.
   - **Submit Pull Request**: Freelancers submit PRs for contributions.
   - **Contribution Status**: Freelancers can monitor the status of their contribution. 

3. **Smart Contract Execution:**
   - Payments are handled automatically using smart contracts on Ethereum.
   - Need lot of stuff Here

4. **Other Features As Discussed (Optional):**
   - Employers can approve/reject contributions, manage freelancer payments, and track all project contributions.
   - Registration Window for Contributors to contribute for particualr Issue.
   

---

### Software Architecture

#### 1. **Frontend**: 
   - **Stack**: React (or Next.js), MetaMask Integration, GitHub OAuth.
   - **Components**: 
     - Login Page (GitHub Authentication)
     - Dashboard (Freelancer and Employer views)
     - Project Details Page/List of Projects (Request contribution)
     - PR Submission Page (Submit PR)
     - Contribution Status Page
   - **Libraries**: Axios (for API communication), Ethers.js (for Ethereum interaction).

#### 2. **Backend**: 
   - **Stack**: Node.js, Express.js, MongoDB.
   - **APIs**:
     - Authentication: GitHub OAuth, MetaMask wallet.
     - Contribution flow (request, approval, status check).
     - Smart contract interaction with Ethereum blockchain.
   - **Services**:
     - GitHub PR verification and contribution status tracking.
     - MetaMask wallet integration for freelancers.
     - Deployment and execution of smart contracts.

#### 3. **Smart Contracts**: 
   - **Stack**: Solidity, Ethereum. (Can keep a copy of same in Aptos/Move)
   - **Contracts**:
     - Contribution Payment Contract: Created when employer approves freelancer’s request. Handles payments once PR is merged.
     - PR Status Validator Contract: Validates the status of PR from GitHub before releasing funds.(This can either be done in Backend or here too)
     - Need More points Here which we will discuss as the projects moves forward
   - **Deployed on**: Ethereum testnet (e.g., Goerli or Ropsten).

#### 4. **Database**:
   - **Stack**: MongoDB (NoSQL).
   - **Collections**: (For now these are models required We can Change afterwards)
     - Users (store freelancer/employer data).
     - Projects (store open projects available for contribution).
     - Contributions (track each freelancer’s contribution to projects).
     - Transactions (track smart contract transactions and payments).
     

---

### High-Level System Architecture

```plaintext
Client (Frontend) -> REST API (Backend) -> MongoDB (Database)
                                  |
                           Ethereum (Blockchain)
```

- **Frontend**: React/Next.js interfaces for both freelancers and employers. GitHub OAuth and MetaMask wallet will be used here.
- **Backend**: REST APIs for handling requests between frontend and blockchain. Uses Express.js for routing and MongoDB for data persistence.
- **Blockchain**: Ethereum blockchain will handle the smart contracts for each contribution.

---

### Workflow and Responsibilities Breakdown:

1. **Freelancer**:
   - Login via GitHub OAuth.
   - Browse available projects to contribute.
   - Request to contribute to a project.
   - Submit PR to GitHub.
   - Check contribution status.
   - Receive payment in their wallet after PR is merged.

2. **Employer**:
   - Approve freelancer’s request to contribute.
   - Deploy smart contract for the contribution.
   - Manage contributions, PR approvals, and payments.

---

### Database Models (These All are prototypes, we will discuss once smart contracts get sorted)

1. **User Model**:
   ```js
   const UserSchema = new mongoose.Schema({
     githubId: String,
     name: String,
     email: String,
     walletAddress: String,
     role: { type: String, enum: ['freelancer', 'employer'] },
   });
   ```

2. **Project Model**:
   ```js
   const ProjectSchema = new mongoose.Schema({
     issueId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    applicationDate: {
        type: Date,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    freelancers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    prIds: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['resolved', 'unresolved'],
        default: 'unresolved'
    }
   });
   ```


---

### API Endpoints

1. **Authentication**:
   - `POST /auth/login`: Initiate GitHub OAuth login.
   - `POST /auth/wallet`: Add MetaMask wallet address.
  
2. **Projects**:
   - `GET /projects`: Get all open projects.
   - `POST /projects`: Create a new project.
   - `GET /projects/:projectid`: Get project details.
   - `POST /projects/:projectid/apply`: Apply to contribute on project (before application deadline).
   - `GET /projects/:projectid/remove/:freelancerid`: Disapprove freelancer application (only Project Owner).
   - `POST /projects/:projectid/submitPR`: Submit contribution (github pull-request ID) (project freelancers only).
   - `GET /projects/:projectid/status`: Get Project Status
---

### Day-by-Day Plan: (This Plan is purely tentative but have to stick to the deadline which is 31st Oct)

**Day 1-2**: 
- **Requirement Analysis & Finalization**:
  - Finalize all the required features, API structure, smart contract details, and GitHub OAuth/MetaMask integration.
  - Create a full design document and a feature roadmap.
  - Split into two teams: Backend (Team 1) and Frontend (Team 2).

**Day 3-4**: 
- **Frontend Development** (Team 2):
  - Implement GitHub OAuth integration.
  - Set up MetaMask integration for wallet connection.
  - Build basic dashboard for freelancers and employers.
  - Create project browsing and contribution request pages.
  
- **Backend Development** (Team 1):
  - Set up Node.js server with Express.js.
  - Implement GitHub OAuth and wallet authentication APIs.
  - Design and implement project and contribution-related APIs.

**Day 5-6**: 
- **Frontend** (Team 2):
  - Build PR submission and contribution status check pages.
  - Implement MetaMask interaction for triggering smart contracts.
  
- **Backend** (Team 1):
  - Integrate MongoDB to store projects, contributions, and user data.
  - Build smart contract interaction layer (triggering contracts, releasing payments).
  - BrainStorm Over the required Functions,Struct Features ETC

**Day 7**:
- **Smart Contract Development**:
  - Write Solidity contracts for payment handling and PR validation.
  - Deploy test contracts on Ethereum testnet (Goerli/Ropsten) (Yet to be decided).
  
**Day 8-9**:
- **Integration & Testing**:
  - Complete API integration with the frontend.
  - Test end-to-end flow from project request to payment release.
  - Perform smart contract interaction testing.
  
**Day 10**:
- **Final Testing & Bug Fixing**:
  - Conduct final integration tests for edge cases (e.g., PR rejection).
  - Optimize smart contract gas usage and API performance.
  - Prepare for deployment or hackathon presentation.

---

### Team Allocation

**Team 1 (Backend/Smart Contract Development)**:
- Focus: API development, database management, smart contract deployment.
- Responsibilities:
  - Implementing Node.js APIs.
  - Managing MongoDB for user, project, and contribution data.
  - Writing and deploying Solidity contracts.

**Team 2 (Frontend Development)**: This will be completed by 2-3 days then al can focus on Smart Contracts
- Focus: Building the user interface, integrating MetaMask and GitHub OAuth.
- Responsibilities:
  - Implementing GitHub OAuth and MetaMask wallet integration.
  - Building the user dashboard, project pages, and contribution flow UI.
  - Testing frontend-backend integration.

---
