#!/usr/bin/env node

import { existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cli = resolve(root, 'build', 'src', 'cli', 'index.js');

if (existsSync(cli) === false) {
  process.stderr.write('Nova CLI has not been built yet. Run "npm run build" first.\n');

  throw new Error('CLI build output not found');
}

import(cli);
