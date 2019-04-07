import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
// import 'react-day-picker/lib/style.css';
// import '../search.module.scss';
// CSS is not importing

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: undefined
    };
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  handleDayChange(day) {
    this.setState({ selectedDay: day });
  }

  render() {
    const { selectedDay } = this.state;
    return (
      <div>
        {selectedDay && <p>{selectedDay.toLocaleDateString()}</p>}
        <DayPickerInput onDayChange={this.handleDayChange} />
      </div>
    )
  }

}