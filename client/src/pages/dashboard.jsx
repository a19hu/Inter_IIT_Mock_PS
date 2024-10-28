import React from 'react';
import { Container, Header, Content, Button, Navbar, Nav, Panel, Stack, Footer } from 'rsuite';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import 'rsuite/dist/rsuite.min.css'; // Import rsuite CSS


const Dashboard = () => {
  const walletAddress = "0xYourWalletAddress"; // Replace with dynamic wallet address

  // Navigation functions
  const goToOwnerPage = () => {
    window.location.href = '/owner';
  };
  const goToFreelancerPage = () => {
    window.location.href = '/freelancer';
  };

  return (
    <Container>
      {/* Header Section */}
      <Header>
        <Navbar>
          <Navbar.Brand>My Dashboard</Navbar.Brand>
          <Nav pullRight>
            <Nav.Item icon={<FaEnvelope />} />
            <Nav.Item>{walletAddress}</Nav.Item>
            <Nav.Item icon={<FaUser />}>Profile</Nav.Item>
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
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Add shadow for depth
            backgroundColor: '#ffffff', // White background for panels
            transition: 'transform 0.2s', // Smooth transform effect
          }} 
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} 
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Button 
            appearance="primary" 
            size="lg" 
            onClick={goToOwnerPage} 
            style={{ width: '100%', height: '160px', fontSize: '18px' }} // Full width and height for buttons
          >
            Owner
          </Button>
        </Panel>

        <Panel 
          bordered 
          style={{ 
            width: 300, 
            textAlign: 'center', 
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Add shadow for depth
            backgroundColor: '#ffffff', // White background for panels
            transition: 'transform 0.2s', // Smooth transform effect
          }} 
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} 
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Button 
            appearance="primary" 
            size="lg" 
            onClick={goToFreelancerPage} 
            style={{ width: '100%', height: '160px', fontSize: '18px' }} // Full width and height for buttons
          >
            Freelancer
          </Button>
        </Panel>
      </Stack>
    </Content>

      {/* Footer Section */}
      <Footer style={{ textAlign: 'center', padding: '10px 0' }}>
        <p>© 2024 My Company | <a href="#privacy-policy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
      </Footer>
    </Container>
  );
};

export default Dashboard;
