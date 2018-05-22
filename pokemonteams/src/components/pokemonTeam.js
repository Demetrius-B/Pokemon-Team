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

        // this.handleChange = this.handleChange.bind(this);
        // this.createPokemon = this.createPokemon.bind(this);
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

    render(){
        return(
            <BrowserRouter>
                <div className="teamList">
                    <div className="addTeamForm">
                        <AddTeamForm addTeam={this.props.addTeam}/>
                    </div>

                    <div className="teams">
                        <Team teams={this.props.teams} maxTeams={this.props.maxTeams} addPokemon={this.props.addPokemon}/>
                    </div>

                    {/* Edit Target Teams details */}
                    {/* <div className="editTeam">
                        <Route path="/editTeam" component={this.editTeam}/>
                    </div> */}
                </div>
            </BrowserRouter>

        );
    }
}


export default pokemonTeam