import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Home from "./components/home"
import Headers from "./components/Headers"
import SearchBar from "./components/SearchBar"
import MovieDashoard from "./components/MovieDashoard"
import MovieDash from "./components/MovieDash"


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/:movieName' component={MovieDash}/>
        </Switch>
      </div>
    );
  }
}
     
export default App;
