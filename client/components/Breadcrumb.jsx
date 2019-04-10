import React from 'react';
import styles from '../styles/breadcrumb.module.scss';

const Breadcrumb = ({ region, city }) => {
  return (
    <div>
      <ul className={styles.breadcrumb}>
        <li><a href="#">Home</a></li>
        <li>United States</li>
        <li><a href="#">Los Angeles</a></li>
        <li><a href="#">{region}</a></li>
        <li>{city}</li>
      </ul>
    </div>
  )
}

export default Breadcrumb;