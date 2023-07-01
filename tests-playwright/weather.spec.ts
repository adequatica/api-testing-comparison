import { test, expect } from '@playwright/test';
import { CREDENTIALS } from '../utils/env';

const ENDPOINT = '/data/2.5/weather';

const QUERY = {
  lat: 44.804,
  lon: 20.4651,
  appid: CREDENTIALS,
};

test.describe('Request Current weather data', () => {
  let response: any;
  let body: any;

  test.beforeAll(async ({ request }) => {
    response = await request.get(ENDPOINT, { params: QUERY });
    body = await response.json();
  });

  test('Should have response status 200', async () => {
    expect(response.status()).toBe(200);
  });

  test('Should have response status text', async () => {
    expect(response.ok()).toBeTruthy();
  });

  test('Should have valid content-type', async () => {
    expect(response.headers()['content-type']).toBe(
      'application/json; charset=utf-8'
    );
  });

  test('Should have valid body values', async () => {
    // Resonse coordinates are flacky for strict comparison
    expect(Math.round(body.coord.lat)).toBe(Math.round(QUERY.lat));
    expect(Math.round(body.coord.lon)).toBe(Math.round(QUERY.lon));
    expect(body.weather.length).toBeGreaterThanOrEqual(1);
    expect(body.base).toBe('stations');
    expect(Object.keys(body.main).length).toBeGreaterThanOrEqual(1);
    expect(body.visibility).toBeGreaterThanOrEqual(0);
    expect(body.wind.speed).toBeGreaterThanOrEqual(0);
    expect(body.wind.deg).toBeGreaterThanOrEqual(0);
    expect(body.wind.deg).toBeLessThanOrEqual(360);
    expect(body.clouds.all).toBeGreaterThanOrEqual(0);
    expect(typeof body.dt).toBe('number');
    expect(typeof body.sys.type).toBe('number');
    expect(typeof body.sys.id).toBe('number');
    expect(body.sys.country).toBe('RS');
    expect(typeof body.sys.sunrise).toBe('number');
    expect(typeof body.sys.sunset).toBe('number');
    expect(body.timezone).toBeGreaterThanOrEqual(0);
    expect(body.id).toBe(792680);
    expect(body.name).toBe('Belgrade');
    expect(body.cod).toBe(200);
  });
});
