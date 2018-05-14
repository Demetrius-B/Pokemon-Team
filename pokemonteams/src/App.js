import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import './css/App.css';

// Custom Imports
import addTeamForm from './components/addTeamForm'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <h1>Pokemon Teams</h1>
            <div>
              <Link to="/">Home</Link>
              <Link to="/addTeam">Add Team</Link>
            </div>
          </header>

          <div className="main">
          <Switch>
            <Route exact path='/'/>
            <Route path='/addTeam' component={addTeamForm}/>
          </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
