import React from 'react';
import { Container, Header, Content, Button, Navbar, Nav, Panel, Stack, Footer } from 'rsuite';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import 'rsuite/dist/rsuite.min.css';
import CustomFooter from '../components/footer';


const Dashboard = () => {
  const walletAddress = window.ethereum.selectedAddress || "0xYourWalletAddress"; // Replace with dynamic wallet address from MetaMask


//when i click on wallet address it gets copied to clipboard
  const copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = walletAddress;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Wallet address copied to clipboard');
    console.log('Wallet address copied to clipboard');
  };

  // Navigation functions
  const goToOwnerPage = () => {
    window.location.href = '/owner_projects';
  };
  const goToFreelancerPage = () => {
    window.location.href = '/freelancer';
  };
  const goToProfilePage = () => {
    window.location.href = '/profile';
  };

  return (
    <Container>
      {/* Header Section */}
      <Header>
        <Navbar appearance='inverse'>
          <Navbar.Brand>Home</Navbar.Brand>
          <Nav pullRight>
            <Nav.Item icon={<FaEnvelope/>} onClick={copyToClipboard} >{walletAddress}</Nav.Item>
            <Nav.Item icon={<FaUser />} onClick={goToProfilePage} style={{ cursor: 'pointer' }}>
              Profile
            </Nav.Item>
          </Nav>
        </Navbar>
      </Header>

      {/* Main Content Section */}
      <Content style={{ padding: '50px 20px', backgroundColor: '#f5f5f5' }}>
        <Stack alignItems="center" justifyContent="center" spacing={20} style={{ height: '60vh' }}>
          <Panel 
            bordered 
            style={{ 
              width: 300, 
              textAlign: 'center', 
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
              backgroundColor: '#ffffff', 
              transition: 'transform 0.2s', 
            }} 
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} 
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Button 
              appearance="primary" 
              size="lg" 
              onClick={goToOwnerPage} 
              style={{ width: '100%', height: '160px', fontSize: '18px' }}
            >
              Owner
            </Button>
          </Panel>

          <Panel 
            bordered 
            style={{ 
              width: 300, 
              textAlign: 'center', 
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
              backgroundColor: '#ffffff', 
              transition: 'transform 0.2s', 
            }} 
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} 
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Button 
              appearance="primary" 
              size="lg" 
              onClick={goToFreelancerPage} 
              style={{ width: '100%', height: '160px', fontSize: '18px' }}
            >
              Freelancer
            </Button>
          </Panel>
        </Stack>
      </Content>

      {/* Footer Section */}
      <CustomFooter />
     
    </Container>
  );
};

export default Dashboard;
