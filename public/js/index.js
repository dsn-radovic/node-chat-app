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
socket.on('newLocationMessage', function(data) {
    
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>')


    li.text(`${data.from}: `);
    a.attr('href', data.url);
    li.append(a);

    $('#messages').append(li);
})



$('#message-form').on('submit', function(event) {
    event.preventDefault();

    var messageTextbox = $('[name=message');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function(){
        messageTextbox.val('');
    })
})

var locationButton = $('#send-location');

locationButton.on('click', function(e) {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported!');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
       locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function() {
       locationButton.removeAttr('disabled').text('Send location');       
        alert('Unable to fetch location');
    })
})