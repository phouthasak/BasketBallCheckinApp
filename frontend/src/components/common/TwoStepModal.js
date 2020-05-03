import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {ProgressSpinner} from 'primereact/progressspinner';
import { Modal, Button }from 'react-bootstrap';
import * as Stages from '../util/Constants';

class TwoStepModal extends Component {
  render() {
    return(
      <Modal show={this.props.display}>
        <Modal.Body className='mx-auto'>
          <div className={this.props.stage.localeCompare(Stages.MODAL_STAGE_WAITING) === 0 ? 'text-center mx-auto' : 'd-none'}>
            <h3>{this.props.waitingLabel}</h3>
            <ProgressSpinner />
          </div>
          <div className={this.props.stage.localeCompare(Stages.MODAL_STAGE_SUCCESS) === 0 ? 'text-center mx-auto' : 'd-none'}>
            <h3>{this.props.successLabel}</h3>
            <Button variant="primary" size='lg' onClick={this.props.close}>Close</Button>
          </div>
          <div className={this.props.stage.localeCompare(Stages.MODAL_STAGE_FAIL) === 0 ? 'text-center mx-auto' : 'd-none'}>
            <h3>{this.props.failLabel}</h3>
            <Button variant="primary" size='lg' onClick={this.props.close}>Close</Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

TwoStepModal.propTypes = {
  display: PropTypes.bool.isRequired,
  stage: PropTypes.string.isRequired,
  waitingLabel: PropTypes.string.isRequired,
  successLabel: PropTypes.string.isRequired,
  failLabel: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired
};

export default TwoStepModal;