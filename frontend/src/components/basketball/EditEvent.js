import React, { Component } from 'react';
import LinkButton from '../common/LinkButton';
import {ProgressSpinner} from 'primereact/progressspinner';
import BasketballServices from "../../api/BasketballServices";
import {Card, Form, Button} from "react-bootstrap";
import Utilities from '../util/Utilities';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from "primereact/components/dropdown/Dropdown";
import InputFieldWithLabel from "../common/InputFieldWithLabel";
import SubmitButton from "../common/SubmitButton";
import TwoStepModal from "../common/TwoStepModal";
import * as Stages from '../util/Constants';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faTrash);

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOptions: [],
      originalEvent: '',
      displayEvent: {},
      originalPlayersCheckIns: [],
      originalNonPlayersCheckIns: [],
      newPlayer: '',
      newNonPlayerFirstName: '',
      newNonPlayerLastName: '',
      newNonPlayerSponsor: '',
      doneLoading: false,
      playerEditList: [],
      nonPlayerEditList: [],
      editList: [],
      showModal: false,
      modalStage: Stages.MODAL_STAGE_WAITING,
      errors: {
        player: false,
        nonPlayer: {
          sponsor: false,
          firstName: false,
          lastName: false
        }
      }
    };
    this.getEvent = this.getEvent.bind(this);
    this.eventDateTimeTemplate = this.eventDateTimeTemplate.bind(this);
    this.getPlayers = this.getPlayers.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.addPlayersToEditList = this.addPlayersToEditList.bind(this);
    this.addNonPlayersToEditList = this.addNonPlayersToEditList.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deletePlayerTemplate = this.deletePlayerTemplate.bind(this);
    this.deleteNonPlayerTemplate = this.deleteNonPlayerTemplate.bind(this);
  }

  componentDidMount() {
    const stateObject = this.state;
    this.getEvent(stateObject);
  }

  getEvent(stateObject) {
    BasketballServices.getEventById(this.props.eventId).then(response => {
      stateObject.originalEvent = response.event;
      stateObject.displayEvent = Utilities.eventResponseToStateObject(response);
      stateObject.originalPlayersCheckIns = response.playerCheckIns;
      stateObject.originalNonPlayersCheckIns = response.nonPlayerCheckIns;
      this.getPlayers(stateObject);
    }).catch(error => {
      console.error(error);
    });
  }

  getPlayers(stateObject) {
    BasketballServices.getPlayers().then(response => {
      stateObject.playerOptions = response.players;
      stateObject.doneLoading = true;
      this.setState(stateObject);
    }).catch(error => {
      console.error(error);
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.editList.length > 0) {
      BasketballServices.postCheckIns(Utilities.createCheckInJsonRequestObject(this.state)).then( response => {
        if (response.status === 200) {
          response.json().then(eventResponse => {
            console.log(eventResponse);
            this.setState({
              originalEvent: eventResponse.event,
              displayEvent: Utilities.eventResponseToStateObject(eventResponse),
              originalPlayersCheckIns: eventResponse.playerCheckIns,
              originalNonPlayersCheckIns: eventResponse.nonPlayerCheckIns,
              newPlayer: '',
              newNonPlayerFirstName: '',
              newNonPlayerLastName: '',
              newNonPlayerSponsor: '',
              doneLoading: true,
              playerEditList: [],
              nonPlayerEditList: [],
              editList: [],
              errors: {
                player: false,
                nonPlayer: {
                  sponsor: false,
                  firstName: false,
                  lastName: false
                }
              }
            });
          }).catch(error => {
            console.error(error);
          });
        } else {

        }
      }).catch(error => {
        console.error(error);
      });
    }
  }

  eventDateTimeTemplate(rowData) {
    const eventDate = new Date(rowData.updatedDate);
    const month = eventDate.getMonth() + 1;
    const day = eventDate.getDate();
    const year = eventDate.getFullYear();
    const hour = eventDate.getHours();
    const minutes = eventDate.getMinutes();
    const finalString = month + '/' + day + '/' + year + ' ' + hour + ':' + minutes;
    return <div>{finalString}</div>
  }

  valueChange(e, stateName) {
    this.setState({[stateName]: e.target.value});
  }

  addPlayersToEditList() {
    const newEditRecord = { firstName: this.state.newPlayer.firstName, lastName: this.state.newPlayer.lastName, status: true};
    const editList = this.state.editList;
    editList.push(newEditRecord);

    const newPlayerEditRecord = {playerId: this.state.newPlayer.playerId, checkInStatus: true};
    const playerEditList = this.state.playerEditList;
    playerEditList.push(newPlayerEditRecord);

    const errorObject = this.state.errors;
    errorObject.player = false;

    this.setState({
      editList: editList,
      newPlayerEditList: playerEditList,
      newPlayer: '',
      errors: errorObject
    });
  }

  addNonPlayersToEditList() {
    const newEditRecord = { firstName: this.state.newNonPlayerFirstName, lastName: this.state.newNonPlayerLastName, status: true};
    const editList = this.state.editList;
    editList.push(newEditRecord);

    const newNonPlayerEditRecord = {firstName: this.state.newNonPlayerFirstName, lastName: this.state.newNonPlayerLastName, checkInStatus: true, sponsorId: this.state.newNonPlayerSponsor.playerId};
    const nonPlayerEditList = this.state.nonPlayerEditList;
    nonPlayerEditList.push(newNonPlayerEditRecord);

    const errorObject = this.state.errors;
    errorObject.nonPlayer.sponsor = false;
    errorObject.nonPlayer.firstName = false;
    errorObject.nonPlayer.lastName = false;

    this.setState({
      editList: editList,
      newPlayerEditList: nonPlayerEditList,
      errors: errorObject,
      newNonPlayerFirstName: '',
      newNonPlayerLastName: '',
      newNonPlayerSponsor: ''
    });
  }

  deletePlayerTemplate(rowData) {
    return <div>
      <Button variant="link" className='mb-0 p-0' onClick={() => {
        const editList = this.state.editList;
        editList.push({ firstName: rowData.firstName, lastName: rowData.lastName, status: false });

        const playerEditList = this.state.playerEditList;
        playerEditList.push({checkInId: rowData.checkInId, playerId: rowData.player.playerId, checkInStatus: false});
        this.setState({editList: editList, playerEditList: playerEditList});
      }}><FontAwesomeIcon icon="trash" style={{fontSize: '15px'}} /></Button>
    </div>;
  }

  deleteNonPlayerTemplate(rowData) {
    return <div>
      <Button variant="link" className='mb-0 p-0' onClick={() => {
        const editList = this.state.editList;
        editList.push({ firstName: rowData.firstName, lastName: rowData.lastName, status: false });

        const nonPlayerEditList = this.state.nonPlayerEditList;
        nonPlayerEditList.push({checkInId: rowData.checkInId, sponsorId: rowData.sponsor.sponsorId, firstName: rowData.firstName, lastName: rowData.lastName, checkInStatus: false});
        this.setState({editList: editList, nonPlayerEditList: nonPlayerEditList});
      }}><FontAwesomeIcon icon="trash" style={{fontSize: '15px'}} /></Button>
    </div>;
  }

  render() {
    const playerTableHeader = (
      <div className='text-left'>
        <i className="pi pi-search" style={{margin:'4px 4px 0 0'}} />
        <InputText type="search" onInput={(e) => this.setState({playerGlobalFilter: e.target.value})} placeholder="Global Search" size="50"/>
      </div>
    );

    const nonPlayerTableHeader = (
      <div className='text-left'>
        <i className="pi pi-search" style={{margin:'4px 4px 0 0'}} />
        <InputText type="search" onInput={(e) => this.setState({nonPlayerGlobalFilter: e.target.value})} placeholder="Global Search" size="50"/>
      </div>
    );

    return (
      <div className='container-fluid mb-5'>
        <div className={this.state.doneLoading ? 'd-none' : 'pt-5'}>
          <ProgressSpinner />
        </div>

        <div className={this.state.doneLoading ? '' : 'd-none'}>
          <div className='mx-auto pt-5 pb-3'>
            <h1 className='text-white'>Check In for Event: {this.state.originalEvent.eventId}</h1>
            <LinkButton link='/basketball' label='Home' type='primary' />
          </div>
          <Card className='mx-auto' style={{maxWidth: '500px'}}>
            <Card.Body>
              <div>
                <Form.Group className='text-left'>
                  <Form.Label className='mb-0'>Event Info:</Form.Label>
                  <p className='mb-0 text-dark'>Location Name: {this.state.displayEvent.locationName}</p>
                  <p className='mb-0 text-dark'>Court Number: {this.state.displayEvent.courtNumber}</p>
                  <p className='mb-0 text-dark'>Event Time: {this.state.displayEvent.eventDateTime}</p>
                  <p className='mb-0 text-dark'>Book?: {this.state.displayEvent.scheduled}</p>
                  <p className='mb-0 text-dark'>Host Name: {this.state.displayEvent.hostName}</p>
                </Form.Group>
              </div>
            </Card.Body>
          </Card>

          <div className="row pb-5">
            <div className='mx-auto pt-5 pb-3'>
              <h1 className='text-white'>Players that have checked in</h1>
            </div>
            <DataTable ref={(el) => this.dt = el} value={this.state.originalPlayersCheckIns} paginator={true} rows={10} header={playerTableHeader}
                       globalFilter={this.state.playerGlobalFilter} emptyMessage="No records found" scrollable={true} style={{width: '1000px'}}>
              <Column field="checkInId" header="Id" style={{width: '50px'}} />
              <Column field="player.firstName" header="First Name" filter={true} filterPlaceholder="First Name" filterMatchMode="contains" style={{width: '125px'}} />
              <Column field="player.lastName" header="Last Name" filter={true} filterPlaceholder="Last Name" filterMatchMode="contains" style={{width: '125px'}} />
              <Column body={this.eventDateTimeTemplate} header="Check In Time" filter={true} filterPlaceholder="Check In Time" filterMatchMode="contains" style={{width: '125px'}} />
              <Column body={this.deletePlayerTemplate} header="" style={{width: '50px'}} />
            </DataTable>
          </div>

          <div className="row pb-5">
            <div className='mx-auto pt-5 pb-3'>
              <h1 className='text-white'>NonPlayers that have checked in</h1>
            </div>
            <DataTable ref={(el) => this.dt = el} value={this.state.originalNonPlayersCheckIns} paginator={true} rows={10} header={nonPlayerTableHeader}
                       globalFilter={this.state.nonPlayerGlobalFilter} emptyMessage="No records found" scrollable={true} style={{width: '1000px'}}>
              <Column field="checkInId" header="Id" style={{width: '50px'}} />
              <Column field="sponsor.firstName" header="Sponsor" style={{width: '50px'}} />
              <Column field="firstName" header="First Name" filter={true} filterPlaceholder="First Name" filterMatchMode="contains" style={{width: '125px'}} />
              <Column field="lastName" header="Last Name" filter={true} filterPlaceholder="Last Name" filterMatchMode="contains" style={{width: '125px'}} />
              <Column body={this.eventDateTimeTemplate} header="Check In Time" filter={true} filterPlaceholder="Check In Time" filterMatchMode="contains" style={{width: '125px'}} />
              <Column body={this.deleteNonPlayerTemplate} header="" style={{width: '50px'}} />
            </DataTable>
          </div>

          <div className='mx-auto'>
            <h1 className='pt-5 text-white'>Edit List</h1>
          </div>
          <Card className='mx-auto' style={{maxWidth: '500px'}}>
            <Card.Body>
              <div>
                <Form className='m-0' onSubmit={this.onSubmit} noValidate>
                  <Form.Group className='text-left'>
                    <Form.Label className='mb-0'>Edit List:</Form.Label>
                    {this.state.editList.map(value => {
                      return <p key={value.firstName} className='mb-0 text-dark'>{value.firstName + " " + value.lastName + " " + value.status.toString()}</p>
                    })}
                  </Form.Group>
                  <SubmitButton />
                </Form>
              </div>
            </Card.Body>
          </Card>

          <div className='mx-auto'>
            <h1 className='pt-5 text-white'>Add a New Player</h1>
          </div>
          <Card className='mx-auto' style={{maxWidth: '500px'}}>
            <Card.Body>
              <Form className='m-0' onSubmit={this.onSubmit} noValidate>
                <Form.Group className='text-left'>
                  <Form.Label>Player *:</Form.Label>
                  <Dropdown value={this.state.newPlayer} options={this.state.playerOptions} ariaLabel="firstName" onChange={(e) => this.setState({newPlayer: e.value})} placeholder="Select a sponsor" optionLabel="firstName"/>
                  <p className={this.state.errors.nonPlayer.sponsor ? 'text-danger' : 'd-none'} >Player is required</p>
                </Form.Group>
                <Button className='mb-0 ml-3' variant='primary' size='lg' onClick={() => {
                  if (this.state.newPlayer.toString().localeCompare('') === 1 && this.state.errors.player === false) {
                    this.addPlayersToEditList();
                  } else {
                    const errorObject = this.state.errors;
                    errorObject.player = true;
                    this.setState(errorObject);
                  }
                }}>Add Player</Button>
              </Form>
            </Card.Body>
          </Card>

          <div className='mx-auto'>
            <h1 className='pt-5 text-white'>Add a New NonRegistered Player</h1>
          </div>
          <Card className='mx-auto' style={{maxWidth: '500px'}}>
            <Card.Body>
              <Form className='m-0' onSubmit={this.onSubmit} noValidate>
                <Form.Group className='text-left'>
                  <Form.Label>Sponsor *:</Form.Label>
                  <Dropdown value={this.state.newNonPlayerSponsor} options={this.state.playerOptions} ariaLabel="firstName" onChange={(e) => this.setState({newNonPlayerSponsor: e.value})} placeholder="Select a sponsor" optionLabel="firstName"/>
                  <p className={this.state.errors.nonPlayer.sponsor ? 'text-danger' : 'd-none'} >Sponsor is required</p>
                </Form.Group>

                <InputFieldWithLabel type='text' controlId='playerFirstName' label='First Name *' placeHolder='First Name' value={this.state.newNonPlayerFirstName} valueChange={(e) => this.valueChange(e, 'newNonPlayerFirstName')} required={true} feedbackLabel={'First name is required'} showError={this.state.errors.nonPlayer.firstName} />
                <InputFieldWithLabel type='text' controlId='playerLastName' label='Last Name *' placeHolder='Last Name' value={this.state.newNonPlayerLastName} valueChange={(e) => this.valueChange(e, 'newNonPlayerLastName')} required={true} feedbackLabel={'Last name is required'} showError={this.state.errors.nonPlayer.lastName} />
                <Button className='mb-0 ml-3' variant='primary' size='lg' onClick={() => {
                  if (this.state.newNonPlayerSponsor.toString().localeCompare('') === 1 && this.state.errors.nonPlayer.sponsor === false && this.state.errors.nonPlayer.firstName === false && this.state.errors.nonPlayer.lastName === false) {
                    this.addNonPlayersToEditList();
                  } else {
                    const errorObject = this.state.errors;
                    errorObject.nonPlayer.sponsor = this.state.newNonPlayerSponsor.toString().localeCompare('') === 0;
                    errorObject.nonPlayer.firstName = !Utilities.notNullOrEmpty(this.state.newNonPlayerFirstName);
                    errorObject.nonPlayer.lastName = !Utilities.notNullOrEmpty(this.state.newNonPlayerLastName);
                    this.setState(errorObject);
                  }
                }}>Add NonRegistered Player</Button>
              </Form>
            </Card.Body>
          </Card>

          <TwoStepModal display={this.state.showModal} stage={this.state.modalStage} waitingLabel={'Checking players in...'}
                        successLabel={'People have been checked in. Please recheck the table.'}
                        failLabel={'Failed to check people in'}
                        close={() => this.setState({ showModal: false })}/>
        </div>
      </div>
    );
  }
}

export default EditEvent;