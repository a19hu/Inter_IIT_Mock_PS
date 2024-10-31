
import React, { useEffect, useState } from 'react';
import { Container, Header, Content, Button, Navbar, Nav, Panel, Stack, Footer } from 'rsuite';
import { FaUser, FaEnvelope } from 'react-icons/fa';

const Dashboard = ({ walletAddress }) => {

  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Retrieve account from localStorage
    const storedAccount = localStorage.getItem("metaMaskAccount");
    if (storedAccount) {
      setAccount(storedAccount);
      console.log("Retrieved MetaMask Account:", storedAccount); // Log to console
    }
  }, []);
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
        <Navbar appearance="inverse">
          <Navbar.Brand>My Dashboard</Navbar.Brand>
          <Nav pullRight>
            <Nav.Item icon={<FaEnvelope />} title="Messages" />
            <Nav.Item>{walletAddress ? walletAddress : "Not connected"}</Nav.Item>
            <Nav.Item icon={<FaUser />}>Profile</Nav.Item>
          </Nav>
        </Navbar>
      </Header>

      {/* Main Content Section */}
      <Content style={{ padding: '50px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <Stack alignItems="center" justifyContent="center" spacing={20}>
          <Panel bordered style={{ width: 300, textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
            <Button appearance="primary" size="lg" onClick={goToOwnerPage} block>
              Owner
            </Button>
          </Panel>
          <Panel bordered style={{ width: 300, textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
            <Button appearance="primary" size="lg" onClick={goToFreelancerPage} block>
              Freelancer
            </Button>
          </Panel>
        </Stack>
      </Content>

      {/* Footer Section */}
      <Footer style={{ textAlign: 'center', padding: '20px 0', backgroundColor: '#f1f1f1' }}>
        <p>
          © 2024 My Company | <a href="#privacy-policy">Privacy Policy</a> | <a href="#terms">Terms of Service</a>
        </p>
      </Footer>
    </Container>
  );
};

export default Dashboard;
