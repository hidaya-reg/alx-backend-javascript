const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber with Chai', function() {
  describe('SUM', function() {
    it('should return 6 for 1.4 and 4.5', function() {
      expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
    });

    it('should return 10 for 5.6 and 4.3', function() {
      expect(calculateNumber('SUM', 5.6, 4.3)).to.equal(10);
    });
  });

  describe('SUBTRACT', function() {
    it('should return -4 for 1.4 and 4.5', function() {
      expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4);
    });

    it('should return 1 for 5.6 and 4.5', function() {
      expect(calculateNumber('SUBTRACT', 5.6, 4.5)).to.equal(1);
    });
  });

  describe('DIVIDE', function() {
    it('should return 0.2 for 1.4 and 4.5', function() {
      expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2);
    });

    it('should return "Error" for 1.4 and 0', function() {
      expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error');
    });
  });

  describe('Invalid operation type', function() {
    it('should throw an error for an invalid type', function() {
      expect(() => calculateNumber('MULTIPLY', 1.4, 4.5)).to.throw(Error);
    });
  });
});
