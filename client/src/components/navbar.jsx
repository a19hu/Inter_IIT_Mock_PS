import { Navbar, Nav } from 'rsuite';
import { useNavigate } from 'react-router-dom';

const OwnerNavbar = ({ onSelect, activeKey, ...props }) => {
  const navigate = useNavigate();

  const handleBrandClick = () => {
    navigate('/dashboard');
  };

  const handleProjectsClick = () => {
    navigate('/freelancer');   //abhi k liye saare jobs jo bhi dunia me upload kia h vo dikha do baad me filter kr lenge
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <Navbar {...props}>
      <Navbar.Brand onClick={handleBrandClick} style={{ cursor: 'pointer' }}>
        Blockchain
      </Navbar.Brand>
      <Nav onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item eventKey="2" onClick={handleProjectsClick}>
          All Projects
        </Nav.Item>         
      </Nav>
      <Nav pullRight>
        <Nav.Item onClick={handleProfileClick}>Profile</Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default OwnerNavbar;
