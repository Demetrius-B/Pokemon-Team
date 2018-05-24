import React from 'react';
import { render } from "react-dom";
import Picker from './components/Picker';
import "./css/main.css"
import Router from './components/Router';

render(<Router />, document.querySelector('#main'))