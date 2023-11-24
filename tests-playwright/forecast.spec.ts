import { test, expect } from '@playwright/test';
import { CREDENTIALS } from '../utils/env';

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

test.describe('Request 5 day weather forecast', () => {
  let cityFiels: any;

  test.describe('Request by geographic coordinates', () => {
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
        'application/json; charset=utf-8',
      );
    });

    test('Should have valid body values', async () => {
      expect(Number(body.cod)).toBe(200);
      expect(body.message).toBe(0);
      expect(body.cnt).toBe(QUERY.cnt);
      expect(body.list.length).toBe(body.cnt);

      cityFiels = body.city;
      expect(body.city.id).toBe(792680);
      expect(body.city.name).toBe('Belgrade');
      expect(body.city.coord.lat).toBe(QUERY.lat);
      expect(body.city.coord.lon).toBe(QUERY.lon);
      expect(body.city.country).toBe('RS');
      expect(body.city.population).toBeGreaterThan(0);
      expect(body.city.timezone).toBeGreaterThanOrEqual(0);
      expect(typeof body.city.sunrise).toBe('number');
      expect(typeof body.city.sunset).toBe('number');
    });
  });

  test.describe('Request by city name', () => {
    let response: any;
    let body: any;

    test.beforeAll(async ({ request }) => {
      response = await request.get(ENDPOINT, { params: QUERY_Q });
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
        'application/json; charset=utf-8',
      );
    });

    test('Should have valid body values', async () => {
      expect(Number(body.cod)).toBe(200);
      expect(body.message).toBe(0);
      expect(body.cnt).toBe(QUERY.cnt);
      expect(body.list.length).toBe(body.cnt);

      // City fields from both responses shold be the same
      expect(body.city).toStrictEqual(cityFiels);
    });
  });
});
