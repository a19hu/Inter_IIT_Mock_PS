import React from 'react';
import { Navbar, Nav } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const FreelancerNavbar = ({ onSelect, activeKey, ...props }) => {
  const navigate = useNavigate();

  const handleBrandClick = () => {
    navigate('/dashboard');
  };

  const handleAllProjectsClick = () => {
    navigate('/existingjob'); // Ensure the route matches your routing setup
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <Navbar appearance="inverse" style={styles.navbar} {...props}>
      <Navbar.Brand onClick={handleBrandClick} style={styles.brand}>
        Home
      </Navbar.Brand>
      
      <Nav onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item eventKey="1" onClick={handleAllProjectsClick} style={styles.navItem}>
          All Projects
        </Nav.Item>
      </Nav>
      
      <Nav pullRight>
        <Nav.Item icon={<FaUser />}eventKey="2" onClick={handleProfileClick} style={styles.navItem}>
          Profile
        </Nav.Item>
        {/* <Nav.Item icon={<FaUser />} onClick={goToProfilePage} style={{ cursor: 'pointer' }}>
              Profile
            </Nav.Item> */}
      </Nav>
    </Navbar>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#4A90E2',
    color: 'white',
  },
  brand: {
    cursor: 'pointer',
    color: 'white',
  },
  navItem: {
    color: 'white',
  }
};

export default FreelancerNavbar;
