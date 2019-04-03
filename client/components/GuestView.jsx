import React, { Component } from 'react'

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
    console.log('sign up clicked');

    // also if user clicks outside of usermenu, close menu
  }

  toggleLogin(e) {
    // pop up login
    e.preventDefault();
    console.log('log in clicked')

    // also if user clicks outside of usermenu, close menu
  }

  render() {
    return (
      <div>
        <div name="isNotLoggedIn">
            <div id="Signup">
              <button onClick={this.toggleSignUp}>Sign up</button><br />
              <a href="https://sabe.io/tutorials/how-to-create-modal-popup-box">Modal popup box here</a>

            </div>

            <div id="Login">
            <button onClick={this.toggleLogin}>Log in</button><br />
            <a href="https://sabe.io/tutorials/how-to-create-modal-popup-box">Modal popup box here</a>

            </div>
          </div>
      </div>
    )
  }
}
