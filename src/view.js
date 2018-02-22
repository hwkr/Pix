import 'tracking/build/tracking.js'
import 'tracking/build/data/face.js'

import './assets/stylesheets/styles.less';

import faceimg from './assets/img/face.jpg'

let socket = io.connect();

const offset = 10;

socket.on('connect', function (data) {
  socket.emit('join', 'View connected!');
  socket.emit('subscribe', { room: 'view' });
});

window.onload = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var tracker = new tracking.ObjectTracker('face');
  var img = new Image();
  var slice = { top: 0, left: 0, width: 0, height: 0 };

  img.src = faceimg;

  socket.on('img', function (data) {
    img.src = data.src;
    slice = data.slice;
    console.log(slice, img.width, img.height);
  });

  tracker.setInitialScale(2);
  tracker.setStepSize(1.5);
  tracker.setEdgesDensity(0.1);
  tracking.track('#video', tracker, { camera: true });

  context.filter = 'opacity(85%)';

  img.addEventListener('load', function() {
    tracker.on('track', function(event) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      event.data.forEach(function(rect) {
        context.drawImage(img,
          slice.left, slice.top, slice.width, slice.height,
          rect.x + offset, rect.y + offset, rect.width - offset, rect.height);
      });
    });
  }, false);

};
