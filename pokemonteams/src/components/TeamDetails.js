import React, { Component } from 'react';

// Icons
import DeleteBtn from '@material-ui/icons/Delete'
import AddPokemonBtn from '@material-ui/icons/AddBox'
import SearchPokemon from '@material-ui/icons/Search'
 
class TeamDetails extends Component {
  pokemonNameInput = React.createRef();

  state = {
    show: false,
    error: false,
    showEdit: false,
    searchError: false,
    teamFull: false
  };

showPokemonForm = () => {
  const show = !this.state.show;
  this.setState({ show });
};

showDeleteForm = () => {
  const showEdit = !this.state.showEdit;
  this.setState({ showEdit });
};

createPokemon = e => {
  e.preventDefault();

  this.setState({searchError: false})

  let data = []
  
  let baseUrl = `https://pokeapi.co/api/v2/pokemon/${this.pokemonNameInput.current.value.toLowerCase()}` // add toLowerCase so user cannot make a case error
  const options = {
  mode: 'cors',
  headers:{
    'Access-Control-Request-Method':"GET"
    }
  }

  fetch(baseUrl, options)
    .then(response => response.json())
    .then(responseAsJson => {
      data = responseAsJson;

      if (data.detail !== "Not found.") {
        this.setState({types: data.types})

        const types = []
          for (let i = 0; i < this.state.types.length; i++) {  // getting all types
            types.push(this.state.types[i].type.name) 
        }
        this.setState({pokemon_types: types}) // sets all types

        const pokemon = {  // creating pokemon object to send up
          id: data.id,
          name: data.name,
          img: data.sprites.front_default,
          types: this.state.pokemon_types
        }

        this.props.addPokemon(this.props.index, pokemon);
      } else if (data.detail === "Not found.") {
        this.setState({searchError: true})
      }

    })
};

renderPokemonForm = () => {
  if (this.state.show) {
    return (
      <React.Fragment>
        <form className="addPokemonForm" onSubmit={this.checkTeamSize}>
          <input
            type="text"
            name="pokemon"
            ref={this.pokemonNameInput}
            placeholder="Pokemon Name"
          />
          <button type="submit"><SearchPokemon /></button>
          {this.state.error ? <p>No pokemon found</p> : <p>&nbsp;</p>}
        </form>
        <div className="notFoundError">
          {this.notFoundError()}
        </div>
      </React.Fragment>
    );
  } else if (!this.state.show && this.state.teamFull){
    return this.teamFull()
  } else {
    return <p style={{"display": "none"}}>&nbsp;</p>;
  }
};

checkTeamSize = (e) => {
  e.preventDefault();

  if (this.props.pokedex === undefined) {
    this.createPokemon(e)
  } else {
      if (this.props.pokedex.length === 6) {
        this.setState({show: false, teamFull: true})
      } else {
        this.createPokemon(e)
      }
  }
}

notFoundError = (pokemon) => {
    if (this.state.searchError) {
      return (
        <div>
          <h1>The pokemon you searched for doesn't exist</h1>
          <h1>Please try again</h1>
        </div>
      )
    } else {
      return <p style={{"display": "none"}}>&nbsp;</p>;
    }
} 

renderPokedex = () => {
  if (this.props.pokedex === undefined || this.props.pokedex === null) {
    return <p style={{"display": "none"}}>&nbsp;</p>;
  } else {
      return this.props.pokedex.map((pokemon, index) => {

        // Makes first letter Uppcase
        pokemon.name = pokemon.name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
          return letter.toUpperCase(); 
        })

        if (pokemon.types.length > 1){ // if pokemon has only one type
          return(
              <li className="pokemon" key={index}>
                  <img alt="pokemon Face" src={pokemon.img} />
                  <div className="pokemonData">
                      <h1 className="pokemonName">{pokemon.name}</h1>
                      <p className="pokemonType">{pokemon.types[0]}/{pokemon.types[1]}</p>   
                  </div>
                  <button onClick={() => this.props.deletePokemon(index, this.props.index)}><DeleteBtn /></button>                               
              </li>
          )
        } else { // if pokemon has two types
            return(
                <li className="pokemon" key={index}>
                    <img alt="pokemon Face" src={pokemon.img} />
                    <div className="pokemonData">
                        <h1 className="pokemonName">{pokemon.name}</h1>
                        <p className="pokemonType">{pokemon.types[0]}</p>      
                    </div>
                    <button onClick={() => this.props.deletePokemon(index, this.props.index)}><DeleteBtn /></button>              
                </li>
            )
        }
    });
  }
};

teamFull = () => {
  if (this.state.teamFull) {
    return (
      <div className="teamFullError">
          <p>Sorry this team is full!</p>
          <p>Please remove a pokemon from this team or create a new one!</p>
      </div>
    )
  }
}

render() {
    return (
      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 team">
        <div className="teamHeader">
          <h1>{this.props.name}</h1>
          <div className="teamOptions">
            <AddPokemonBtn onClick={this.showPokemonForm} />
            <DeleteBtn onClick={() => this.props.deleteTeam(this.props.index)} />
          </div>
        </div>

        {this.renderPokemonForm()}
        <ul className="pokemonList">{this.renderPokedex()}</ul>
      </div>
    )}
}

export default TeamDetails;
