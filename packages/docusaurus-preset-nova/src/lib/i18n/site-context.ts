import { promises as fs } from 'node:fs';
import { dirname } from 'node:path';

import { initPlugins } from '@docusaurus/core/lib/server/plugins/init.js';
import { loadContext } from '@docusaurus/core/lib/server/site.js';
import {
  loadPluginsDefaultCodeTranslationMessages,
  readCodeTranslationFileContent,
} from '@docusaurus/core/lib/server/translations/translations.js';
import { extractSiteSourceCodeTranslations } from '@docusaurus/core/lib/server/translations/translationsExtractor.js';
import {
  getPluginI18nPath,
  globTranslatableSourceFiles,
} from '@docusaurus/utils';
import { Joi } from '@docusaurus/utils-validation';

import type {
  Lib_I18n_SiteContext_Runner_Gather_Base,
  Lib_I18n_SiteContext_Runner_Gather_DefaultLocale,
  Lib_I18n_SiteContext_Runner_Gather_ExtraPaths,
  Lib_I18n_SiteContext_Runner_Gather_FullExtract,
  Lib_I18n_SiteContext_Runner_Gather_I18n,
  Lib_I18n_SiteContext_Runner_Gather_LiveSiteKeys,
  Lib_I18n_SiteContext_Runner_Gather_LocaleResult,
  Lib_I18n_SiteContext_Runner_Gather_Locales,
  Lib_I18n_SiteContext_Runner_Gather_Options,
  Lib_I18n_SiteContext_Runner_Gather_PerLocale,
  Lib_I18n_SiteContext_Runner_Gather_Plugins,
  Lib_I18n_SiteContext_Runner_Gather_RequestedLocale,
  Lib_I18n_SiteContext_Runner_Gather_Returns,
  Lib_I18n_SiteContext_Runner_Gather_SiteDir,
  Lib_I18n_SiteContext_Runner_Gather_SiteExtract,
  Lib_I18n_SiteContext_Runner_Gather_ThemeCommonDir,
  Lib_I18n_SiteContext_Runner_Gather_ThemeDefaultEntry,
  Lib_I18n_SiteContext_Runner_Gather_ThemeDefaults,
  Lib_I18n_SiteContext_Runner_Gather_ThemeLiveKeys,
  Lib_I18n_SiteContext_Runner_GatherLocale_AreaFiles,
  Lib_I18n_SiteContext_Runner_GatherLocale_Base,
  Lib_I18n_SiteContext_Runner_GatherLocale_BasePlugins,
  Lib_I18n_SiteContext_Runner_GatherLocale_Content,
  Lib_I18n_SiteContext_Runner_GatherLocale_Context,
  Lib_I18n_SiteContext_Runner_GatherLocale_DefaultLocale,
  Lib_I18n_SiteContext_Runner_GatherLocale_ExistingArea,
  Lib_I18n_SiteContext_Runner_GatherLocale_ExistingCode,
  Lib_I18n_SiteContext_Runner_GatherLocale_ExistingCodeRaw,
  Lib_I18n_SiteContext_Runner_GatherLocale_IsCurrentLocale,
  Lib_I18n_SiteContext_Runner_GatherLocale_IsDefaultLocale,
  Lib_I18n_SiteContext_Runner_GatherLocale_Locale,
  Lib_I18n_SiteContext_Runner_GatherLocale_LocalizationDir,
  Lib_I18n_SiteContext_Runner_GatherLocale_Plugins,
  Lib_I18n_SiteContext_Runner_GatherLocale_Registry,
  Lib_I18n_SiteContext_Runner_GatherLocale_Returns,
  Lib_I18n_SiteContext_Runner_GatherLocale_SiteDir,
  Lib_I18n_SiteContext_Runner_GatherLocale_Theme,
  Lib_I18n_SiteContext_Runner_LoadAreaFiles_Content,
  Lib_I18n_SiteContext_Runner_LoadAreaFiles_GetTranslationFiles,
  Lib_I18n_SiteContext_Runner_LoadAreaFiles_LoadContent,
  Lib_I18n_SiteContext_Runner_LoadAreaFiles_Returns,
  Lib_I18n_SiteContext_Runner_LoadAreaFiles_Theme,
  Lib_I18n_SiteContext_Runner_ReadAreaFile_AreaPath,
  Lib_I18n_SiteContext_Runner_ReadAreaFile_FilePath,
  Lib_I18n_SiteContext_Runner_ReadAreaFile_LocalizationDir,
  Lib_I18n_SiteContext_Runner_ReadAreaFile_Parsed,
  Lib_I18n_SiteContext_Runner_ReadAreaFile_Raw,
  Lib_I18n_SiteContext_Runner_ReadAreaFile_ReadError,
  Lib_I18n_SiteContext_Runner_ReadAreaFile_ReadErrorCode,
  Lib_I18n_SiteContext_Runner_ReadAreaFile_Returns,
  Lib_I18n_SiteContext_Runner_ResolveLocales_I18n,
  Lib_I18n_SiteContext_Runner_ResolveLocales_RequestedLocale,
  Lib_I18n_SiteContext_Runner_ResolveLocales_Returns,
} from '../../types/lib/i18n/site-context.d.ts';

