import React, { Component } from 'react';

// Custom Import
import AddTeamForm from './addTeamForm'

class pokemonTeam extends Component{
    render(){
    //     const team = this.props.teams
    //     const teamsList = this.props.teams.map((team) => 
    //         <h2>{team}</h2>
    // );
        return(
            <div className="addTeamForm">

                <AddTeamForm addTeam={this.props.addTeam}/>
            </div>
        );
    }
}


export default pokemonTeam