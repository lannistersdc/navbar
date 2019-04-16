import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
// CSS for component
import styles from '../styles/search.module.scss';
// CSS for autosuggest 
import theme from '../styles/autosuggest.module.scss';


export default class AutoSuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    };
    this.onChange = this.onChange.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
  }

  onChange(e, { newValue }) {
    this.setState({ 
      value: newValue 
    })
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? []: this.props.metros.filter(metro => metro.toLowerCase().slice(0, inputLength) === inputValue);
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    })
  }

  getSuggestionValue(suggestion) {
    return suggestion.name
  }
  
  renderSuggestion(suggestion) {
    return (
    <div>
      {suggestion}
    </div>
    ) 
  }

  render() {
    let {restaurantNames, restaurantCuisines, metros, regions} = this.props;

    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Location, Restaurant, or Cuisine',
      value,
      onChange: this.onChange
    }
    return (
      <label className={styles.searchInput}>
        <form>
          <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          theme={theme}
          />
        </form>
      </label>
    )
  }
}
