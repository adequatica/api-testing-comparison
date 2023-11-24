import axios from 'axios';
import { CREDENTIALS, HOST } from '../utils/env';

// https://openweathermap.org/forecast5
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

  describe('Request by geographic coordinates', () => {
    let response: any;

    beforeAll(async () => {
      response = await axios.get(`${HOST}${ENDPOINT}`, { params: QUERY });
    });

    it('Should have response status 200', () => {
      expect(response.status).toBe(200);
    });

    it('Should have response status text', () => {
      expect(response.statusText).toBe('OK');
    });

    it('Should have valid content-type', async () => {
      expect(response.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
    });

    it('Should have valid body values', async () => {
      expect(Number(response.data.cod)).toBe(200);
      expect(response.data.message).toBe(0);
      expect(response.data.cnt).toBe(QUERY.cnt);
      expect(response.data.list.length).toBe(response.data.cnt);

      cityFiels = response.data.city;
      expect(response.data.city.id).toBe(792680);
      expect(response.data.city.name).toBe('Belgrade');
      expect(response.data.city.coord.lat).toBe(QUERY.lat);
      expect(response.data.city.coord.lon).toBe(QUERY.lon);
      expect(response.data.city.country).toBe('RS');
      expect(response.data.city.population).toBeGreaterThan(0);
      expect(response.data.city.timezone).toBeGreaterThanOrEqual(0);
      expect(typeof response.data.city.sunrise).toBe('number');
      expect(typeof response.data.city.sunset).toBe('number');
    });
  });

  describe('Request by city name', () => {
    let response: any;

    beforeAll(async () => {
      response = await axios.get(`${HOST}${ENDPOINT}`, { params: QUERY_Q });
    });

    it('Should have response status 200', () => {
      expect(response.status).toBe(200);
    });

    it('Should have response status text', () => {
      expect(response.statusText).toBe('OK');
    });

    it('Should have valid content-type', async () => {
      expect(response.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
    });

    it('Should have valid body values', async () => {
      expect(Number(response.data.cod)).toBe(200);
      expect(response.data.message).toBe(0);
      expect(response.data.cnt).toBe(QUERY.cnt);
      expect(response.data.list.length).toBe(response.data.cnt);

      // City fields from both responses shold be the same
      expect(response.data.city).toStrictEqual(cityFiels);
    });
  });
});
