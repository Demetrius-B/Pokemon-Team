import React, { Component } from 'react';

// Custom import
import DeleteButton from '@material-ui/icons/Delete'
import SearchPokemonButton from '@material-ui/icons/Search'


class addPokemonForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            targetTeam: ''
        };

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.createTeam = this.createTeam.bind(this);
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
            pokemon: []
        }

        this.props.addTeam(team)

        // refresh form
        // console.log(event.currentTarget.reset)
    }








    checkTeamSize = (event) => {
        console.log("CHECKING TEAM SIZE:::::")

        for (let i = 0; i < this.props.teams.length; i++) {
            console.log("TEAM SIZE:::::::", this.props.teams[i].pokemon.length)            
        }

        if (this.props.teams[0].pokemon.length < 6) {
            this.createPokemon(event) // If team size is under 6 then add pokemon
        } else {
            this.teamFull() // error out if team is full
        }

        event.preventDefault();
    }

    render() {
        return (
            <form className="addPokemonForm" onSubmit={this.checkTeamSize}>
                <input type="text" name="pokemon" value={this.state.pokemonName} onChange={this.handleChange} placeholder="Pokemon Name" />
                <button type="submit" className="searchPokemonButton"><SearchPokemonButton /></button>
            </form>
        );
    }
}


export default addPokemonForm