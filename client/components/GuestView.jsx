import React, { Component } from 'react';
import styles from '../styles/container.module.scss';

export default class GuestView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignup: false,
      showLogin: false
    }
  }

  toggleSignUp(e) {
    // pop up signup
    e.preventDefault();

    // also if user clicks outside of usermenu, close menu
  }

  toggleLogin(e) {
    // pop up login
    e.preventDefault();

    // also if user clicks outside of usermenu, close menu
  }

  render() {
    return (
      <div>
        <div name="isNotLoggedIn" className={styles.userview}>
            <div id="Signup">
              <button onClick={this.toggleSignUp}>Sign up</button>
              {/* <a href="https://sabe.io/tutorials/how-to-create-modal-popup-box">Modal popup box here</a> */}

            </div>

            <div id="Login">
            <button onClick={this.toggleLogin}>Log in</button>
            {/* <a href="https://sabe.io/tutorials/how-to-create-modal-popup-box">Modal popup box here</a> */}

            </div>
          </div>
      </div>
    )
  }
}
