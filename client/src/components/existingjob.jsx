import React from 'react';
import { Stack, Panel, Badge } from 'rsuite'; // Assuming you're using rsuite for UI components

const ExistingJobs = () => {
  // Dummy job entries
  const jobs = [
    {
      heading: "Frontend Developer",
      image: "https://via.placeholder.com/50", // Placeholder image
      amount: "$1000",
      status: "Open",
      statusColor: "green",
      url:'/freelancer'
    },
    {
      heading: "Backend Developer",
      image: "https://via.placeholder.com/50",
      amount: "$1200",
      status: "Closed",
      statusColor: "red",
      url:'/freelancer'
    },
    {
      heading: "UI/UX Designer",
      image: "https://via.placeholder.com/50",
      amount: "$800",
      status: "In Progress",
      statusColor: "orange",
      url:'/freelancer'
    },
    {
      heading: "Data Scientist",
      image: "https://via.placeholder.com/50",
      amount: "$1500",
      status: "Open",
      statusColor: "green",
      url:'/freelancer'
    },
    {
      heading: "Project Manager",
      image: "https://via.placeholder.com/50",
      amount: "$1300",
      status: "On Hold",
      statusColor: "gray",
      url:'/freelancer'
    },
  ];

  const handleJobClick = (url) => {
    window.location.href = url; // No changes needed here
  };

  return (
    <div style={{ padding: '30px 90px' }}  
    
    
    
    >
      <h2>Already Posted Jobs:</h2>
      <Stack spacing={20} direction="column" > {/* Ensure vertical stacking */}
        {jobs.map((job, index) => (
          <Panel 
            key={index} 
          
            onClick={() => handleJobClick(job.url)} // Use the unique URL
            // style={{  }} // Add cursor pointer style
            bordered 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '10px 20px', 
              backgroundColor: '#f9f9f9', 
              width: '50vh' ,// Ensure full width for each panel
              cursor: 'pointer'
            }}
          >
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0 }}>{job.heading}</h4>
              <p style={{ margin: 0 }}>Amount: {job.amount}</p>
            </div>
            <img src={job.image} alt="Job" style={{ width: '50px', height: '50px', marginLeft: '20px' }} />
            <Badge style={{ backgroundColor: job.statusColor, color: 'white', marginLeft: '20px' }}>{job.status}</Badge>
          </Panel>
        ))}
      </Stack>
    </div>
  );
};

export default ExistingJobs;
