import React from 'react';
import { render } from 'react-dom';
import Webcam from 'react-webcam';

import './assets/stylesheets/styles.less';

let socket = io.connect();

const App = React.createClass({

  getInitialState() {
    return {
      img: '',
    };
  },

  setRef(webcam) {
    this.webcam = webcam;
  },

  capture() {
    const imageSrc = this.webcam.getScreenshot();
    console.log(imageSrc);
    this.setState({img: imageSrc});
    // window.open(imageSrc, 'newwindow', 'width=800, height=600'); return false;
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
        <Webcam audio={false} ref={this.setRef} screenshotFormat="image/jpeg" />
        <br/>
        <button onClick={this.capture}>Capture photo</button>
        <br/>
        <img src={this.state.img} />
      </div>
    );
  }
});

render(<App />, document.getElementById('root'));
