import React, { Component } from 'react';
import firebase from 'firebase'
import TeamAdd from './TeamAdd';
import TeamStats from './TeamStats';
import base from '../base'
import Login from "./Login"
import { firebaseApp } from "../base";

class App extends Component {
  state = {
    teams: [],
    pokemon: [],
    flag: false,
    uid: null,
    owner: null
  };

authHandler = async (authData) => {
  const PokemonTeam = await base.fetch(this.props.match.params.userId, { context: this})

  if (!PokemonTeam.owner) {
    await base.post(`${this.props.match.params.userId}/owner`, {
      data: authData.user.uid
    })
  }

  this.setState({uid: authData.user.uid, owner: PokemonTeam.owner || authData.user.uid})
}

authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.authHandler)
}
  
componentDidMount(){
  const { params } = this.props.match
  this.ref = base.syncState(`${params.userId}/teams`, {
    context: this,
    state: "teams"
  })
  this.ref = base.syncState(`${params.userId}/pokemon`, {
    context: this,
    state: "pokemon"
  })

  firebase.auth().onAuthStateChanged(user => {
    if(user){
      this.authHandler({ user })
    }
  })
}

// Adding team to account
addTeamName = teamName => {
  // copying the teams
  const teams = [...this.state.teams];

  // creating team object
  const newTeam = {
    name: teamName,
    size: 6
  };

  // adding team to teams[]
  teams.push(newTeam);

  // setting state to update data
  this.setState({ teams });
};

// Deleting team from account
deleteTeam = (index) => {
  // copying the pokemon & team
  const teams = [...this.state.teams]
  const pokemon = [...this.state.pokemon]

  // Deleting team & pokemon from firebase
  teams[index] = null
  pokemon[index] = null

  // Deleting team & pokemon from state
  teams.splice(index, 1);
  pokemon.splice(index, 1);

  // removing null or undefined data
  JSON.parse(JSON.stringify(teams))
  JSON.parse(JSON.stringify(pokemon))

  // setting state to update data
  this.setState({ teams });
  this.setState({ pokemon });
}

addPokemon = (index, pokemon) => {
  // copying pokemon 
  const pokemonList = [...this.state.pokemon];

  // teamPokemonList will hold the pokemon in pokemonList
  let teamPokemonList = [];

  // if no pokemon exist the list will not exist so need to check for that
  if (pokemonList[index] === undefined) {
    teamPokemonList = [pokemon];
  } else {
    teamPokemonList = [...pokemonList[index], pokemon];
  }

  // setting the new pokemonList to pokemonList[i]
  pokemonList[index] = teamPokemonList;

  // updating data
  this.setState({ pokemon: pokemonList });
};

deletePokemon = (index, teamIndex) => {
  // copying pokemonList
  const pokemonList = [...this.state.pokemon]
  
  // Deleting team & pokemon from firebase
  pokemonList[teamIndex][index] = null

  // Deleting team & pokemon from state
  pokemonList[teamIndex].splice(index, 1);

  // removing null or undefined data
  JSON.parse(JSON.stringify(pokemonList[teamIndex]))

  // setting state to update data
  this.setState({ pokemon: pokemonList });
}

logout = async () => {
  alert('logging out!')
  await firebase.auth().signOut()
  this.setState({uid: null})
}

render() {

    const logout = <button onClick={this.logout} style={{marginTop:"1rem"}}>Log Out</button>


    // check if user is logged in
    if (!this.state.uid){
      return <Login authenticate={this.authenticate} />
    }

    // check if user is not owner 
    if (this.state.uid !== this.state.owner) {
      return (
        <div style={{backgroundColor:"yellow", padding:"2rem"}}>
          <h1>Sorry you aren't the owner of this team!</h1>
          {logout}
        </div>
      )
    }

    return (
      <div className="App" style={{height: "100%", width: "100%"}} >
        <div>
          {logout}
          <TeamAdd addTeamName={this.addTeamName} />
          <TeamStats
            teams={this.state.teams}
            addPokemon={this.addPokemon}
            pokemon={this.state.pokemon}
            deleteTeam={this.deleteTeam}
            deletePokemon={this.deletePokemon}
          />
        </div>
      </div>
    );
  }
}

export default App;
