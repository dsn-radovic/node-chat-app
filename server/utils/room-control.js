const {MongoClient} = require('mongodb');

var roomControl = {
    addRoom : (room) => {
        var exists  = false;
        MongoClient.connect('mongodb://localhost:27017/Rooms', (err, db) => {
            if(err){
                return console.log('Unable to connect to database.');
            }
            console.log('Connected!');
        
            db.collection('Rooms').find().toArray().then((rooms) => {
                console.log(rooms);
            
                for(var i = 0; i < rooms.length; i++){
                    if(rooms[i].name == room){
                        exists = true;
                    }
                };
                if(!exists) {  
                    var r = {
                        name: room
                    }
                    db.collection('Rooms').insertOne(r, (err, res) => {
                        if(err) {
                            return console.log(err);
                        }
                
                        console.log(JSON.stringify(res.ops[0]._id.getTimestamp() , undefined, 2));
                    });
                }else {
                    exists = false;
                }
            }); 
        })
    }
}
module.exports = {roomControl};