import React from 'react'
import PropTypes from 'prop-types'

const Login = (props) => (
    <div className="row">
        <div className="login">
            <h2>PokemonTeams Login</h2>
            <p>Sign in to manage this Pokemon Teams</p>
            <button className="github" onClick={() => props.authenticate('Github')}>Login with Github</button>
            <button className="facebook" onClick={() => props.authenticate('Facebook')}>Login with Facebook</button>
        </div>
    </div>
)

Login.PropType = {
    authenticate: PropTypes.func.isRequired
}

export default Login