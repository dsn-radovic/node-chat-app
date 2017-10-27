var socket = io();

socket.on('connect', function() {
    console.log("Connected to server");

    socket.emit('createMessage', {
        from: "ex2@example.com",
        text: "asdksad"
    })
})

socket.on('disconnect', function() {
    console.log('Disconected');
})

// socket.on('newEmail', function(email) {
//     console.log("New email", email);
// })
socket.on('newMessage', function(data) {
    console.log('newMessage', data);
})