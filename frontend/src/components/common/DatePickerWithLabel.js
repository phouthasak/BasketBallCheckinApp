import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import {Calendar} from 'primereact/calendar';

class DatePickerWithLabel extends Component {
  render() {
    return (
      <Form.Group className='text-left'>
        <Form.Label>{this.props.label + ':'}</Form.Label>
        <Calendar dateFormat="mm/dd/yy" showTime={true} className='mb-0' value={this.props.date} onChange={this.props.valueChange} />
      </Form.Group>
    );
  }
}

DatePickerWithLabel.propTypes = {
  controlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  valueChange: PropTypes.func.isRequired,
  showError: PropTypes.bool.isRequired
};

export default DatePickerWithLabel;