import { config } from 'dotenv';
import { resolve } from 'node:path';

// Load committed test fixtures
config({
  path: resolve(__dirname, '.env.test'),
});
