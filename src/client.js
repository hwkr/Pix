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
    if (this.state.img) {
      this.setState({img: ''});
      return;
    }
    const imageSrc = this.webcam.getScreenshot();
    console.log(imageSrc);
    this.setState({img: imageSrc});
    // window.open(imageSrc, 'newwindow', 'width=800, height=600'); return false;
  },

  componentDidMount() {
    const t = this;
    socket.on('connect', function (data) {
      socket.emit('join', 'Client connected!');
    });
    socket.on('score', function (data) {
      t.setState({ score: data.score });
    });
  },

  render() {
    return (
      <div className="client">
        { this.state.img ? <img src={this.state.img} /> :
          <Webcam audio={false} ref={this.setRef} width="auto" height="auto" screenshotFormat="image/jpeg" />
        }
        <button className="btn-capture" onClick={this.capture}>
          <div className="camera-solid icon"></div>
        </button>
      </div>
    );
  }
});

render(<App />, document.getElementById('root'));
