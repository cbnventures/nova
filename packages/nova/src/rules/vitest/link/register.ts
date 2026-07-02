import { describe } from 'vitest';

import { discoverContentFiles } from '../../../lib/file-discovery.js';
import {
  buildLinkIndex,
  internalBlogAnchorExists,
  internalBlogTargetExists,
  internalDocAnchorExists,
  internalDocTargetExists,
  linkContentDirs,
  selfAnchorExists,
  skipExternalAndCodeBlocks,
} from './rules.js';

import type {
  Rules_Vitest_Link_Register_RegisterLinkSuite_Config,
  Rules_Vitest_Link_Register_RegisterLinkSuite_Link_BlogRouteBasePath,
  Rules_Vitest_Link_Register_RegisterLinkSuite_Link_CategoryRouteSkipPrefix,
  Rules_Vitest_Link_Register_RegisterLinkSuite_Link_ContentDirs,
  Rules_Vitest_Link_Register_RegisterLinkSuite_Link_DocsRouteBasePath,
  Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Enable,
  Rules_Vitest_Link_Register_RegisterLinkSuite_Link_FileExtensions,
  Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Files,
  Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Index,
  Rules_Vitest_Link_Register_RegisterLinkSuite_Link_ProjectRoot,
  Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved,
  Rules_Vitest_Link_Register_RegisterLinkSuite_Returns,
} from '../../../types/rules/vitest/link/register.d.ts';

/**
 * Rules - Vitest - Link - Register - Link Suite.
 *
 * Resolves the suite config (defaulting the project root, content dirs, route base paths,
 * category skip prefix, and file extensions to Nova's layout) and runs the link checks in a
 * single describe, each gated by `enable`.
 *
 * @param {Rules_Vitest_Link_Register_RegisterLinkSuite_Config} config - Config.
 *
 * @returns {Rules_Vitest_Link_Register_RegisterLinkSuite_Returns}
 *
 * @since 0.20.0
 */
export function registerLinkSuite(config: Rules_Vitest_Link_Register_RegisterLinkSuite_Config): Rules_Vitest_Link_Register_RegisterLinkSuite_Returns {
  describe('link', async () => {
    const projectRoot: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_ProjectRoot = config['projectRoot'] ?? process.cwd();
    const contentDirs: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_ContentDirs = config['contentDirs'] ?? {
      docs: 'docs',
      blog: 'blog',
    };
    const docsRouteBasePath: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_DocsRouteBasePath = config['docsRouteBasePath'] ?? 'docs';
    const blogRouteBasePath: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_BlogRouteBasePath = config['blogRouteBasePath'] ?? 'blog';
    const categoryRouteSkipPrefix: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_CategoryRouteSkipPrefix = config['categoryRouteSkipPrefix'] ?? 'category/';
    const fileExtensions: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_FileExtensions = config['fileExtensions'] ?? [
      '.md',
      '.mdx',
    ];
    const enable: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Enable = config['enable'];
    const resolved: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Resolved = {
      projectRoot,
      contentDirs,
      docsRouteBasePath,
      blogRouteBasePath,
      categoryRouteSkipPrefix,
      fileExtensions,
    };

    // Discover the content files once and share the list across every check so the directory
    // tree is walked a single time per run rather than once per check.
    const files: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Files = await discoverContentFiles({
      rootDir: projectRoot,
      contentDirs: linkContentDirs(resolved),
      fileExtensions,
    });

    // Build the shared link index once and thread it into every check so the content files are
    // read a single time per run rather than re-read once inside each of the five checks.
    const index: Rules_Vitest_Link_Register_RegisterLinkSuite_Link_Index = await buildLinkIndex(resolved, files);

    await internalDocTargetExists(resolved, files, index, enable);
    await internalDocAnchorExists(resolved, files, index, enable);
    await internalBlogTargetExists(resolved, files, index, enable);
    await internalBlogAnchorExists(resolved, files, index, enable);
    await selfAnchorExists(resolved, files, index, enable);
    skipExternalAndCodeBlocks(enable);

    return;
  });

  return;
}