/**
 * Lib - I18n - Site Context - Area File Schema.
 *
 * Mirrors the Joi schema Docusaurus applies to `code.json` so a theme-nova area
 * bundle is validated identically - each value must carry a required string
 * `message` and optional string `description` - and fails closed when malformed.
 *
 * @since 0.21.0
 */
const areaFileSchema = Joi.object()
  .pattern(Joi.string(), Joi.object({
    message: Joi.string().allow('').required(),
    description: Joi.string().optional(),
  }))
  .required();

/**
 * Lib - I18n - Site Context.
 *
 * Adapter over the Docusaurus server internals. Loads the consumer site
 * context per locale, runs the two source-code extractions, and reads the
 * on-disk translation tree into a `GatherResult` for the pure engine.
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * Lib - I18n - Site Context - Gather.
   *
   * Loads the default-locale context, computes the locale-independent live key
   * sets from the site-only and full extractions, then gathers per-locale state.
   *
   * @param {Lib_I18n_SiteContext_Runner_Gather_Options} options - Options.
   *
   * @returns {Lib_I18n_SiteContext_Runner_Gather_Returns}
   *
   * @since 0.21.0
   */
  public static async gather(options: Lib_I18n_SiteContext_Runner_Gather_Options): Lib_I18n_SiteContext_Runner_Gather_Returns {
    const siteDir: Lib_I18n_SiteContext_Runner_Gather_SiteDir = await fs.realpath(process.cwd());
    const base: Lib_I18n_SiteContext_Runner_Gather_Base = await loadContext({ siteDir });
    const i18n: Lib_I18n_SiteContext_Runner_Gather_I18n = base['i18n'];
    const defaultLocale: Lib_I18n_SiteContext_Runner_Gather_DefaultLocale = i18n['defaultLocale'];
    const requestedLocale: Lib_I18n_SiteContext_Runner_Gather_RequestedLocale = options['locale'];
    const locales: Lib_I18n_SiteContext_Runner_Gather_Locales = Runner.resolveLocales(i18n, requestedLocale);
    const plugins: Lib_I18n_SiteContext_Runner_Gather_Plugins = await initPlugins(base);

    // Site-only scan yields the pure user layer; full scan surfaces theme.* ids.
    const siteExtract: Lib_I18n_SiteContext_Runner_Gather_SiteExtract = await extractSiteSourceCodeTranslations({
      siteDir,
      plugins: [],
    });

    // Theme-nova renders upstream theme-common components whose `translate()`
    // calls live outside the scanned theme paths, so include theme-common's
    // compiled source in the full scan. Without it, ids like
    // `theme.common.skipToMainContent` never surface as live and their default
    // English copies would be misread as data-loss orphans.
    const themeCommonDir: Lib_I18n_SiteContext_Runner_Gather_ThemeCommonDir = dirname(require.resolve('@docusaurus/theme-common'));
    const extraPaths: Lib_I18n_SiteContext_Runner_Gather_ExtraPaths = await globTranslatableSourceFiles([themeCommonDir]);
    const fullExtract: Lib_I18n_SiteContext_Runner_Gather_FullExtract = await extractSiteSourceCodeTranslations({
      siteDir,
      plugins,
      extraSourceCodeFilePaths: extraPaths,
    });
    const liveSiteKeys: Lib_I18n_SiteContext_Runner_Gather_LiveSiteKeys = new Set(Object.keys(siteExtract));
    const themeLiveKeys: Lib_I18n_SiteContext_Runner_Gather_ThemeLiveKeys = new Set(Object.keys(fullExtract).filter((key) => liveSiteKeys.has(key) === false));

    // The default English source of every live theme id, used as the default
    // locale's redundancy oracle because `@docusaurus/theme-translations` ships
    // no `en` bundle so the per-locale registry is empty for the default locale.
    const themeDefaults: Lib_I18n_SiteContext_Runner_Gather_ThemeDefaults = {};

    for (const key of themeLiveKeys) {
      const themeDefaultEntry: Lib_I18n_SiteContext_Runner_Gather_ThemeDefaultEntry = fullExtract[key];

      if (themeDefaultEntry !== undefined) {
        Reflect.set(themeDefaults, key, themeDefaultEntry['message']);
      }
    }

    const perLocale: Lib_I18n_SiteContext_Runner_Gather_PerLocale = [];

    // Registry and area bundles are locale-specific, so gather per locale.
    for (const locale of locales) {
      const localeResult: Lib_I18n_SiteContext_Runner_Gather_LocaleResult = await Runner.gatherLocale(siteDir, base, plugins, locale, defaultLocale);

      perLocale.push(localeResult);
    }

    return {
      siteDir,
      defaultLocale,
      locales,
      liveSiteKeys,
      themeLiveKeys,
      siteExtract,
      themeDefaults,
      perLocale,
    };
  }

  /**
   * Lib - I18n - Site Context - Gather Locale.
   *
   * Resolves the locale-specific context, default-message registry, live area
   * bundles, and on-disk `code.json` plus area files for one locale.
   *
   * @param {Lib_I18n_SiteContext_Runner_GatherLocale_SiteDir}       siteDir       - Site dir.
   * @param {Lib_I18n_SiteContext_Runner_GatherLocale_Base}          base          - Base.
   * @param {Lib_I18n_SiteContext_Runner_GatherLocale_BasePlugins}   basePlugins   - Base plugins.
   * @param {Lib_I18n_SiteContext_Runner_GatherLocale_Locale}        locale        - Locale.
   * @param {Lib_I18n_SiteContext_Runner_GatherLocale_DefaultLocale} defaultLocale - Default locale.
   *
   * @private
   *
   * @returns {Lib_I18n_SiteContext_Runner_GatherLocale_Returns}
   *
   * @since 0.21.0
   */
  private static async gatherLocale(siteDir: Lib_I18n_SiteContext_Runner_GatherLocale_SiteDir, base: Lib_I18n_SiteContext_Runner_GatherLocale_Base, basePlugins: Lib_I18n_SiteContext_Runner_GatherLocale_BasePlugins, locale: Lib_I18n_SiteContext_Runner_GatherLocale_Locale, defaultLocale: Lib_I18n_SiteContext_Runner_GatherLocale_DefaultLocale): Lib_I18n_SiteContext_Runner_GatherLocale_Returns {
    const isCurrentLocale: Lib_I18n_SiteContext_Runner_GatherLocale_IsCurrentLocale = locale === base['i18n']['currentLocale'];
    const context: Lib_I18n_SiteContext_Runner_GatherLocale_Context = (isCurrentLocale === true) ? base : await loadContext({
      siteDir,
      locale,
    });
    const plugins: Lib_I18n_SiteContext_Runner_GatherLocale_Plugins = (isCurrentLocale === true) ? basePlugins : await initPlugins(context);
    const registry: Lib_I18n_SiteContext_Runner_GatherLocale_Registry = await loadPluginsDefaultCodeTranslationMessages(plugins);
    const theme: Lib_I18n_SiteContext_Runner_GatherLocale_Theme = plugins.find((plugin) => plugin['name'] === 'docusaurus-theme-nova');
    const areaFiles: Lib_I18n_SiteContext_Runner_GatherLocale_AreaFiles = await Runner.loadAreaFiles(theme);
    const localizationDir: Lib_I18n_SiteContext_Runner_GatherLocale_LocalizationDir = context['localizationDir'];
    const existingCodeRaw: Lib_I18n_SiteContext_Runner_GatherLocale_ExistingCodeRaw = await readCodeTranslationFileContent({ localizationDir });
    const existingCode: Lib_I18n_SiteContext_Runner_GatherLocale_ExistingCode = (existingCodeRaw !== undefined) ? existingCodeRaw : {};
    const existingArea: Lib_I18n_SiteContext_Runner_GatherLocale_ExistingArea = new Map();

    // Read the on-disk copy of every live area bundle for this locale.
    for (const file of areaFiles) {
      const content: Lib_I18n_SiteContext_Runner_GatherLocale_Content = await Runner.readAreaFile(localizationDir, file['path']);

      existingArea.set(file['path'], content);
    }

    const isDefaultLocale: Lib_I18n_SiteContext_Runner_GatherLocale_IsDefaultLocale = locale === defaultLocale;

    return {
      locale,
      localizationDir,
      isDefaultLocale,
      registry,
      areaFiles,
      existingCode,
      existingArea,
    };
  }

  /**
   * Lib - I18n - Site Context - Load Area Files.
   *
   * Runs the theme plugin's own `getTranslationFiles` (loading its content first
   * when present) so the extracted area bundles match a build exactly.
   *
   * @param {Lib_I18n_SiteContext_Runner_LoadAreaFiles_Theme} theme - Theme.
   *
   * @private
   *
   * @returns {Lib_I18n_SiteContext_Runner_LoadAreaFiles_Returns}
   *
   * @since 0.21.0
   */
  private static async loadAreaFiles(theme: Lib_I18n_SiteContext_Runner_LoadAreaFiles_Theme): Lib_I18n_SiteContext_Runner_LoadAreaFiles_Returns {
    if (theme === undefined) {
      return [];
    }

    const getTranslationFiles: Lib_I18n_SiteContext_Runner_LoadAreaFiles_GetTranslationFiles = theme['getTranslationFiles'];

    if (getTranslationFiles === undefined) {
      return [];
    }

    const loadContent: Lib_I18n_SiteContext_Runner_LoadAreaFiles_LoadContent = theme['loadContent'];
    const content: Lib_I18n_SiteContext_Runner_LoadAreaFiles_Content = (loadContent !== undefined) ? await loadContent() : undefined;

    return await getTranslationFiles({ content });
  }

  /**
   * Lib - I18n - Site Context - Read Area File.
   *
   * Reads and parses a single `docusaurus-theme-nova/<area>.json` bundle,
   * returning an empty object when the file is absent and rethrowing otherwise.
   *
   * @param {Lib_I18n_SiteContext_Runner_ReadAreaFile_LocalizationDir} localizationDir - Localization dir.
   * @param {Lib_I18n_SiteContext_Runner_ReadAreaFile_AreaPath}        areaPath        - Area path.
   *
   * @returns {Lib_I18n_SiteContext_Runner_ReadAreaFile_Returns}
   *
   * @since 0.21.0
   */
  public static async readAreaFile(localizationDir: Lib_I18n_SiteContext_Runner_ReadAreaFile_LocalizationDir, areaPath: Lib_I18n_SiteContext_Runner_ReadAreaFile_AreaPath): Lib_I18n_SiteContext_Runner_ReadAreaFile_Returns {
    const filePath: Lib_I18n_SiteContext_Runner_ReadAreaFile_FilePath = getPluginI18nPath({
      localizationDir,
      pluginName: 'docusaurus-theme-nova',
      pluginId: 'default',
      subPaths: [`${areaPath}.json`],
    });

    try {
      const raw: Lib_I18n_SiteContext_Runner_ReadAreaFile_Raw = await fs.readFile(filePath, 'utf8');
      const parsed: Lib_I18n_SiteContext_Runner_ReadAreaFile_Parsed = JSON.parse(raw) as Lib_I18n_SiteContext_Runner_ReadAreaFile_Parsed;

      // Validate the bundle shape exactly as Docusaurus validates `code.json`, so
      // a malformed entry fails the run closed rather than being rebuilt to `{}`.
      Joi.attempt(parsed, areaFileSchema, {
        abortEarly: false,
        allowUnknown: false,
        convert: false,
      });

      return parsed;
    } catch (error) {
      const readError: Lib_I18n_SiteContext_Runner_ReadAreaFile_ReadError = error;
      const readErrorCode: Lib_I18n_SiteContext_Runner_ReadAreaFile_ReadErrorCode = (readError instanceof Error && 'code' in readError) ? readError.code : undefined;

      if (readErrorCode === 'ENOENT') {
        return {};
      }

      throw readError;
    }
  }

  /**
   * Lib - I18n - Site Context - Resolve Locales.
   *
   * Resolves the locales to reconcile: every configured locale by default, or a
   * single requested locale after validating it is configured.
   *
   * @param {Lib_I18n_SiteContext_Runner_ResolveLocales_I18n}            i18n            - I18n.
   * @param {Lib_I18n_SiteContext_Runner_ResolveLocales_RequestedLocale} requestedLocale - Requested locale.
   *
   * @private
   *
   * @returns {Lib_I18n_SiteContext_Runner_ResolveLocales_Returns}
   *
   * @since 0.21.0
   */
  private static resolveLocales(i18n: Lib_I18n_SiteContext_Runner_ResolveLocales_I18n, requestedLocale: Lib_I18n_SiteContext_Runner_ResolveLocales_RequestedLocale): Lib_I18n_SiteContext_Runner_ResolveLocales_Returns {
    if (requestedLocale === undefined) {
      return [...i18n['locales']];
    }

    if (i18n['locales'].includes(requestedLocale) === false) {
      throw new Error(`Unknown locale "${requestedLocale}". Configured locales: ${i18n['locales'].join(', ')}.`);
    }

    return [requestedLocale];
  }
}
