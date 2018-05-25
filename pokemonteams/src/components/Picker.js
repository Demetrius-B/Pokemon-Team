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
        <div className="pickerForm" style={{display: 'flex', 'flexDirection': 'column', 'alignItems': 'center', "backgroundColor": 'white', justifyContent: "center"}}> 
            <form className="form" action="" style={{'padding': '2rem', textAlign: "center", backgroundColor:"#d9a635", border:"1rem #1e2371 double"}} onSubmit={this.goToAccount} >
                <h2 style={{fontSize:"3rem", marginBottom: "1rem", color: "black"}}>Enter an existing PokemonTeam or create a new one!</h2>
                <input className="form-control" type="text" ref={this.accountName} required placeholder="Pokemon Team Name" style={{'marginBottom': '1rem', fontSize: "2.5rem", color:"black"}} />
                <button className="btn btn-lg btn-primary btn-block" type="submit" style={{fontSize:"2rem", backgroundColor: "#1e2371", borderColor: "#d9a635"}}>Submit</button>
            </form>
        </div>
    )}
}

export default Picker