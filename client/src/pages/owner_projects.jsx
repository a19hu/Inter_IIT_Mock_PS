import React from 'react';
import { useEffect, useState } from 'react';
import CNavbar from '../components/navbar';
import ExistingJobs from '../components/existingjob';
import OwnerNavbar from '../components/owner_nav';
import FilteredJobsButtons from '../components/filteredJobsButtons';

const Freelancer2 = () => {
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
             <OwnerNavbar appearance="inverse" activeKey={activeKey} onSelect={setActiveKey}/>
      <div style={containerStyle}>
        <div style={{...sideStyle, width: '50%'}}>
        {/* <ExistingJobs />    */}
        {/* existing job use nhi karna h direct yaha pe filter lagana h such that jo owner ne upload kiye h vo he aaye */}
        
        <FilteredJobsButtons/>
        
        
        
        </div>
        
      </div>
        </div>
    );
};

export default Freelancer2;