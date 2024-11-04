import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

import FreelancerNavbar from '../components/FreelancerNavbar';
import CustomFooter from '../components/footer';

const JobDetails = () => {
const { jobId } = useParams(); // Retrieve jobId from the URL
const [project, setProject] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
// Use jobId from useParams to make the request dynamic
axios.get(`http://localhost:5001/project/67222c79b27ad805c5e13661`)
.then((response) => {
setProject(response.data);
setLoading(false);
})
.catch((error) => {
console.error('Error fetching project details:', error);
setError('Failed to fetch project details.');
setLoading(false);
});
}, [jobId]); // Ensure the effect runs when jobId changes

if (loading) {
return <p style={styles.loading}>Loading...</p>;
}

if (error) {
return <p style={styles.error}>{error}</p>;
}

if (!project) {
return <p style={styles.notFound}>Project not found.</p>;
}

return (
<div>
<FreelancerNavbar appearance="inverse" />
<div style={styles.container}>
<h2 style={styles.heading}>Project Details</h2>
<div style={styles.detailsCard}>
<h3 style={styles.title}>Title: {project.name}</h3>
<p style={styles.description}><strong>Description:</strong> {project.description}</p>
<p style={styles.info}><strong>Issue ID:</strong> {project.issueId}</p>
<p style={styles.info}><strong>Deadline:</strong> {project.deadline}</p>
<p style={styles.info}><strong>Application Date:</strong> {new Date(project.applicationDate).toLocaleDateString()}</p>
<Link to="https://github.com/sps1001/" style={styles.contributeButton} target='_blank'>
Contribute to this Project 
</Link>
</div>
<CustomFooter />
</div>
</div>
);
};

// CSS styles
const styles = {
container: {
padding: '20px',
maxWidth: '800px',
margin: '0 auto',
backgroundColor: '#f9f9f9',
borderRadius: '8px',
boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
},
heading: {
textAlign: 'center',
color: '#333',
marginBottom: '20px',
},
detailsCard: {
backgroundColor: '#fff',
borderRadius: '5px',
padding: '20px',
boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
},
title: {
fontSize: '24px',
color: '#007bff',
},
description: {
margin: '10px 0',
fontSize: '16px',
color: '#555',
},
info: {
margin: '5px 0',
fontSize: '14px',
color: '#666',
},
contributeButton: {
display: 'inline-block',
marginTop: '15px',
padding: '10px 20px',
backgroundColor: '#28a745',
color: '#fff',
textDecoration: 'none',
borderRadius: '5px',
fontSize: '16px',
fontWeight: 'bold',
textAlign: 'center',
transition: 'background-color 0.3s, transform 0.2s',
},
contributeButtonHover: {
backgroundColor: '#218838',
transform: 'scale(1.05)',
},
loading: {
textAlign: 'center',
color: '#007bff',
fontSize: '18px',
},
error: {
textAlign: 'center',
color: 'red',
fontSize: '18px',
},
notFound: {
textAlign: 'center',
color: '#333',
fontSize: '18px',
},
};

// Add hover effect using JavaScript
const handleMouseEnter = (e) => {
e.target.style.backgroundColor = '#218838';
e.target.style.transform = 'scale(1.05)';
};

const handleMouseLeave = (e) => {
e.target.style.backgroundColor = '#28a745';
e.target.style.transform = 'scale(1)';
};

export default JobDetails;
