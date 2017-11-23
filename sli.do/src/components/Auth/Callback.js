import React, { Component } from 'react';

class Callback extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    }

    return (
      <div style={style}>
        <p>Logining...</p>
      </div>
    );
  }
}

export default Callback;