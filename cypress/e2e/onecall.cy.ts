import { CREDENTIALS } from '../../utils/env';

const ENDPOINT = '/data/3.0/onecall';

const QUERY = {
  lat: 44.804,
  lon: 20.4651,
  exclude: 'alerts',
  appid: CREDENTIALS,
};

describe('Request One Call', () => {
  it('Should have response', () => {
    cy.request({
      method: 'GET',
      url: ENDPOINT,
      qs: QUERY,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);

      expect(response).to.have.property('headers');
      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8',
      );

      expect(response.body.cod).to.equal(401);
      expect(response.body.message).to.have.string(
        'Please note that using One Call 3.0 requires a separate subscription to the One Call by Call plan',
      );
    });
  });
});
