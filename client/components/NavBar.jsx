import React, { Component } from 'react';
import Logo from './Logo.jsx'

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

        <div>
          Hello from react
        </div>

        <div>
          <Logo />
        </div>
        
      </div>
    )
  }
}
