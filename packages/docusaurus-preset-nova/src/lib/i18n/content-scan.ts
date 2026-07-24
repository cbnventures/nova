import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import { initPlugins } from '@docusaurus/core/lib/server/plugins/init.js';
import { loadContext } from '@docusaurus/core/lib/server/site.js';
import {
  getPluginI18nPath,
  Globby,
  GlobExcludeDefault,
} from '@docusaurus/utils';

import type {
  Lib_I18n_ContentScan_KnownPlugins,
  Lib_I18n_ContentScan_Runner_BuildDescriptors_Descriptors,
  Lib_I18n_ContentScan_Runner_BuildDescriptors_IsVersionDir,
  Lib_I18n_ContentScan_Runner_BuildDescriptors_Matches,
  Lib_I18n_ContentScan_Runner_BuildDescriptors_PluginId,
  Lib_I18n_ContentScan_Runner_BuildDescriptors_PluginOptions,
  Lib_I18n_ContentScan_Runner_BuildDescriptors_Plugins,
  Lib_I18n_ContentScan_Runner_BuildDescriptors_RawPluginId,
  Lib_I18n_ContentScan_Runner_BuildDescriptors_RawSourcePath,
  Lib_I18n_ContentScan_Runner_BuildDescriptors_Returns,
  Lib_I18n_ContentScan_Runner_BuildDescriptors_SiteDir,
  Lib_I18n_ContentScan_Runner_BuildDescriptors_SourcePath,
  Lib_I18n_ContentScan_Runner_BuildDescriptors_VersionDirents,
  Lib_I18n_ContentScan_Runner_BuildDescriptors_VersionedDir,
  Lib_I18n_ContentScan_Runner_BuildDescriptors_VersionedExists,
  Lib_I18n_ContentScan_Runner_Collect_DefaultLocale,
  Lib_I18n_ContentScan_Runner_Collect_Descriptors,
  Lib_I18n_ContentScan_Runner_Collect_Entries,
  Lib_I18n_ContentScan_Runner_Collect_Exists,
  Lib_I18n_ContentScan_Runner_Collect_FilePath,
  Lib_I18n_ContentScan_Runner_Collect_Files,
  Lib_I18n_ContentScan_Runner_Collect_Id,
  Lib_I18n_ContentScan_Runner_Collect_Input,
  Lib_I18n_ContentScan_Runner_Collect_InstanceTag,
  Lib_I18n_ContentScan_Runner_Collect_IsDefaultLocale,
  Lib_I18n_ContentScan_Runner_Collect_Label,
  Lib_I18n_ContentScan_Runner_Collect_Locales,
  Lib_I18n_ContentScan_Runner_Collect_LocalizationDir,
  Lib_I18n_ContentScan_Runner_Collect_PerLocale,
  Lib_I18n_ContentScan_Runner_Collect_PluginId,
  Lib_I18n_ContentScan_Runner_Collect_Present,
  Lib_I18n_ContentScan_Runner_Collect_Returns,
  Lib_I18n_ContentScan_Runner_Collect_Short,
  Lib_I18n_ContentScan_Runner_Collect_SiteDir,
  Lib_I18n_ContentScan_Runner_Collect_SourceDir,
  Lib_I18n_ContentScan_Runner_Collect_SourceExists,
  Lib_I18n_ContentScan_Runner_Collect_Sources,
  Lib_I18n_ContentScan_Runner_Collect_SubPaths,
  Lib_I18n_ContentScan_Runner_Collect_VersionPrefix,
  Lib_I18n_ContentScan_Runner_Collect_VersionSegment,
  Lib_I18n_ContentScan_Runner_FileExists_FilePath,
  Lib_I18n_ContentScan_Runner_FileExists_Returns,
  Lib_I18n_ContentScan_Runner_Scan_Base,
  Lib_I18n_ContentScan_Runner_Scan_DefaultLocale,
  Lib_I18n_ContentScan_Runner_Scan_Descriptors,
  Lib_I18n_ContentScan_Runner_Scan_I18n,
  Lib_I18n_ContentScan_Runner_Scan_Locales,
  Lib_I18n_ContentScan_Runner_Scan_Options,
  Lib_I18n_ContentScan_Runner_Scan_Plugins,
  Lib_I18n_ContentScan_Runner_Scan_RequestedLocale,
  Lib_I18n_ContentScan_Runner_Scan_Returns,
  Lib_I18n_ContentScan_Runner_Scan_SiteDir,
} from '../../types/lib/i18n/content-scan.d.ts';

