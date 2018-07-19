const {
  getDateFromMessage,
  getResponse,
} = require('./message-processor');

describe('Message Processor', () => {

  describe('getResponse', () => {

    it('Returns a string', () => {
      expect(typeof getResponse({text: 'help'}))
        .toBe('string');
    })
  });

  describe('getDateFromMessage', () => {
    let date = new Date('2018-06-13T04:00:00.000Z');

    it('Whats for lunch today', () => {
      expect(getDateFromMessage({text: 'Whats for lunch today'}, date))
        .toEqual(new Date('2018-06-13T04:00:00.000Z'))
    });

    it('Whats for lunch tomorrow', () => {
      expect(getDateFromMessage({text: 'Whats for lunch tomorrow'}, date))
        .toEqual(new Date('2018-06-14T04:00:00.000Z'))
    });

    it('Whats for lunch on Friday', () => {
      expect(getDateFromMessage({text: 'Whats for lunch on Friday'}, date))
        .toEqual(new Date('2018-06-15T04:00:00.000Z'))
    });

    it('Whats lunch on Monday', () => {
      expect(getDateFromMessage({text: 'Whats lunch on Monday'}, date))
        .toEqual(new Date('2018-06-18T04:00:00.000Z'))
    });

    it('What was lunch on Monday', () => {
      expect(getDateFromMessage({text: 'What was lunch on Monday'}, date))
        .toEqual(new Date('2018-06-11T04:00:00.000Z'))
    });

    it('What was for lunch last Friday', () => {
      expect(getDateFromMessage({text: 'What was for lunch last Friday'}, date))
        .toEqual(new Date('2018-06-08T04:00:00.000Z'))
    });

    it('What was for lunch last thursday', () => {
      expect(getDateFromMessage({text: 'What was for lunch last thursday'}, date))
        .toEqual(new Date('2018-06-07T04:00:00.000Z'))
    });

    it('What is for lunch next Friday', () => {
      expect(getDateFromMessage({text: 'What was for lunch next Friday'}, date))
        .toEqual(new Date('2018-06-22T04:00:00.000Z'))
    });
  })
});
