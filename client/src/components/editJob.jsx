import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OwnerNavbar from './owner_nav';

const EditJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const existingJobData = location.state || {}; // Use empty object if state is missing

  const [formData, setFormData] = useState({
    issueId: '',
    name: '',
    description: '',
    deadline: '',
    applicationDate: '',
    amountInWei: '',
    status: 'not_started', // Default status
  });

  // Set form data from existingJobData when component mounts
  useEffect(() => {
    if (existingJobData && Object.keys(existingJobData).length > 0) {
      setFormData({
        issueId: existingJobData.issueId || '',
        name: existingJobData.name || '',
        description: existingJobData.description || '',
        deadline: existingJobData.deadline ? existingJobData.deadline.split('T')[0] : '',
        applicationDate: existingJobData.applicationDate ? existingJobData.applicationDate.split('T')[0] : '',
        amountInWei: existingJobData.amountInWei || '',
        status: existingJobData.status || 'not_started', // Use existing status
      });
    }
  }, [existingJobData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      // Send updated data to the server
      const response = await axios.put(`http://localhost:5001/project/${existingJobData._id}`, formData);
      console.log('Job updated successfully:', response.data);
      navigate('/'); // Navigate to the home page or wherever you want after successful update
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <div>
      <OwnerNavbar appearance='inverse' />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h2 style={styles.header}>Edit Your Project</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Issue ID</label>
              <input
                name="issueId"
                type="text"
                value={formData.issueId || ''}
                onChange={handleChange}
                style={styles.input}
                disabled // Assuming issueId should not be editable
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Project Name</label>
              <input
                name="name"
                type="text"
                value={formData.name || ''}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Project Description</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description || ''}
                onChange={handleChange}
                style={styles.textarea}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Deadline</label>
              <input
                name="deadline"
                type="date"
                value={formData.deadline || ''}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Application Date</label>
              <input
                name="applicationDate"
                type="date"
                value={formData.applicationDate || ''}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Amount in Wei</label>
              <input
                name="amountInWei"
                type="number"
                value={formData.amountInWei || ''}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Status</label>
              <select
                name="status"
                value={formData.status || ''}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="not_started">Not Started</option>
                <option value="unresolved">Unresolved</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div>
              <button type="submit" style={styles.button}>Update Job</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  formContainer: {
    padding: '40px',
    width: '400px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    backgroundColor: '#fff',
    color: 'black',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  textarea: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  select: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    width: '100%',
  },
};

export default EditJob;
