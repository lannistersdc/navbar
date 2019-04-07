import React, { Component } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import styles from '../search.module.scss';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      date: '',
      time: '',
      partySize: 2,
      value: '',
      suggestions: [],
      restaurantNames: [],
      restaurantCuisines: [],
      metros: [],
      regions: []
    }
    this.toggleSearch = this.toggleSearch.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.handleFindTableButton = this.handleFindTableButton.bind(this);

  }

  componentDidMount() {
    this.fetchRestaurantData();
  }
  
  fetchRestaurantData() {
    axios
    .get('/restaurant')
    .then(restaurants => {
      let restaurantNames = restaurants.data.map(res => res.restaurantName);
      let restaurantCuisines = restaurants.data.map(res => res.restaurantCuisine);
      let array = restaurants.data.map(res => res.location.split(', '))
      let metros = array.map(tuple => tuple[0]);
      let regions = [];
      for (let tuple = 0; tuple < array.length; tuple++) {
        if (array[tuple][1] && !regions.includes(array[tuple][1])) {
          regions.push(array[tuple][1])
        }
      }
      this.setState({
      restaurantNames,
      restaurantCuisines,
      metros,
      regions
      }, () => console.log(this.state))
    })
  }

  toggleSearch(e) {
    e.preventDefault();
    let opened = !this.state.opened
    this.setState({ 
      opened 
    }, () => console.log(`Search opened: ${this.state.opened}`))
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? []: this.state.metros.filter(metro => metro.toLowerCase().slice(0, inputLength) === inputValue);
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
  

  onChange(e, { newValue }) {
    // let value = e.target.value;
    // predictive search function goes here
    this.setState({ 
      value: newValue 
    }, () => console.log(this.state.value))
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

  handleFindTableButton(e) {
    e.preventDefault();
    // let id = e.target.id
    // for now, hardcoded:
    let restaurantId = this.props.restaurantId + 1;
    this.props.fetchRestaurant(restaurantId);
    // page rerenders based on restaurantId clicked

  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Location, Restaurant, or Cuisine',
      value,
      onChange: this.onChange
    }

    return (
      <div>
        <button name="search" onClick={this.toggleSearch}>Search</button>

        {this.state.opened && 
          <div className={styles.header}>

            <div className={styles.close}>
            <button onClick={this.toggleSearch}><h6>X</h6></button>
            </div>

            <div className={styles.main}>

            Find your table for any occasion:

            <div>
              date
            </div>

            <div>
              time
            </div>

            <div>
              partySize
            </div>

            <div id="search-input">
              {/* <form> */}
                {/* <input onChange={this.onChange} value={this.state.value} placeholder="Location, Restaurant, or Cuisine"></input><br /> */}
                <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                />
                {/* <button name="find-table-btn" onClick={this.handleFindTableButton}>Find a Table</button> */}
              {/* </form> */}
            </div>
            
            </div>

          </div>
        }

      </div>
    )
  }
}
