import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

class InputFieldWithLabel extends Component {
  render() {
    return (
      <Form.Group className='text-left' controlId={this.props.controlId}>
        <Form.Label>{this.props.label + ':'}</Form.Label>
        <Form.Control className={this.props.showError ? 'mb-0 is-invalid' : 'mb-0'} type={this.props.type} placeholder={this.props.placeHolder} style={{
          display: 'block',
          width: '100%',
          padding: '.375rem .75rem',
          fontSize: '1.5rem',
          lineHeight: '2.0',
          color: '#495057',
          backgroundColor: '#fff',
          backgroundClip: 'padding-box',
          border: '1px solid #ced4da'
        }} size='lg' value={this.props.value} onChange={this.props.valueChange} required={this.props.required}/>
        <Form.Control.Feedback className={this.props.required && this.props.showError ? '' : 'd-none'} type={'invalid'}>{this.props.feedbackLabel}</Form.Control.Feedback>
      </Form.Group>
    );
  }
}

InputFieldWithLabel.propTypes = {
  controlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  valueChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  feedbackLabel: PropTypes.string.isRequired,
  showError: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired
};

export default InputFieldWithLabel;