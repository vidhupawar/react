import React, {Component} from "react";
import { Card, Icon, Image } from 'semantic-ui-react';
import MovieDash from "./MovieDash";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class MoviesCard extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    return (
        <div>
          <Card>
            <Image alt="logo" src={this.props.movie.logo}/>
            <Card.Content>
              <Card.Header>{this.props.movie.name}</Card.Header>
              <Card.Meta>
                <span className='date'>{this.props.movie.release_dt}</span>
              </Card.Meta>
              <Card.Description>{this.props.movie.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <li>
              <Icon name='heart' />{this.props.movie.review}% <Link to={'/' + this.props.movie.name}>{this.props.movie.name}</Link>
              </li>
            </Card.Content>
          </Card>
        </div>
    )
  }
}
