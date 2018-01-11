const path = require('path');
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage, generateLocationMessage} = require('../utils/message')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server)

app.use(express.static(publicPath));

io.on('connection', (socket)=> {  // create a socket connection
  console.log('New client connected')

  socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'))

  socket.broadcast.emit('newMessage',generateMessage('Admin','User joined'))

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text)) 
    callback('Again')
  });

  socket.on('createLocation', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    console.log('Client was disconnected')
  })
})

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
