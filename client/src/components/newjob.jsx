import React, { useState } from 'react';
import { Form, ButtonToolbar, Button, Input } from 'rsuite';
import axios from 'axios';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const Newjob = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    issueId: '',
    name: '',
    description: '',
    deadline: null, // Deadline will be a date
    applicationDate: null, // Application date will also be a date
    amountInWei: '', // Start with an empty string
    prURLs: '',
  });

  // Handle input change
  const handleChange = (value, name) => {
    console.log(`Field Changed: ${name} = ${value}`);
    
    // If amountInWei is being updated, parse the value to a number
    if (name === 'amountInWei') {
      value = Number(value) || 0; // Convert to number; default to 0 if NaN
    }
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const dataToSubmit = {
      ...formData,
      applicationDate: formData.applicationDate ? new Date(formData.applicationDate).toISOString() : null,
      deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null,
      prURLs: formData.prURLs ? formData.prURLs.split(',').map(url => url.trim()) : [], // Convert to array
    };
  
    console.log(dataToSubmit); // Debugging: Check if amountInWei is a number
  
    try {
      const response = await axios.post('http://localhost:5001/project/', dataToSubmit, {
        withCredentials: true,
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };
  

  return (
    <div style={{ color: 'black' }}>
      <h2 style={{ paddingTop: '30px', paddingLeft: '90px' }}>Hello! Create A New Project:</h2>
      <Form layout="horizontal" style={{ paddingTop: '40px' }}>
        <Form.Group controlId="issueId-6">
          <Form.ControlLabel>Issue ID</Form.ControlLabel>
          <Form.Control 
            name="issueId" 
            type="text" 
            onChange={(value) => handleChange(value, 'issueId')} 
          />
          <Form.HelpText tooltip>Required</Form.HelpText>
        </Form.Group>

        <Form.Group controlId="name-6">
          <Form.ControlLabel>Project Title</Form.ControlLabel>
          <Form.Control 
            name="name" 
            type="text" 
            onChange={(value) => handleChange(value, 'name')} 
          />
          <Form.HelpText tooltip>Required</Form.HelpText>
        </Form.Group>

        <Form.Group controlId="description-6">
          <Form.ControlLabel>Job Description</Form.ControlLabel>
          <Form.Control 
            name="description" 
            rows={2} 
            accepter={Textarea} 
            onChange={(value) => handleChange(value, 'description')} 
          />
        </Form.Group>

        <Form.Group controlId="applicationDate-6">
          <Form.ControlLabel>Application Date</Form.ControlLabel>
          <Form.Control 
            name="applicationDate" 
            type="date" 
            onChange={(value) => handleChange(value, 'applicationDate')} 
          />
          <Form.HelpText tooltip>Required</Form.HelpText>
        </Form.Group>

        <Form.Group controlId="deadline-6">
          <Form.ControlLabel>Deadline</Form.ControlLabel>
          <Form.Control 
            name="deadline" 
            type="date" 
            onChange={(value) => handleChange(value, 'deadline')} 
          />
          <Form.HelpText tooltip>Required</Form.HelpText>
        </Form.Group>

        <Form.Group controlId="amountInWei-6">
          <Form.ControlLabel>Amount In Wei</Form.ControlLabel>
          <Form.Control
            name="amountInWei"
            type="number"
            onChange={(value) => handleChange(value, 'amountInWei')}
            value={formData.amountInWei} // Make sure the input reflects the state
          />
          <Form.HelpText tooltip>Required</Form.HelpText>
        </Form.Group>


        <Form.Group controlId="prURLs-6">
          <Form.ControlLabel>PR URLs</Form.ControlLabel>
          <Form.Control 
            name="prURLs" 
            type="text" 
            onChange={(value) => handleChange(value, 'prURLs')} 
          />
          <Form.HelpText tooltip>Comma-separated list of PR URLs (if any)</Form.HelpText>
        </Form.Group>

        <Form.Group>
          <ButtonToolbar>
            <Button appearance="primary" onClick={handleSubmit}>Submit</Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Newjob;
