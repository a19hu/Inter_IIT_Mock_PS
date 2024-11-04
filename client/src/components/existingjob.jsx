import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FreelancerNavbar from '../components/FreelancerNavbar'; // Adjust path if necessary
import axios from 'axios';

const ExistingJobs = () => {
  const [jobs, setJobs] = useState([]); // State to hold the jobs
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/projects'); // Adjust the URL as needed
        setJobs(response.data); // Assuming response.data is an array of job objects
      } catch (err) {
        setError('Error fetching jobs'); // Set error message if there's an error
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchJobs();
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return <div>Loading jobs...</div>; // Show loading message while fetching
  }

  if (error) {
    return <div>{error}</div>; // Show error message if any
  }

  return (
    <div>
      <FreelancerNavbar appearance="inverse" />
      <div style={styles.container}>
        <h2 style={styles.heading}>Already Posted Jobs:</h2>
        <div style={styles.jobList}>
          {jobs.map((job) => (
            <Link
              key={job._id} // Assuming each job has a unique `_id` from the database
              to={`/job/${job._id}`} // Use the job's ID for the link
              style={styles.jobButton}
            >
              {job.name} {/* Assuming each job has a `name` field */}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '50px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    textShadow: '1px 1px 2px #888',
  },
  jobList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    width: '100%',
    maxWidth: '400px',
  },
  jobButton: {
    backgroundColor: '#ffffff', // Changed to white
    color: '#333333', // Dark color for contrast
    padding: '12px 20px',
    borderRadius: '8px',
    width: '100%',
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500',
    transition: 'transform 0.2s, background-color 0.2s',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default ExistingJobs;
