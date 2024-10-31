import React from 'react';
import { Container, Header, Content, Button, Navbar, Nav, Panel, Stack, Footer } from 'rsuite';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import { useEffect, useState } from 'react';
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
    width: '100%',
    height: '100vh'
  };

  const sideStyle = {
    width: '50%',
    padding: '20px',
    boxSizing: 'border-box'
  };


    return (
        <div>
             <OwnerNavbar appearance="inverse" activeKey={activeKey} onSelect={setActiveKey}/>
      <div style={containerStyle}>
        <div style={{...sideStyle, width: '50%'}}>
          <Newjob />
        </div>
      </div>
        </div>
    );
}

export default Owner;