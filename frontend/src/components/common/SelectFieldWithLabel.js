import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

class SelectFieldWithLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selected: {}
    };
  }

  render() {
    return (
      <Form.Group className='text-left' controlId="eventForm.LocationSelect">
        <Form.Label>Location:</Form.Label>
        <Form.Control className='mb-0' as="select" style={{
          display: 'block',
          width: '100%',
          padding: '.375rem .75rem',
          fontSize: '1.5rem',
          lineHeight: '2.0',
          color: '#495057',
          backgroundColor: '#fff',
          backgroundClip: 'padding-box',
          border: '1px solid #ced4da'
        }} size='lg'>
          <option>Berliner</option>
          <option>Big Run</option>
          <option>Cleo</option>
          <option>McDonald</option>
          <option>Willis</option>
        </Form.Control>
      </Form.Group>
    );
  }
}

SelectFieldWithLabel.propTypes = {
  options: PropTypes.array.isRequired,
  bindLabel: PropTypes.string.isRequired
};

export default SelectFieldWithLabel;