import axios from 'axios';
import { CREDENTIALS, HOST } from '../utils/env';

// https://openweathermap.org/current
const ENDPOINT = '/data/2.5/weather';

const QUERY = {
  lat: 44.804,
  lon: 20.4651,
  appid: CREDENTIALS,
};

describe('Request Current weather data', () => {
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
    // Resonse coordinates are flacky for strict comparison
    expect(Math.round(response.data.coord.lat)).toBe(Math.round(QUERY.lat));
    expect(Math.round(response.data.coord.lon)).toBe(Math.round(QUERY.lon));
    expect(response.data.weather.length).toBeGreaterThanOrEqual(1);
    expect(response.data.base).toBe('stations');
    expect(Object.keys(response.data.main).length).toBeGreaterThanOrEqual(1);
    expect(response.data.visibility).toBeGreaterThanOrEqual(0);
    expect(response.data.wind.speed).toBeGreaterThanOrEqual(0);
    expect(response.data.wind.deg).toBeGreaterThanOrEqual(0);
    expect(response.data.wind.deg).toBeLessThanOrEqual(360);
    expect(response.data.clouds.all).toBeGreaterThanOrEqual(0);
    expect(typeof response.data.dt).toBe('number');
    expect(typeof response.data.sys.type).toBe('number');
    expect(typeof response.data.sys.id).toBe('number');
    expect(response.data.sys.country).toBe('RS');
    expect(typeof response.data.sys.sunrise).toBe('number');
    expect(typeof response.data.sys.sunset).toBe('number');
    expect(response.data.timezone).toBeGreaterThanOrEqual(0);
    expect(response.data.id).toBe(792680);
    expect(response.data.name).toBe('Belgrade');
    expect(response.data.cod).toBe(200);
  });
});
