import * as mdxParser from 'eslint-mdx';
import * as mdxPlugin from 'eslint-plugin-mdx';

import type { FlatConfig } from '@/types/presets/eslint.d.ts';

/**
 * Config.
 *
 * @since 1.0.0
 */
const config: FlatConfig = [
  {
    name: 'nova/lang-mdx',
    files: [
      '**/*.mdx',
    ],
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
  },
];

export default config;
