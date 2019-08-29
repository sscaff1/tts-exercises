const getTime = require('../getTime');

describe('Get Time', () => {
  it('should get the current time', () => {
    const mockTime = '8:39:56 pm';
    const time = getTime();

    expect(time).toBe(mockTime);
  });
});
