/**
 * Created by danieldihardja on 04.08.19.
 */

const io = require('socket.io')(process.env.PORT || 8080);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('data', (data) => {
    console.log(data);
  })
});
