const expect = require('expect');
var {generateMessage} = require('./message');

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