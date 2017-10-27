const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    
    // socket.emit('newEmail', {
    //     from: "ex@example.com",
    //     text: "What's up"
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // })
    socket.emit('newMessage', {
        from: "Dusan",
        text: "Hello"
    })

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    })

    socket.on('disconnect', () => {
        console.log("Disconected");
    })
})

server.listen(3000, () => {
    console.log(`Server started on ${port}`);
})
