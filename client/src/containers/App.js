import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Landing from '../components/Landing';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import Admin from './Admin';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
