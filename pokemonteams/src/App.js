import React, { Component } from 'react';
import './css/App.css';

// Custom Imports
import { BrowserRouter, NavLink } from 'react-router-dom'
import PokemonTeam from './components/pokemonTeam'


class App extends Component {
  state = {
    teams: []
  }


  addTeam = team => {
    console.log("adding a team!")

    const teams = [...this.state.teams]
    // teams[`team${Date.now()}`] = team
    teams.push(team);
    this.setState({teams})

    console.log("TEAMS:::::", this.state.teams)
  }

  addPokemon = pokemon => {
    
    console.log("POKEMON:::::::::", pokemon) 
    
    // Need to know which team we're adding the pokemon to.
    //Cheating....
    if(this.state.teams && this.state.teams.length){
      this.state.teams[0].pokemon.push(pokemon);
      this.setState({'teams':this.state.teams})
    } 

    console.log("adding pokemon to team:::::::", this.state.teams)
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
