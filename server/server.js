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
    
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app'
    });
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined'
    })
    // socket.emit('newEmail', {
    //     from: "ex@example.com",
    //     text: "What's up"
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // })
    // 

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // })
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text
        });
    })

    socket.on('disconnect', () => {
        console.log("Disconected");
    })
})

server.listen(3000, () => {
    console.log(`Server started on ${port}`);
})
