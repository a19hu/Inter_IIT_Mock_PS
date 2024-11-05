import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FreelancerNavbar from '../components/FreelancerNavbar';
import axios from 'axios'; // Import Axios

const ExistingJobs = () => {
const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5001/project');
      console.log(response.data); // Log the response data
      setProjects(response.data);
    } catch (err) {
      console.error('Error fetching project data:', err);
      setError('Error fetching project data');
    } finally {
      setLoading(false);
    }
  };
  fetchProjects();
}, []);

if (loading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;

return (
<div>
<FreelancerNavbar appearance="inverse" />
<div style={styles.container}>
<h2 style={styles.heading}>Already Posted Jobs:</h2>
<div style={styles.jobList}>
{projects.map((project) => (
<Link
key={project.id} // Ensure your project has a unique identifier
to={`/project/${project.id}`} // Assuming this route leads to detailed project view
style={styles.jobButton}
>
{project.title} {/* Assuming 'title' is a property of your project object */}
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
minHeight: '100vh', // Ensures full page height
width: '100%', // Occupies full width
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
width: '90%', // More width to fit on screen
maxWidth: '600px', // Increase max width for better visibility
overflowY: 'auto', // Enables scrolling if content exceeds the container height
maxHeight: '70vh', // Limits job list height for better visibility
},
jobButton: {
  backgroundColor: '#ffffff',
  color: '#0000FF', // Set to blue for visibility
  fontSize: '20px', // Increase font size
  padding: '12px 20px',
  borderRadius: '8px',
  width: '100%',
  textAlign: 'center',
  textDecoration: 'none',
  fontWeight: '500',
  transition: 'transform 0.2s, background-color 0.2s',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
},
jobButtonHover: {
transform: 'scale(1.05)',
backgroundColor: '#e0e0e0',
},
};

export default ExistingJobs;
