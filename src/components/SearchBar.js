import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import Redirect from 'react-router-dom/Redirect';
const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      suggestions: [],
      searchResults: [],
      showMovie: false
    };

    this.getSuggestions = value => {
      if(value){
          fetch('https://pacific-hollows-45027.herokuapp.com/search/' + value)
          .then(response => response.json())
          .then(data => {
            if(data.searchResult && data.searchResult.length){
                this.state.searchResults = data.searchResult;
                const escapedValue = escapeRegexCharacters(value.trim());
                if (escapedValue === '') {
                  return [];
                }
                const regex = new RegExp((escapedValue).replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&').trim(), "i");
                const suggestions = this.state.searchResults.filter(mov => {
                  console.log("regex", regex.test(mov.name))
                  return  regex.test(mov.name) //{name: regex.test(mov.name), sortName: mov.sr_nm}
                });
                return this.setState({suggestions : suggestions});
            }else{
              const suggestions = [
                { noResult: true }
              ];
              return this.setState({suggestions : suggestions});
            }
          })
      }else{
        const suggestions = [
          { noResult: true }
        ];
        return this.setState({suggestions : suggestions});
      }
    }

  }


  onChange = (event, { newValue, method }) => {
    if(newValue){
      this.setState({
        value: newValue
      });
    }
  };

  getSuggestionValue = suggestion => {
    if(suggestion && suggestion.sr_nm){
      this.state.showMovie = <Redirect push to={"/" + suggestion.sr_nm} />
      return suggestion.name;
    }
  };

  renderSuggestion = suggestion => {
    if (suggestion.noResult) {
      return (
        <span>
          <strong className="red-color">"No Search Result Found"</strong>
        </span>
      );
    }
    return suggestion.name;
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.getSuggestions(value)
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search Movies",
      value,
      onChange: this.onChange
    };

    return (
      <div>
      {this.state.showMovie ? this.state.showMovie  : ''}
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        onSuggestionSelected={this.onSuggestionSelected}
        inputProps={inputProps}
      />
      </div>
    );
  }
}
