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
    var formattedTime = moment(data.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: data.text,
        from: data.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
})
socket.on('newLocationMessage', function(data) {
    var formattedTime = moment(data.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        url: data.url,
        from: data.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
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