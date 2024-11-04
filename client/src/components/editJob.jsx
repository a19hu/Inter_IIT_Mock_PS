import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, ButtonToolbar, Button, Input } from 'rsuite';
import OwnerNavbar from './owner_nav';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const EditJob = ({ onSubmit }) => {
  const location = useLocation();
  const existingJobData = location.state || {};  // Use empty object if state is missing

  const [formData, setFormData] = useState({
    title: '',
    email: '',
    amount: '',
    link: '',
    description: ''
  });

  // Set form data from existingJobData when component mounts
  useEffect(() => {
    if (existingJobData && Object.keys(existingJobData).length > 0) {
      setFormData(existingJobData);
    }
  }, [existingJobData]);

  const handleChange = (value, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Updated data:', formData); // Optional: Log updated data
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div>
    <OwnerNavbar appearance='inverse'/>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{paddingLeft:'60px', width: '400px', padding: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '8px', backgroundColor: '#fff', color: 'black' }}>
        <h2 style={{ textAlign: 'center', padding:'20px' }}>Edit Your Project</h2>
        <Form layout="vertical">
          <Form.Group controlId="name-6">
            <Form.ControlLabel>Project Title</Form.ControlLabel>
            <Form.Control
              name="title"
              type="text"
              value={formData.title || ''}
              onChange={(value) => handleChange(value, 'title')}
            />
          </Form.Group>

          <Form.Group controlId="email-6">
            <Form.ControlLabel>Email ID</Form.ControlLabel>
            <Form.Control
              name="email"
              type="email"
              value={formData.email || ''}
              onChange={(value) => handleChange(value, 'email')}
            />
          </Form.Group>

          <Form.Group controlId="amount-6">
            <Form.ControlLabel>Enter Amount</Form.ControlLabel>
            <Form.Control
              name="amount"
              type="number"
              autoComplete="off"
              value={formData.amount || ''}
              onChange={(value) => handleChange(value, 'amount')}
            />
          </Form.Group>

          <Form.Group controlId="link-6">
            <Form.ControlLabel>Github Link</Form.ControlLabel>
            <Form.Control
              name="link"
              type="text"
              value={formData.link || ''}
              onChange={(value) => handleChange(value, 'link')}
            />
          </Form.Group>

          <Form.Group controlId="description-6">
            <Form.ControlLabel>Job Description</Form.ControlLabel>
            <Form.Control
              name="description"
              rows={2}
              accepter={Textarea}
              value={formData.description || ''}
              onChange={(value) => handleChange(value, 'description')}
            />
          </Form.Group>

          <Form.Group>
            <ButtonToolbar>
              <Button appearance="primary" onClick={handleSubmit} block>Update Job</Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </div>
    </div>
    </div>
  );
};

export default EditJob;
