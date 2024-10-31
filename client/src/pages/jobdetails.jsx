import React from 'react';
import { useParams, Link } from 'react-router-dom';
import FreelancerNavbar from '../components/FreelancerNavbar';

const JobDetails = () => {
  const { jobId } = useParams();

  const jobs = [
    { id: 1, title: 'Software Engineer', description: 'Responsible for developing and maintaining software applications.' },
    { id: 2, title: 'Data Analyst', description: 'Analyzes data to provide business insights and support decision-making.' },
    { id: 3, title: 'Product Manager', description: 'Oversees the development and launch of new products.' },
    { id: 4, title: 'UX Designer', description: 'Designs user interfaces and improves user experience on digital platforms.' },
    { id: 5, title: 'Marketing Specialist', description: 'Plans and executes marketing strategies to promote products.' }
  ];

  const job = jobs.find((job) => job.id === parseInt(jobId));

  if (!job) {
    return <p style={styles.notFound}>Job not found.</p>;
  }

  return (
    <div>
      <FreelancerNavbar appearance="inverse" />
      <div style={styles.container}>
        <h2 style={styles.heading}>Job Details</h2>
        <div style={styles.detailsCard}>
          <h3 style={styles.title}>Title: {job.title}</h3>
          <p style={styles.description}><strong>Description:</strong> {job.description}</p>
          <Link to="https://github.com/sps1001/" style={styles.contributeButton} target='_blank'>
            Contribute to this Project 
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f4f7fc',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '28px',
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '20px',
    textShadow: '1px 1px 3px #aaa',
  },
  detailsCard: {
    backgroundColor: 'white',
    padding: '30px',
    width: '80%',
    maxWidth: '600px',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    position: 'relative',
  },
  title: {
    fontSize: '24px',
    color: '#4A90E2',
    marginBottom: '15px',
  },
  description: {
    fontSize: '18px',
    color: '#555',
    lineHeight: '1.5',
    marginBottom: '20px',
  },
  contributeButton: {
    marginTop: '30px',
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    textAlign: 'center',
    transition: 'background-color 0.2s',
  },
  notFound: {
    fontSize: '20px',
    color: '#e74c3c',
    textAlign: 'center',
    marginTop: '50px',
  },
};

export default JobDetails;
