import React, { Component } from 'react'
import ArrowDown from '../svg/arrow-down.jsx';
import styles from '../styles/topbar.module.scss';

export default class Topbar extends Component {
  render() {
    return (
      <div className={styles.topHeader}>
          <div>
            <a href="#">For Restauranteurs</a>
          </div>
          <div className={styles.linkWithArrow}>
            <div><a href="#">Mobile</a></div>
            <div className={styles.arrow}><ArrowDown /></div>
          </div>
          <div>
            <a href="#" style={{paddingRight: "16px"}}>Help</a>
          </div>
          <div className={styles.linkWithArrow}>
            <div><a href="#">EN</a></div>
            <div className={styles.arrow}><ArrowDown /></div>
          </div>
        </div>
    )
  }
}
