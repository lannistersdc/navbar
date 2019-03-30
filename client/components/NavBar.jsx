import React, { Component } from 'react';
import Logo from './Logo.jsx';
import axios from 'axios'

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantName: '',
      restaurantCuisine: '',
      location: ''
    }
    this.fetchRestaurant = this.fetchRestaurant.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.restaurantId)
    this.fetchRestaurant();
  }

  fetchRestaurant() {
    let id = this.props.restaurantId;
    axios
    .get(`/restaurant/${id}`)
    .then(restaurant => {
      let { restaurantName, restaurantCuisine, location } = restaurant.data;
      this.setState({ 
        restaurantName,
        restaurantCuisine,
        location
      }, () => console.log(this.state));
    })
  }

  render() {
    let { restaurantName, restaurantCuisine, location } = this.state;
    return (
      <div>

        <div>
          <Logo />
        </div>

        <div>
          Name: {restaurantName}
          <br />
          Cuisine: {restaurantCuisine}
          <br />
          Location: {location}
        </div>
        
      </div>
    )
  }
}
