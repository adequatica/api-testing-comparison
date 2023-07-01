import axios from 'axios';
import { CREDENTIALS, HOST } from '../utils/env';

// https://openweathermap.org/api/one-call-3
const ENDPOINT = '/data/3.0/onecall';

const QUERY = {
  lat: 44.804,
  lon: 20.4651,
  exclude: 'alerts',
  appid: CREDENTIALS,
};

describe('Request One Call API 3.0', () => {
  let response: any;

  beforeAll(async () => {
    response = await axios.get(`${HOST}${ENDPOINT}`, {
      params: QUERY,
      validateStatus: function (status) {
        return status >= 200 && status <= 500;
      },
    });
  });

  it('Should have response status 401', () => {
    expect(response.status).toBe(401);
  });

  it('Should have response status text', () => {
    expect(response.statusText).toBe('Unauthorized');
  });

  it('Should have valid content-type', async () => {
    expect(response.headers['content-type']).toBe(
      'application/json; charset=utf-8'
    );
  });

  it('Should have valid body values', async () => {
    expect(response.data.cod).toBe(401);
    expect(response.data.message).toEqual(
      expect.stringContaining(
        'Please note that using One Call 3.0 requires a separate subscription to the One Call by Call plan'
      )
    );
  });
});
