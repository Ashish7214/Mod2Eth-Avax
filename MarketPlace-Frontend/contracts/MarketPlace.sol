// contracts/MarketPlace.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Marketplace {
    struct Product {
        uint256 id;
        string name;
        uint256 price;
        address seller;
        bool isAvailable;
    }

    uint256 public productCount;
    mapping(uint256 => Product) public products;

    event ProductAdded(uint256 indexed id, string name, uint256 price, address indexed seller);
    event ProductPurchased(uint256 indexed id, string name, uint256 price, address indexed seller, address indexed buyer);

    function addProduct(string memory name, uint256 price) external {
        require(price > 0, "Price must be greater than zero");

        productCount++;
        products[productCount] = Product(productCount, name, price, msg.sender, true);

        emit ProductAdded(productCount, name, price, msg.sender);
    }

    function purchaseProduct(uint256 productId) external payable {
        require(productId > 0 && productId <= productCount, "Invalid product ID");
        Product memory product = products[productId];
        require(product.isAvailable, "Product not available");
        require(msg.value >= product.price, "Insufficient funds");

        address payable seller = payable(product.seller);
        seller.transfer(product.price);

        emit ProductPurchased(productId, product.name, product.price, product.seller, msg.sender);

        products[productId].isAvailable = false;
    }

    function withdraw() external {
        require(msg.sender == owner(), "Only the contract owner can withdraw");
        payable(owner()).transfer(address(this).balance);
    }

    function owner() internal view returns (address) {
        return address(this);
    }
}

