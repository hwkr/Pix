import React from 'react';
import { render } from 'react-dom';

import './assets/stylesheets/styles.less';

let socket = io.connect();

const App = React.createClass({

  getInitialState() {
    return {};
  },

  componentDidMount() {
    const t = this;
    socket.on('connect', function (data) {
      socket.emit('join', 'Player connected!');
    });
    socket.on('score', function (data) {
      t.setState({ score: data.score });
    });
  },

  render() {
    return (
      <div className="player">
      </div>
    );
  }
});

render(<App />, document.getElementById('root'));
