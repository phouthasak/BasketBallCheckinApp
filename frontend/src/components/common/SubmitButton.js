import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class SubmitButton extends Component {
  render() {
    return (
      <Button className='mb-0' variant="primary" type="submit" size='lg'>
        Submit
      </Button>
    );
  }
}

export default SubmitButton;