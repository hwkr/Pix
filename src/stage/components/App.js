
import '../../assets/stylesheets/base.scss';
import React, { Component } from 'react';

let socket = io.connect();

const App = React.createClass({
  componentDidMount() {
    socket.on('connect', function(data) {
      socket.emit('join', 'Stage connected!');
    });
  },

  render() {
    return (
      <h1>Stage!</h1>
    )
  }
});

export default App;
