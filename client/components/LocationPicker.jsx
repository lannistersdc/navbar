import React, { Component } from 'react';
import axios from 'axios';
import OverflowScrolling from 'react-overflow-scrolling';
import styles from '../styles/locations.module.scss';

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
    .get('/restaurant')
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

  toggleLocationPicker(e) {
    // e.preventDefault();
    // let opened = !this.state.opened
    // this.setState({ opened: true }, () => {
    //   document.addEventListener('click', this.closeLocationPicker);
    // })

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
          <h4>{region}</h4>
        </div>

        {/* {this.state.opened &&  */}
          <div id="location-menu" className={styles.showLocationMenu}>

            <div id="metros" >
              <h4>
              Metro
              </h4>
              <div className={styles.overflowMetro}>
                <ul>
                  <li><a href="#" className={styles.selected}>Los Angeles</a></li>
                  {this.state.metros.map(metro => (
                    <li><a href="#" className={styles.selector}>{metro}</a></li>
                  ))}
                </ul>
              </div>

            </div>

            <div id="regions">
              <h4>
                Region
              </h4>
              <div className={styles.overflowMetro}>
                <ul className="menu" >
                  {this.state.regions.map(regionName => (
                    <li><a href="#" className={ regionName !== region ? styles.selector : styles.selected}>{regionName}</a></li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        {/* } */}

      </div>
    )
  }
}
