import React from 'react';
import { useState } from 'react';
import CNavbar from '../components/navbar';
import Newjob from '../components/newjob';
import ExistingJobs from '../components/existingjob';

const Freelancer = () => {
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
        <div style={sideStyle}>
          <Newjob />
        </div>
        <div style={sideStyle}>
          <ExistingJobs />
        </div>
      </div>
    </div>
  );
};

export default Freelancer;