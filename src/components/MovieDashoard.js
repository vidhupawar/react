import React, {Component} from 'react';
import MoviesCard from "./MoviesCard";

export default class MovieDashboard extends Component {
  constructor(props) {
   super(props);
  }


  render() {
    return (
    <div className="ui two column centered grid">
      <div className="two column centered row" >
        {this.props.obj.data.map((x)=><div className="column" key={x.id}><MoviesCard movie={x}/></div>)}
        {this.props.obj.loadingState ? <p className="loading "> loading More Items..</p> : ""}
      </div>
    </div>
    );
  }
}
