import React, { Component } from 'react';
import styles from '../styles/user.module.scss';

export default class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationViewOpened: false,
      userMenuOpened: false,
      restaurantName: '',
      date: '',
      time: '',
      partySize: 2,
    }
    this.fetchReservation = this.fetchReservation.bind(this);

    this.toggleReservationView = this.toggleReservationView.bind(this);
    this.closeReservationView = this.closeReservationView.bind(this);

    this.toggleUserMenuOpened = this.toggleUserMenuOpened.bind(this);
    this.closeUserMenu = this.closeUserMenu.bind(this);
  }

  componentDidMount() {
    this.fetchReservation();
  }

  fetchReservation() {
    // axios for real thing
    // hard coded in state for now
    this.setState({
      restaurantName: 'The Factory Kitchen',
      date: 'Apr 20, 2019',
      time: '5:00 PM',
      partySize: 10,
    })
  }

  toggleReservationView() {
    // e.preventDefault();
    // let reservationViewOpened = !this.state.reservationViewOpened;
    // this.setState({ 
    //   reservationViewOpened 
    // }, () => console.log(`Reservation View opened: ${this.state.reservationViewOpened}`))
    // also if user clicks outside of usermenu, close view

    document.getElementById("reservation-info").style.display = "block";
    document.addEventListener('click', this.closeReservationView);
  }

  closeReservationView() {
    if (document.getElementById("reservation-info").style.display === "block") {
      document.getElementById("reservation-info").style.display = "none";
      document.removeEventListener('click', this.closeReservationView);
    }
  }

  toggleUserMenuOpened() {
    // e.preventDefault();
    // let userMenuOpened = !this.state.userMenuOpened;
    // this.setState({ 
    //   userMenuOpened 
    // }, () => console.log(`UserMenu View opened: ${this.state.userMenuOpened}`))
    // also if user clicks outside of usermenu, close menu

    document.getElementById("user-options").style.display = "block";
    document.addEventListener('click', this.closeUserMenu);
  }

  closeUserMenu() {
    if (document.getElementById("user-options").style.display === "block") {
      document.getElementById("user-options").style.display = "none";
      document.removeEventListener('click', this.closeUserMenu);
    }
  }

  render() {
    let { restaurantName, date, time, partySize } = this.state;
    return (
      <div>
      
        <ul>
        
          {/* <div className="upcoming"> */}
            <li className={styles.dropdown} onClick={this.toggleReservationView}>Upcoming</li>
            
            {/* {this.state.reservationViewOpened &&  */}
              <div id="reservation-info" className={styles.showReservations}>
                <div>
                  <h5>UPCOMING</h5>
                </div>

                <div>
                  <h6>{restaurantName}</h6>
                  <p>Table for {partySize} people</p>
                  <p>{date} {time}</p>

                  <a href="#">Invite</a>
                  <a href="#">View</a>
                  <a href="#">Modify</a>
                  <a href="#">Cancel</a>
                </div>

                <div>
                  <h5>View All</h5>
                </div>

              </div>
            {/* } */}

          {/* </div> */}

          {/* <div className="helloUser"> */}
          <li className={styles.dropdown} onClick={this.toggleUserMenuOpened} style={{borderLeft: "1px solid rgba(0,0,0,.08)"}}>Hi, Liezel</li>
            {/* {this.state.userMenuOpened &&  */}
              <div id="user-options" className={styles.showUserMenu}>

                <div>
                  <p>point information</p>
                </div>

                <div>
                  <ul>
                    <li><a href="#">My Profile</a></li><br />
                    <li><a href="#">My Dining History</a></li><br />
                    <li><a href="#">My Saved Restaurants</a></li><br />
                    <li><a href="#">My Profile</a></li><br />
                    <li><a href="#">Signout</a></li><br />
                  </ul>
                </div>

              </div>
            {/* } */}

          {/* </div> */}

        </ul>

      </div>
    )
  }
}
