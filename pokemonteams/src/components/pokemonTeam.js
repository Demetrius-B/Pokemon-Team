import React, { Component } from 'react';
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom'


// Custom Import
import AddTeamForm from './addTeamForm'
import Team from './team'
import SearchPokemonButton from '@material-ui/icons/Search'



class pokemonTeam extends Component {
    constructor(props) { 
        super(props)       
        this.state = {
            pokemonName: ''
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
    
        let baseUrl = `https://pokeapi.co/api/v2/pokemon/${this.state.pokemonName}`
    
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
            this.setState({pokeData: data})
            console.log("State Set:: COMPLETE::", data)
            this.setState({pokemon_name: data.name, pokemon_img: data.sprites.front_default})

            // creating pokemon object to send up
            const pokemon = {
                id: data.id,
                name: data.name,
                img: data.sprites.front_default
            }

            // return(pokemon)

            // sending the pokemon object up so it can be added to the main state
            this.props.addPokemon(pokemon)
          })

        event.preventDefault()
    }

    editTeam = () => {
        return(
            <div>
            {   
                Object.keys(this.props.teams).map(function (key) {
                    console.log(this.props.teams[key].name)
                    let team;
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
        return(
            <form className="addPokemonForm" onSubmit={this.createPokemon}>
                <input type="text" name="pokemon" value={this.state.pokemonName} onChange={this.handleChange} placeholder="Pokemon Name" />
                <button type="submit" className="searchPokemonButton"><SearchPokemonButton /></button>
            </form>
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