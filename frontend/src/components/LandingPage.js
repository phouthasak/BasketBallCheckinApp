import React, { Component } from 'react';
import firebase from '../api/Firebase';
import { Form, Button, Card } from 'react-bootstrap';
class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      items: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('player');
    const item = {
      firstName: this.state.firstName,
      lastName: this.state.lastName
    };
    itemsRef.push(item);
    this.setState({
      firstName: '',
      lastName: ''
    });
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('player');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      console.log(items);
      for (let item in items) {
        newState.push({
          id: item,
          firstName: items[item].firstName,
          lastName: items[item].lastName
        });
      }
      this.setState({
          items: newState
      });
    });
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='mx-auto'>
          <h1>Add A Player</h1>
        </div>
        <Card className='mx-auto' style={{maxWidth: '500px'}}>
          <Card.Body>
            <Form className='text-left'>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Add Player
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default LandingPage;