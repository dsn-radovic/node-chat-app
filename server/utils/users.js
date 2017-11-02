[{
    id: '/#dasd13das',
    name: 'Dusan',
    room: 'Office'

}]

var users = [];
//var rooms = [];

class Users {
    constructor () {
        this.users = [];
        //this.rooms = [];
    }
    addUser (id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        // var exists = false;

        // for(var i = 0; i < this.rooms.length; i++) {
        //     if(user.room === this.rooms[i]){
        //         exists = true;
        //     }
        // }
        // if(!exists) {
        //     this.rooms.push(user.room);
        //     console.log(this.rooms);
        // }else {
        //     exists = false;
        // }
        return user;
    }
    removeUser(id) {
        var user = this.getUser(id);

        if(user) {
            this.users = this.users.filter((user) => {
                return user.id !== id;
            })
        }

        return user;
    }
    getUser(id) {
        return this.users.filter((user) => {
            return user.id === id;
        })[0];
    }
    getUserList(room) {
        var users = this.users.filter((user) => {
            return user.room === room;
        })
        var namesArray = users.map((user) => {
            return user.name;
        })

        return namesArray;
    }
}


module.exports = {Users};