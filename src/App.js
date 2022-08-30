import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" component={ Login } />
        </Switch>
      </div>
    );
  }
}

export default App;
