// utils.js

const Utils = {
    calculateNumber: function(type, a, b) {
      switch (type) {
        case 'SUM':
          return Math.round(a) + Math.round(b);
        case 'SUBTRACT':
          return Math.round(a) - Math.round(b);
        case 'DIVIDE':
          return Math.round(a) / Math.round(b);
        default:
          throw new Error('Invalid operation type');
      }
    }
  };
  
module.exports = Utils;
  