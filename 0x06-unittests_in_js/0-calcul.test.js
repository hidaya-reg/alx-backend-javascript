const assert = require('assert');
const calculateNumber = require('./0-calcul');

describe('calculateNumber', function() {
  it('should return 4 when inputs are (1, 3)', function() {
    assert.strictEqual(calculateNumber(1, 3), 4);
  });

  it('should return 5 when inputs are (1, 3.7)', function() {
    assert.strictEqual(calculateNumber(1, 3.7), 5);
  });

  it('should return 5 when inputs are (1.2, 3.7)', function() {
    assert.strictEqual(calculateNumber(1.2, 3.7), 5);
  });

  it('should return 6 when inputs are (1.5, 3.7)', function() {
    assert.strictEqual(calculateNumber(1.5, 3.7), 6);
  });

  it('should return the correct sum for negative numbers', function() {
    assert.strictEqual(calculateNumber(-1.2, -3.7), -5);
  });

  it('should return 0 for (0, 0)', function() {
    assert.strictEqual(calculateNumber(0, 0), 0);
  });
});
