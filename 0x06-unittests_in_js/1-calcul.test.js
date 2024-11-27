const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('calculateNumber', function() {
  describe('SUM', function() {
    it('should return 6 for 1.4 and 4.5', function() {
      assert.strictEqual(calculateNumber('SUM', 1.4, 4.5), 6);
    });

    it('should return 10 for 5.6 and 4.3', function() {
      assert.strictEqual(calculateNumber('SUM', 5.6, 4.3), 10);
    });
  });

  describe('SUBTRACT', function() {
    it('should return -4 for 1.4 and 4.5', function() {
      assert.strictEqual(calculateNumber('SUBTRACT', 1.4, 4.5), -4);
    });

    it('should return 1 for 5.6 and 4.5', function() {
      assert.strictEqual(calculateNumber('SUBTRACT', 5.6, 4.5), 1);
    });
  });

  describe('DIVIDE', function() {
    it('should return 0.2 for 1.4 and 4.5', function() {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 4.5), 0.2);
    });

    it('should return "Error" for 1.4 and 0', function() {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 0), 'Error');
    });
  });

  describe('Invalid operation type', function() {
    it('should throw an error for an invalid type', function() {
      assert.throws(() => calculateNumber('MULTIPLY', 1.4, 4.5), Error);
    });
  });
});
