import axios from 'axios';
import { CREDENTIALS, HOST } from '../utils/env';

// https://openweathermap.org/api/air-pollution
const ENDPOINT = '/data/2.5/air_pollution';

const QUERY = {
  lat: 44.804,
  lon: 20.4651,
  appid: CREDENTIALS,
};

describe('Request Air Pollution API', () => {
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
    expect(response.data.coord.lat).toBe(QUERY.lat);
    expect(response.data.coord.lon).toBe(QUERY.lon);
    expect(response.data.list.length).toBe(1);
    expect(typeof response.data.list[0].dt).toBe('number');
    expect(response.data.list[0].main.aqi).toBeGreaterThanOrEqual(1);
    expect(
      Object.keys(response.data.list[0].components).length,
    ).toBeGreaterThanOrEqual(1);

    Object.keys(response.data.list[0].components).forEach((key) => {
      expect(response.data.list[0].components[key]).toBeGreaterThanOrEqual(0);
    });
  });
});
