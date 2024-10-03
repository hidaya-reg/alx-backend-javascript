const { expect } = require('chai');
const getPaymentTokenFromAPI = require('./6-payment_token');

describe('getPaymentTokenFromAPI', () => {
  it('getPaymentTokenFromAPI(success), where success == true', (done) => {
    getPaymentTokenFromAPI(true)
      .then((res) => {
        expect(res).to.deep.equal({ data: 'Successful response from the API' });
        done();
      })
      .catch((err) => done(err)); // Handle any potential errors
  });

  it('getPaymentTokenFromAPI(success), where success == false', (done) => {
    getPaymentTokenFromAPI(false)
      .then(() => {
        done(new Error('Expected method to reject.')); // Fail if it resolves
      })
      .catch((err) => {
        expect(err).to.be.an('error'); // Ensure an error is thrown
        done();
      });
  });
});
