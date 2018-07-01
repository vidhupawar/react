import React, { Component } from 'react';
import Headers from "./Headers"
import SearchBar from "./SearchBar"
import MovieDashoard from "./MovieDashoard";
import moment from 'moment';
var LogoList = require('../Data/logo');

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
       data: [],
       loadingState: false,
       limit: 0,
       count: 0
     };
     this.loadMoreItems()
   }


  displayItems(limit) {
    fetch('https://pacific-hollows-45027.herokuapp.com/getData/' + limit)
    .then(response => response.json())
    .then(data => {
      if(data && data.result && data.result.length){
        for(var z in data.result){
          data.result[z]['logo'] = LogoList.logo[data.result[z].id];
          data.result[z].release_dt = moment(data.result[z].release_dt).format("DD/MM/YYYY")
        }
        this.setState({data : data.result, limit: limit, loadingState: false, count: data.count});
      }
    })
  }



  loadMoreItems() {
	 if(this.state.loadingState){
		 return;
   }
   this.setState({loadingState : true});
    setTimeout(() => {
      this.displayItems(this.state.limit + 2);
    }, 100);
  }

  componentDidMount() {
    this.refs.iScroll.addEventListener("scroll", () => {
      if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight - 10 && (this.state.count > this.state.limit || this.state.count == 0)){
        this.loadMoreItems();
      }
    });
  }

  render() {
    return (
      <div className="Home">
      <Headers/>
      <SearchBar movies={this.state.data}/>
      <div ref="iScroll" style={{ height: "400px", overflow: "auto" }}>
        <MovieDashoard obj={this.state} />
      </div>
      </div>
    );
  }
}

export default Home;
