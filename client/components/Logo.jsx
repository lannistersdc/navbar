import React from 'react';
import logo from '../logo.png';
import styles from '../styles/container.module.scss';

const Logo = () => {
  return (
    <div className={styles.logoImg}>
      <img src={logo} alt="Logo"/>
    </div>
  )
}

export default Logo