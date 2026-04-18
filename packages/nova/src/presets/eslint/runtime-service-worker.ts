import type { PresetsEslintRuntimeServiceWorkerConfigConfig } from '../../types/presets/eslint/runtime-service-worker.d.ts';

/**
 * Presets - ESLint - Runtime Service Worker - Config.
 *
 * Reserved preset for Service Worker environment rules. Currently empty because no
 * SW-specific lint rules are needed beyond the shared dx-code-style preset.
 *
 * @since 0.11.0
 */
const config: PresetsEslintRuntimeServiceWorkerConfigConfig = [{}];

export default config;