/**
 * Lib - I18n - Content Scan - Known Plugins.
 *
 * The three first-party content plugins a Nova site uses. Each maps a source
 * directory to its localized copies under `i18n/<locale>/<plugin>`; only docs
 * nests its files under a version segment (`current` plus any frozen versions).
 *
 * @since 0.21.0
 */
const knownPlugins: Lib_I18n_ContentScan_KnownPlugins = [
  {
    name: 'docusaurus-plugin-content-docs',
    short: 'docs',
    defaultPath: 'docs',
    versioned: true,
  },
  {
    name: 'docusaurus-plugin-content-blog',
    short: 'blog',
    defaultPath: 'blog',
    versioned: false,
  },
  {
    name: 'docusaurus-plugin-content-pages',
    short: 'pages',
    defaultPath: 'src/pages',
    versioned: false,
  },
];

/**
 * Lib - I18n - Content Scan.
 *
 * Scans a site's Markdown content (docs, blog, pages) and reports, per locale,
 * which source files carry a translated copy. Every configured plugin instance
 * and versioned docs tree contributes its own sources from that plugin's options.
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * Lib - I18n - Content Scan - Scan.
   *
   * Loads the site context, builds the content descriptors from every first-party
   * plugin instance, then collects which locales carry a translated copy of each
   * source file.
   *
   * @param {Lib_I18n_ContentScan_Runner_Scan_Options} options - Options.
   *
   * @returns {Lib_I18n_ContentScan_Runner_Scan_Returns}
   *
   * @since 0.21.0
   */
  public static async scan(options: Lib_I18n_ContentScan_Runner_Scan_Options): Lib_I18n_ContentScan_Runner_Scan_Returns {
    const requestedLocale: Lib_I18n_ContentScan_Runner_Scan_RequestedLocale = options['locale'];
    const siteDir: Lib_I18n_ContentScan_Runner_Scan_SiteDir = await fs.realpath(process.cwd());
    const base: Lib_I18n_ContentScan_Runner_Scan_Base = await loadContext({ siteDir });
    const i18n: Lib_I18n_ContentScan_Runner_Scan_I18n = base['i18n'];
    const defaultLocale: Lib_I18n_ContentScan_Runner_Scan_DefaultLocale = i18n['defaultLocale'];
    const locales: Lib_I18n_ContentScan_Runner_Scan_Locales = (requestedLocale !== undefined) ? [requestedLocale] : [...i18n['locales']];
    const plugins: Lib_I18n_ContentScan_Runner_Scan_Plugins = await initPlugins(base);
    const descriptors: Lib_I18n_ContentScan_Runner_Scan_Descriptors = await Runner.buildDescriptors(siteDir, plugins);

    return await Runner.collect({
      siteDir,
      descriptors,
      locales,
      defaultLocale,
    });
  }

  /**
   * Lib - I18n - Content Scan - Build Descriptors.
   *
   * Resolves one content descriptor per source tree: every configured instance of
   * each first-party plugin, plus, for docs, the `current` version and every frozen
   * `version-*` directory found under the instance's versioned-docs folder.
   *
   * @param {Lib_I18n_ContentScan_Runner_BuildDescriptors_SiteDir} siteDir - Site dir.
   * @param {Lib_I18n_ContentScan_Runner_BuildDescriptors_Plugins} plugins - Plugins.
   *
   * @returns {Lib_I18n_ContentScan_Runner_BuildDescriptors_Returns}
   *
   * @since 0.21.0
   */
  public static async buildDescriptors(siteDir: Lib_I18n_ContentScan_Runner_BuildDescriptors_SiteDir, plugins: Lib_I18n_ContentScan_Runner_BuildDescriptors_Plugins): Lib_I18n_ContentScan_Runner_BuildDescriptors_Returns {
    const descriptors: Lib_I18n_ContentScan_Runner_BuildDescriptors_Descriptors = [];

    // Match every configured instance of each first-party content plugin, not only
    // the first, so multi-instance sites (e.g. a second docs plugin) are covered.
    for (const known of knownPlugins) {
      const matches: Lib_I18n_ContentScan_Runner_BuildDescriptors_Matches = plugins.filter((item) => item['name'] === known['name']);

      for (const plugin of matches) {
        const pluginOptions: Lib_I18n_ContentScan_Runner_BuildDescriptors_PluginOptions = plugin['options'];
        const rawPluginId: Lib_I18n_ContentScan_Runner_BuildDescriptors_RawPluginId = pluginOptions['id'];
        const pluginId: Lib_I18n_ContentScan_Runner_BuildDescriptors_PluginId = (typeof rawPluginId === 'string') ? rawPluginId : 'default';
        const rawSourcePath: Lib_I18n_ContentScan_Runner_BuildDescriptors_RawSourcePath = pluginOptions['path'];
        const sourcePath: Lib_I18n_ContentScan_Runner_BuildDescriptors_SourcePath = (typeof rawSourcePath === 'string') ? rawSourcePath : known['defaultPath'];

        // Blog and pages carry no versioning, so one root descriptor covers them.
        if (known['versioned'] === false) {
          descriptors.push({
            pluginName: known['name'],
            pluginId,
            short: known['short'],
            sourceDir: join(siteDir, sourcePath),
            versionSegment: null,
          });

          continue;
        }

        // Docs: the live `current` version sits at the plugin's source root.
        descriptors.push({
          pluginName: known['name'],
          pluginId,
          short: known['short'],
          sourceDir: join(siteDir, sourcePath),
          versionSegment: 'current',
        });

        const versionedDir: Lib_I18n_ContentScan_Runner_BuildDescriptors_VersionedDir = join(siteDir, (pluginId === 'default') ? 'versioned_docs' : `${pluginId}_versioned_docs`);
        const versionedExists: Lib_I18n_ContentScan_Runner_BuildDescriptors_VersionedExists = await Runner.fileExists(versionedDir);

        // A docs instance with no versioned tree contributes only its current version.
        if (versionedExists === false) {
          continue;
        }

        const versionDirents: Lib_I18n_ContentScan_Runner_BuildDescriptors_VersionDirents = await fs.readdir(versionedDir, { withFileTypes: true });

        // Each `version-*` subdirectory is a frozen docs version with its own tree.
        for (const dirent of versionDirents) {
          const isVersionDir: Lib_I18n_ContentScan_Runner_BuildDescriptors_IsVersionDir = dirent.isDirectory() === true && dirent['name'].startsWith('version-') === true;

          if (isVersionDir === false) {
            continue;
          }

          descriptors.push({
            pluginName: known['name'],
            pluginId,
            short: known['short'],
            sourceDir: join(versionedDir, dirent['name']),
            versionSegment: dirent['name'],
          });
        }
      }
    }

    return descriptors;
  }

  /**
   * Lib - I18n - Content Scan - Collect.
   *
   * Globs each descriptor's Markdown sources (skipping any whose directory is
   * absent), assigns each file a stable unique id, then checks every non-default
   * locale's `i18n` tree for a translated copy of each source file.
   *
   * @param {Lib_I18n_ContentScan_Runner_Collect_Input} input - Input.
   *
   * @returns {Lib_I18n_ContentScan_Runner_Collect_Returns}
   *
   * @since 0.21.0
   */
  public static async collect(input: Lib_I18n_ContentScan_Runner_Collect_Input): Lib_I18n_ContentScan_Runner_Collect_Returns {
    const siteDir: Lib_I18n_ContentScan_Runner_Collect_SiteDir = input['siteDir'];
    const descriptors: Lib_I18n_ContentScan_Runner_Collect_Descriptors = input['descriptors'];
    const locales: Lib_I18n_ContentScan_Runner_Collect_Locales = input['locales'];
    const defaultLocale: Lib_I18n_ContentScan_Runner_Collect_DefaultLocale = input['defaultLocale'];
    const entries: Lib_I18n_ContentScan_Runner_Collect_Entries = [];

    // Glob each descriptor's Markdown sources; a missing directory is skipped.
    for (const descriptor of descriptors) {
      const sourceDir: Lib_I18n_ContentScan_Runner_Collect_SourceDir = descriptor['sourceDir'];
      const sourceExists: Lib_I18n_ContentScan_Runner_Collect_SourceExists = await Runner.fileExists(sourceDir);

      if (sourceExists === false) {
        continue;
      }

      const short: Lib_I18n_ContentScan_Runner_Collect_Short = descriptor['short'];
      const pluginId: Lib_I18n_ContentScan_Runner_Collect_PluginId = descriptor['pluginId'];
      const versionSegment: Lib_I18n_ContentScan_Runner_Collect_VersionSegment = descriptor['versionSegment'];
      const files: Lib_I18n_ContentScan_Runner_Collect_Files = await Globby(['**/*.{md,mdx}'], {
        cwd: sourceDir,
        ignore: [...GlobExcludeDefault],
      });
      const instanceTag: Lib_I18n_ContentScan_Runner_Collect_InstanceTag = (pluginId !== 'default') ? `(${pluginId})` : '';
      const label: Lib_I18n_ContentScan_Runner_Collect_Label = `${short}${instanceTag}`;

      for (const file of files) {
        // Docs nest translations under a version segment; blog and pages sit at the
        // plugin root.
        const subPaths: Lib_I18n_ContentScan_Runner_Collect_SubPaths = (versionSegment !== null) ? [
          versionSegment,
          file,
        ] : [file];
        const versionPrefix: Lib_I18n_ContentScan_Runner_Collect_VersionPrefix = (versionSegment !== null && versionSegment !== 'current') ? `${versionSegment}/` : '';
        const id: Lib_I18n_ContentScan_Runner_Collect_Id = `${label}/${versionPrefix}${file}`;

        entries.push({
          id,
          pluginName: descriptor['pluginName'],
          pluginId,
          subPaths,
        });
      }
    }

    const sources: Lib_I18n_ContentScan_Runner_Collect_Sources = entries.map((entry) => entry['id']);
    const perLocale: Lib_I18n_ContentScan_Runner_Collect_PerLocale = [];

    // Check each locale's tree for a translated copy of every source file.
    for (const locale of locales) {
      const isDefaultLocale: Lib_I18n_ContentScan_Runner_Collect_IsDefaultLocale = locale === defaultLocale;

      // The default locale is the content source, so presence is resolved later.
      if (isDefaultLocale === true) {
        perLocale.push({
          locale,
          isDefaultLocale: true,
          present: new Set(),
        });

        continue;
      }

      const localizationDir: Lib_I18n_ContentScan_Runner_Collect_LocalizationDir = join(siteDir, 'i18n', locale);
      const present: Lib_I18n_ContentScan_Runner_Collect_Present = new Set();

      for (const entry of entries) {
        const filePath: Lib_I18n_ContentScan_Runner_Collect_FilePath = getPluginI18nPath({
          localizationDir,
          pluginName: entry['pluginName'],
          pluginId: entry['pluginId'],
          subPaths: entry['subPaths'],
        });
        const exists: Lib_I18n_ContentScan_Runner_Collect_Exists = await Runner.fileExists(filePath);

        if (exists === true) {
          present.add(entry['id']);
        }
      }

      perLocale.push({
        locale,
        isDefaultLocale: false,
        present,
      });
    }

    return {
      sources,
      perLocale,
    };
  }

  /**
   * Lib - I18n - Content Scan - File Exists.
   *
   * Wraps `fs.access` in a boolean check so a missing source directory or an
   * untranslated file resolves to false rather than throwing.
   *
   * @param {Lib_I18n_ContentScan_Runner_FileExists_FilePath} filePath - File path.
   *
   * @private
   *
   * @returns {Lib_I18n_ContentScan_Runner_FileExists_Returns}
   *
   * @since 0.21.0
   */
  private static async fileExists(filePath: Lib_I18n_ContentScan_Runner_FileExists_FilePath): Lib_I18n_ContentScan_Runner_FileExists_Returns {
    try {
      await fs.access(filePath);

      return true;
    } catch {
      return false;
    }
  }
}
