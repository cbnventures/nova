import { defineConfig } from 'vite';

import frameworkPlugins from './config/framework-plugins.js';
import pwaPlugins from './config/pwa-plugins.js';

export default defineConfig({
  plugins: [
    ...frameworkPlugins,
    ...pwaPlugins,
  ],
});
