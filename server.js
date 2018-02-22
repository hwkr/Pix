var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// using webpack-dev-server and middleware in development environment
if (process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/dist/client.html')
});

app.get('/view', function (request, response) {
  response.sendFile(__dirname + '/dist/view.html')
});

io.sockets.on('connection', function (socket) {

  socket.on('subscribe', function(data) {
    socket.join(data.room);
    console.log(data)
  });

  socket.on('unsubscribe', function(data) { socket.leave(data.room); })

  socket.on('join', (data) => {
    console.log(data);
  });

  socket.on('disconnect', (reason) => {
    console.log('Disconnect')
  });

  socket.on('imgcap', (data) => {
    socket.broadcast.to('view').emit('img', data)
  });

});

server.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  }
});
