import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class LinkButton extends Component {
  render() {
    return (
      <Link to={this.props.link} className='text-white'>
        <Button className='mb-0 ml-3' variant={this.props.type} size='lg'>{this.props.label}</Button>
      </Link>
    );
  }
}

LinkButton.propTypes = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default LinkButton;