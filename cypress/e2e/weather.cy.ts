import { CREDENTIALS } from '../../utils/env';

const ENDPOINT = '/data/2.5/weather';

const QUERY = {
  lat: 44.804,
  lon: 20.4651,
  appid: CREDENTIALS,
};

describe('Request Current weather data', () => {
  it('Should have response', () => {
    cy.request({
      method: 'GET',
      url: ENDPOINT,
      qs: QUERY,
    }).then((response) => {
      expect(response.status).to.equal(200);

      expect(response).to.have.property('headers');
      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8',
      );

      // Resonse coordinates are flacky for strict comparison
      expect(Math.round(response.body.coord.lat)).to.equal(
        Math.round(QUERY.lat),
      );
      expect(Math.round(response.body.coord.lon)).to.equal(
        Math.round(QUERY.lon),
      );
      expect(response.body.weather).to.have.lengthOf(1);
      expect(response.body.base).to.equal('stations');
      expect(Object.keys(response.body.main)).to.have.lengthOf.above(0);
      expect(response.body.visibility).to.be.at.least(0);
      expect(response.body.wind.speed).to.be.at.least(0);
      expect(response.body.wind.deg).to.be.at.least(0).to.be.at.most(360);
      expect(response.body.clouds.all).to.be.at.least(0);
      expect(response.body.dt).to.be.a('number');
      expect(response.body.sys.type).to.be.a('number');
      expect(response.body.sys.id).to.be.a('number');
      expect(response.body.sys.country).to.equal('RS');
      expect(response.body.sys.sunrise).to.be.a('number');
      expect(response.body.sys.sunset).to.be.a('number');
      expect(response.body.timezone).to.be.at.least(0);
      expect(response.body.id).to.equal(792680);
      expect(response.body.name).to.equal('Belgrade');
      expect(response.body.cod).to.equal(200);
    });
  });
});
