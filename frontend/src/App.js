import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import Basketball from './components/Basketball';
import PersonalPage from './components/PersonalPage';
import CreateEvent from './components/basketball/CreateEvent';
import CreatePlayer from './components/basketball/CreatePlayer';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={PersonalPage}/>
          <Route path='/basketBall' component={Basketball}/>
          <Route path='/createEvent' component={CreateEvent}/>
          <Route path='/createPlayer' component={CreatePlayer}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
