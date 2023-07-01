import { defineConfig } from 'cypress';

import { HOST } from './utils/env';

export default defineConfig({
  e2e: {
    baseUrl: HOST,
  },
  video: false,
});
