import React, { Component } from 'react';
import PropTypes from 'prop-types';


class NewEvent extends Component {
  render() {
    return (
      <button className="floating">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>plus2</title>
          <path d="M13.5 10.5v-6h-3v6h-6v3h6v6h3v-6h6v-3z"></path>
        </svg>
      </button>
    )
  }
}

NewEvent.propTypes = {
  title: PropTypes.string
}
export default NewEvent;