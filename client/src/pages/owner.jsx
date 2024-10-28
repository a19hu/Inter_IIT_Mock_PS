import React from 'react';
import { Container, Header, Content, Button, Navbar, Nav, Panel, Stack, Footer } from 'rsuite';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import CNavbar from '../components/navbar';
import Newjob from '../components/newjob';

const Owner = () => {
    const [activeKey, setActiveKey] = useState(null); // for navbar

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
             <CNavbar appearance="inverse" activeKey={activeKey} onSelect={setActiveKey}/>
      <div style={containerStyle}>
        <div style={{...sideStyle, width: '50%'}}>
          <Newjob />
        </div>
      </div>
        </div>
    );
}

export default Owner;