import react, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantName: '',
      restaurantCuisine: '',
      location: ''
    }
  }
  render() {
    return (
      <div>
        Hello from react
      </div>
    )
  }
}

export default App;