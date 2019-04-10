import React, { Component } from 'react';
import axios from 'axios';
import DayPicker from './DayPicker.jsx';
import Autosuggest from 'react-autosuggest';
import styles from '../styles/search.module.scss';
import theme from '../styles/autosuggest.module.scss';

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

    this.createTimes = this.createTimes.bind(this);
    this.createPartySizes = this.createPartySizes.bind(this);
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

  createTimes() {
    let options = [];
    for (let i = 8; i <= 12; i++) (
      options.push(<option value={`${i}:00 AM`}>{i}:00 AM</option>)
    )
    for (let i = 1; i < 12; i++) (
      options.push(<option value={`${i}:00 PM`}>{i}:00 PM</option>)
    )
    return options;
  }

  createPartySizes() {
    let options = [];
    options.push(<option value="1 person">1 person</option>)
    for (let i = 2; i <= 12; i++) (
      options.push(<option value={`${i} people`}>{i} people</option>)
    )
    options.push(<option value="Larger party">Larger party</option>)
    return options;
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
        <svg 
          name="magnifying-glass"
          xmlns="http://www.w3.org/2000/svg" 
          xmlnsXlink="http://www.w3.org/1999/xlink" 
          viewBox="0 0 50 50" 
          version="1.1" 
          width="20px" height="20px"
          onClick={this.toggleSearch}
          >
          <g id="surface1">
          <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z "/>
          </g>
        </svg>

        {this.state.opened && 
          <div className={styles.header}>

            <div className={styles.close}>
            <button onClick={this.toggleSearch}><h6>X</h6></button>
            </div>

            <div className={styles.title}>
              <h3>
                <span>Find your table for any occasion:</span>
              </h3>
            </div>

            <div className={styles.selections}>

              <label>
                <DayPicker />
              </label>

              <label>
                <select className={styles.time}>
                  {this.createTimes()}
                </select>
              </label>

              <label className={styles.partySize}>
                <select>
                  {this.createPartySizes()}
                </select>
              </label>

            </div>

            <label className={styles.searchInput}>
              <form>
                {/* <input onChange={this.onChange} value={this.state.value} placeholder="Location, Restaurant, or Cuisine"></input><br /> */}
                <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                theme={theme}
                />
                <button name="find-table-btn" onClick={this.handleFindTableButton}>Find a Table</button>
              </form>
            </label>
            

          </div>
        }

      </div>
    )
  }
}
