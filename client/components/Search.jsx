import React, { Component } from 'react';
import axios from 'axios';
import AutoSuggest from './AutoSuggest.jsx';
import DayPicker from './DayPicker.jsx';

// CSS for component
import styles from '../styles/search.module.scss';

// CSS for autosuggest 
import theme from '../styles/autosuggest.module.scss';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      time: '',
      partySize: 2,
      restaurantNames: [],
      restaurantCuisines: [],
      metros: [],
      regions: []
    }
    this.toggleSearch = this.toggleSearch.bind(this);
    this.createTimes = this.createTimes.bind(this);
    this.createPartySizes = this.createPartySizes.bind(this);
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

  handleFindTableButton(e) {
    e.preventDefault();
    let restaurantId = this.props.restaurantId + 1;
    this.props.fetchRestaurant(restaurantId);
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
    let {restaurantNames, restaurantCuisines, metros, regions} = this.state;

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

            <div>
              <h3>
                <span>Find your table for any occasion</span>
              </h3>
            </div>

            <div className={styles.selectionscontainer}>

              <label>
                <div className={styles.selector}>
                <DayPicker />
                </div>
              </label>

              <label>
                <select className={styles.selector}>
                  {this.createTimes()}
                </select>
              </label>

              <label>
                <select className={styles.selector}>
                  {this.createPartySizes()}
                </select>
              </label>

              <div className={styles.autosuggest}>
                <AutoSuggest 
                restaurantNames={restaurantNames}
                restaurantCuisines={restaurantCuisines}
                metros={metros}
                regions={regions}
                />
              </div>

              <div className={styles.searchbutton}>
                <button name="find-table-btn">Find a Table</button>
              </div>

            </div>

          </div>
        }

      </div>
    )
  }
}
