# Decentralized Todo Application

This is a decentralized todo application built using Hardhat for smart contract development, a Node.js backend, and a React-based frontend. The application allows users to create, complete, and remove tasks, with all data stored on the blockchain.

---
## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
   - Clone Repository
   - Go inside directory
   - Install Dependencies
   - Configure and Deploy
   - Run Application
3. [Project Structure](#project-structure)
4. [Available Scripts](#available-scripts)
5. [Contributing](#contributing)

---

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher) - [Download Node.js](https://nodejs.org/)
2. **npm** (comes with Node.js)
3. **Git** - [Download Git](https://git-scm.com/)

---

## Getting Started

## Step 1: Clone the Repository

Clone this repository to your local machine:

    git clone https://github.com/Kpraful/decentralized-todo-app.git
 

## STEP 2: Go inside directory

    cd decentralized-todo-app

## STEP 3: Run SCRIPTS
    npm run hardhat
    npm run deploy 
    npm run start 
(Copy `Privatekey` address of any wallet after running  `npm run hardhat` and paste it in `.env` -> `WALLET_PRIVATE_KEY` inside `server` folder )

(Copy deployment adress from `npm run deploy`  and paste it in `.env` -> `CONTRACT_ADDRESS` inside `server` folder)


## PROJECT STRUCTURE

    /decentralized-todo-app
    │
    ├── /server               # Backend API (Node.js)
    │   └── server.js         # Server entry point
    │
    ├── /todo-dapp            # React frontend
    │   └── src/              # Frontend source code
    │   └── public/           # Public assets for the React app
    │   └── package.json      # Frontend dependencies and scripts
    │
    ├── /contracts            # Smart contract files (Solidity)
    │   └── Todo.sol          # Main smart contract
    │
    ├── /scripts              # Hardhat scripts (deploy, etc.)
    │   └── deploy.js         # Smart contract deployment script
    │
    ├── hardhat.config.js     # Hardhat configuration
    ├── package.json          # Project-level dependencies and scripts
    └── README.md             # This file

## AVAILABLE SCRIPTS
    "hardhat": "npm install -y && npx hardhat compile && npx hardhat node",
    "deploy": "npx hardhat run scripts/deploy.js --network localhost",
    "frontend": "cd todo-dapp && npm install -y && npm run dev",
    "backend": "cd server && npm install -y && nodemon server.js",
    "start": "concurrently  \"npm run backend\" \"npm run frontend\""


## Contributing

    Praful Katare