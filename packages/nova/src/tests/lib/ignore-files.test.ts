import {
  deepStrictEqual,
  ok,
  strictEqual,
} from 'node:assert';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  describe,
  it,
} from 'vitest';

import {
  getSupportedIgnoreFileBundles,
  isSupportedIgnoreFileConfigPath,
  renderIgnoreFile,
} from '../../lib/ignore-files.js';
import { buildGeneratedFileHeader } from '../../lib/utility.js';

import type {
  Tests_Lib_IgnoreFiles_IgnoreFiles_AcceptsSafePhysicalIgnoreFilePaths_AssetsignoreResult,
  Tests_Lib_IgnoreFiles_IgnoreFiles_AcceptsSafePhysicalIgnoreFilePaths_DockerignoreResult,
  Tests_Lib_IgnoreFiles_IgnoreFiles_AcceptsSafePhysicalIgnoreFilePaths_GitignoreResult,
  Tests_Lib_IgnoreFiles_IgnoreFiles_CombinesBundlesWithProjectPatterns_AssetsignoreContent,
  Tests_Lib_IgnoreFiles_IgnoreFiles_CombinesBundlesWithProjectPatterns_DockerignoreContent,
  Tests_Lib_IgnoreFiles_IgnoreFiles_CombinesBundlesWithProjectPatterns_GitignoreContent,
  Tests_Lib_IgnoreFiles_IgnoreFiles_CombinesBundlesWithProjectPatterns_ProjectMarkerCount,
  Tests_Lib_IgnoreFiles_IgnoreFiles_KeepsScaffoldAssetsignoreAlignedWithRenderer_ExpectedContent,
  Tests_Lib_IgnoreFiles_IgnoreFiles_KeepsScaffoldAssetsignoreAlignedWithRenderer_RenderedContent,
  Tests_Lib_IgnoreFiles_IgnoreFiles_KeepsScaffoldAssetsignoreAlignedWithRenderer_StaticContent,
  Tests_Lib_IgnoreFiles_IgnoreFiles_KeepsScaffoldAssetsignoreAlignedWithRenderer_StaticPath,
  Tests_Lib_IgnoreFiles_IgnoreFiles_RejectsABundleThatDoesNotBelongToTheTargetFile_DidReject,
  Tests_Lib_IgnoreFiles_IgnoreFiles_RejectsABundleThatDoesNotBelongToTheTargetFile_RenderError,
  Tests_Lib_IgnoreFiles_IgnoreFiles_RejectsUnsafeOrUnsupportedPaths_AbsoluteResult,
  Tests_Lib_IgnoreFiles_IgnoreFiles_RejectsUnsafeOrUnsupportedPaths_NestedDockerignoreResult,
  Tests_Lib_IgnoreFiles_IgnoreFiles_RejectsUnsafeOrUnsupportedPaths_TraversalResult,
  Tests_Lib_IgnoreFiles_IgnoreFiles_RejectsUnsafeOrUnsupportedPaths_UnsupportedResult,
  Tests_Lib_IgnoreFiles_IgnoreFiles_RejectsUnsafeOrUnsupportedPaths_WindowsResult,
  Tests_Lib_IgnoreFiles_IgnoreFiles_ReturnsFileSpecificBundleNames_AssetsignoreBundles,
  Tests_Lib_IgnoreFiles_IgnoreFiles_ReturnsFileSpecificBundleNames_DockerignoreBundles,
  Tests_Lib_IgnoreFiles_IgnoreFiles_ReturnsFileSpecificBundleNames_GitignoreBundles,
} from '../../types/tests/lib/ignore-files.test.d.ts';

/**
 * Tests - Lib - Ignore Files - Ignore Files.
 *
 * Exercises path validation, bundle discovery, and deterministic rendering for
 * every physical ignore file managed through nova.config.json.
 *
 * @since 0.32.0
 */
