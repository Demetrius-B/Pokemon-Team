import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'


// Custom Import
import AddTeamForm from './addTeamForm'
import Team from './team'
import SearchPokemonButton from '@material-ui/icons/Search'

class pokemonTeam extends Component {
    constructor(props) { 
        super(props)       
        this.state = {
            pokemonName: '',
            pokemon_types: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.createPokemon = this.createPokemon.bind(this);
    }

    handleChange(event) {
        this.setState({pokemonName: event.target.value});
        console.log(this.state)
    }

    createPokemon = (event) => {
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
          })

        event.preventDefault()
    }

    editTeam = () => {
        return(
            <div>
            {   
                Object.keys(this.props.teams).map(function (key) {
                    console.log(this.props.teams[key].name)
                return(
                    <div className="pokemonTeamList" id={key}>
                        <h1>{this.props.teams[key].name}</h1>
                    </div>
                );      
                }, this)
            }
            </div>
        )
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

    checkTeamSize = (event) => {
        console.log("CHECKING TEAM SIZE:::::")
        console.log("TEAM SIZE:::::::", this.props.teams[0].pokemon.length)

        if (this.props.teams[0].pokemon.length < 6) {
            this.createPokemon(event) // If team size is under 6 then add pokemon
        } else {
            this.teamFull() // error out if team is full
        }

        event.preventDefault();
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

    render(){
        return(
            <BrowserRouter>
                <div className="teamList">
                    <div className="addTeamForm">
                        <AddTeamForm addTeam={this.props.addTeam}/>
                    </div>

                    <div className="teams">
                        <Team teams={this.props.teams}/>
                    </div>

                    {/* Edit Target Teams details */}
                    <div className="editTeam">
                        <Route path="/editTeam" component={this.editTeam}/>
                    </div>

                    {/* Add Pokemon to target team */}
                    <div className="addPokemonForm">
                        <Route path="/addPokemon" component={this.addPokemon} />
                    </div>
                </div>
            </BrowserRouter>

        );
    }
}


export default pokemonTeam