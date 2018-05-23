import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'


// Custom import
import DeleteButton from '@material-ui/icons/Delete'
import SearchPokemonButton from '@material-ui/icons/Search'
import AddPokemonForm from './addPokemonForm';


class team extends Component {

    state = {
        pokemonName: '',
        pokemon_types: [],
        teamName: ''
    };

    handleChange = (event) => {
        this.setState({pokemonName: event.target.value});
        console.log(this.state)
    }

    renderPokedex = () => {
        return this.props.teams.map((index, value) => {
            // setting pokemon array
            const pokemonArr = index.pokemon

            return pokemonArr.map((index, value) => {

                index.name = index.name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                    return letter.toUpperCase(); // Makes first letter Uppcase
                });

                if (index.types.length > 1){ // if pokemon has only one type
                    return(
                        <li className="pokemon">
                            <img alt="pokemon Face" src={index.img} />
                            <div className="pokemonData">
                                <h1 className="pokemonName">{index.name}</h1>
    
                                <p className="pokemonType">{index.types[0]}/{index.types[1]}</p>                    
                            </div>
                        </li>
                    )
                } else { // if pokemon has two types
                    return(
                        <li className="pokemon">
                            <img alt="pokemon Face" src={index.img} />
                            <div className="pokemonData">
                                <h1 className="pokemonName">{index.name}</h1>
    
                                <p className="pokemonType">{index.types[0]}</p>                    
                            </div>
                        </li>
                    )
                }
            });
        })
    }

    createPokemon = (event) => {
        console.log("adding to team!")
        let data = []
    
        let baseUrl = `https://pokeapi.co/api/v2/pokemon/${this.state.pokemonName.toLowerCase()}` // add toLowerCase so user cannot make a case error
        console.log("Base URL:",baseUrl);
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
            this.setState({pokemon_name: data.name, pokemon_img: data.sprites.front_default, types: data.types})

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

            this.props.addPokemon(pokemon)  // sending the pokemon object up so it can be added to the main state
            console.log("DONE GETTING DATA::::", this.state)

          })


        event.preventDefault()
    }

    addPokemon = () => {
        if (this.props.teams[0].pokemon.length == 6) {
            return(
                this.teamFull()
            )
        } else {
            return(
                <form className="addPokemonForm" onSubmit={this.checkTeamSize}>
                    <input type="text" name="pokemon" value={this.state.pokemonName} onChange={this.handleChange} placeholder="Pokemon Name" />
                    <button type="submit" className="searchPokemonButton"><SearchPokemonButton /></button>
                </form>
            )
        }
    }

    teamFull = () => {
        console.log("TEAM IS FULL")
        return (
            <div className="teamFullError">
                <p className="teamFull">Sorry this team is full!</p>
                <p>Please remove a pokemon from this team or create a new one!</p>
            </div>
        )
    }

    showAddPokemonForm = () => {
        console.log("showing form")
        return ( <AddPokemonForm teams={this.props.teams} maxTeams={this.props.maxTeams} addPokemon={this.props.addPokemon} /> )
    }

    render(){
        return(
            <div className="pokemonTeam">
            {   
                Object.keys(this.props.teams).map(function (key) {
                return(
                    <div className="pokemonTeamList" id={key}>
                        <div className="pokemonTeamHeader">
                            <p className="teamName">Team:{this.props.teams[key].name}</p>
                            <div className="crudControls">
                                <a onClick={this.showAddPokemonForm}>Add</a>
                            </div>
                        </div>

                        {/* Add Pokemon to target team */}

                        <ul className="pokemonList">
                            {
                                this.renderPokedex()
                            }
                        </ul>
                    </div>
                );      
                }, this)
            }
            </div>
        );
    }
}


export default team