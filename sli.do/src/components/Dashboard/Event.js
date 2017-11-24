import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Event extends Component {
  onEventDetail(id) {
    if(this.props.isOwner) {
      this.props.gotoPage(`/admin/event/${id}`);
    } else {
      this.props.gotoPage(`/event/${id}`);
    }
  }

  render() {
    let event = this.props.event;
    let action = '';
    if (this.props.isOwner) {
      action = <div className="action">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px"
          className="icon icon-size14" viewBox="0 0 774.266 774.266" style={{ enableBackground: "new 0 0 774.266 774.266" }}>
          <g>
            <g>
              <path d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875    C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916    c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703    c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z     M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282    c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802    H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z"
                fill="#c73232" />
              <rect x="475.031" y="286.593" width="48.418" height="396.942" fill="#c73232" />
              <rect x="363.361" y="286.593" width="48.418" height="396.942" fill="#c73232" />
              <rect x="251.69" y="286.593" width="48.418" height="396.942" fill="#c73232" />
            </g>
          </g>
        </svg>
      </div>
    }
    return (
      <a href="javascript:void(0)" className="list-group-item event-item" onClick={(e) => this.onEventDetail(event.id)}>
        <div className="event-info-x">
          <div className="info">
            <span className="name">{event.name}</span>
            <span className="code">#{event.code}</span>
          </div>
          <div className="date-info">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon icon-size14 f-medium-grey">
              <title>calendar-o</title>
              <path d="M19.453 4.453h-1.969v-1.078c0-0.328-0.281-0.563-0.563-0.563-0.328 0-0.563 0.234-0.563 0.563v1.078h-8.719v-1.078c0-0.328-0.234-0.563-0.563-0.563-0.281 0-0.563 0.234-0.563 0.563v1.078h-1.969c-0.938 0-1.734 0.75-1.734 1.688v13.359c0 0.938 0.797 1.688 1.734 1.688h14.906c0.938 0 1.734-0.75 1.734-1.688v-13.359c0-0.938-0.797-1.688-1.734-1.688zM20.063 19.5c0 0.328-0.281 0.609-0.609 0.609h-14.906c-0.328 0-0.609-0.281-0.609-0.609v-10.5h16.125zM20.063 7.922h-16.125v-1.781c0-0.328 0.281-0.609 0.609-0.609h1.969v0.891c0 0.281 0.281 0.516 0.563 0.516 0.328 0 0.563-0.234 0.563-0.516v-0.891h8.719v0.891c0 0.281 0.234 0.516 0.563 0.516 0.281 0 0.563-0.234 0.563-0.516v-0.891h1.969c0.328 0 0.609 0.281 0.609 0.609v1.781z"></path>
            </svg>
            <span className="date">{event.date_from + ' - ' + event.date_to}</span>
          </div>
        </div>
        {action}
      </a>
    );
  }
}

Event.propTypes = {
  title: PropTypes.string
}
export default Event;