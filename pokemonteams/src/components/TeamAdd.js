import React, { Component } from 'react';

// icons
import CreateBtn from '@material-ui/icons/Create'

class TeamAdd extends Component {
  teamNameInput = React.createRef();

  createTeamName = e => {
    e.preventDefault();
    this.props.addTeamName(this.teamNameInput.current.value);
    e.currentTarget.reset();
  };

  render() {
    return (
      <div className="row addTeam">
        <form onSubmit={this.createTeamName}>
          <h1>Create new team</h1>
          <div>
            <input
              type="text"
              ref={this.teamNameInput}
              required
              placeholder="Team Name"
            />
            <button><CreateBtn /></button>
          </div>
        </form>
      </div>
    );
  }
}

export default TeamAdd;
