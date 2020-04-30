import React, { Component } from 'react';
import firebase from '../api/Firebase';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: ''
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

  render() {
    return (
      <div>
        <header>
          <div className='wrapper'>
            <h1>Ball Is Life</h1>

          </div>
        </header>
        <div className='container'>
          <section className='add-item'>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="firstName" placeholder="First Name" onChange={this.handleChange} value={this.state.firstName} />
              <input type="text" name="lastName" placeholder="Last Name" onChange={this.handleChange} value={this.state.lastName} />
              <button>Add Player</button>
            </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default LandingPage;