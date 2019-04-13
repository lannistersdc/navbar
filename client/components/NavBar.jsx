import React, { Component } from 'react';
import Topbar from './Topbar.jsx';
import Logo from './Logo.jsx';
import Breadcrumb from './Breadcrumb.jsx';
import LocationPicker from './LocationPicker.jsx';
import Search from './Search.jsx';
import GuestView from './GuestView.jsx';
import UserView from './UserView.jsx';
import axios from 'axios';
import styles from '../styles/container.module.scss';
import 'react-dates/initialize';


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
    this.getRandomId = this.getRandomId.bind(this);
  }

  componentDidMount() {
    // let restaurantId = this.state.restaurantId ? this.state.restaurantId : 1;
    let restaurantId = this.state.restaurantId ? this.state.restaurantId : this.getRandomId();
    this.fetchRestaurant(restaurantId);
    // determine if user is logged in or not
  }
  

  fetchRestaurant(restaurantId) {
    axios
    // .get(`/restaurant/${restaurantId}`)
    .get(`http://localhost:3000/api/navbar/${restaurantId}`)
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

  getRandomId() {
    return Math.floor(Math.random() * Math.floor(101));
  }

  render() {
    let { restaurantName, restaurantCuisine, location } = this.state;
    location = location.split(', ');
    return (
      <div>
        {/* START OF PARENT DIV */}
        <Topbar />

        <div className={styles.container}>

                <div className={styles.Logo}>
                  <Logo />
                </div>
                
                <div className={styles.componentWithBorder+ ' ' + styles.LocationPicker}>
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
              


        <div id="breadcrumb" className={styles.breadcrumb}>
          <Breadcrumb region={location[1]} city={location[0]}/>
        </div>
        
        {/* END OF PARENT DIV */}
      </div>
    )
  }
}
