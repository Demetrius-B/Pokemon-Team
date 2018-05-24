import React from "react";


class Picker extends React.Component {
    accountName = React.createRef();

goToAccount = (event) => {
    event.preventDefault();
    const name = this.accountName.current.value;
    this.props.history.push(`/pokemonTeam/${name}`);
}

    render(){
        return(
            <div className="pickerForm" style={{display: 'flex', 'flexDirection': 'column', 'alignItems': 'center', "backgroundColor": 'white', 'width':'50%', 'padding': '1rem 0rem', justifyContent: "center"}}> 
                <form className="form" action="" style={{'textAlign':'center', 'padding': '2rem'}} onSubmit={this.goToAccount} >
                    <h2>Enter the existing PokemonTeam or create a new one!</h2>
                    <input className="form-control" type="text" ref={this.accountName} required placeholder="Pokemon Team Name" style={{'marginBottom': '.5rem'}} />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Show PokemonTeams -></button>
                </form>
            </div>
        )}
}

export default Picker