describe('ignore files', () => {
  it('returns file-specific bundle names', () => {
    const gitignoreBundles: Tests_Lib_IgnoreFiles_IgnoreFiles_ReturnsFileSpecificBundleNames_GitignoreBundles = getSupportedIgnoreFileBundles('./.gitignore');
    const dockerignoreBundles: Tests_Lib_IgnoreFiles_IgnoreFiles_ReturnsFileSpecificBundleNames_DockerignoreBundles = getSupportedIgnoreFileBundles('./.dockerignore');
    const assetsignoreBundles: Tests_Lib_IgnoreFiles_IgnoreFiles_ReturnsFileSpecificBundleNames_AssetsignoreBundles = getSupportedIgnoreFileBundles('./apps/site/public/.assetsignore');

    deepStrictEqual(gitignoreBundles, ['nova']);
    deepStrictEqual(dockerignoreBundles, ['nova']);
    deepStrictEqual(assetsignoreBundles, ['cloudflare-astro']);

    return;
  });

  it('accepts safe physical ignore file paths', () => {
    const gitignoreResult: Tests_Lib_IgnoreFiles_IgnoreFiles_AcceptsSafePhysicalIgnoreFilePaths_GitignoreResult = isSupportedIgnoreFileConfigPath('./.gitignore');
    const dockerignoreResult: Tests_Lib_IgnoreFiles_IgnoreFiles_AcceptsSafePhysicalIgnoreFilePaths_DockerignoreResult = isSupportedIgnoreFileConfigPath('./.dockerignore');
    const assetsignoreResult: Tests_Lib_IgnoreFiles_IgnoreFiles_AcceptsSafePhysicalIgnoreFilePaths_AssetsignoreResult = isSupportedIgnoreFileConfigPath('./apps/site/public/.assetsignore');

    strictEqual(gitignoreResult, true);
    strictEqual(dockerignoreResult, true);
    strictEqual(assetsignoreResult, true);

    return;
  });

  it('rejects unsafe or unsupported paths', () => {
    const absoluteResult: Tests_Lib_IgnoreFiles_IgnoreFiles_RejectsUnsafeOrUnsupportedPaths_AbsoluteResult = isSupportedIgnoreFileConfigPath('/tmp/.gitignore');
    const nestedDockerignoreResult: Tests_Lib_IgnoreFiles_IgnoreFiles_RejectsUnsafeOrUnsupportedPaths_NestedDockerignoreResult = isSupportedIgnoreFileConfigPath('./apps/api/.dockerignore');
    const traversalResult: Tests_Lib_IgnoreFiles_IgnoreFiles_RejectsUnsafeOrUnsupportedPaths_TraversalResult = isSupportedIgnoreFileConfigPath('./apps/../.dockerignore');
    const unsupportedResult: Tests_Lib_IgnoreFiles_IgnoreFiles_RejectsUnsafeOrUnsupportedPaths_UnsupportedResult = isSupportedIgnoreFileConfigPath('./apps/api/.npmignore');
    const windowsResult: Tests_Lib_IgnoreFiles_IgnoreFiles_RejectsUnsafeOrUnsupportedPaths_WindowsResult = isSupportedIgnoreFileConfigPath('.\\apps\\api\\.dockerignore');

    strictEqual(absoluteResult, false);
    strictEqual(nestedDockerignoreResult, false);
    strictEqual(traversalResult, false);
    strictEqual(unsupportedResult, false);
    strictEqual(windowsResult, false);

    return;
  });

  it('combines bundles with project patterns', async () => {
    const gitignoreContent: Tests_Lib_IgnoreFiles_IgnoreFiles_CombinesBundlesWithProjectPatterns_GitignoreContent = await renderIgnoreFile('./.gitignore', {
      bundles: ['nova'],
      patterns: ['graphify-out/'],
    });
    const dockerignoreContent: Tests_Lib_IgnoreFiles_IgnoreFiles_CombinesBundlesWithProjectPatterns_DockerignoreContent = await renderIgnoreFile('./.dockerignore', {
      bundles: ['nova'],
      patterns: ['local-output/'],
    });
    const assetsignoreContent: Tests_Lib_IgnoreFiles_IgnoreFiles_CombinesBundlesWithProjectPatterns_AssetsignoreContent = await renderIgnoreFile('./apps/site/public/.assetsignore', {
      bundles: ['cloudflare-astro'],
      patterns: ['private-assets/'],
    });
    const projectMarkerCount: Tests_Lib_IgnoreFiles_IgnoreFiles_CombinesBundlesWithProjectPatterns_ProjectMarkerCount = gitignoreContent.split('#### Project Excludes ####').length - 1;

    ok(gitignoreContent.includes('node_modules'));
    ok(gitignoreContent.includes('graphify-out/'));
    ok(gitignoreContent.includes([
      '##########################',
      '#### Project Excludes ####',
      '##########################',
      'graphify-out/',
      '',
    ].join('\n')));
    strictEqual(projectMarkerCount, 1);
    ok(dockerignoreContent.includes('.env'));
    ok(dockerignoreContent.includes([
      '################',
      '#### Shared ####',
      '################',
    ].join('\n')));
    ok(dockerignoreContent.includes([
      '########################################',
      '#### Version Control - Git / GitHub ####',
      '########################################',
    ].join('\n')));
    ok(dockerignoreContent.includes([
      '############################',
      '#### Language - Node.js ####',
      '############################',
    ].join('\n')));
    ok(dockerignoreContent.includes([
      '########################',
      '#### Tooling - Nova ####',
      '########################',
    ].join('\n')));
    ok(dockerignoreContent.includes('local-output/'));
    ok(assetsignoreContent.includes([
      '########################################',
      '#### Web Hosting - Cloudflare Astro ####',
      '########################################',
      '_worker.js',
      '_routes.json',
    ].join('\n')));
    ok(assetsignoreContent.includes('private-assets/'));

    return;
  });

  it('keeps scaffold assetsignore aligned with renderer', async () => {
    const staticPath: Tests_Lib_IgnoreFiles_IgnoreFiles_KeepsScaffoldAssetsignoreAlignedWithRenderer_StaticPath = join(fileURLToPath(import.meta.url), '..', '..', '..', '..', 'templates', 'scaffold-options', 'app', 'astro', 'cloudflare', 'public', '.assetsignore');
    const staticContent: Tests_Lib_IgnoreFiles_IgnoreFiles_KeepsScaffoldAssetsignoreAlignedWithRenderer_StaticContent = await readFile(staticPath, 'utf-8');
    const renderedContent: Tests_Lib_IgnoreFiles_IgnoreFiles_KeepsScaffoldAssetsignoreAlignedWithRenderer_RenderedContent = await renderIgnoreFile('./apps/site/public/.assetsignore', {
      bundles: ['cloudflare-astro'],
      patterns: [],
    });
    const expectedContent: Tests_Lib_IgnoreFiles_IgnoreFiles_KeepsScaffoldAssetsignoreAlignedWithRenderer_ExpectedContent = `${buildGeneratedFileHeader({
      command: 'nova generate must-haves ignore-files',
      docsSlug: 'cli/generators/must-haves/ignore-files',
      mode: 'strict',
      targetPath: staticPath,
    })}${renderedContent}`;

    strictEqual(staticContent, expectedContent);

    return;
  });

  it('rejects a bundle that does not belong to the target file', async () => {
    let didReject: Tests_Lib_IgnoreFiles_IgnoreFiles_RejectsABundleThatDoesNotBelongToTheTargetFile_DidReject = false;

    try {
      await renderIgnoreFile('./.gitignore', {
        bundles: ['cloudflare-astro'],
        patterns: [],
      });
    } catch (error) {
      const renderError: Tests_Lib_IgnoreFiles_IgnoreFiles_RejectsABundleThatDoesNotBelongToTheTargetFile_RenderError = error;

      didReject = renderError instanceof Error && renderError.message.includes('not supported');
    }

    strictEqual(didReject, true);

    return;
  });

  return;
});
