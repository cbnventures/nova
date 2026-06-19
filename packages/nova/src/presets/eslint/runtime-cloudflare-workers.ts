import type { Presets_Eslint_RuntimeCloudflareWorkers_Config } from '../../types/presets/eslint/runtime-cloudflare-workers.d.ts';

/**
 * Presets - ESLint - Runtime Cloudflare Workers - Config.
 *
 * Provides Cloudflare Workers-specific ESLint configuration such
 * as ignored build output paths. Consumers spread this into their flat config array.
 *
 * @since 0.11.0
 */
const config: Presets_Eslint_RuntimeCloudflareWorkers_Config = [{
  name: 'nova/runtime-cloudflare-workers/ignored-files',
  ignores: [],
}];

export default config;
