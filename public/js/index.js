var url = 'http://localhost:3000/rooms';
$.get(url, function(data, status){
    var rooms = $('#rooms');
    for(var i = 0; i< data.length; i++) {
        var opt = $(`<option value =${data[i].name}></option>`).text(`${data[i].name}`);
        rooms.append(opt);
    }
})