import React, { Component }from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import InputFieldWithLabel from '../common/InputFieldWithLabel';
import SubmitButton from '../common/SubmitButton';
import LinkButton from '../common/LinkButton';
import {InputText} from 'primereact/inputtext';
import {Calendar} from 'primereact/calendar';
import {Dropdown} from 'primereact/dropdown';
import BasketballServices from '../../api/BasketballServices';
import {ProgressSpinner} from 'primereact/progressspinner';
import CheckboxWithLabel from '../common/CheckboxWithLabel';
import TwoStepModal from '../common/TwoStepModal';
import * as Stages from '../util/Constants';
import Utilities from '../util/Utilities';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faCheck, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

library.add(faEdit, faCheck, faTimes, faTrash);

class CreateEvent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      events: [],
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
      showDeleteModal: false,
      modalStage: Stages.MODAL_STAGE_WAITING,
      deleteModalStage: Stages.MODAL_STAGE_WAITING,
      deleteEventId: '',
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
    this.getEvents = this.getEvents.bind(this);
    this.scheduledTemplate = this.scheduledTemplate.bind(this);
    this.eventDateTimeTemplate = this.eventDateTimeTemplate.bind(this);
    this.editTemplate = this.editTemplate.bind(this);
    this.deleteTemplate = this.deleteTemplate.bind(this);
    this.deleteEventById = this.deleteEventById.bind(this);
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
      this.getEvents(stateObject);
    }).catch(error => {
      console.log(error);
    });
  }

  getEvents(stateObject) {
    BasketballServices.getEvents().then(response => {
      stateObject.events = response.events;
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

  scheduledTemplate(rowData) {
    if (rowData.scheduled) {
      return <div><FontAwesomeIcon fixedWidth icon="check" /></div>
    } else {
      return <div><FontAwesomeIcon fixedWidth icon="times" /></div>
    }
  }

  eventDateTimeTemplate(rowData) {
    const eventDate = new Date(rowData.eventDateTime);
    const month = eventDate.getMonth() + 1;
    const day = eventDate.getDate();
    const year = eventDate.getFullYear();
    const hour = eventDate.getHours();
    const minutes = eventDate.getMinutes();
    const finalString = month + '/' + day + '/' + year + ' ' + hour + ':' + minutes;
    return <div>{finalString}</div>
  }

  editTemplate(rowData) {
    return <div>
      <Link to={'/editEvent/' + rowData.eventId} target='_blank'><FontAwesomeIcon fixedWidth icon="edit" /></Link>
    </div>
  }

  deleteEventById(eventId) {
    this.setState({showDeleteModal: true, deleteModalStage: Stages.MODAL_STAGE_WAITING, deleteEventId: eventId}, () => {
      BasketballServices.deleteEventById(Utilities.createDeleteEventRequestJsonObject(eventId)).then(response => {
        if (response.status === 200) {
          this.setState({deleteModalStage: Stages.MODAL_STAGE_SUCCESS});
        } else {
          this.setState({deleteModalStage: Stages.MODAL_STAGE_FAIL});
        }
      }).catch(error => {
        console.error(error);
      });
    });
  }

  deleteTemplate(rowData) {
    return <div>
      <Button variant="link" className='mb-0 p-0' onClick={() => {
        this.setState({showDeleteModal: true, deleteModalStage: Stages.MODAL_STAGE_WAITING}, () => {
          this.deleteEventById(rowData.eventId);
        });
      }}><FontAwesomeIcon icon="trash" style={{fontSize: '15px'}} /></Button>
    </div>
  }

  render() {
    const header = (
      <div className='text-left'>
        <i className="pi pi-search" style={{margin:'4px 4px 0 0'}} />
        <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Global Search" size="50"/>
      </div>
    );

    return (
      <div className='container-fluid mb-5'>
        <div className={this.state.doneLoading ? 'd-none' : 'pt-5'}>
          <ProgressSpinner />
        </div>

        <div className={this.state.doneLoading ? '' : 'd-none'}>
          <div className='mx-auto pt-5 pb-3'>
            <h1 className='text-white'>List of Events</h1>
            <LinkButton link='/basketball' label='Home' type='primary' />
          </div>
          <div className="row pb-5">
            <DataTable ref={(el) => this.dt = el} value={this.state.events} paginator={true} rows={10} header={header}
                       globalFilter={this.state.globalFilter} emptyMessage="No records found" scrollable={true} style={{width: '1000px'}}>
              <Column body={this.editTemplate} header="" style={{width: '50px'}} />
              <Column field="eventId" header="Event Id" filter={true} filterPlaceholder="Id" style={{width: '75px'}} />
              <Column field="location.locationName" header="Location Name" filter={true} filterPlaceholder="Location Name" filterMatchMode="contains" style={{width: '125px'}} />
              <Column field="courtNumber" header="Court Num" filter={true} filterPlaceholder="Court Num" filterMatchMode="contains" style={{width: '75px'}} />
              <Column body={this.eventDateTimeTemplate} header="Event Time" filter={true} filterPlaceholder="Event Time" filterMatchMode="contains" style={{width: '125px'}} />
              <Column body={this.scheduledTemplate} header="Booked?" style={{width: '75px'}} />
              <Column field="location.streetNum" header="Street Num" filter={true} filterPlaceholder="Street Num" filterMatchMode="contains" style={{width: '75px'}} />
              <Column field="location.streetName" header="Street Name" filter={true} filterPlaceholder="Street Name" filterMatchMode="contains" style={{width: '125px'}} />
              <Column field="location.phone" header="Phone" filter={true} filterPlaceholder="Phone" filterMatchMode="contains" style={{width: '150px'}} />
              <Column field="location.city" header="City" filter={true} filterPlaceholder="City" filterMatchMode="contains" style={{width: '100px'}} />
              <Column field="location.state" header="State" filter={true} filterPlaceholder="State" filterMatchMode="contains" style={{width: '75px'}} />
              <Column field="location.zip" header="Zip" filter={true} filterPlaceholder="Zip" filterMatchMode="contains" style={{width: '75px'}} />
              <Column body={this.deleteTemplate} header="" style={{width: '50px'}} />
            </DataTable>
          </div>

          <div className='mx-auto pb-3'>
            <h1 className='text-white'>Create An Event</h1>
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

          <TwoStepModal display={this.state.showDeleteModal} stage={this.state.deleteModalStage} waitingLabel={'Deleting event: ' + this.state.deleteEventId + '...'}
                        successLabel={'Event have been deleted: ' + this.state.deleteEventId}
                        failLabel={'Failed to delete event: ' + this.state.deleteEventId}
                        close={() => {
                          this.setState({showDeleteModal: false, doneLoading: false, deleteEventId: ''}, () => {
                            const stateObject = this.state;
                            this.getEvents(stateObject);
                          });
                        }}/>
        </div>
      </div>
    );
  }
}

export default CreateEvent;