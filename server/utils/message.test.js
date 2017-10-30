const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Dusan';
        var text = 'Test message';
        var result = generateMessage(from, text);

        expect(result).toInclude({from:from, text:text});
        expect(result.from).toBe('Dusan');
        expect(result.text).toBe('Test message');
        expect(result.createAt).toBeA('number');
    })

})
describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Dusan';
        var latitude = 45.2671352;
        var longitude = 19.833549599999998;

        var message = generateLocationMessage(from, latitude, longitude);

        expect(message).toInclude({from, url:message.url});
        expect(message.createAt).toBeA('number');
    })
})