import { test, expect } from '@playwright/test';
import { CREDENTIALS } from '../utils/env';

const ENDPOINT = '/data/2.5/air_pollution';

const QUERY = {
  lat: 44.804,
  lon: 20.4651,
  appid: CREDENTIALS,
};

test.describe('Request Air Pollution API', () => {
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
    expect(body.coord.lat).toBe(QUERY.lat);
    expect(body.coord.lon).toBe(QUERY.lon);
    expect(body.list.length).toBe(1);
    expect(typeof body.list[0].dt).toBe('number');
    expect(body.list[0].main.aqi).toBeGreaterThanOrEqual(1);
    expect(Object.keys(body.list[0].components).length).toBeGreaterThanOrEqual(
      1
    );

    Object.keys(body.list[0].components).forEach((key) => {
      expect(body.list[0].components[key]).toBeGreaterThanOrEqual(0);
    });
  });
});
