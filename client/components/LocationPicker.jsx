import React, { Component } from 'react';
import LocationPin from '../svg/location-pin.jsx';
import axios from 'axios';
import styles from '../styles/locations.module.scss';
import ArrowDown from '../svg/arrow-down.jsx';

export default class LocationPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      metros: [],
      regions: []
    }
    this.fetchLocations = this.fetchLocations.bind(this);
    this.toggleLocationPicker = this.toggleLocationPicker.bind(this);
    this.closeLocationPicker = this.closeLocationPicker.bind(this);
  }

  componentDidMount() {
    this.fetchLocations();
  }
  
  fetchLocations() {
    axios
    .get(`/restaurant`)
    // .get(`http://localhost:3001/navbar/`)
    .then(restaurants => {
      let array = restaurants.data.map(res => res.location.split(', '))
      let metros = array.map(tuple => tuple[0]);
      let regions = [];
      for (let tuple = 0; tuple < array.length; tuple++) {
        if (array[tuple][1] && !regions.includes(array[tuple][1])) {
          regions.push(array[tuple][1])
        }
      }
      this.setState({
        metros,
        regions
      }, () => console.log(this.state))
    })
  }

  toggleLocationPicker() {
    document.getElementById("location-menu").style.display = "flex";
    document.addEventListener('click', this.closeLocationPicker);
  }

  closeLocationPicker() {
    if (document.getElementById("location-menu").style.display === "flex") {
      document.getElementById("location-menu").style.display = "none";
      document.removeEventListener('click', this.closeLocationPicker);
    }
  }

  render() {
    let { region, city } = this.props;
    return (
      <div>
        <div className={styles.currentRegion} onClick={this.toggleLocationPicker}>
          <div className={styles.pin}>
            <LocationPin />
          </div>
          <div className={styles.region}>
            {region}
          </div>
          <div className={styles.arrow}>
            <ArrowDown />
          </div>
        </div>

          <div id="location-menu" className={styles.showLocationMenu}>

            <div id="metros" >

              <div className={styles.subheader}>
                Metro
              </div>

              <div className={styles.overflowMetro}>
                <div>
                  <li className={styles.selected}><a href="#" style={{textDecoration: "none", color: "#237b98"}}>Los Angeles</a></li>
                  {this.state.metros.map(metro => (
                    <li><a href="#" className={styles.selector} style={{textDecoration: "none"}}>{metro}</a></li>
                  ))}
                </div>
              </div>
              
              <div className={styles.subfooter}>
              <a href="#" style={{textDecoration: "none"}}>Full List of Metros</a>
              </div>

            </div>

            <div id="regions">
              
              <div className={styles.subheader}>
                Region
              </div>

              <div className={styles.overflowMetro+ ' ' +styles.overflowRegion}>
                <div className="menu" >
                  {this.state.regions.map(regionName => (
                    <li className={ regionName === region ? styles.selected : "none"} >
                      <a href="#" className={ regionName !== region ? styles.selector : "none"} 
                      style={{textDecoration: "none", color: "#237b98"}}>{regionName}</a>
                    </li>
                  ))}
                </div>
              </div>

              <div className={styles.subfooter}>
              
              </div>

            </div>

          </div>

      </div>
    )
  }
}
