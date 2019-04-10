import React, { Component } from 'react';
import Logo from './Logo.jsx';
import Breadcrumb from './Breadcrumb.jsx';
import LocationPicker from './LocationPicker.jsx';
import Search from './Search.jsx';
import GuestView from './GuestView.jsx';
import UserView from './UserView.jsx';
import axios from 'axios';
import styles from '../styles/container.module.scss';

import MagnifyingGlass from '../svg/magnifying-glass.jsx';

import SVG from '../svg/person.jsx'

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
        {/* START OF PARENT DIV */}

        <div className={styles.container}>
        {/* START OF CONTAINER */}

          <div className={styles.Logo}>
            <Logo />
          </div>
          
          <div className={styles.component+ ' ' + styles.LocationPicker}>
            <LocationPicker region={location[1]} city={location[0]}/>
          </div>

        
        {this.state.isLoggedIn &&
          <div className={styles.UserView}>
            <UserView />
          </div>
        }

        {!this.state.isLoggedIn &&
          <div className={styles.GuestView}>
            <GuestView />
          </div>
        }

          <div className={styles.Search}>
          {/* <MagnifyingGlass /> */}
            <Search fetchRestaurant={this.fetchRestaurant} restaurantId={this.state.restaurantId}/>
          </div>

        </div>
        
        {/* END OF CONTAINER */}

        <div id="breadcrumb" className={styles.breadcrumb}>
          <Breadcrumb region={location[1]} city={location[0]}/>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <div className={styles.resData}>
          Name: {restaurantName}
          <br />
          Cuisine: {restaurantCuisine}
          <br />
          Location: {location}
          <br />
          <br />
          <br />
          <br />
          <br />
          <SVG />
        </div>
        
        {/* END OF PARENT DIV */}
      </div>
    )
  }
}
