import type { PresetsEslintRuntimeEdgeConfigConfig } from '../../types/presets/eslint/runtime-edge.d.ts';

/**
 * Presets - ESLint - Runtime Edge - Config.
 *
 * Reserved preset for edge runtime environment rules. Currently empty because no
 * edge-specific lint rules are needed beyond the shared dx-code-style preset.
 *
 * @since 0.11.0
 */
const config: PresetsEslintRuntimeEdgeConfigConfig = [{}];

export default config;
