import React, { Component } from 'react';

// Custom imports
import AddTeamButton from '@material-ui/icons/LibraryAdd'

class addTeamForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            teamName: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createTeam = this.createTeam.bind(this);
    }
    
    handleChange(event) {
        this.setState({teamName: event.target.value});
        console.log(this.state)
    }
    
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.teamName);
        event.preventDefault();
    }

    createTeam = (event) => {
        event.preventDefault()

        const team = {
            id: 'team' + Date.now(),
            name: this.state.teamName,
            pokemon: {}
        }

        this.props.addTeam(team)

        // refresh form
        // console.log(event.currentTarget.reset)
    }
    render() {
        return (
          <form className="addTeamForm" onSubmit={this.createTeam}>
            <h1>Create a New Team</h1>
            <input name="name" type="text" value={this.state.teamName} onChange={this.handleChange} placeholder="Team Name" />

            <button type="submit" className="searchButton"><AddTeamButton /></button>
          </form>
        );
    }
}

export default addTeamForm;