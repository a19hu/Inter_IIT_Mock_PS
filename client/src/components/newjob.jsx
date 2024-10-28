import React from 'react'
import { Form, ButtonToolbar, Button, Input } from 'rsuite';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const Newjob = () => {
  const handleSubmit = () => {
  console.log('Submitted');
}
  return (

    <div>
        <h2 style={{paddingTop : '30px', paddingLeft : '90px'}}>Hello! Create A New Project:</h2>
 <Form layout="horizontal" style={{paddingTop : '40px'}}>
    <Form.Group controlId="name-6">
      <Form.ControlLabel>Project Title</Form.ControlLabel>
      <Form.Control name="name" type="text" />
      <Form.HelpText tooltip>Required</Form.HelpText>
    </Form.Group>
    <Form.Group controlId="email-6">
      <Form.ControlLabel>Email ID</Form.ControlLabel>
      <Form.Control name="email" type="email" />
      <Form.HelpText tooltip>Required</Form.HelpText>
    </Form.Group>
    <Form.Group controlId="password-6">
      <Form.ControlLabel>Enter Amount</Form.ControlLabel>
      <Form.Control name="password" type="number" autoComplete="off" />
      <Form.HelpText tooltip>Required</Form.HelpText>
    </Form.Group>
    <Form.Group controlId="link-6">
      <Form.ControlLabel>Github Link</Form.ControlLabel>
      <Form.Control name="link" type="text" />
      <Form.HelpText tooltip>Required</Form.HelpText>
    </Form.Group>
    <Form.Group controlId="textarea-6">
      <Form.ControlLabel>Job Description</Form.ControlLabel>
      <Form.Control name="textarea" rows={2} accepter={Textarea} />
    </Form.Group>

    <Form.Group>
      <ButtonToolbar>
        <Button appearance="primary" onClick={() => handleSubmit()}>Submit</Button>
      </ButtonToolbar>
    </Form.Group>


  </Form>
    </div>
  )
}

export default Newjob