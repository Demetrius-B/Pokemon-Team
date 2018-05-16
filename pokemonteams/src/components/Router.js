import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


// custom import
import App from './../App'

const Router = () => {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App} />
                </Switch>
            </BrowserRouter>
        )
}

export default Router;