import React, { useEffect, useState } from 'react';
import { Stack, Panel, Badge, Button } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FilteredJobsButtons = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5001/project/'); // Adjust the URL as necessary
        console.log('Fetched jobs data:', response.data); // Log the received data
        setJobs(response.data); // Assuming response.data contains the array of job objects
      } catch (err) {
        console.error('Error fetching jobs:', err); // Log the error
        setError('Error fetching jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (index, jobId, e) => {
    e.stopPropagation();
    
    // Confirm deletion if desired
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return;
    }

    try {
      // Make a delete request to your backend
      await axios.delete(`http://localhost:5001/project/${jobId}`); // Adjust the URL as necessary

      // Update the state to reflect the deletion
      const updatedJobs = jobs.filter((_, jobIndex) => jobIndex !== index);
      setJobs(updatedJobs);
    } catch (err) {
      console.error('Error deleting job:', err);
      setError('Error deleting job'); // Update the error state if needed
    }
  };

  const handleEdit = (url, e) => {
    e.stopPropagation();
    navigate(url);
  };

  if (loading) {
    return <div>Loading jobs...</div>; // Show loading message
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an error
  }

  return (
    <div style={{ padding: '30px 90px' }}>
      <h2 style={{ color: '#007bff', textAlign: 'center' }}>Already Posted Jobs:</h2>
      <Stack spacing={20} direction="column">
        {jobs.map((job, index) => (
          <Panel
            key={job._id} // Assuming each job has a unique `_id`
            bordered
            onClick={(e) => handleEdit(`/edit_job/${job._id}`, e)} // Navigate to the edit job page with job ID
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '15px 20px',
              backgroundColor: '#ffffff',
              width: '50vh',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
            }}
          >
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, color: '#333' }}>{job.name || 'Job Title'}</h4> 
              <p style={{ margin: 0, color: '#555' }}>Amount: {job.amountInWei || 'N/A'}</p> 
            </div>
            <img src={job.image || "https://via.placeholder.com/50"} alt="Job" style={{ width: '50px', height: '50px', marginLeft: '20px' }} />
            <Badge style={{ backgroundColor: job.statusColor || 'gray', color: 'white', marginLeft: '20px' }}>{job.status || 'Unknown'}</Badge>
            
            <div style={{ display: 'flex', gap: '10px', marginLeft: '20px' }}>
              <Button color="green" appearance="primary" onClick={(e) => handleEdit(`/edit_job/${job._id}`, e)} style={{ borderRadius: '4px' }}>
                Edit
              </Button>
              <Button color="red" appearance="primary" onClick={(e) => handleDelete(index, job._id, e)} style={{ borderRadius: '4px' }}>
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
