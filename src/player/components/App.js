import '../../assets/stylesheets/base.scss';
import React, { Component } from 'react';

let socket = io.connect();

const App = React.createClass({
  componentDidMount() {
    socket.on('connect', function(data) {
      socket.emit('join', 'Player connected!');
    });
  },

  render() {
    return (
      <h1>Player!</h1>
    )
  }
});

export default App;
