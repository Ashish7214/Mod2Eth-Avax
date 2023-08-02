# Marketplace DApp with React Frontend

This project demonstrates a decentralized marketplace application (DApp) built using Ethereum smart contracts along with a React frontend to interact with the contracts. The purpose of this project is to showcase how to deploy and interact with smart contracts on the Ethereum blockchain using Hardhat and Metamask.

## Description

The Marketplace DApp allows users to buy and sell products using Ether. Users can add products with their names and prices, and other users can purchase those products with Ether. The smart contract handles the transactions and ensures secure and transparent trading.

## Functionality

The smart contract `Marketplace` includes the following functions:

1. `addProduct(string memory name, uint256 price)`: Allows users to add a new product with its name and price.

2. `purchaseProduct(uint256 productId) external payable`: Allows users to purchase a product by providing the product ID and the required Ether value.

## How to Use

Follow the steps below to deploy the Marketplace smart contract on a local Ethereum development environment and interact with it using the React frontend.

### Prerequisites

1. Install Node.js and npm (Node Package Manager) on your system.
2. Install the MetaMask browser extension to connect to your local Ethereum network.

### Smart Contract Deployment

1. Clone the repository: `git clone https://github.com/Ashish7214/Mod2Eth-Avax.git`
2. Navigate to the project directory: `cd Mod2Eth-Avax/MarketPlace-Frontend`
3. Install project dependencies by running: `npm install`
4. Start the local Ethereum network (Hardhat's built-in node) by running: `npx hardhat node`
5. In a new terminal, deploy the contract to the local network by running: `npx hardhat run deploy.js --network localhost`
6. Note down the deployed contract address as it will be required in the frontend.

### Frontend Setup and Running

1. In the `App.js` file, replace `contractAddress` variable with the address of the deployed contract.
2. Start the React frontend by running: `npm start`
3. Open the application in your browser, and if you are using MetaMask, make sure you are connected to your local Ethereum network.
4. Click the "Connect Wallet" button to connect your wallet to the application.
5. Enter a product name and price in the input fields and click "Add Product" to add the product.
6. The added product will be visible in the "Available Products" section.
7. To purchase a product, click the "Purchase" button next to the desired product. You will be prompted to confirm the transaction in MetaMask.
8. After the transaction is confirmed, the product will be marked as "Not available" in the "Available Products" section.

### Note

- Make sure you have Ether in your wallet to perform transactions on the local network.
- The frontend assumes you are using MetaMask; if using a different wallet, make sure to adjust the provider setup accordingly.

## Author

**Ashish Kumar**

- GitHub: [Ashish7214](https://github.com/Ashish7214)
- Email: 22BCS80055@cuchd.in

## License

This project is licensed under the [MIT License](LICENSE).
