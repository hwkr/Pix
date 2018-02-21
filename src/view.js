import React from 'react';
import { render } from 'react-dom';
import Webcam from 'react-webcam';

import './assets/stylesheets/styles.less';

let socket = io.connect();

const App = React.createClass({

  getInitialState() {
    return {};
  },

  componentDidMount() {
    const t = this;
    socket.on('connect', function (data) {
      socket.emit('join', 'View connected!');
    });
  },

  render() {
    return (
      <div className="view">
        View!
      </div>
    );
  }
});

render(<App />, document.getElementById('root'));
