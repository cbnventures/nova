import type { Presets_Eslint_RuntimeWebWorker_ConfigConfig } from '../../types/presets/eslint/runtime-web-worker.d.ts';

/**
 * Presets - ESLint - Runtime Web Worker - Config.
 *
 * Reserved preset for Web Worker environment rules. Currently empty because no
 * Worker-specific lint rules are needed beyond the shared dx-code-style preset.
 *
 * @since 0.11.0
 */
const config: Presets_Eslint_RuntimeWebWorker_ConfigConfig = [{}];

export default config;
