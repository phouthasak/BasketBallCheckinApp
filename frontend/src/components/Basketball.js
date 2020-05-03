import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import LinkButton from "./common/LinkButton";

class Basketball extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='mx-auto'>
          <h1 className='pt-5 text-white'>Welcome to the Ball Squad</h1>
        </div>
        <Card className='mx-auto' style={{maxWidth: '500px'}}>
          <Card.Body>
            <LinkButton link='/createPlayer' label='View Events' type='primary' />
            <LinkButton link='/viewPlayers' label='View Players' type='primary' />
            <LinkButton link='/createPlayer' label='Create Events' type='primary' />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Basketball;