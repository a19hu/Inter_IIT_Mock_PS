import React, { useEffect, useState } from 'react';
import OwnerNavbar from '../components/owner_nav';
import FilteredJobsButtons from '../components/filteredJobsButtons';

const Freelancer2 = () => {
  const [activeKey, setActiveKey] = useState(null);

  const containerStyle = {
    display: 'flex',
    width: '100%',
    minHeight: 'calc(100vh - 60px)', // Adjust height to account for navbar
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '<div id="e9f7f"></div>e', // Light blue background for the main container
    gap: '20px',
    paddingTop: '20px', // Added padding for spacing from the navbar
    boxSizing: 'border-box',
  };

  const sideStyle = {
    width: '45%',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#ffdddf', // Keeping white for the project panels
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Slightly darker shadow for depth
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const headerStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#006aff', // Change header text to a bright blue
    textAlign: 'center',
  };

  return (
    <div>
      <OwnerNavbar appearance="inverse" activeKey={activeKey} onSelect={setActiveKey} />
      <div style={containerStyle}>
        
        <div style={sideStyle}>
          <div style={headerStyle}>Projects Uploaded by Owner</div>
          <FilteredJobsButtons /> {/* This will show jobs filtered by owner */}
        </div>
      </div>
    </div>
  );
};

export default Freelancer2;
