import React, { Component }from 'react';
import { Card, Form } from 'react-bootstrap';
import InputFieldWithLabel from "../common/InputFieldWithLabel";
import SubmitButton from "../common/SubmitButton";
import LinkButton from "../common/LinkButton";
import SelectFieldWithLabel from "../common/SelectFieldWithLabel";

class CreateEvent extends Component{
  render() {
    return (
      <div className='container-fluid'>
        <div className='mx-auto'>
          <h1 className='pt-5 text-white'>Create An Event</h1>
        </div>
        <Card className='mx-auto' style={{maxWidth: '500px'}}>
          <Card.Body>
            <Form className='m-0'>
              <SelectFieldWithLabel />
              <InputFieldWithLabel controlId='eventDate' label='Date' placeHolder='Event Date' />
              <InputFieldWithLabel controlId='eventCourtNumber' label='Court #' placeHolder='Court Number' />
              <InputFieldWithLabel controlId='eventTime' label='Time (EST)' placeHolder='Event Time' />
              <InputFieldWithLabel controlId='eventHost' label='Host Name' placeHolder='Who booked the court?' />

              <SubmitButton />
              <LinkButton link='/basketball' label='Home' />
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default CreateEvent;