import React, { Component } from 'react';
import './css/App.css';

// Custom Imports
import { BrowserRouter, NavLink } from 'react-router-dom'
import PokemonTeam from './components/pokemonTeam'


class App extends Component {
  state = {
    teams: {}
  }


  addTeam = team => {
    console.log("adding a team!")

    const teams = {...this.state.teams}
    teams[`team${Date.now()}`] = team
    this.setState({teams})
  }


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <h1>Pokemon Teams</h1>
            <div>
              <NavLink to="/" activeClassName='homeActiveLink'>Home</NavLink>
              <NavLink to="/team" activeClassName='teamActiveLink'>View Team</NavLink>
            </div>
          </header>

          <div className="main">
            <PokemonTeam addTeam={this.addTeam} teams={this.state.teams} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
