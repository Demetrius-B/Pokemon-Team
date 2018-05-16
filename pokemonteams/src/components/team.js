import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom'


// Custom import
import editTeamForm from './editTeamForm'

class team extends Component {
    render(){
        return(
            <div className="pokemonTeam">
            {   
                Object.keys(this.props.teams).map(function (key) {
                    let team;
                return(
                    <div className="pokemonTeamList" id={key}>
                        <div className="pokemonTeamHeader">
                            <p className="teamName">{this.props.teams[key].name}</p>
                            <div className="crudControls">
                                <Link to="/editTeam">Edit</Link>
                                <Link to="/addPokemon">Add</Link>
                            </div>
                        </div>
                        <ul className="pokemonList">
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