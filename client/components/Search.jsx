import React, { Component } from 'react';
import DayPicker from './DayPicker.jsx';
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
      regions: [],
      results: []
    }
    this.toggleSearch = this.toggleSearch.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
    // this.getSectionSuggestions = this.getSectionSuggestions.bind(this);
    // this.renderSectionTitle = this.renderSectionTitle.bind(this);
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

      let restaurantNames = restaurants.data.map(res => {
        let obj = {
          section: "Restaurants",
          name: res.restaurantName
        }
        return obj;
      });
      
      let restaurantCuisines = restaurants.data.map(res => {
        let obj = {
          section: "Cuisines",
          name: res.restaurantCuisine
        }
        return obj;
      });

      let array = restaurants.data.map(res => res.location.split(', '))

      let metros = array.map(tuple => {
        let obj = {
          section: "Locations",
          name: tuple[0]
        }
        return obj;
      });

      let regions = [];
      for (let tuple = 0; tuple < array.length; tuple++) {
        if (array[tuple][1] && !regions.includes(array[tuple][1])) {
          let obj = {
            section: "Locations",
            name: array[tuple][1]
          }
          regions.push(obj)
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
  
    // return inputLength === 0 ? []: this.state.metros.filter(metro => metro.toLowerCase().slice(0, inputLength) === inputValue);

    if (inputLength > 0) {
      return this.state.metros.filter(metro => metro.name.toLowerCase().slice(0, inputLength) === inputValue)
    }
  }
  
  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  // render suggestions
  
  renderSuggestion(suggestion) {
    return (
    <div>
      {suggestion.name}
    </div>
    ) 
  }
  
  shouldRenderSuggestions(value) {
    return value.trim().length > 1;
  }

  // Render Sections
  
  // renderSectionTitle(suggestion) {
  //   return (
  //     <strong>{suggestion.section}</strong>
  //     );
  //   }
    
  // getSectionSuggestions(section) {
  //   return section.suggestions;
  // }

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
                  <option value="13:00">1:00 PM</option>
                </select>
              </div>

              <div className={styles.partySize}>
              <select>
                  <option value="2">2 people</option>
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
                shouldRenderSuggestions={this.shouldRenderSuggestions}
                inputProps={inputProps}
                getSectionSuggestions={this.getSectionSuggestions}
                // renderSectionTitle={this.renderSectionTitle}
                // multiSection={true}
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
