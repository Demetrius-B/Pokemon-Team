import React, { Component } from 'react';

class addTeamForm extends Component {



    render(){
        return(
            <div className="main">
                {/* className='"pokemonTeam" + team name' */}
                <div className="pokemonTeam">
                <div className="pokemonTeamHeader">
                    <p>Team Name</p>
                    <a>Edit</a>
                </div>
                <ul className="pokemonList">
                    <li>Mew2</li>
                </ul>
                </div>
            </div>
        )
    }
}

export default addTeamForm;
