import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { generateIconModule } from './generate.js';

import type {
  Plugins_Icons_Index_BuildWatchPaths_Paths,
  Plugins_Icons_Index_BuildWatchPaths_Returns,
  Plugins_Icons_Index_BuildWatchPaths_SiteDirectory,
  Plugins_Icons_Index_Icons_Context,
  Plugins_Icons_Index_Icons_GeneratedDirectory,
  Plugins_Icons_Index_Icons_GeneratedPath,
  Plugins_Icons_Index_Icons_Options,
  Plugins_Icons_Index_Icons_Returns,
  Plugins_Icons_Index_Icons_Safelist,
  Plugins_Icons_Index_Icons_SiteDirectory,
  Plugins_Icons_Index_Icons_ThemeConfig,
  Plugins_Icons_Index_WriteRegistry_GeneratedDirectory,
  Plugins_Icons_Index_WriteRegistry_GeneratedPath,
  Plugins_Icons_Index_WriteRegistry_ModuleOptions,
  Plugins_Icons_Index_WriteRegistry_Returns,
  Plugins_Icons_Index_WriteRegistry_Source,
} from '../../types/plugins/icons/index.d.ts';

const watchDirectories = [
  'docs',
  'blog',
  'src',
];

/**
 * Plugins - Icons.
 *
 * Docusaurus plugin that discovers every Iconify identifier a site references
 * and generates a client module registering only those icons, so whole
 * Iconify collections are never bundled into the browser entry.
 *
 * @param {Plugins_Icons_Index_Icons_Context} context - Context.
 * @param {Plugins_Icons_Index_Icons_Options} options - Options.
 *
 * @returns {Plugins_Icons_Index_Icons_Returns}
 *
 * @since 0.19.0
 */
export function icons(context: Plugins_Icons_Index_Icons_Context, options: Plugins_Icons_Index_Icons_Options): Plugins_Icons_Index_Icons_Returns {
  const siteDirectory: Plugins_Icons_Index_Icons_SiteDirectory = context['siteDir'];
  const themeConfig: Plugins_Icons_Index_Icons_ThemeConfig = context['siteConfig']['themeConfig'];
  const safelist: Plugins_Icons_Index_Icons_Safelist = options['iconSafelist'] ?? [];
  const generatedDirectory: Plugins_Icons_Index_Icons_GeneratedDirectory = resolve(siteDirectory, '.docusaurus/docusaurus-preset-nova-icons');
  const generatedPath: Plugins_Icons_Index_Icons_GeneratedPath = resolve(generatedDirectory, 'generated-icons.js');

  // Generate eagerly so the aliased module exists before webpack resolves it.
  writeRegistry(generatedDirectory, generatedPath, {
    siteDir: siteDirectory,
    themeConfig,
    safelist,
  });

  return {
    name: '@cbnventures/docusaurus-preset-nova-icons',
    getPathsToWatch() {
      return buildWatchPaths(siteDirectory);
    },
    loadContent() {
      // Re-scan on content change so newly referenced icons appear in dev.
      writeRegistry(generatedDirectory, generatedPath, {
        siteDir: siteDirectory,
        themeConfig,
        safelist,
      });

      return;
    },
    configureWebpack() {
      return {
        resolve: {
          alias: {
            '@nova-generated-icons$': generatedPath,
          },
        },
      };
    },
  };
}

/**
 * Plugins - Icons - Write Registry.
 *
 * Generates the tree-shaken icon module source and writes it to the site's
 * Docusaurus data directory for webpack to bundle through the alias.
 *
 * @param {Plugins_Icons_Index_WriteRegistry_GeneratedDirectory} generatedDirectory - Generated directory.
 * @param {Plugins_Icons_Index_WriteRegistry_GeneratedPath}      generatedPath      - Generated path.
 * @param {Plugins_Icons_Index_WriteRegistry_ModuleOptions}      moduleOptions      - Module options.
 *
 * @returns {Plugins_Icons_Index_WriteRegistry_Returns}
 *
 * @since 0.19.0
 */
function writeRegistry(generatedDirectory: Plugins_Icons_Index_WriteRegistry_GeneratedDirectory, generatedPath: Plugins_Icons_Index_WriteRegistry_GeneratedPath, moduleOptions: Plugins_Icons_Index_WriteRegistry_ModuleOptions): Plugins_Icons_Index_WriteRegistry_Returns {
  const source: Plugins_Icons_Index_WriteRegistry_Source = generateIconModule(moduleOptions);

  mkdirSync(generatedDirectory, { recursive: true });

  writeFileSync(generatedPath, source, 'utf-8');

  return;
}

/**
 * Plugins - Icons - Build Watch Paths.
 *
 * Builds the content globs the plugin watches in dev so the icon module is
 * regenerated whenever docs, blog, or source files change.
 *
 * @param {Plugins_Icons_Index_BuildWatchPaths_SiteDirectory} siteDirectory - Site directory.
 *
 * @returns {Plugins_Icons_Index_BuildWatchPaths_Returns}
 *
 * @since 0.19.0
 */
function buildWatchPaths(siteDirectory: Plugins_Icons_Index_BuildWatchPaths_SiteDirectory): Plugins_Icons_Index_BuildWatchPaths_Returns {
  const paths: Plugins_Icons_Index_BuildWatchPaths_Paths = [];

  for (const directory of watchDirectories) {
    paths.push(`${join(siteDirectory, directory)}/**/*.{md,mdx,ts,tsx,js,jsx}`);
  }

  return paths;
}

export default icons;
