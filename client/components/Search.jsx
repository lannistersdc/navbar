import React, { Component } from 'react';
import DayPicker from './DayPicker.jsx';
import axios from 'axios';
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
        <div className={styles.searchButton} onClick={this.toggleSearch}>Search</div>

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

              <div>
                <DayPicker />
              </div>

              <div className={styles.time}>
                <select>
                  {this.createTimes()}
                </select>
              </div>

              <div className={styles.partySize}>
                <select>
                  {this.createPartySizes()}
                </select>
              </div>

            </div>

            <div className={styles.searchInput}>
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
            </div>
            

          </div>
        }

      </div>
    )
  }
}
