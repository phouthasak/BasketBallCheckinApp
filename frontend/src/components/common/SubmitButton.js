import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

SubmitButton.propTypes = {};

export default SubmitButton;