import React, { Component } from 'react';
import './css/App.css';

// Custom Imports
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom'
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

  addPokemon = pokemon => {
    console.log("adding pokemon to team:::::::", this.state.teams)

    console.log(":::::::::", this.state) 
  }


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <h1>Pokemon Teams</h1>
            <div>
              <NavLink to="/" activeClassName='homeActiveLink'>Home</NavLink>
            </div>
          </header>
        
          <div className="main">
            <PokemonTeam addPokemon={this.addPokemon} addTeam={this.addTeam} teams={this.state.teams} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
