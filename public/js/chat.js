var socket = io();

function scrollToBottom () {
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
       messages.scrollTop(scrollHeight);
    }
}
socket.on('connect', function() {
    var params = $.deparam(window.location.search);
   
    socket.emit('join', params, function(err) {
       
        if(err){
            alert(err); 
            window.location.href = "/";
        } else {
            console.log("no error");
        }
        
    })
})

socket.on('disconnect', function() {
    console.log('Disconected');
})

socket.on('updateUserList', function(users) {
    var ol = $('<ol></ol>');

    users.forEach(function (user) {
        ol.append($('<li></li>').text(user));
    })

    $('#users').html(ol);
})

socket.on('newMessage', function(data) {
    var formattedTime = moment(data.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: data.text,
        from: data.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
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
    scrollToBottom();
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