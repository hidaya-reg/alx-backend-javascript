// 4-payment.test.js
const sinon = require('sinon');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./4-payment');

describe('sendPaymentRequestToApi', () => {
  let stub;
  let spy;

  beforeEach(() => {
    // Stub the Utils.calculateNumber method to always return 10
    stub = sinon.stub(Utils, 'calculateNumber').returns(10);
    // Spy on console.log
    spy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    // Restore the stub and the spy after each test
    stub.restore();
    spy.restore();
  });

  it('should call Utils.calculateNumber with correct arguments and log the total', () => {
    sendPaymentRequestToApi(100, 20);
    
    // Verify that the stub was called with correct arguments
    sinon.assert.calledWith(stub, 'SUM', 100, 20);
    
    // Verify that console.log was called with the correct message
    sinon.assert.calledWith(spy, 'The total is: 10');
  });
});
