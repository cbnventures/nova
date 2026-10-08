import type { Presets_Eslint_FwExpressjs_Config } from '../../types/presets/eslint/fw-expressjs.d.ts';

/**
 * Presets - ESLint - FW Express.js - Config.
 *
 * Marks the Express.js framework layer explicitly. Express does not introduce
 * globals or lint rules beyond the Node.js runtime preset.
 *
 * @since 0.11.0
 */
const config: Presets_Eslint_FwExpressjs_Config = [{
  name: 'nova/fw-expressjs',
}];

export default config;
