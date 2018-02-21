import 'tracking/build/tracking.js'
import 'tracking/build/data/face.js'

import './assets/stylesheets/styles.less';

import faceimg from './assets/img/face.jpg'

let socket = io.connect();

const offset = 10;

window.onload = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var tracker = new tracking.ObjectTracker('face');
  tracker.setInitialScale(2);
  tracker.setStepSize(1.5);
  tracker.setEdgesDensity(0.1);
  tracking.track('#video', tracker, { camera: true });

  context.filter = 'blur(1px) opacity(90%)';

  var img = new Image();   // Create new img element
  img.src = faceimg;
  img.addEventListener('load', function() {
    tracker.on('track', function(event) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      event.data.forEach(function(rect) {
        context.drawImage(img, rect.x - offset, rect.y + offset, rect.width + offset, rect.height + offset);

      });
    });
  }, false);

};
