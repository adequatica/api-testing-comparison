import { defineConfig } from 'cypress';

import { CREDENTIALS, HOST } from './utils/env';

export default defineConfig({
  e2e: {
    baseUrl: HOST,
  },
  env: {
    apiKey: CREDENTIALS,
  },
  video: false,
});
