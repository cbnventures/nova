import type { Presets_Eslint_FwNextjs_ConfigConfig } from '../../types/presets/eslint/fw-nextjs.d.ts';

/**
 * Presets - ESLint - FW Next.js - Config.
 *
 * Provides Next.js-specific ESLint configuration such as ignored build
 * output paths. Consumers spread this into their flat config array via the preset index.
 *
 * @since 0.11.0
 */
const config: Presets_Eslint_FwNextjs_ConfigConfig = [{
  name: 'nova/fw-nextjs/ignored-files',
  ignores: [],
}];

export default config;
