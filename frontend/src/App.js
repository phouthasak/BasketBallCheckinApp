import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import LandingPage from "./components/LandingPage";
import PersonalPage from "./components/PersonalPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={PersonalPage}/>
          <Route path='/basketBall' component={LandingPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
