import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/trybewallet" component={ Login } />
          <Route exact path="/trybewallet/carteira" component={ Wallet } />
        </Switch>
      </div>
    );
  }
}

export default App;
