import React, { Component } from 'react';
import axios from 'axios'

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
    let opened = !this.state.opened
    this.setState({ opened }, () => console.log(`LocationPicker opened: ${this.state.opened}`))
  }

  render() {
    
    return (
      <div>
        <button name="location-picker" onClick={this.toggleLocationPicker}>Locations</button>

        {this.state.opened && 
          <div>
            <div id="metros">
            Metros:
              <select>
                {this.state.metros.map(metro => (
                  <option>{metro}</option>
                ))}
              </select>
            </div>

            <br />

            <div id="regions">
            Regions:
              <select>
                {this.state.regions.map(region => (
                  <option>{region}</option>
                ))}
              </select>
            </div>
          </div>
        }

      </div>
    )
  }
}
