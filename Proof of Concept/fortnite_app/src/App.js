import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = { 
      isLoading: true,
      pokeData: [],
      arr: [],
      pokemon_name: String(''),
      pokemon_img: String(),
      imgFound: false
    }
  }

  componentDidMount(){
    let data = []
    
    let baseUrl = "https://pokeapi.co/api/v2/pokemon/mew"

    const options = {
    mode: 'cors',
    headers:{
      'Access-Control-Request-Method':"GET"
      }
    }

    fetch(baseUrl, options)
      .then(response => response.json())
      .then(responseAsJson => {
        data = responseAsJson;
        this.setState({pokeData: data})
        console.log("State Set:: COMPLETE::", data.name)
        this.setState({pokemon_name: data.name, pokemon_img: data.sprites.front_default})
        // if (this.state.pokemon_img !== undefined){
          // this.setState({imgFound: true})
        // } else {
        //   console.log("Img not found")
        // }
      })
  }

  render() {
    console.log('POKEDATA:::::::', this.state)

    let pokemonName = this.state.pokemon_name;
    let pokemonImg = this.state.pokemon_img;

    let imgFoundData

    // if (this.state.imgFound !== false) {
      imgFoundData = (<img src={pokemonImg} className="image" />)
    // } else {
    //   imgFoundData = (<h3>No Image Found!</h3>)
    // }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Fortnite Player Lookup</h1>
        </header>
        <div className="pokemonData">
          <h1>Pokemon Name: {pokemonName}</h1>

          {imgFoundData}
        </div>
      </div>
    );
  }
}

export default App;
