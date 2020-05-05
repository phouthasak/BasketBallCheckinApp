import React, { Component }from 'react';
import { Card, Form } from 'react-bootstrap';
import InputFieldWithLabel from "../common/InputFieldWithLabel";
import SubmitButton from "../common/SubmitButton";
import LinkButton from "../common/LinkButton";
import {Calendar} from 'primereact/calendar';
import {Dropdown} from 'primereact/dropdown';
import BasketballServices from '../../api/BasketballServices';
import {ProgressSpinner} from 'primereact/progressspinner';
import CheckboxWithLabel from "../common/CheckboxWithLabel";
import TwoStepModal from "../common/TwoStepModal";
import * as Stages from '../util/Constants';
import Utilities from "../util/Utilities";

class CreateEvent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      locationOptions: [],
      location: '',
      date: '',
      courtNumber: '',
      scheduled: false,
      hostOptions: [],
      host: '',
      permit: '',
      permitFileName: '',
      doneLoading: false,
      showModal: false,
      modalStage: Stages.MODAL_STAGE_WAITING,
      errors: {
        location: false,
        date: false,
        courtNumber: false,
        host: false,
        permit: false
      }
    };
    this.getLocations = this.getLocations.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.validate = this.validate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getLocations();
  }

  getLocations() {
    const stateObject = this.state;
    BasketballServices.getAllLocations().then(response => {
      stateObject.locationOptions = response.locations;
      this.getPlayers(stateObject);
    }).catch(error => {
      console.log(error);
    });
  }

  getPlayers(stateObject) {
    BasketballServices.getPlayers().then(response => {
      stateObject.hostOptions = response.players;
      stateObject.doneLoading = true;
      this.setState(stateObject);
    }).catch(error => {
      console.log(error);
    });
  }

  valueChange(e, stateName) {
    this.setState({[stateName]: e.target.value});
  }

  fileUpload(e) {
    if (e.target.files[0] !== undefined) {
      this.setState({permit: e.target.files[0], permitFileName: e.target.files[0].name});
    }
  }

  validate() {
    const errorObject = this.state.errors;
    if (this.state.location) {
      errorObject.location = false;
    } else {
      errorObject.location = true;
    }

    if (this.state.date) {
      errorObject.date = false;
    } else {
      errorObject.date = true;
    }

    if (this.state.courtNumber) {
      errorObject.courtNumber = false;
    } else {
      errorObject.courtNumber = true;
    }

    if (this.state.host) {
      errorObject.host = false;
    } else {
      errorObject.host = true;
    }

    if (this.state.scheduled) {
      if (this.state.permitFileName.localeCompare('') === 0) {
        errorObject.permit = true;
      } else {
        errorObject.permit = false;
      }
    } else {
      errorObject.permit = false;
    }

    this.setState({errors: errorObject});
    if (errorObject.location === false && errorObject.date === false && errorObject.courtNumber === false && errorObject.host === false && errorObject.host === false && errorObject.permit === false) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.validate()) {
      this.setState({showModal: true, modalStage: Stages.MODAL_STAGE_WAITING}, () => {
        BasketballServices.createNewEvent(Utilities.createNewEventRequestJsonObject(this.state)).then(response => {
          if (response.status === 200) {
            this.setState({modalStage: Stages.MODAL_STAGE_SUCCESS});
          } else {
            this.setState({modalStage: Stages.MODAL_STAGE_FAIL});
          }
        }).catch(error => {
          console.error(error);
        });
      });
    }
  }

  render() {
    return (
      <div className='container-fluid mb-5'>
        <div className={this.state.doneLoading ? 'd-none' : 'pt-5'}>
          <ProgressSpinner />
        </div>

        <div className={this.state.doneLoading ? '' : 'd-none'}>
          <div className='mx-auto pb-3'>
            <h1 className='pt-5 text-white'>Create An Event</h1>
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
        </div>
      </div>
    );
  }
}

export default CreateEvent;