import React, { Component }from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
              <Form.Group className='text-left' controlId="eventForm.LocationSelect">
                <Form.Label>Location:</Form.Label>
                <Form.Control as="select">
                  <option>Berliner</option>
                  <option>Big Run</option>
                  <option>Cleo</option>
                  <option>McDonald</option>
                  <option>Willis</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className='text-left' controlId="eventDate">
                <Form.Label>Date:</Form.Label>
                <Form.Control className='mb-0' type="text" placeholder="eventDate" style={{
                  display: 'block',
                  width: '100%',
                  padding: '.375rem .75rem',
                  fontSize: '1.5rem',
                  lineHeight: '2.0',
                  color: '#495057',
                  backgroundColor: '#fff',
                  backgroundClip: 'padding-box',
                  border: '1px solid #ced4da'
                }} />
              </Form.Group>

              <Form.Group className='text-left' controlId="eventCourtNumber">
                <Form.Label>Counter #:</Form.Label>
                <Form.Control className='mb-0' type="text" placeholder="eventCourtNumber" style={{
                  display: 'block',
                  width: '100%',
                  padding: '.375rem .75rem',
                  fontSize: '1.5rem',
                  lineHeight: '2.0',
                  color: '#495057',
                  backgroundColor: '#fff',
                  backgroundClip: 'padding-box',
                  border: '1px solid #ced4da'
                }} />
              </Form.Group>

              <Form.Group className='text-left' controlId="eventTime">
                <Form.Label>Time:</Form.Label>
                <Form.Control className='mb-0' type="text" placeholder="00:00 PM" style={{
                  display: 'block',
                  width: '100%',
                  padding: '.375rem .75rem',
                  fontSize: '1.5rem',
                  lineHeight: '2.0',
                  color: '#495057',
                  backgroundColor: '#fff',
                  backgroundClip: 'padding-box',
                  border: '1px solid #ced4da'
                }} />
              </Form.Group>

              <Form.Group className='text-left' controlId="eventHost">
                <Form.Label>Host:</Form.Label>
                <Form.Control className='mb-0 input-bootstrap-fix' type="text" placeholder="Host Name" style={{
                  display: 'block',
                  width: '100%',
                  padding: '.375rem .75rem',
                  fontSize: '1.5rem',
                  lineHeight: '2.0',
                  color: '#495057',
                  backgroundColor: '#fff',
                  backgroundClip: 'padding-box',
                  border: '1px solid #ced4da'
                }} size='lg' />
              </Form.Group>

              <Button className='mb-0' variant="primary" type="submit" size='lg'>
                Submit
              </Button>
              <Button className='mb-0 ml-3' variant="info" size='lg'>
                <Link to='/basketball' className='text-white'>Home</Link>
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default CreateEvent;