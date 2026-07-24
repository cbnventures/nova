import { deepStrictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  describe,
  it,
} from 'vitest';

import { Runner as ContentScan } from '../../../lib/i18n/content-scan.js';

import type {
  Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_AddsADescriptorForEachVersionedDocsDirectory_Descriptors,
  Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_AddsADescriptorForEachVersionedDocsDirectory_Plugins,
  Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_AddsADescriptorForEachVersionedDocsDirectory_SiteDir,
  Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_EmitsADescriptorForEveryInstanceOfAPlugin_Descriptors,
  Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_EmitsADescriptorForEveryInstanceOfAPlugin_Plugins,
  Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_EmitsADescriptorForEveryInstanceOfAPlugin_SiteDir,
  Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_FallsBackToTheDefaultSourcePathWhenPathIsUnset_Descriptors,
  Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_FallsBackToTheDefaultSourcePathWhenPathIsUnset_Plugins,
  Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_FallsBackToTheDefaultSourcePathWhenPathIsUnset_SiteDir,
  Tests_Lib_I18n_ContentScan_ContentScanCollect_CountsASourceFileWithATranslatedCopyAsPresent_DocsDir,
  Tests_Lib_I18n_ContentScan_ContentScanCollect_CountsASourceFileWithATranslatedCopyAsPresent_FrCurrentDir,
  Tests_Lib_I18n_ContentScan_ContentScanCollect_CountsASourceFileWithATranslatedCopyAsPresent_Result,
  Tests_Lib_I18n_ContentScan_ContentScanCollect_CountsASourceFileWithATranslatedCopyAsPresent_SiteDir,
  Tests_Lib_I18n_ContentScan_ContentScanCollect_GivesInstancesOfTheSamePluginDistinctIds_CommunityDir,
  Tests_Lib_I18n_ContentScan_ContentScanCollect_GivesInstancesOfTheSamePluginDistinctIds_DefaultDir,
  Tests_Lib_I18n_ContentScan_ContentScanCollect_GivesInstancesOfTheSamePluginDistinctIds_Result,
  Tests_Lib_I18n_ContentScan_ContentScanCollect_GivesInstancesOfTheSamePluginDistinctIds_SiteDir,
  Tests_Lib_I18n_ContentScan_ContentScanCollect_ResolvesPresenceUnderAVersionedDocsSegment_FrVersionDir,
  Tests_Lib_I18n_ContentScan_ContentScanCollect_ResolvesPresenceUnderAVersionedDocsSegment_Result,
  Tests_Lib_I18n_ContentScan_ContentScanCollect_ResolvesPresenceUnderAVersionedDocsSegment_SiteDir,
  Tests_Lib_I18n_ContentScan_ContentScanCollect_ResolvesPresenceUnderAVersionedDocsSegment_VersionDir,
  Tests_Lib_I18n_ContentScan_ContentScanCollect_SkipsADescriptorWhoseSourceDirectoryIsMissing_Dir,
  Tests_Lib_I18n_ContentScan_ContentScanCollect_SkipsADescriptorWhoseSourceDirectoryIsMissing_Result,
} from '../../../types/tests/lib/i18n/content-scan.test.d.ts';

/**
 * Tests - Lib - I18n - Content Scan - Collect.
 *
 * @since 0.21.0
 */
