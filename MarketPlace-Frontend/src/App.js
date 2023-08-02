import React, { useState, useEffect } from 'react';
import './App.css';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import MarketplaceABI from './contracts/MarketplaceABI.json';

const App = () => {
  const [productCount, setProductCount] = useState(0);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentProductName, setCurrentProductName] = useState('');
  const [currentProductPrice, setCurrentProductPrice] = useState('');

  const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

  useEffect(() => {
    const initializeProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        setProvider(new ethers.providers.Web3Provider(provider));
      } else {
        console.error('Please install Metamask to interact with the wallet.');
      }
    };

    initializeProvider();
  }, []);

  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(contractAddress, MarketplaceABI.abi, signer));
    }
  }, [provider]);

  const getWalletAddress = async () => {
    try {
      const accounts = await provider.send('eth_requestAccounts', []);
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error('Error connecting to the wallet:', error);
    }
  };

  const addProduct = async () => {
    if (productName && productPrice && contract) {
      try {
        await contract.addProduct(productName, ethers.utils.parseEther(productPrice));
        setCurrentProductName(productName); // Set the current product name
        setCurrentProductPrice(productPrice); // Set the current product price
        getProducts();
        setProductName('');
        setProductPrice('');
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  };

  const purchaseProduct = async (productId, productPrice) => {
    if (contract) {
      try {
        await contract.purchaseProduct(productId, { value: productPrice });
        getProducts();
      } catch (error) {
        console.error('Error purchasing product:', error);
      }
    }
  };

  const getProducts = async () => {
    if (contract) {
      try {
        const count = await contract.productCount();
        setProductCount(count.toNumber());

        const productList = [];
        for (let i = 1; i <= count.toNumber(); i++) {
          const product = await contract.products(i);
          productList.push({
            id: product.id.toNumber(),
            name: product.name,
            price: ethers.utils.formatEther(product.price),
            seller: product.seller,
            isAvailable: product.isAvailable,
          });
        }

        setProducts(productList);
      } catch (error) {
        console.error('Error getting products:', error);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) {
      getWalletAddress();
      getProducts();
    }
  }, [contract]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Marketplace Frontend</h1>
      <p>Wallet Address: {walletAddress}</p>
      <div>
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Price (Ether)"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>
      <div>
        <h2>Current Product Details</h2>
        <p>
          <strong>Name:</strong> {currentProductName}
        </p>
        <p>
          <strong>Price:</strong> {currentProductPrice} Ether
        </p>
      </div>
      <div>
        <h2>Available Products</h2>
        {products.map((product) => (
          <div key={product.id}>
            <p>
              <strong>Name:</strong> {product.name}
            </p>
            <p>
              <strong>Price:</strong> {product.price} Ether
            </p>
            <p>
              <strong>Seller:</strong> {product.seller}
            </p>
            {product.isAvailable ? (
              <button onClick={() => purchaseProduct(product.id, ethers.utils.parseEther(product.price))}>
                Purchase
              </button>
            ) : (
              <p>This product is not available</p>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;






