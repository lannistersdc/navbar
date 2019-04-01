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
  }

  toggleSearch(e) {
    e.preventDefault();
    let opened = !this.state.opened
    this.setState({ opened }, () => console.log(`Search opened: ${this.state.opened}`))
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

            <div>
              search input
            </div>

            <div>
              search button
            </div>

          </div>
        }

      </div>
    )
  }
}
