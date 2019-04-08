import React, { Component } from 'react';
import axios from 'axios';
import OverflowScrolling from 'react-overflow-scrolling';
import styles from '../container.module.scss';

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
    e.preventDefault();
    // let opened = !this.state.opened
    this.setState({ opened: true }, () => {
      document.addEventListener('click', this.closeLocationPicker);
    })
  }

  closeLocationPicker() {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ opened: false }, () => {
        document.removeEventListener('click', this.closeLocationPicker);
      })
    }
  }

  render() {
    let { region, city } = this.props;
    return (
      <div>
        <div name="location-picker" onClick={this.toggleLocationPicker}>
          <h4>{region}</h4>
        </div>

        {this.state.opened && 
          <div className={styles.locationtable}>

            <div id="metros">
              <h4>
              Metro
              </h4>
              <OverflowScrolling className={styles.overflowMetro}>
                <div className="menu" ref={(element) => { this.dropdownMenu = element }}>
                  <ul><a href="#" className={styles.selected}>Los Angeles</a></ul>
                  {this.state.metros.map(metro => (
                    <ul><a href="#" className={styles.selector}>{metro}</a></ul>
                  ))}
                </div>
              </OverflowScrolling>

            </div>

            <div id="regions">
              <h4>
                Region
              </h4>
              <OverflowScrolling className={styles.overflowRegion}>
                <div className="menu" >
                  {this.state.regions.map(regionName => (
                    <ul><a href="#" className={ regionName !== region ? styles.selector : styles.selected}>{regionName}</a></ul>
                  ))}
                </div>
              </OverflowScrolling>

            </div>
          </div>
        }

      </div>
    )
  }
}
