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

  setWebcamRef(ref) {
    this.webcam = ref;
  },

  setClientRef(ref) {
    this.client = ref;
  },

  capture() {
    if (this.state.img) {
      this.setState({img: ''});
      return;
    }
    const imgSrc = this.webcam.getScreenshot();

    var offsetWidth = (this.client.offsetWidth - this.webcam.canvas.width) / 2;
    var offsetHeight = (this.client.offsetHeight - this.webcam.canvas.height) / 2;

    console.log (offsetWidth, offsetHeight);
    this.setState({img: imgSrc});

    var imgSlice = {
      // top: offsetHeight,
      // left: -1 * offsetWidth,
      // width: this.client.offsetWidth,
      // height: this.client.offsetHeight,
      top: this.client.offsetHeight * 0.25 - offsetHeight,
      left: this.client.offsetWidth * 0.20 - offsetWidth,
      width: this.client.offsetWidth * 0.60,
      height: this.client.offsetHeight * 0.50,
    }
    console.log(imgSlice);
    socket.emit('imgcap', { src: imgSrc, slice: imgSlice } );
  },

  componentDidMount() {
    const t = this;
    socket.on('connect', function (data) {
      socket.emit('join', 'Client connected!');
    });
  },

  render() {
    return (
      <div className="client" ref={this.setClientRef}>
        { this.state.img ? <img src={this.state.img} /> :
          <Webcam audio={false} ref={this.setWebcamRef} width="auto" height="auto" screenshotFormat="image/jpeg" />
        }
        <button className="btn-capture" onClick={this.capture}>
          <div className="camera-solid icon"></div>
        </button>
      </div>
    );
  }
});

render(<App />, document.getElementById('root'));
