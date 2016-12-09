const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);



app.use(express.static('public'));

// set up sockets on the back-end
io.on('connection', function(socket) {
  socket.broadcast.emit('draw');
  console.log('server has connected!');
  // 1) receive coordinates on the back-end
  socket.on('draw coordinates', function(coords) {
    // 2) send out coordinates to all clients on the front-end
    socket.broadcast.emit('draw coordinates', coords);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
