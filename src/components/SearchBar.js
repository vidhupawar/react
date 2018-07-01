import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { BrowserRouter } from 'react-router-dom'
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
      const escapedValue = escapeRegexCharacters(value.trim());

      if (escapedValue === '') {
        return [];
      }

      const regex = new RegExp('^' + escapedValue, 'i');
      const suggestions = this.props.movies.filter(mov => regex.test(mov.name));
      return suggestions;
    }

  }


  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  getSuggestionValue = suggestion => {
    if (suggestion.isAddNew) {
      return this.state.value;
    }
    this.state.showMovie = <Redirect push to={"/" + suggestion.name} />
    return suggestion.name;
  };

  renderSuggestion = suggestion => {
    return suggestion.name;
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
    fetch('https://pacific-hollows-45027.herokuapp.com/search/' + value)
    .then(response => response.json())
    .then(data => {
      this.searchResults = data.searchResults;
    })
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
