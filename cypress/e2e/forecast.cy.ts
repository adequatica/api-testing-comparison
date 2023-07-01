import { CREDENTIALS } from '../../utils/env';

const ENDPOINT = '/data/2.5/forecast';

const QUERY = {
  lat: 44.804,
  lon: 20.4651,
  cnt: 10,
  appid: CREDENTIALS,
};

const QUERY_Q = {
  q: 'Belgrade,RS',
  cnt: 10,
  appid: CREDENTIALS,
};

describe('Request 5 day weather forecast', () => {
  let cityFiels: any;

  it('Should have response by geographic coordinates', () => {
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

      expect(Number(response.body.cod)).to.equal(200);
      expect(response.body.message).to.equal(0);
      expect(response.body.cnt).to.equal(QUERY.cnt);
      expect(response.body.list).to.have.lengthOf(response.body.cnt);

      cityFiels = response.body.city;
      expect(response.body.city.id).to.equal(792680);
      expect(response.body.city.name).to.equal('Belgrade');
      expect(response.body.city.coord.lat).to.equal(QUERY.lat);
      expect(response.body.city.coord.lon).to.equal(QUERY.lon);
      expect(response.body.city.country).to.equal('RS');
      expect(response.body.city.population).to.be.above(0);
      expect(response.body.city.timezone).to.be.at.least(0);
      expect(response.body.city.sunrise).to.be.a('number');
      expect(response.body.city.sunset).to.be.a('number');
    });
  });

  it('Should have response by city name', () => {
    cy.request({
      method: 'GET',
      url: ENDPOINT,
      qs: QUERY_Q,
    }).then((response) => {
      expect(response.status).to.equal(200);

      expect(response).to.have.property('headers');
      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );

      expect(Number(response.body.cod)).to.equal(200);
      expect(response.body.message).to.equal(0);
      expect(response.body.cnt).to.equal(QUERY.cnt);
      expect(response.body.list).to.have.lengthOf(response.body.cnt);

      // City fields from both responses shold be the same
      expect(response.body.city).to.deep.equal(cityFiels);
    });
  });
});
