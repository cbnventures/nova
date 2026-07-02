import { describe } from 'vitest';

import { tablesMatchMarkdownTableOutput } from './rules.js';

import type {
  Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_Config,
  Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_ContentDirs,
  Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_Enable,
  Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_FileExtensions,
  Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_Resolved,
  Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_RootDir,
  Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_Returns,
} from '../../../types/rules/vitest/markdown-table/register.d.ts';

/**
 * Rules - Vitest - Markdown Table - Register - Markdown Table Suite.
 *
 * Resolves the suite config (defaulting the content dirs, root, and file extensions to
 * Nova's layout) and runs the single markdown-table conformance check inside a describe,
 * gated by `enable`.
 *
 * @param {Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_Config} config - Config.
 *
 * @returns {Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_Returns}
 *
 * @since 0.20.0
 */
export function registerMarkdownTableSuite(config: Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_Config): Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_Returns {
  describe('markdown table', async () => {
    const contentDirs: Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_ContentDirs = config['contentDirs'] ?? [
      'docs',
      'blog',
    ];
    const rootDir: Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_RootDir = config['rootDir'] ?? process.cwd();
    const fileExtensions: Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_FileExtensions = config['fileExtensions'] ?? [
      '.md',
      '.mdx',
    ];
    const enable: Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_Enable = config['enable'];
    const resolved: Rules_Vitest_MarkdownTable_Register_RegisterMarkdownTableSuite_MarkdownTable_Resolved = {
      contentDirs,
      rootDir,
      fileExtensions,
    };

    await tablesMatchMarkdownTableOutput(resolved, enable);

    return;
  });

  return;
}