describe('ContentScan.collect', () => {
  it('skips a descriptor whose source directory is missing', async () => {
    const dir: Tests_Lib_I18n_ContentScan_ContentScanCollect_SkipsADescriptorWhoseSourceDirectoryIsMissing_Dir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));

    // The descriptor's source directory is never created, so it must be dropped
    // without error rather than throwing on the missing folder.
    const result: Tests_Lib_I18n_ContentScan_ContentScanCollect_SkipsADescriptorWhoseSourceDirectoryIsMissing_Result = await ContentScan.collect({
      siteDir: dir,
      descriptors: [{
        pluginName: 'docusaurus-plugin-content-docs',
        pluginId: 'default',
        short: 'docs',
        sourceDir: join(dir, 'docs'),
        versionSegment: 'current',
      }],
      locales: [
        'en',
        'fr',
      ],
      defaultLocale: 'en',
    });

    deepStrictEqual(result, {
      sources: [],
      perLocale: [
        {
          locale: 'en',
          isDefaultLocale: true,
          present: new Set(),
        },
        {
          locale: 'fr',
          isDefaultLocale: false,
          present: new Set(),
        },
      ],
    });

    return;
  });

  it('counts a source file with a translated copy as present', async () => {
    const siteDir: Tests_Lib_I18n_ContentScan_ContentScanCollect_CountsASourceFileWithATranslatedCopyAsPresent_SiteDir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));
    const docsDir: Tests_Lib_I18n_ContentScan_ContentScanCollect_CountsASourceFileWithATranslatedCopyAsPresent_DocsDir = join(siteDir, 'docs');

    await mkdir(docsDir, { recursive: true });
    await writeFile(join(docsDir, 'intro.md'), '# Intro');
    await writeFile(join(docsDir, 'advanced.md'), '# Advanced');

    // Only `intro.md` is translated, so `advanced.md` must read as absent.
    const frCurrentDir: Tests_Lib_I18n_ContentScan_ContentScanCollect_CountsASourceFileWithATranslatedCopyAsPresent_FrCurrentDir = join(siteDir, 'i18n', 'fr', 'docusaurus-plugin-content-docs', 'current');

    await mkdir(frCurrentDir, { recursive: true });
    await writeFile(join(frCurrentDir, 'intro.md'), '# Intro FR');

    const result: Tests_Lib_I18n_ContentScan_ContentScanCollect_CountsASourceFileWithATranslatedCopyAsPresent_Result = await ContentScan.collect({
      siteDir,
      descriptors: [{
        pluginName: 'docusaurus-plugin-content-docs',
        pluginId: 'default',
        short: 'docs',
        sourceDir: docsDir,
        versionSegment: 'current',
      }],
      locales: ['fr'],
      defaultLocale: 'en',
    });

    deepStrictEqual(result['perLocale'], [{
      locale: 'fr',
      isDefaultLocale: false,
      present: new Set(['docs/intro.md']),
    }]);
    deepStrictEqual([...result['sources']].sort(), [
      'docs/advanced.md',
      'docs/intro.md',
    ]);

    return;
  });

  it('resolves presence under a versioned docs segment', async () => {
    const siteDir: Tests_Lib_I18n_ContentScan_ContentScanCollect_ResolvesPresenceUnderAVersionedDocsSegment_SiteDir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));
    const versionDir: Tests_Lib_I18n_ContentScan_ContentScanCollect_ResolvesPresenceUnderAVersionedDocsSegment_VersionDir = join(siteDir, 'versioned_docs', 'version-2.0');

    await mkdir(versionDir, { recursive: true });
    await writeFile(join(versionDir, 'intro.md'), '# Intro 2.0');

    // A versioned descriptor checks its i18n copy under the same version segment.
    const frVersionDir: Tests_Lib_I18n_ContentScan_ContentScanCollect_ResolvesPresenceUnderAVersionedDocsSegment_FrVersionDir = join(siteDir, 'i18n', 'fr', 'docusaurus-plugin-content-docs', 'version-2.0');

    await mkdir(frVersionDir, { recursive: true });
    await writeFile(join(frVersionDir, 'intro.md'), '# Intro 2.0 FR');

    const result: Tests_Lib_I18n_ContentScan_ContentScanCollect_ResolvesPresenceUnderAVersionedDocsSegment_Result = await ContentScan.collect({
      siteDir,
      descriptors: [{
        pluginName: 'docusaurus-plugin-content-docs',
        pluginId: 'default',
        short: 'docs',
        sourceDir: versionDir,
        versionSegment: 'version-2.0',
      }],
      locales: ['fr'],
      defaultLocale: 'en',
    });

    deepStrictEqual(result, {
      sources: ['docs/version-2.0/intro.md'],
      perLocale: [{
        locale: 'fr',
        isDefaultLocale: false,
        present: new Set(['docs/version-2.0/intro.md']),
      }],
    });

    return;
  });

  it('gives instances of the same plugin distinct ids', async () => {
    const siteDir: Tests_Lib_I18n_ContentScan_ContentScanCollect_GivesInstancesOfTheSamePluginDistinctIds_SiteDir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));
    const defaultDir: Tests_Lib_I18n_ContentScan_ContentScanCollect_GivesInstancesOfTheSamePluginDistinctIds_DefaultDir = join(siteDir, 'docs');
    const communityDir: Tests_Lib_I18n_ContentScan_ContentScanCollect_GivesInstancesOfTheSamePluginDistinctIds_CommunityDir = join(siteDir, 'community');

    await mkdir(defaultDir, { recursive: true });
    await writeFile(join(defaultDir, 'intro.md'), '# Intro');
    await mkdir(communityDir, { recursive: true });
    await writeFile(join(communityDir, 'intro.md'), '# Community');

    // The named instance is labelled `docs(community)`, so the two `intro.md`
    // sources never collapse to the same id.
    const result: Tests_Lib_I18n_ContentScan_ContentScanCollect_GivesInstancesOfTheSamePluginDistinctIds_Result = await ContentScan.collect({
      siteDir,
      descriptors: [
        {
          pluginName: 'docusaurus-plugin-content-docs',
          pluginId: 'default',
          short: 'docs',
          sourceDir: defaultDir,
          versionSegment: 'current',
        },
        {
          pluginName: 'docusaurus-plugin-content-docs',
          pluginId: 'community',
          short: 'docs',
          sourceDir: communityDir,
          versionSegment: 'current',
        },
      ],
      locales: ['en'],
      defaultLocale: 'en',
    });

    deepStrictEqual(result['sources'], [
      'docs/intro.md',
      'docs(community)/intro.md',
    ]);

    return;
  });

  return;
});

