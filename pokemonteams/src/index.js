import React from 'react';
import { render } from "react-dom";
import "./css/main.css"
import Router from './components/Router';

render(<Router basename={process.env.PUBLIC_URL}/>, document.querySelector('#main'))