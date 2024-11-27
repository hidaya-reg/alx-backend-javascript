const sinon = require('sinon');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./5-payment');

describe('sendPaymentRequestToApi', () => {
  let spy;

  beforeEach(() => {
    // Spy on console.log
    spy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    // Restore the spy after each test
    spy.restore();
  });

  it('should log the correct total for 100 and 20', () => {
    sendPaymentRequestToApi(100, 20);

    // Verify that the correct message is logged
    sinon.assert.calledWith(spy, 'The total is: 120');
    // Verify that console.log was called only once
    sinon.assert.calledOnce(spy);
  });

  it('should log the correct total for 10 and 10', () => {
    sendPaymentRequestToApi(10, 10);

    // Verify that the correct message is logged
    sinon.assert.calledWith(spy, 'The total is: 20');
    // Verify that console.log was called only once
    sinon.assert.calledOnce(spy);
  });
});
