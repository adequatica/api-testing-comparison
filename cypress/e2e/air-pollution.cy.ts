import { CREDENTIALS } from '../../utils/env';

const ENDPOINT = '/data/2.5/air_pollution';

const QUERY = {
  lat: 44.804,
  lon: 20.4651,
  appid: CREDENTIALS,
};

describe('Request Air Pollution', () => {
  it('Should have response', () => {
    cy.request({
      method: 'GET',
      url: ENDPOINT,
      qs: QUERY,
    }).then((response) => {
      expect(response.status).to.equal(200);

      expect(response).to.have.property('headers');
      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );

      expect(response.body.coord.lat).to.equal(QUERY.lat);
      expect(response.body.coord.lon).to.equal(QUERY.lon);
      expect(response.body.list).to.have.lengthOf(1);
      expect(response.body.list[0].dt).to.be.a('number');
      expect(response.body.list[0].main.aqi).to.be.above(1);
      expect(
        Object.keys(response.body.list[0].components)
      ).to.have.lengthOf.above(1);

      Object.keys(response.body.list[0].components).forEach((key) => {
        expect(response.body.list[0].components[key]).to.be.at.least(0);
      });
    });
  });
});
