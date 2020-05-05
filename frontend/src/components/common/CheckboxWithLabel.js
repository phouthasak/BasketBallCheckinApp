import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from 'primereact/checkbox';

class CheckboxWithLabel extends Component {
  render() {
    return (
      <div className='p-grid text-left mb-3'>
        <div className='p-col-12'>
          <Checkbox inputId={this.props.controlId} onChange={this.props.onChange} checked={this.props.value} />
          <label style={{display: 'inline'}} htmlFor={this.props.controlId} className="p-checkbox-label">{this.props.label}</label>
        </div>
      </div>
    );
  }
}

CheckboxWithLabel.propTypes = {
  controlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CheckboxWithLabel;