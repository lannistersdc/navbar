import React, { Component } from 'react';
import { SingleDatePicker } from 'react-dates';
// CSS for react-dates in node modules
import 'react-dates/lib/css/_datepicker.css';


export default class DayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      date: null
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDateChange(date) {
    this.setState({ date });
  }

  onFocusChange({ focused }) {
    this.setState({ focused });
  }

  render() {
    const { focused, date } = this.state;
    let today = (new Date()).toDateString().slice(4).split(' 201').join(', 201');

    return (
      <div className="navBarCalendar">
        <SingleDatePicker
          id="date_input"
          date={date} 
          focused={focused} 
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          enableOutsideDays={true}
          firstDayOfWeek={null}
          displayFormat="MMM DD, YYYY"
          hideKeyboardShortcutsPanel
          weekDayFormat="ddd"
          placeholder={today}
          noBorder
  
          // disabled={false}
          // isDayHighlighted={() => {}}
          // placeholder={Date()}
          // focusedDate=b{…}
          // horizontalMonthPadding={13}
          // isFocused=false
          // isVisible=true
          // modifiers={…}
          // month=b{…}
          
      />

      </div>
    );
  }
}
