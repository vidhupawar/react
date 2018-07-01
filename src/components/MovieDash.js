import React, {Component} from "react";
import Headers from "./Headers";
import { Icon } from 'semantic-ui-react';
import moment from 'moment';
import Redirect from 'react-router-dom/Redirect';
var LogoList = require("../Data/logo");
export default class MovieDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNotExists : false,
      currentMovie: {}
    };
    this.getSingleMovie();
  }

  getSingleMovie(){
    fetch('https://pacific-hollows-45027.herokuapp.com/getSingleMovie/' + this.props.match.params.movieName)
    .then(response => response.json())
    .then(data => {
      if(data && data.movie){
        data.movie['logo'] = LogoList.logo[data.movie.id]
        data.movie.release_dt = moment(data.movie.release_dt).format("DD/MM/YYYY")
        data.movie.audio = data.movie.audio.join(" | ");
        data.movie.dimension = data.movie.dimension.join(" | ");
        data.movie.type = data.movie.type.join(" | ");
        for(var i in data.movie.cast){
          data.movie.cast[i] = <p key={i}>{data.movie.cast[i].name} | {data.movie.cast[i].as}</p>
        }
        for(var j in data.movie.crew){
          data.movie.crew[j] = <p key={j}>{data.movie.crew[j].name} | {data.movie.crew[j].position}</p>
        }
        this.setState({currentMovie : data.movie})
      }else{
        this.setState({isNotExists: true})
      }
    })
  }

  render(){
    return(
      <div>
        {this.state.isNotExists ? <Redirect push to={"/"} />  : ''}
        <Headers />
        <div className="ui internally celled grid">
           <div className="row">
            <div className="three wide column">
              <img alt="" src={ this.state.currentMovie.logo} />
            </div>
            <div className="ten wide column">
              <p><b>NAME : {this.state.currentMovie.name}</b> </p>
              <p>{this.state.currentMovie.dimension}</p>
              <p>{this.state.currentMovie.audio}</p>
              <p>{this.state.currentMovie.type}</p>

              <p><Icon name='calendar alternate outline' />{this.state.currentMovie.release_dt}</p>
              <p><Icon name='clock outline' />{this.state.currentMovie.duration}</p>
              <p><Icon name='heart' />{this.state.currentMovie.review}% </p>
              <p>{this.state.currentMovie.votes} votes </p>
              <p><b>CAST : </b></p>
              <span>{this.state.currentMovie.cast}</span>
              <br /><p><b>CREW : </b></p>
              <span>{this.state.currentMovie.crew}</span>
            </div>
            <div className="three wide column">
            </div>
          </div>
        </div>
      </div>
    )
  }
}
