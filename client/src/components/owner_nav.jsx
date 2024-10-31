import { Navbar, Nav } from 'rsuite';
import { useNavigate } from 'react-router-dom';

const OwnerNavbar = ({ onSelect, activeKey, ...props }) => {
  const navigate = useNavigate();

  const handleBrandClick = () => {
    navigate('/dashboard');
  };

  const handleProjectsClick = () => {
    navigate('/owner_projects');   //abhi k liye saare jobs jo bhi dunia me upload kia h vo dikha do baad me filter kr lenge
  };

  const handleNewProjectsClick = () => {
    navigate('/owner');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <Navbar {...props}>
      <Navbar.Brand onClick={handleBrandClick} style={{ cursor: 'pointer' }}>
        Home
      </Navbar.Brand>
      <Nav onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item eventKey="2" onClick={handleProjectsClick}>
          My Projects
        </Nav.Item>     
        <Nav.Item eventKey="3" onClick={handleNewProjectsClick}>
          New Project
        </Nav.Item>      
      </Nav>
      <Nav pullRight>
        <Nav.Item onClick={handleProfileClick}>Profile</Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default OwnerNavbar;
