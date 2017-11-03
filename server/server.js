const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const {MongoClient} = require('mongodb');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var fs = require('fs');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    
    
   
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and room are required!');
        }
        params.room = params.room.toUpperCase();
        var userList = users.getUserList(params.room);

        for(var i = 0; i < userList.length; i++){
            if(params.name === userList[i]) {
                callback('Name already exists');
            }
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();   
    })

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));    
        }
        
        callback('Response from the server!');

    })
    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        
        if(user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat.`));
        }
    })
})
app.get('/rooms', (req, res) => {
    MongoClient.connect('mongodb://localhost:27017/Rooms', (err, db) => {
        if(err){
            return console.log('Unable to connect to database.');
        }
        console.log('Connected!');
    
        db.collection('Rooms').find().toArray().then((rooms) => {
            //console.log(rooms);
        res.send(rooms);
        })
    });
})
server.listen(port, () => {
    console.log(`Server started on ${port}`);
})
//module.exports = {app};
