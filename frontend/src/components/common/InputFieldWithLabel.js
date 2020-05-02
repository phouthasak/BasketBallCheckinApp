import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

class InputFieldWithLabel extends Component {
  render() {
    return (
      <Form.Group className='text-left' controlId={this.props.controlId}>
        <Form.Label>{this.props.label + ':'}</Form.Label>
        <Form.Control className='mb-0' type="text" placeholder={this.props.placeHolder} style={{
          display: 'block',
          width: '100%',
          padding: '.375rem .75rem',
          fontSize: '1.5rem',
          lineHeight: '2.0',
          color: '#495057',
          backgroundColor: '#fff',
          backgroundClip: 'padding-box',
          border: '1px solid #ced4da'
        }} size='lg' />
      </Form.Group>
    );
  }
}

InputFieldWithLabel.propTypes = {
  controlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired
};

export default InputFieldWithLabel;