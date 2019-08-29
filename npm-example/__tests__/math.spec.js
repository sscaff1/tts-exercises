const math = require('../math');

describe('Math', () => {
  it('should add two numbers together', () => {
    // Define Section
    const add = math.add;
    // Action Section
    const sum = add(3, 13);
    // Assertion Section
    expect(sum).toBe(16);
  });

  it('should subtract two numbers', () => {
    const subtract = math.subtract;
    const diff = subtract(8, 5);
    expect(diff).toBe(3);
  });

  const additions = [[2, 3, 5], [10, -4, 6]];

  it.each(additions)(
    'for %s and %s it should add to %s',
    (num1, num2, expectedSum) => {
      expect(math.add(num1, num2)).toBe(expectedSum);
    }
  );
});
