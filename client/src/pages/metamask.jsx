import React, { useEffect, useState } from 'react';
import { Container, Content, Button, Panel, Stack } from 'rsuite';
import { stringifyReactNode } from 'rsuite/esm/internals/utils';

const Metamask = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
      const storedUserData = localStorage.getItem("userData");
      console.log(storedUserData);
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        console.log("User Data on Dashboard:", userData);
      } else {
        console.log("No user data found in localStorage.");
      }
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
      const userAccount = accounts[0];
      setAccount(userAccount);

      // Log account details to the console and store in localStorage
      console.log("Connected MetaMask Account:", userAccount);
      localStorage.setItem("metaMaskAccount", userAccount);
    } catch (error) {
      console.error("User rejected the connection request", error);
    }
  };

  return (
    <Container style={{ height: '100vh' }}>
      <Content>
        <Stack alignItems="center" justifyContent="center" style={{ height: '100%' }}>
          <Panel bordered style={{ textAlign: 'center', width: 400 }}>
            {isMetaMaskInstalled ? (
              <div>
                <h1>Welcome to MetaMask Login</h1>
                {account ? (
                  <div>
                    <p>Connected Account: {account}</p>
                    <Button onClick={() => window.location.href = '/dashboard'}>Proceed to Next Page</Button>
                  </div>
                ) : (
                  <Button onClick={connectMetaMask}>Connect with MetaMask</Button>
                )}
              </div>
            ) : (
              <p>Redirecting to install MetaMask...</p>
            )}
          </Panel>
        </Stack>
      </Content>
    </Container>
  );
}

export default Metamask;