/**
 * Tests - Lib - I18n - Content Scan - Build Descriptors.
 *
 * @since 0.21.0
 */
describe('ContentScan.buildDescriptors', () => {
  it('emits a descriptor for every instance of a plugin', async () => {
    const siteDir: Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_EmitsADescriptorForEveryInstanceOfAPlugin_SiteDir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));

    // Two blog instances share a name; `plugins.filter` must keep both, not just
    // the first, so each contributes its own descriptor.
    const plugins: Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_EmitsADescriptorForEveryInstanceOfAPlugin_Plugins = [
      {
        name: 'docusaurus-plugin-content-blog',
        path: 'blog',
        version: { type: 'synthetic' },
        options: {
          id: 'default',
          path: 'blog',
        },
      },
      {
        name: 'docusaurus-plugin-content-blog',
        path: 'news',
        version: { type: 'synthetic' },
        options: {
          id: 'news',
          path: 'news',
        },
      },
    ];
    const descriptors: Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_EmitsADescriptorForEveryInstanceOfAPlugin_Descriptors = await ContentScan.buildDescriptors(siteDir, plugins);

    deepStrictEqual(descriptors, [
      {
        pluginName: 'docusaurus-plugin-content-blog',
        pluginId: 'default',
        short: 'blog',
        sourceDir: join(siteDir, 'blog'),
        versionSegment: null,
      },
      {
        pluginName: 'docusaurus-plugin-content-blog',
        pluginId: 'news',
        short: 'blog',
        sourceDir: join(siteDir, 'news'),
        versionSegment: null,
      },
    ]);

    return;
  });

  it('adds a descriptor for each versioned docs directory', async () => {
    const siteDir: Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_AddsADescriptorForEachVersionedDocsDirectory_SiteDir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));

    await mkdir(join(siteDir, 'versioned_docs', 'version-1.0'), { recursive: true });

    // The docs instance yields its live `current` version plus one descriptor for
    // the frozen `version-1.0` directory on disk.
    const plugins: Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_AddsADescriptorForEachVersionedDocsDirectory_Plugins = [{
      name: 'docusaurus-plugin-content-docs',
      path: 'docs',
      version: { type: 'synthetic' },
      options: {
        id: 'default',
        path: 'docs',
      },
    }];
    const descriptors: Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_AddsADescriptorForEachVersionedDocsDirectory_Descriptors = await ContentScan.buildDescriptors(siteDir, plugins);

    deepStrictEqual(descriptors, [
      {
        pluginName: 'docusaurus-plugin-content-docs',
        pluginId: 'default',
        short: 'docs',
        sourceDir: join(siteDir, 'docs'),
        versionSegment: 'current',
      },
      {
        pluginName: 'docusaurus-plugin-content-docs',
        pluginId: 'default',
        short: 'docs',
        sourceDir: join(siteDir, 'versioned_docs', 'version-1.0'),
        versionSegment: 'version-1.0',
      },
    ]);

    return;
  });

  it('falls back to the default source path when path is unset', async () => {
    const siteDir: Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_FallsBackToTheDefaultSourcePathWhenPathIsUnset_SiteDir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));

    // With no `path` option, the pages instance resolves its default `src/pages`.
    const plugins: Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_FallsBackToTheDefaultSourcePathWhenPathIsUnset_Plugins = [{
      name: 'docusaurus-plugin-content-pages',
      path: 'src/pages',
      version: { type: 'synthetic' },
      options: { id: 'default' },
    }];
    const descriptors: Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_FallsBackToTheDefaultSourcePathWhenPathIsUnset_Descriptors = await ContentScan.buildDescriptors(siteDir, plugins);

    deepStrictEqual(descriptors, [{
      pluginName: 'docusaurus-plugin-content-pages',
      pluginId: 'default',
      short: 'pages',
      sourceDir: join(siteDir, 'src/pages'),
      versionSegment: null,
    }]);

    return;
  });

  return;
});
