import React, { Component } from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      date: '',
      time: '',
      partySize: 2,
      searchInput: ''
    }
    this.toggleSearch = this.toggleSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFindTableButton = this.handleFindTableButton.bind(this);
  }

  toggleSearch(e) {
    e.preventDefault();
    let opened = !this.state.opened
    this.setState({ 
      opened 
    }, () => console.log(`Search opened: ${this.state.opened}`))
  }

  handleInputChange(e) {
    let searchInput = e.target.value;
    // predictive search function goes here
    this.setState({ 
      searchInput 
    }, () => console.log(this.state.searchInput))
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
    return (
      <div>
        <button name="search" onClick={this.toggleSearch}>Search</button>

        {this.state.opened && 
          <div>
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
              <form>
                <input onChange={this.handleInputChange} value={this.state.searchInput} placeholder="Location, Restaurant, or Cuisine"></input><br />
                <button name="find-table-btn" onClick={this.handleFindTableButton}>Find a Table</button>
              </form>
            </div>

          </div>
        }

      </div>
    )
  }
}
