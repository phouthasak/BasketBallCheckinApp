import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Basketball extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='mx-auto'>
          <h1 className='pt-5 text-white'>Welcome to the Ball Squad</h1>
        </div>
        <Card className='mx-auto' style={{maxWidth: '500px'}}>
          <Card.Body>
            <Button className='mb-0' variant="primary" size='lg'>
              <Link className='text-white' to='/createPlayer'>View Events</Link>
            </Button>
            <Button className='mb-0 mr-3 ml-3' variant="primary" size='lg'>
              <Link className='text-white' to='/createPlayer'>Create Player</Link>
            </Button>
            <Button className='mb-0' variant="primary" size='lg'>
              <Link className='text-white' to='/createEvent'>Create Event</Link>
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Basketball;