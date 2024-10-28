import React from 'react';
import { Link } from 'react-router-dom';

const ExistingJobs = () => {
  const jobs = [
    { id: 1, title: '1.) Software Engineer', description: 'Responsible for developing and maintaining software applications.' },
    { id: 2, title: '2.) Data Analyst', description: 'Analyzes data to provide business insights and support decision-making.' },
    { id: 3, title: '3.) Product Manager', description: 'Oversees the development and launch of new products.' },
    { id: 4, title: '4.) UX Designer', description: 'Designs user interfaces and improves user experience on digital platforms.' },
    { id: 5, title: '5.) Marketing Specialist', description: 'Plans and executes marketing strategies to promote products.' }
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Already Posted Jobs:</h2>
      <div style={styles.jobList}>
        {jobs.map((job) => (
          <Link
            key={job.id}
            to={`/job/${job.id}`}
            style={styles.jobButton}
          >
            {job.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
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
    backgroundColor: '#4A90E2',
    color: 'white',
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
  jobButtonHover: {
    transform: 'scale(1.05)',
    backgroundColor: '#357ABD',
  },
};

export default ExistingJobs;
