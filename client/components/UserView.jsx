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
      <div className={styles.userContainer}>
      
        <div className={styles.calendar} onClick={this.toggleReservationView}>
          {/* calendar is here */}
          {/* clicking this will display reservation-info */}
          upcoming
        </div>
            
        <div id="reservation-info" className={styles.dropdown}>

                <div className={styles.subheader}>
                  UPCOMING
                </div>

                <div className={styles.dropdownContent}>
                  {restaurantName}
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

        <div className={styles.welcome} onClick={this.toggleUserMenuOpened}>
          <div className={styles.helloUser}>
            Hi, Liezel
          </div>
          <div className={styles.arrow}>
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 10 32"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g>
              <path d="M4.39 5.09l.71-.71 2.82-2.82a.5.5 0 0 0 0-.71l-.7-.7a.5.5 0 0 0-.71 0L4 2.62 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L3 4.39l.71.71a.5.5 0 0 0 .68-.01z"  stroke="none" fill="rgba(0,0,0,.12)" strokeWidth="1px" />
              </g>
            </svg>
          </div>
          {/* clicking this will display user-options */}
        </div>
  
        <div id="user-options" className={styles.dropdownUser}>

                <div className={styles.subheader}>
                  <p>point information</p>
                </div>

                <div className={styles.dropdownContent}>
                  
                  <li><a href="#">My Profile</a></li><br />
                  <li><a href="#">My Dining History</a></li><br />
                  <li><a href="#">My Saved Restaurants</a></li><br />
                  <li><a href="#">My Profile</a></li><br />
                  <li><a href="#">Signout</a></li><br />
                  
                </div>

        </div>


      </div>
    )
  }
}
