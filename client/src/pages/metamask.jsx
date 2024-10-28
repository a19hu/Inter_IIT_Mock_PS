import React from 'react'
import { useEffect, useState } from 'react';
import { Container, Header, Content, Button, Navbar, Panel, Stack } from 'rsuite';


const Metamask = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      setIsMetaMaskInstalled(true);
    } else {
      // Redirect to MetaMask download if not installed
      window.location.href = 'https://metamask.io/download.html';
    }
  }, []);

  const connectMetaMask = async () => {
    try {
      // Request account access if MetaMask is installed
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      // Redirect to next page after login
      window.location.href = '/dashboard';
    } catch (error) {
      console.error("User rejected the connection request");
    }
  };

  return (
    <div>
      {isMetaMaskInstalled ? (
        <div>
          <h1>Welcome to MetaMask Login</h1>
          {account ? (
            <div>
              <p>Connected Account: {account}</p>
              <button onClick={() => window.location.href = '/dashboard'}>Proceed to Next Page</button>
            </div>
          ) : (
            <button onClick={connectMetaMask}>Connect with MetaMask</button>
          )}
        </div>
      ) : (
        <p>Redirecting to install MetaMask...</p>
      )}
    </div>
  );
}

export default Metamask





