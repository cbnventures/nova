import * as mdxParser from 'eslint-mdx';
import * as mdxPlugin from 'eslint-plugin-mdx';

import type { PresetsEslintLangMdxConfigConfig } from '../../types/presets/eslint/lang-mdx.d.ts';

/**
 * Presets - ESLint - Lang MDX - Config.
 *
 * Enables the eslint-mdx parser and plugin for all .mdx files. Used by the Docusaurus docs
 * site to lint MDX content alongside TypeScript source files.
 *
 * @since 0.11.0
 */
const config: PresetsEslintLangMdxConfigConfig = [{
  name: 'nova/lang-mdx',
  files: ['**/*.mdx'],
  languageOptions: {
    parser: mdxParser,
  },
  plugins: {
    mdx: mdxPlugin,
  },
  processor: mdxPlugin.createRemarkProcessor({
    lintCodeBlocks: false,
  }),
  rules: {
    ...mdxPlugin.flat.rules,
  },
}];

export default config;
