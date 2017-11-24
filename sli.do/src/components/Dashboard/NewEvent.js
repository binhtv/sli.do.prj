import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewEventPopup from './NewEventPopup';


class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.onNewEvent = this.onNewEvent.bind(this);
    this.onClosePopup = this.onClosePopup.bind(this);
    this.onCreateNewEvent = this.onCreateNewEvent.bind(this);
    this.state = {
      onNew: false,
      data: {
        name: 'New Event',
        date_from: '',
        date_to: ''
      }
    };
  }

  onNewEvent(e) {
    this.setState({
      ...this.state,
      onNew: true
    })
  }

  onClosePopup() {
    this.setState({
      ...this.state,
      onNew: false
    });
  }

  onCreateNewEvent(data) {
    this.props.onCreateNewEvent(data);
  }

  render() {
    let popup = '';
    if (this.state.onNew) {
      popup = <NewEventPopup id="newEventPopup" cancelTitle="Cancel" okTitle="Save"
        data={this.state.data} onOkClick={this.onCreateNewEvent} onClosePopup={this.onClosePopup}
        showPopup={true} />
    }
    return (
      <div>
        <button className="floating" onClick={this.onNewEvent}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>plus2</title>
            <path d="M13.5 10.5v-6h-3v6h-6v3h6v6h3v-6h6v-3z"></path>
          </svg>
        </button>
        {popup}
      </div>
    )
  }
}

NewEvent.propTypes = {
  title: PropTypes.string
}
export default NewEvent;