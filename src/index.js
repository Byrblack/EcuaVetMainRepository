import 'bulma/css/bulma.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './home/home';
import "./index.css";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrincipalLayout from './layout/principalLayout';

  


ReactDOM.render(
    
        <Router>
            <Switch> 
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/principalLayout">
                <PrincipalLayout />
              </Route>
              
            </Switch>
          </Router>,
document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


