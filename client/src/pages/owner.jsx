import React, { useEffect, useState } from 'react';
import { Container, Header, Content, Button, Navbar, Nav, Panel, Stack, Footer } from 'rsuite';
import OwnerNavbar from '../components/owner_nav';
import Newjob from '../components/newjob';

const Owner = () => {
  const [activeKey, setActiveKey] = useState(null); // for navbar
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Retrieve account from localStorage
    const storedAccount = localStorage.getItem("metaMaskAccount");
    if (storedAccount) {
      setAccount(storedAccount);
      console.log("Retrieved MetaMask Account:", storedAccount); // Log to console
    }
  }, []);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
    width: '100%',

    height: '100vh'
  };

  const boxStyle = {
    width: '80%', // Adjust width as needed
    maxWidth: '600px', // Set a max width

    padding: '20px',
    backgroundColor: '#ffffff', // White background for the box
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    borderRadius: '8px' ,// Rounded corners
  };

  return (
    <div>
      <OwnerNavbar appearance="inverse" activeKey={activeKey} onSelect={setActiveKey} />
      <div style={containerStyle}>
        <div style={boxStyle}>
          <Newjob />
        </div>
      </div>
    </div>
  );
};

export default Owner;
