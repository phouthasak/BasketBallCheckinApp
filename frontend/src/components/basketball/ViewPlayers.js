import React, { Component } from 'react';
import { Card, Form }from 'react-bootstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {ProgressSpinner} from 'primereact/progressspinner';
import {InputText} from 'primereact/inputtext';
import InputFieldWithLabel from "../common/InputFieldWithLabel";
import LinkButton from "../common/LinkButton";
import SubmitButton from "../common/SubmitButton";
import BasketballServices from '../../api/BasketballServices';
import Utilities from "../util/Utilities";
import TwoStepModal from "../common/TwoStepModal";
import * as Stages from '../util/Constants';

class ViewPlayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      playerFirstName: '',
      playerLastName: '',
      playerMiddleName: '',
      doneLoading: false,
      showModal: false,
      modalStage: Stages.MODAL_STAGE_WAITING,
      errors: {
        firstName: false,
        lastName: false
      }
    };

    this.getPlayers = this.getPlayers.bind(this);
    this.createPlayer = this.createPlayer.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  };

  componentDidMount() {
    this.getPlayers();
  }

  getPlayers() {
    BasketballServices.getPlayers().then(response => {
      this.setState({players: response.players, doneLoading: true});
    });
  }

  createPlayer() {
    BasketballServices.createNewPlayer(Utilities.createNewPlayerRequestJsonObject(this.state)).then(response => {

    }).catch(error => {
      console.error(error);
    });
  }

  valueChange(e, stateName) {
    this.setState({[stateName]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.validate()) {
      this.setState({showModal: true, modalStage: Stages.MODAL_STAGE_WAITING}, () => {
        BasketballServices.createNewPlayer(Utilities.createNewPlayerRequestJsonObject(this.state)).then(response => {
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

  validate() {
    const errorObject = this.state.errors;
    errorObject.firstName = !Utilities.notNullOrEmpty(this.state.playerFirstName);
    errorObject.lastName = !Utilities.notNullOrEmpty(this.state.playerLastName);
    this.setState({errors: errorObject});
    if (errorObject.firstName === false && errorObject.lastName === false) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const header = (
      <div className='text-left'>
        <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
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
            <h1 className='text-white'>List of Players</h1>
            <LinkButton link='/basketball' label='Home' type='primary' />
          </div>
          <div className="row pb-5">
            <DataTable ref={(el) => this.dt = el} value={this.state.players} paginator={true} rows={10} header={header}
                       globalFilter={this.state.globalFilter} emptyMessage="No records found">
              <Column field="playerId" header="Player Id" filter={true} filterPlaceholder="Id" />
              <Column field="firstName" header="First Name" filter={true} filterPlaceholder="First Name" filterMatchMode="contains" />
              <Column field="middleName" header="Middle Name" filter={true} filterPlaceholder="Middle Name" filterMatchMode="contains" />
              <Column field="lastName" header="Last Name" filter={true} filterPlaceholder="Last Name" filterMatchMode="contains" />
            </DataTable>
          </div>

          <div className='mx-auto'>
            <h1 className='pt-5 text-white'>Add a New Player</h1>
          </div>
          <Card className='mx-auto' style={{maxWidth: '500px'}}>
            <Card.Body>
              <Form className='m-0' onSubmit={this.onSubmit} noValidate>
                <InputFieldWithLabel controlId='playerFirstName' label='First Name *' placeHolder='First Name' value={this.state.playerFirstName} valueChange={(e) => this.valueChange(e, 'playerFirstName')} required={true} feedbackLabel={'First name is required'} showError={this.state.errors.firstName} />
                <InputFieldWithLabel controlId='playerMiddleName' label='Middle Name' placeHolder='Middle Name' value={this.state.playerMiddleName} valueChange={(e) => this.valueChange(e, 'playerMiddleName')}  required={false} feedbackLabel={''} showError={false} />
                <InputFieldWithLabel controlId='playerLastName' label='Last Name *' placeHolder='Last Name' value={this.state.playerLastName} valueChange={(e) => this.valueChange(e, 'playerLastName')} required={true} feedbackLabel={'Last name is required'} showError={this.state.errors.lastName} />
                <SubmitButton />
              </Form>
            </Card.Body>
          </Card>

          <TwoStepModal display={this.state.showModal} stage={this.state.modalStage} waitingLabel={'Creating player...'} successLabel={'Player created: ' + this.state.playerFirstName + ' ' + this.state.playerLastName} failLabel={'Failed to create player'} close={() => {this.setState({showModal: false, doneLoading: false}, this.getPlayers)}}/>
        </div>
      </div>
    );
  }
}

export default ViewPlayers;