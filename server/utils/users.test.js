const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id : '1',
            name: 'Pera',
            room: 'Node Course'
        }, {
            id : '2',
            name: 'Zika',
            room: 'Node Course'
        }, {  
            id : '3',
            name: 'Pera',
            room: 'React Course' 
        }]
    })

    it('should add new user', () => {
        var users = new Users();

        var user = {
            id: '1234',
            name: 'Dusan',
            room: 'Office room'
        }
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    })
    it('should remove user', () => {
        var userId = '1';

        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    })
    it('should not remove user', () => {
        var userId = '11';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    })
    it('should find user', () => {
        var userId = '2';

        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    })
    it('should not find user', () => {
        var userId = '4';
        
        var user = users.getUser(userId);

        expect(user).toNotExist();
    })
    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Pera', 'Zika'])
    })
})