import { test, expect } from '@playwright/test';
import { CREDENTIALS } from '../utils/env';

const ENDPOINT = '/data/3.0/onecall';

const QUERY = {
  lat: 44.804,
  lon: 20.4651,
  exclude: 'alerts',
  appid: CREDENTIALS,
};

test.describe('Request One Call API 3.0', () => {
  let response: any;
  let body: any;

  test.beforeAll(async ({ request }) => {
    response = await request.get(ENDPOINT, { params: QUERY });
    body = await response.json();
  });

  test('Should have response status 401', async () => {
    expect(response.status()).toBe(401);
  });

  test('Should have response status text', async () => {
    expect(response.ok()).not.toBeTruthy();
  });

  test('Should have valid content-type', async () => {
    expect(response.headers()['content-type']).toBe(
      'application/json; charset=utf-8'
    );
  });

  test('Should have valid body values', async () => {
    expect(body.cod).toBe(401);
    expect(body.message).toEqual(
      expect.stringContaining(
        'Please note that using One Call 3.0 requires a separate subscription to the One Call by Call plan'
      )
    );
  });
});
