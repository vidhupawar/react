import React, {Component} from "react";
import '../App.css';
import logo from '../images/Book-my-show.jpg';
import logo_short from '../images/logo_short.jpg';
import SearchBar from './SearchBar';
import MovieDashboard from './MovieDashoard';
import MovieDash from './MovieDash';

export default class Headers extends Component {
  constructor(){
    super();
  }
  render(){
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" className="Bms-logo"/>
          <img src={logo_short} className="App-logo" alt="logo" />
        </header>
      </div>
    )
  }
}
