import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinkButton from '../common/LinkButton';
import {ProgressSpinner} from 'primereact/progressspinner';
import BasketballServices from "../../api/BasketballServices";

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalEvent: '',
      doneLoading: false
    };
    this.getEvent = this.getEvent.bind(this);
  }

  componentDidMount() {
    this.getEvent();
  }

  getEvent() {
    BasketballServices.getEventById(this.props.eventId).then(response => {
      this.setState({
        originalEvent: response.event,
        doneLoading: true
      })
    }).catch(error => {
      console.error(error);
    });
  }

  render() {
    return (
      <div className='container-fluid mb-5'>
        {/* <div className={this.state.doneLoading ? 'd-none' : 'pt-5'}>
          <ProgressSpinner />
        </div>

        <div className={this.state.doneLoading ? '' : 'd-none'}>
          <div className='mx-auto pt-5 pb-3'>
            <h1 className='text-white'>Event: {this.state.originalEvent.eventId}</h1>
            <LinkButton link='/basketball' label='Home' type='primary' />
          </div>
          <div className='mx-auto pb-3'>
            <h1 className='text-white'>Update An Event</h1>
            <LinkButton link='/basketball' label='Home' type='primary' />
          </div>
          <Card className='mx-auto' style={{maxWidth: '500px'}}>
            <Card.Body>
              <Form className='m-0' onSubmit={this.onSubmit} noValidate>
                <Form.Group className='text-left'>
                  <Form.Label>Location *:</Form.Label>
                  <Dropdown value={this.state.location} options={this.state.locationOptions} ariaLabel="locationName" onChange={(e) => this.setState({location: e.value})} placeholder="Select a Location" optionLabel="locationName"/>
                  <p className={this.state.errors.location ? 'text-danger' : 'd-none'} >Location is required</p>
                </Form.Group>

                <div className={this.state.location ? 'location-address' : 'd-none'}>
                  <Form.Group className='text-left'>
                    <Form.Label className='mb-0'>Location Address:</Form.Label>
                    <p className='mb-0 text-dark'>{this.state.location.streetNum + " " + this.state.location.streetName}</p>
                    <p className='mb-0 text-dark'>{this.state.location.city + ", " + this.state.location.state + " " + this.state.location.zip}</p>
                  </Form.Group>
                </div>

                <Form.Group className='text-left'>
                  <Form.Label>Event Date and Time (EST)*:</Form.Label>
                  <Calendar dateFormat="mm/dd/yy" showTime={true} value={this.state.date} onChange={(e) => {
                    this.setState({date: e.value});
                  }} />
                  <p className={this.state.errors.date ? 'text-danger' : 'd-none'} >Event date and time is required</p>
                </Form.Group>

                <InputFieldWithLabel type='number' controlId='eventCourtNumber' label='Court Number*' placeHolder='Court Number' value={this.state.courtNumber} valueChange={(e) => this.valueChange(e, 'courtNumber')} required={true} feedbackLabel='Court Number is required' showError={this.state.errors.courtNumber} />

                <Form.Group className='text-left'>
                  <Form.Label>Host *:</Form.Label>
                  <Dropdown value={this.state.host} options={this.state.hostOptions} ariaLabel="firstName" onChange={(e) => this.setState({host: e.value})} placeholder="Select a host" optionLabel="firstName"/>
                  <p className={this.state.errors.host ? 'text-danger' : 'd-none'} >Host is required</p>
                </Form.Group>

                <CheckboxWithLabel controlId='scheduled' label='Court have successfully been booked' onChange={e => this.setState({scheduled: e.checked})} value={this.state.scheduled}/>

                <div className={this.state.scheduled ? '' : 'd-none'}>
                  <Form.File className='text-left' id="formcheck-api-regular">
                    <Form.File.Label>Permit *:</Form.File.Label>
                    <Form.File.Input onChange={this.fileUpload} />
                    <p className={this.state.errors.permit ? 'text-danger' : 'd-none'} >Permit is required</p>
                  </Form.File>
                </div>
                <SubmitButton />
              </Form>
            </Card.Body>
          </Card>

          <TwoStepModal display={this.state.showModal} stage={this.state.modalStage} waitingLabel={'Creating event...'}
                        successLabel={'Event Created For: ' + this.state.location.locationName}
                        failLabel={'Failed to create event'}
                        close={() => window.location.reload()}/>
        </div> */}
      </div>
    );
  }
}

EditEvent.propTypes = {

};

export default EditEvent;