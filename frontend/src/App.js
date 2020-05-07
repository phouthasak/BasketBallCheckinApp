import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import Basketball from './components/Basketball';
import PersonalPage from './components/PersonalPage';
import CreateEvent from './components/basketball/CreateEvent';
import ViewPlayers from './components/basketball/ViewPlayers';
import EditEvent from "./components/basketball/EditEvent";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={PersonalPage}/>
          <Route path='/basketBall' component={Basketball}/>
          <Route path='/createEvent' component={CreateEvent}/>
          <Route path='/viewPlayers' component={ViewPlayers}/>
          <Route path='/editEvent/:id' component={(props) => <EditEvent eventId={props.match.params.id} />}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
