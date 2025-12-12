# Supply Chain DApp

A blockchain-based supply chain management system built with Solidity, React, and Truffle.

## Overview

This decentralized application (DApp) tracks pharmaceutical products through the supply chain from manufacturer to customer, ensuring transparency and security using blockchain technology.

## Features

- Track products through multiple supply chain stages
- Role-based access control (Raw Material Supplier, Manufacturer, Distributor, Retailer)
- Transparent and secure transactions
- Smart contract automation

## Technology Stack

- **Blockchain**: Ethereum/Gode Testnet
- **Smart Contracts**: Solidity
- **Frontend**: React.js
- **Development**: Truffle Suite
- **Wallet**: MetaMask
- **Blockchain Integration**: Web3.js

## Prerequisites

- Node.js
- Git
- Ganache
- MetaMask browser extension
- VSCode (recommended)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/faizack619/Supply-Chain-Blockchain.git
cd Supply-Chain-Blockchain
```

2. Install Truffle globally:
```bash
npm install -g truffle
```

3. Install dependencies:
```bash
npm install
```

4. Compile smart contracts:
```bash
truffle compile
```

5. Start Ganache and update `truffle-config.js` with your RPC server details

6. Deploy smart contracts:
```bash
truffle migrate
```

7. Navigate to client folder and start the app:
```bash
cd client
npm install
npm start
```

## Configuration

1. Open Ganache and create a new workspace
2. Copy the RPC server address
3. Update `truffle-config.js` with your Ganache RPC settings
4. Connect MetaMask to your local Ganache network
5. Import Ganache accounts into MetaMask using private keys

## Usage

The application runs on `http://localhost:3000` by default. Connect your MetaMask wallet and interact with the supply chain system through the web interface.

## Smart Contract Roles

- **Contract Owner**: Authorizes participants
- **Raw Material Supplier**: Provides raw materials
- **Manufacturer**: Produces products
- **Distributor**: Distributes products
- **Retailer**: Sells to customers

## License

MIT License

## Resources

- [Solidity Documentation](https://docs.soliditylang.org/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Truffle Documentation](https://www.trufflesuite.com/docs)
- [Ganache Documentation](https://www.trufflesuite.com/docs/ganache/overview)