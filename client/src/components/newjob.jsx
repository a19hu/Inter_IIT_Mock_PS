import React, { useState } from 'react';
import { Form, ButtonToolbar, Button, Input } from 'rsuite';


const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const Newjob = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    title: '',
    email: '',
    amount: '',
    link: '',
    description: ''
  });

  // Handle input change
  const handleChange = (value, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Submitted:', JSON.stringify(formData, null, 2)); // Log the form data as JSON
  };

  return (
    <div style={{color:'black'}}>
      <h2 style={{ paddingTop: '30px', paddingLeft: '90px' }}>Hello! Create A New Project:</h2>
      <Form layout="horizontal" style={{ paddingTop: '40px' }}>
        <Form.Group controlId="name-6">
          <Form.ControlLabel>Project Title</Form.ControlLabel>
          <Form.Control 
            name="title" 
            type="text" 
            onChange={(value) => handleChange(value, 'title')} 
          />
          <Form.HelpText tooltip>Required</Form.HelpText>
        </Form.Group>

        <Form.Group controlId="email-6">
          <Form.ControlLabel>Email ID</Form.ControlLabel>
          <Form.Control 
            name="email" 
            type="email" 
            onChange={(value) => handleChange(value, 'email')} 
          />
          <Form.HelpText tooltip>Required</Form.HelpText>
        </Form.Group>

        <Form.Group controlId="password-6">
          <Form.ControlLabel>Enter Amount</Form.ControlLabel>
          <Form.Control 
            name="amount" 
            type="number" 
            autoComplete="off" 
            onChange={(value) => handleChange(value, 'amount')} 
          />
          <Form.HelpText tooltip>Required</Form.HelpText>
        </Form.Group>

        <Form.Group controlId="link-6">
          <Form.ControlLabel>Github Link</Form.ControlLabel>
          <Form.Control 
            name="link" 
            type="text" 
            onChange={(value) => handleChange(value, 'link')} 
          />
          <Form.HelpText tooltip>Required</Form.HelpText>
        </Form.Group>

        <Form.Group controlId="textarea-6">
          <Form.ControlLabel>Job Description</Form.ControlLabel>
          <Form.Control 
            name="description" 
            rows={2} 
            accepter={Textarea} 
            onChange={(value) => handleChange(value, 'description')} 
          />
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
