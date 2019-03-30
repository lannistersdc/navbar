import React, { Component } from 'react';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantName: '',
      restaurantCuisine: '',
      location: ''
    }
  }
  render() {
    return (
      <div>
        Hello from react
      </div>
    )
  }
}
