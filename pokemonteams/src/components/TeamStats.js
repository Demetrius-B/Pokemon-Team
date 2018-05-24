import React, { Component } from 'react';
import TeamDetails from './TeamDetails';

class TeamStats extends Component {
  renderTeams = () => {
    if (this.props.teams.length === 0) {
      return null
    } else if (this.props.teams.length > 0) {
      return this.props.teams.map((team, index) => {
        const pokedex = this.props.pokemon[index];
        return (
          <TeamDetails
            {...team}
            index={index}
            key={index}
            pokedex={pokedex}
            addPokemon={this.props.addPokemon}
            deleteTeam={this.props.deleteTeam}
            deletePokemon={this.props.deletePokemon}
          />
        );
      });
    }


  };

  render() {
    return (
      <div className="row teamList">
        {this.renderTeams()}
      </div>
    )}
}

export default TeamStats;