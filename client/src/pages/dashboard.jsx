import React from 'react';
import { Container, Header, Content, Button, Navbar, Nav, Panel, Stack, Footer } from 'rsuite';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import 'rsuite/dist/rsuite.min.css';

const Dashboard = () => {
  const walletAddress = "0xYourWalletAddress"; // Replace with dynamic wallet address

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
        <Navbar style={{ backgroundColor: '#007bff' }}> {/* Change the color to blue */}
          <Navbar.Brand style={{ color: '#ffffff' }}>My Dashboard</Navbar.Brand> {/* Make text white for contrast */}
          <Nav pullRight>
            <Nav.Item style={{ color: '#ffffff' }}>{walletAddress}</Nav.Item>
            <Nav.Item icon={<FaUser />} onClick={goToProfilePage} style={{ color: '#ffffff', cursor: 'pointer' }}>
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
      {/* Footer Section */}
<Footer style={{ textAlign: 'center', padding: '10px 0', backgroundColor: '#343a40', color: '#ffffff' }}> {/* Change background color and text color */}
  <p>© 2024 My Company | <a href="#privacy-policy" style={{ color: '#ffffff' }}>Privacy Policy</a> | <a href="#terms" style={{ color: '#ffffff' }}>Terms of Service</a></p>
</Footer>

    </Container>
  );
};

export default Dashboard;
