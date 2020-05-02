import React, { Component } from 'react';
import { Card, Form } from 'react-bootstrap';
import InputFieldWithLabel from "../common/InputFieldWithLabel";
import LinkButton from "../common/LinkButton";
import SubmitButton from "../common/SubmitButton";

class CreatePlayer extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='mx-auto'>
          <h1 className='pt-5 text-white'>Create A Player</h1>
        </div>
        <Card className='mx-auto' style={{maxWidth: '500px'}}>
          <Card.Body>
            <Form className='m-0'>
              <InputFieldWithLabel controlId='playerFirstName' label='First Name' placeHolder='First Name' />
              <InputFieldWithLabel controlId='playerLastName' label='Last Name' placeHolder='Last Name' />

              <SubmitButton />
              <LinkButton link='/basketball' label='Home' />
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default CreatePlayer;