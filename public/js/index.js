var socket = io();

socket.on('connect', function() {
    console.log("Connected to server");

    // socket.emit('createMessage', {
    //     from: "ex2@example.com",
    //     text: "asdksad"
    // })
})

socket.on('disconnect', function() {
    console.log('Disconected');
})

// socket.on('newEmail', function(email) {
//     console.log("New email", email);
// })
socket.on('newMessage', function(data) {
    console.log('newMessage', data);
    var li = $('<li></li>');
    li.text(`${data.from}: ${data.text}`);

    $('#messages').append(li);
})



$('#message-form').on('submit', function(event) {
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function(){

    })
})