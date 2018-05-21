import React, { Component } from 'react';
import { Link } from 'react-router-dom'


// Custom import
import DeleteButton from '@material-ui/icons/Delete'


class team extends Component {

    renderPokedex = () => {
        console.log("Trying to render")
        return this.props.teams.map((index, value) => {
            // console.log("Adding pokemon to team!")
            // console.log("POKEMON::::", index)

            // setting pokemon array
            const pokemonArr = index.pokemon
            // console.log("POKEMON? " , pokemonArr)

            return pokemonArr.map((index, value) => {

                index.name = index.name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                    return letter.toUpperCase(); // Makes first letter Uppcase
                });

                return(
                    <li className="pokemon">
                        <img alt="pokemon Face" src={index.img} />
                        <div className="pokemonData">
                            <h1 className="pokemonName">{index.name}</h1>
                            <p className="pokemonType">{index.type}</p>
                        </div>
                    </li>
                )
            });

        })
    }
    render(){
        return(
            <div className="pokemonTeam">
            {   
                Object.keys(this.props.teams).map(function (key) {
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