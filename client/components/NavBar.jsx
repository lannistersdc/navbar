import React, { Component } from 'react';
import Logo from './Logo.jsx';
import Breadcrumb from './Breadcrumb.jsx';
import LocationPicker from './LocationPicker.jsx';
import Search from './Search.jsx';
import GuestView from './GuestView.jsx';
import UserView from './UserView.jsx';
import axios from 'axios';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      restaurantId: null,
      restaurantName: '',
      restaurantCuisine: '',
      location: ''
    }
    this.fetchRestaurant = this.fetchRestaurant.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.restaurantId)
    let restaurantId = this.state.restaurantId ? this.state.restaurantId : 1;
    this.fetchRestaurant(restaurantId);
    // determine if user is logged in or not
  }

  fetchRestaurant(restaurantId) {
    axios
    .get(`/restaurant/${restaurantId}`)
    .then(restaurant => {
      let { restaurantId, restaurantName, restaurantCuisine, location } = restaurant.data;
      this.setState({ 
        restaurantId,
        restaurantName,
        restaurantCuisine,
        location
      }, () => console.log(this.state));
    })
  }

  render() {
    let { restaurantName, restaurantCuisine, location } = this.state;
    location = location.split(', ');
    return (
      <div>

        <div>
          <Logo />
        </div>

        <div className="breadcrumb">
          <Breadcrumb region={location[1]} city={location[0]}/>
        </div>
        
        <div className="location-picker">
          <LocationPicker />
        </div>
        <br /><br />


        {this.state.isLoggedIn &&
          <div className="user-menu">
            <UserView />
            <br /><br />
          </div>
        }

        {!this.state.isLoggedIn &&
          <div className="user-menu">
            <GuestView />
            <br /><br />
          </div>
        }

        <div className="search">
          <Search fetchRestaurant={this.fetchRestaurant} restaurantId={this.state.restaurantId}/>
        </div>
        <br /><br />

        <div className="resinfo">
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
