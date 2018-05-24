import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// custom import
import Picker from './Picker';
import App from './App';
import NotFound from './NotFound'

const Router = () => {
        return(
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route exact path="/" component={Picker} />
                    <Route path="/pokemonTeam/:userId" component={App} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        )
}

export default Router;