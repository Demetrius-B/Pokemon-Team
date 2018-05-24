import Rebase from 're-base'
import firebase from 'firebase/app';
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyASAGMPvLoJ_AW64PtQi93SkkUOWJ4a39Y",
    authDomain: "pokemonteams-20db3.firebaseapp.com",
    databaseURL: "https://pokemonteams-20db3.firebaseio.com"
})


const base = Rebase.createClass(firebaseApp.database())

export { firebaseApp };

export default base

  