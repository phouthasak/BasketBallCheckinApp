import React, { Component } from 'react';

class CheckIn extends Component{
  constructor(props) {
    super(props);
    this.state = {
      test: 'Hello World'
    };
  }

  render() {
    return (
      <div>
        <h2>{this.state.test}</h2>
      </div>
    );
  }
}

export default CheckIn;