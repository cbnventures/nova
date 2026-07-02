import { describe } from 'vitest';

import { discoverContentFiles } from '../../../lib/file-discovery.js';
import {
  descriptionNotPlaceholder,
  frontmatterClosed,
  frontmatterPresent,
  idMatchesFilename,
  keywordsNotEmpty,
  keywordsNotPlaceholder,
  requiredFieldsPresentBlog,
  requiredFieldsPresentDocs,
  tagsNotEmpty,
  tagsNotPlaceholder,
} from './rules.js';

import type {
  Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Config,
  Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_BlogDir,
  Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_ContentDirs,
  Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_Enable,
  Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_Files,
  Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_IndexSlug,
  Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_PlaceholderBodyPrefix,
  Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_PlaceholderSentinel,
  Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_RequiredBlogFields,
  Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_RequiredFields,
  Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_Resolved,
  Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_RootDir,
  Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Returns,
} from '../../../types/rules/vitest/frontmatter/register.d.ts';

/**
 * Rules - Vitest - Frontmatter - Register - Frontmatter Suite.
 *
 * Resolves the suite config (defaulting the optional field lists, dirs, index slug,
 * placeholder params, and `rootDir` to `process.cwd()`) and runs the frontmatter checks
 * inside a single describe, each gated by `enable`.
 *
 * @param {Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Config} config - Config.
 *
 * @returns {Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Returns}
 *
 * @since 0.20.0
 */
export function registerFrontmatterSuite(config: Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Config): Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Returns {
  describe('frontmatter', async () => {
    const requiredFields: Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_RequiredFields = config['requiredFields'];
    const requiredBlogFields: Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_RequiredBlogFields = config['requiredBlogFields'] ?? [
      'title',
      'authors',
      'tags',
    ];
    const contentDirs: Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_ContentDirs = config['contentDirs'] ?? [
      'docs',
      'blog',
    ];
    const blogDir: Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_BlogDir = config['blogDir'] ?? 'blog';
    const indexSlug: Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_IndexSlug = config['indexSlug'] ?? null;
    const placeholderSentinel: Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_PlaceholderSentinel = config['placeholderSentinel'];
    const placeholderBodyPrefix: Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_PlaceholderBodyPrefix = config['placeholderBodyPrefix'];
    const rootDir: Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_RootDir = config['rootDir'] ?? process.cwd();
    const enable: Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_Enable = config['enable'];
    const files: Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_Files = await discoverContentFiles({
      rootDir,
      contentDirs,
    });
    const resolved: Rules_Vitest_Frontmatter_Register_RegisterFrontmatterSuite_Frontmatter_Resolved = {
      requiredFields,
      requiredBlogFields,
      contentDirs,
      blogDir,
      indexSlug,
      placeholderSentinel,
      placeholderBodyPrefix,
      rootDir,
      files,
    };

    await frontmatterPresent(resolved, enable);
    await frontmatterClosed(resolved, enable);
    await requiredFieldsPresentDocs(resolved, enable);
    await requiredFieldsPresentBlog(resolved, enable);
    await idMatchesFilename(resolved, enable);
    await descriptionNotPlaceholder(resolved, enable);
    await keywordsNotPlaceholder(resolved, enable);
    await keywordsNotEmpty(resolved, enable);
    await tagsNotPlaceholder(resolved, enable);
    await tagsNotEmpty(resolved, enable);

    return;
  });

  return;
}
