import React, { useState } from 'react';
import { Stack, Panel, Badge, Button } from 'rsuite';

const FilteredJobsButtons = () => {
  const [jobs, setJobs] = useState([
    { heading: "Frontend Developer", image: "https://via.placeholder.com/50", amount: "$1000", status: "Open", statusColor: "#28a745", url: '/job/1' },
    { heading: "Backend Developer", image: "https://via.placeholder.com/50", amount: "$1200", status: "Closed", statusColor: "#dc3545", url: '/job/2' },
    { heading: "UI/UX Designer", image: "https://via.placeholder.com/50", amount: "$800", status: "In Progress", statusColor: "#ffc107", url: '/job/3' },
    { heading: "Data Scientist", image: "https://via.placeholder.com/50", amount: "$1500", status: "Open", statusColor: "#28a745", url: '/job/4' },
    { heading: "Project Manager", image: "https://via.placeholder.com/50", amount: "$1300", status: "On Hold", statusColor: "#6c757d", url: '/job/5' }
  ]);

  const handleDelete = (index, e) => {
    e.stopPropagation(); // Prevent the panel click event from triggering
    const updatedJobs = jobs.filter((_, jobIndex) => jobIndex !== index);
    setJobs(updatedJobs);
  };

  const handleEdit = (url, e) => {
    e.stopPropagation(); // Prevent the panel click event from triggering
    window.location.href = url; // Placeholder for navigation to an edit page
  };

  return (
    <div style={{ padding: '30px 90px' }}>
      <h2 style={{ color: '#007bff', textAlign: 'center' }}>Already Posted Jobs:</h2> {/* Title Style */}
      <Stack spacing={20} direction="column">
        {jobs.map((job, index) => (
          <Panel
            key={index}
            bordered
            onClick={() => handleEdit(job.url)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '15px 20px', // Increased padding for a more spacious feel
              backgroundColor: '#ffffff', // White background for the panel
              width: '50vh',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
              borderRadius: '8px' // Rounded corners
            }}
          >
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, color: '#333' }}>{job.heading}</h4> {/* Job Title Style */}
              <p style={{ margin: 0, color: '#555' }}>Amount: {job.amount}</p> {/* Amount Style */}
            </div>
            <img src={job.image} alt="Job" style={{ width: '50px', height: '50px', marginLeft: '20px' }} />
            <Badge style={{ backgroundColor: job.statusColor, color: 'white', marginLeft: '20px' }}>{job.status}</Badge>
            
            {/* Buttons for Edit and Delete */}
            <div style={{ display: 'flex', gap: '10px', marginLeft: '20px' }}>
              <Button color="green" appearance="primary" onClick={(e) => handleEdit(job.url, e)} style={{ borderRadius: '4px' }}>
                Edit
              </Button>
              <Button color="red" appearance="primary" onClick={(e) => handleDelete(index, e)} style={{ borderRadius: '4px' }}>
                Delete
              </Button>
            </div>
          </Panel>
        ))}
      </Stack>
    </div>
  );
};

export default FilteredJobsButtons;
