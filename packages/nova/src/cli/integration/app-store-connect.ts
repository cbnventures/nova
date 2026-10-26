import { promises as fs } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

import prompts from 'prompts';
import { parse as parseYaml } from 'yaml';

import { Runner as AppStoreConnect } from '../../api/app-store-connect.js';
import {
  collectAssetTargets,
  collectMetadataTargets,
  confirmPlan,
  parseCommaSeparated,
  reportPlan,
  requireArray,
  requireObject,
  requireString,
  resolveWorkspace,
} from '../../lib/integration.js';
import { pathExists } from '../../lib/utility.js';
import { Logger } from '../../toolkit/index.js';

import type {
  Cli_Integration_AppStoreConnect_Runner_CreateClient_Credentials,
  Cli_Integration_AppStoreConnect_Runner_CreateClient_Options,
  Cli_Integration_AppStoreConnect_Runner_CreateClient_Returns,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_App,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AppId,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AssetLibrary,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AssetLibraryId,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AssetsDirectory,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Buffers,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Client,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_CollectedTargets,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Context,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_ContextCache,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_FileName,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Image,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Lines,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Options,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_PlacementType,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_PlannedFile,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Returns,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Targets,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_UploadedFile,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_WorkspaceContext,
  Cli_Integration_AppStoreConnect_Runner_FileBuffer_Buffer,
  Cli_Integration_AppStoreConnect_Runner_FileBuffer_Buffers,
  Cli_Integration_AppStoreConnect_Runner_FileBuffer_FileName,
  Cli_Integration_AppStoreConnect_Runner_FileBuffer_Index,
  Cli_Integration_AppStoreConnect_Runner_FileBuffer_Returns,
  Cli_Integration_AppStoreConnect_Runner_FilterTargets_MatchesLocale,
  Cli_Integration_AppStoreConnect_Runner_FilterTargets_MatchesPlatform,
  Cli_Integration_AppStoreConnect_Runner_FilterTargets_Options,
  Cli_Integration_AppStoreConnect_Runner_FilterTargets_Returns,
  Cli_Integration_AppStoreConnect_Runner_FilterTargets_SelectedLocales,
  Cli_Integration_AppStoreConnect_Runner_FilterTargets_SelectedPlatforms,
  Cli_Integration_AppStoreConnect_Runner_FilterTargets_Target,
  Cli_Integration_AppStoreConnect_Runner_FilterTargets_Targets,
  Cli_Integration_AppStoreConnect_Runner_Metadata_App,
  Cli_Integration_AppStoreConnect_Runner_Metadata_AppId,
  Cli_Integration_AppStoreConnect_Runner_Metadata_Client,
  Cli_Integration_AppStoreConnect_Runner_Metadata_CollectedTargets,
  Cli_Integration_AppStoreConnect_Runner_Metadata_Context,
  Cli_Integration_AppStoreConnect_Runner_Metadata_Lines,
  Cli_Integration_AppStoreConnect_Runner_Metadata_LocalizationId,
  Cli_Integration_AppStoreConnect_Runner_Metadata_MetadataDirectory,
  Cli_Integration_AppStoreConnect_Runner_Metadata_Options,
  Cli_Integration_AppStoreConnect_Runner_Metadata_Returns,
  Cli_Integration_AppStoreConnect_Runner_Metadata_Targets,
  Cli_Integration_AppStoreConnect_Runner_Metadata_WorkspaceContext,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_BaseSettings,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_BundleIdentifier,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Options,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_ParsedProject,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Project,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_ProjectFile,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_ProjectFilePath,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Returns,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Settings,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Target,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_TargetBaseSettings,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Targets,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_TargetSettings,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_TargetValues,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Version,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Workspace,
  Cli_Integration_AppStoreConnect_Runner_ReadFiles_Returns,
  Cli_Integration_AppStoreConnect_Runner_ReadFiles_Target,
  Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Directory,
  Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Entries,
  Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_KeyId,
  Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_PrefixLength,
  Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Returns,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Client,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Context,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_ExistingPlacements,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_ImageIds,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_LocalizationId,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementGroup,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementIds,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementResponses,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementType,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Query,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Response,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Returns,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_App,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Cache,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_CachedContext,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Client,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Context,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Key,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Locale,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Platform,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Returns,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Version,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_ApiPlatform,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_App,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_Attributes,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_Client,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_Locale,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_Localization,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_Localizations,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_Platform,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_Returns,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_Version,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_VersionId,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_VersionResource,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Answers,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_CandidateGroups,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Candidates,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Credentials,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Directories,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Options,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_PrivateKey,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Returns,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_SelectedCandidate,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_SelectedPath,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Attributes,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Client,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Group,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Groups,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Keys,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Query,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Resource,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Resources,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Response,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Returns,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Value,
  Cli_Integration_AppStoreConnect_Runner_ResourceId_Name,
  Cli_Integration_AppStoreConnect_Runner_ResourceId_Resource,
  Cli_Integration_AppStoreConnect_Runner_ResourceId_Returns,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_App,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_AppId,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_AssetLibrary,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_AssetLibraryId,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Attributes,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Buffers,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Client,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_CollectedTargets,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_ContextCache,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_CreatedSet,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_DisplayType,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_DuoContext,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_DuoTargets,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_FileBuffers,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Files,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_ImageIds,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Images,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Lines,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_LocalizationId,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Options,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_PlacementGroup,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Returns,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_ScreenshotsDirectory,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Set,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_SetId,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Sets,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_StandardContext,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_StandardTargets,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Targets,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_UploadIds,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Uploads,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_WorkspaceContext,
  Cli_Integration_AppStoreConnect_Runner_ValidateCreativeTargets_Returns,
  Cli_Integration_AppStoreConnect_Runner_ValidateCreativeTargets_Targets,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotTargets_IsDuo,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotTargets_Returns,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotTargets_Targets,
  Cli_Integration_AppStoreConnect_Runner_ValidateTargets_Returns,
  Cli_Integration_AppStoreConnect_Runner_ValidateTargets_Targets,
  Cli_Integration_AppStoreConnect_Runner_ValidateTargets_UnsupportedPlatforms,
} from '../../types/cli/integration/app-store-connect.d.ts';

/**
 * CLI - Integration - App Store Connect - Metadata Fields.
 *
 * Limits patches to the localized version fields exposed by Apple's current
 * App Store Connect API instead of forwarding arbitrary local JSON keys.
 *
 * @since 0.34.0
 */
const metadataFields = [
  'description',
  'keywords',
  'marketingUrl',
  'promotionalText',
  'supportUrl',
  'whatsNew',
];

/**
 * CLI - Integration - App Store Connect - Platforms.
 *
 * Maps Nova's stable project-platform vocabulary to Apple's API enumeration
 * without exposing vendor casing throughout the command implementation.
 *
 * @since 0.34.0
 */
const platforms = new Map([
  [
    'ios',
    'IOS',
  ],
  [
    'macos',
    'MAC_OS',
  ],
  [
    'visionos',
    'VISION_OS',
  ],
]);

/**
 * CLI - Integration - App Store Connect - Screenshot Display Types.
 *
 * Associates developer-facing target folders with Apple's supported standard
 * screenshot-set names; iPhone Duo uses the asset-library placement workflow.
 *
 * @since 0.34.0
 */
const screenshotDisplayTypes = new Map([
  [
    'apple-watch',
    'APP_WATCH_SERIES_10',
  ],
  [
    'ipad',
    'APP_IPAD_PRO_3GEN_129',
  ],
  [
    'iphone',
    'APP_IPHONE_67',
  ],
  [
    'mac',
    'APP_DESKTOP',
  ],
  [
    'vision-pro',
    'APP_APPLE_VISION_PRO',
  ],
]);

/**
 * CLI - Integration - App Store Connect - Creative Placement Types.
 *
 * Preserves Apple's public placement vocabulary in both folder names and API
 * mutations so Nova does not invent alternative names for vendor concepts.
 *
 * @since 0.34.0
 */
const creativePlacementTypes = new Map([
  [
    'product-page-header',
    'PRODUCT_PAGE_HEADER_ASSET',
  ],
  [
    'search-results',
    'APP_STORE_SEARCH_RESULTS_ASSET',
  ],
]);

/**
 * CLI - Integration - App Store Connect.
 *
 * Publishes developer-owned metadata and images from deterministic local asset
 * folders through Apple's official API and credential discovery conventions.
 *
 * @since 0.34.0
 */
export class Runner {
  /**
   * CLI - Integration - App Store Connect - Metadata.
   *
   * Validates localized metadata, presents the complete patch plan, and updates
   * only fields explicitly supplied in each local JSON file.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_Metadata_Options} options - Options.
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_Metadata_Returns}
   *
   * @since 0.34.0
   */
  public static async metadata(options: Cli_Integration_AppStoreConnect_Runner_Metadata_Options): Cli_Integration_AppStoreConnect_Runner_Metadata_Returns {
    const workspaceContext: Cli_Integration_AppStoreConnect_Runner_Metadata_WorkspaceContext = await Runner.prepareWorkspace(options);
    const metadataDirectory: Cli_Integration_AppStoreConnect_Runner_Metadata_MetadataDirectory = join(process.cwd(), 'assets', 'app-store-connect', workspaceContext['workspace']['name'], 'metadata');
    const collectedTargets: Cli_Integration_AppStoreConnect_Runner_Metadata_CollectedTargets = await collectMetadataTargets(metadataDirectory, metadataFields);
    const targets: Cli_Integration_AppStoreConnect_Runner_Metadata_Targets = Runner.filterTargets(collectedTargets, options);
    const lines: Cli_Integration_AppStoreConnect_Runner_Metadata_Lines = targets.map((target) => `${target['platform']}/${target['locale']}: ${Object.keys(target['attributes']).join(', ')}`);

    Runner.validateTargets(targets);

    reportPlan(`Update App Store Connect metadata for ${workspaceContext['bundleIdentifier']} ${workspaceContext['version']}:`, lines);

    if (await confirmPlan(options['dryRun'] === true, options['nonInteractive'] === true, options['yes'] === true) === false || options['dryRun'] === true) {
      return;
    }

    const client: Cli_Integration_AppStoreConnect_Runner_Metadata_Client = await Runner.createClient(options);
    const app: Cli_Integration_AppStoreConnect_Runner_Metadata_App = await client.findApp(workspaceContext['bundleIdentifier']);
    const appId: Cli_Integration_AppStoreConnect_Runner_Metadata_AppId = Runner.resourceId(app, 'App');

    await Promise.all(targets.map(async (target) => {
      const context: Cli_Integration_AppStoreConnect_Runner_Metadata_Context = await Runner.resolveContext(client, app, workspaceContext['version'], target['platform'], target['locale']);
      const localizationId: Cli_Integration_AppStoreConnect_Runner_Metadata_LocalizationId = Runner.resourceId(context['localization'], `${target['locale']} localization`);

      await client.updateLocalization(localizationId, target['attributes']);

      return;
    }));

    Logger.info(`Updated ${targets.length} App Store Connect metadata target(s) for app ${appId}.`);

    return;
  }

  /**
   * CLI - Integration - App Store Connect - Screenshots.
   *
   * Replaces only locally supplied screenshot targets, preserving deterministic
   * filename order and Apple's separate iPhone Duo placement workflow.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_Screenshots_Options} options - Options.
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_Screenshots_Returns}
   *
   * @since 0.34.0
   */
  public static async screenshots(options: Cli_Integration_AppStoreConnect_Runner_Screenshots_Options): Cli_Integration_AppStoreConnect_Runner_Screenshots_Returns {
    const workspaceContext: Cli_Integration_AppStoreConnect_Runner_Screenshots_WorkspaceContext = await Runner.prepareWorkspace(options);
    const screenshotsDirectory: Cli_Integration_AppStoreConnect_Runner_Screenshots_ScreenshotsDirectory = join(process.cwd(), 'assets', 'app-store-connect', workspaceContext['workspace']['name'], 'screenshots');
    const collectedTargets: Cli_Integration_AppStoreConnect_Runner_Screenshots_CollectedTargets = await collectAssetTargets(screenshotsDirectory, {
      extensions: [
        '.jpeg',
        '.jpg',
        '.png',
      ],
      positioned: true,
    });
    const targets: Cli_Integration_AppStoreConnect_Runner_Screenshots_Targets = Runner.filterTargets(collectedTargets, options);
    const lines: Cli_Integration_AppStoreConnect_Runner_Screenshots_Lines = targets.map((target) => `${target['relativePath']}: ${target['files'].length} ordered image(s)`);

    Runner.validateTargets(targets);

    Runner.validateScreenshotTargets(targets);

    reportPlan(`Replace App Store Connect screenshots for ${workspaceContext['bundleIdentifier']} ${workspaceContext['version']}:`, lines);

    if (await confirmPlan(options['dryRun'] === true, options['nonInteractive'] === true, options['yes'] === true) === false || options['dryRun'] === true) {
      return;
    }

    const client: Cli_Integration_AppStoreConnect_Runner_Screenshots_Client = await Runner.createClient(options);
    const app: Cli_Integration_AppStoreConnect_Runner_Screenshots_App = await client.findApp(workspaceContext['bundleIdentifier']);
    const appId: Cli_Integration_AppStoreConnect_Runner_Screenshots_AppId = Runner.resourceId(app, 'App');
    const contextCache: Cli_Integration_AppStoreConnect_Runner_Screenshots_ContextCache = new Map();
    const duoTargets: Cli_Integration_AppStoreConnect_Runner_Screenshots_DuoTargets = targets.filter((target) => target['target'] === 'iphone-duo');
    const standardTargets: Cli_Integration_AppStoreConnect_Runner_Screenshots_StandardTargets = targets.filter((target) => target['target'] !== 'iphone-duo');

    await Promise.all(standardTargets.map(async (target) => {
      const standardContext: Cli_Integration_AppStoreConnect_Runner_Screenshots_StandardContext = await Runner.resolveCachedContext(contextCache, client, app, workspaceContext['version'], target['platform'], target['locale']);
      const localizationId: Cli_Integration_AppStoreConnect_Runner_Screenshots_LocalizationId = Runner.resourceId(standardContext['localization'], `${target['locale']} localization`);
      const displayType: Cli_Integration_AppStoreConnect_Runner_Screenshots_DisplayType = screenshotDisplayTypes.get(target['target']);

      if (displayType === undefined) {
        throw new Error(`Unsupported App Store screenshot target: ${target['target']}.`);
      }

      const sets: Cli_Integration_AppStoreConnect_Runner_Screenshots_Sets = await client.listScreenshotSets(localizationId);
      const set: Cli_Integration_AppStoreConnect_Runner_Screenshots_Set = sets.find((candidate) => {
        const attributes: Cli_Integration_AppStoreConnect_Runner_Screenshots_Attributes = requireObject(candidate['attributes'], 'Screenshot set attributes');

        return attributes['screenshotDisplayType'] === displayType;
      });

      if (set !== undefined) {
        await client.deleteResource('appScreenshotSets', Runner.resourceId(set, `${displayType} screenshot set`));
      }

      const createdSet: Cli_Integration_AppStoreConnect_Runner_Screenshots_CreatedSet = await client.createScreenshotSet(localizationId, displayType);
      const setId: Cli_Integration_AppStoreConnect_Runner_Screenshots_SetId = Runner.resourceId(createdSet, `${displayType} screenshot set`);
      const files: Cli_Integration_AppStoreConnect_Runner_Screenshots_Files = Runner.readFiles(target);
      const fileBuffers: Cli_Integration_AppStoreConnect_Runner_Screenshots_FileBuffers = await files;
      const uploads: Cli_Integration_AppStoreConnect_Runner_Screenshots_Uploads = await Promise.all(target['files'].map((file, index) => client.uploadScreenshot(setId, file['fileName'], Runner.fileBuffer(fileBuffers, index, file['fileName']))));
      const uploadIds: Cli_Integration_AppStoreConnect_Runner_Screenshots_UploadIds = uploads.map((upload) => Runner.resourceId(upload, 'Uploaded screenshot'));

      await client.reorderScreenshots(setId, uploadIds);

      return;
    }));

    if (duoTargets.length > 0) {
      const assetLibrary: Cli_Integration_AppStoreConnect_Runner_Screenshots_AssetLibrary = await client.findAssetLibrary(appId);
      const assetLibraryId: Cli_Integration_AppStoreConnect_Runner_Screenshots_AssetLibraryId = Runner.resourceId(assetLibrary, 'App asset library');
      const placementGroup: Cli_Integration_AppStoreConnect_Runner_Screenshots_PlacementGroup = await Runner.resolveDuoPlacementGroup(client);

      await Promise.all(duoTargets.map(async (target) => {
        const duoContext: Cli_Integration_AppStoreConnect_Runner_Screenshots_DuoContext = await Runner.resolveCachedContext(contextCache, client, app, workspaceContext['version'], target['platform'], target['locale']);
        const buffers: Cli_Integration_AppStoreConnect_Runner_Screenshots_Buffers = await Runner.readFiles(target);
        const images: Cli_Integration_AppStoreConnect_Runner_Screenshots_Images = await Promise.all(target['files'].map((file, index) => client.uploadAssetLibraryImage(assetLibraryId, 'APP_SCREENSHOTS_AND_PREVIEWS', `${workspaceContext['workspace']['name']} ${target['locale']} iPhone Duo ${file['position']}`, file['fileName'], Runner.fileBuffer(buffers, index, file['fileName']))));
        const imageIds: Cli_Integration_AppStoreConnect_Runner_Screenshots_ImageIds = images.map((image) => Runner.resourceId(image, 'Uploaded iPhone Duo screenshot'));

        await Runner.replacePlacement(client, duoContext, 'APP_SCREENSHOT', placementGroup, imageIds);

        return;
      }));
    }

    Logger.info(`Updated ${targets.length} App Store Connect screenshot target(s).`);

    return;
  }

  /**
   * CLI - Integration - App Store Connect - Creative Assets.
   *
   * Replaces explicitly supplied product-page header and search-result assets
   * through Apple's placement-based App Asset Library API.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Options} options - Options.
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Returns}
   *
   * @since 0.34.0
   */
  public static async creativeAssets(options: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Options): Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Returns {
    const workspaceContext: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_WorkspaceContext = await Runner.prepareWorkspace(options);
    const assetsDirectory: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AssetsDirectory = join(process.cwd(), 'assets', 'app-store-connect', workspaceContext['workspace']['name'], 'creative-assets');
    const collectedTargets: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_CollectedTargets = await collectAssetTargets(assetsDirectory, {
      extensions: [
        '.jpeg',
        '.jpg',
        '.png',
      ],
      positioned: false,
    });
    const targets: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Targets = Runner.filterTargets(collectedTargets, options);
    const lines: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Lines = targets.map((target) => {
      const plannedFile: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_PlannedFile = target['files'][0];
      const fileName: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_FileName = (plannedFile === undefined) ? 'missing' : plannedFile['fileName'];

      return `${target['relativePath']}: ${fileName}`;
    });

    Runner.validateTargets(targets);

    Runner.validateCreativeTargets(targets);

    reportPlan(`Replace App Store Connect creative assets for ${workspaceContext['bundleIdentifier']} ${workspaceContext['version']}:`, lines);

    if (await confirmPlan(options['dryRun'] === true, options['nonInteractive'] === true, options['yes'] === true) === false || options['dryRun'] === true) {
      return;
    }

    const client: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Client = await Runner.createClient(options);
    const app: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_App = await client.findApp(workspaceContext['bundleIdentifier']);
    const appId: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AppId = Runner.resourceId(app, 'App');
    const assetLibrary: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AssetLibrary = await client.findAssetLibrary(appId);
    const assetLibraryId: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AssetLibraryId = Runner.resourceId(assetLibrary, 'App asset library');
    const contextCache: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_ContextCache = new Map();

    await Promise.all(targets.map(async (target) => {
      const context: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Context = await Runner.resolveCachedContext(contextCache, client, app, workspaceContext['version'], target['platform'], target['locale']);
      const placementType: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_PlacementType = creativePlacementTypes.get(target['target']);

      if (placementType === undefined) {
        throw new Error(`Unsupported App Store creative asset target: ${target['target']}.`);
      }

      const uploadedFile: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_UploadedFile = target['files'][0];

      if (uploadedFile === undefined) {
        throw new Error(`Creative asset target is empty: ${target['relativePath']}.`);
      }

      const buffers: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Buffers = await Runner.readFiles(target);
      const image: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Image = await client.uploadAssetLibraryImage(assetLibraryId, 'CREATIVE_ASSETS', `${workspaceContext['workspace']['name']} ${target['locale']} ${target['target']}`, uploadedFile['fileName'], Runner.fileBuffer(buffers, 0, uploadedFile['fileName']));

      await Runner.replacePlacement(client, context, placementType, 'DEFAULT_PROFILE', [Runner.resourceId(image, 'Uploaded creative asset')]);

      return;
    }));

    Logger.info(`Updated ${targets.length} App Store Connect creative asset target(s).`);

    return;
  }

  /**
   * CLI - Integration - App Store Connect - Prepare Workspace.
   *
   * Resolves one Apple workspace and derives its bundle identifier and marketing
   * version from XcodeGen unless the developer supplied explicit overrides.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Options} options - Options.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Returns}
   *
   * @since 0.34.0
   */
  private static async prepareWorkspace(options: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Options): Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Returns {
    const workspace: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Workspace = await resolveWorkspace(options, ['project.yml']);
    let bundleIdentifier: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_BundleIdentifier = options['bundleId'];
    let version: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Version = options['version'];

    if (bundleIdentifier === undefined || version === undefined) {
      const projectFilePath: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_ProjectFilePath = join(workspace['absolutePath'], 'project.yml');
      const projectFile: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_ProjectFile = await fs.readFile(projectFilePath, 'utf-8');
      const parsedProject: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_ParsedProject = parseYaml(projectFile);
      const project: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Project = requireObject(parsedProject, 'Apple project.yml');
      const settings: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Settings = requireObject(project['settings'], 'Apple project settings');
      const baseSettings: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_BaseSettings = requireObject(settings['base'], 'Apple project base settings');
      const targets: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Targets = requireObject(project['targets'], 'Apple project targets');
      const targetValues: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_TargetValues = Object.values(targets);

      version ??= (typeof baseSettings['MARKETING_VERSION'] === 'string') ? baseSettings['MARKETING_VERSION'] : undefined;

      for (const targetValue of targetValues) {
        const target: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Target = requireObject(targetValue, 'Apple project target');

        if (target['type'] !== 'application') {
          continue;
        }

        const targetSettings: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_TargetSettings = requireObject(target['settings'], 'Apple application target settings');
        const targetBaseSettings: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_TargetBaseSettings = requireObject(targetSettings['base'], 'Apple application base settings');

        bundleIdentifier ??= (typeof targetBaseSettings['PRODUCT_BUNDLE_IDENTIFIER'] === 'string') ? targetBaseSettings['PRODUCT_BUNDLE_IDENTIFIER'] : undefined;

        break;
      }
    }

    if (bundleIdentifier === undefined || bundleIdentifier === '') {
      throw new Error('Unable to derive the App Store bundle identifier. Pass --bundle-id explicitly.');
    }

    if (version === undefined || version === '') {
      throw new Error('Unable to derive the App Store marketing version. Pass --version explicitly.');
    }

    return {
      bundleIdentifier,
      version,
      workspace,
    };
  }

  /**
   * CLI - Integration - App Store Connect - Filter Targets.
   *
   * Applies optional platform and locale selections after validating the whole
   * local asset structure, then rejects filters that select nothing.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_FilterTargets_Targets<Target>} targets - Targets.
   * @param {Cli_Integration_AppStoreConnect_Runner_FilterTargets_Options}         options - Options.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_FilterTargets_Returns<Target>}
   *
   * @since 0.34.0
   */
  private static filterTargets<Target extends Cli_Integration_AppStoreConnect_Runner_FilterTargets_Target>(targets: Cli_Integration_AppStoreConnect_Runner_FilterTargets_Targets<Target>, options: Cli_Integration_AppStoreConnect_Runner_FilterTargets_Options): Cli_Integration_AppStoreConnect_Runner_FilterTargets_Returns<Target> {
    const selectedPlatforms: Cli_Integration_AppStoreConnect_Runner_FilterTargets_SelectedPlatforms = parseCommaSeparated(options['platforms']);
    const selectedLocales: Cli_Integration_AppStoreConnect_Runner_FilterTargets_SelectedLocales = parseCommaSeparated(options['locales']);

    return targets.filter((target) => {
      const matchesPlatform: Cli_Integration_AppStoreConnect_Runner_FilterTargets_MatchesPlatform = selectedPlatforms === undefined || selectedPlatforms.includes(target['platform']);
      const matchesLocale: Cli_Integration_AppStoreConnect_Runner_FilterTargets_MatchesLocale = selectedLocales === undefined || selectedLocales.includes(target['locale']);

      return matchesPlatform && matchesLocale;
    });
  }

  /**
   * CLI - Integration - App Store Connect - Validate Targets.
   *
   * Rejects empty filtered plans and platform folders Nova cannot translate to
   * App Store Connect, keeping validation ahead of authentication and writes.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_Metadata_Targets | Cli_Integration_AppStoreConnect_Runner_Screenshots_Targets} targets - Targets.
   *
   * @private
   *
   * @returns {void}
   *
   * @since 0.34.0
   */
  private static validateTargets(targets: Cli_Integration_AppStoreConnect_Runner_ValidateTargets_Targets): Cli_Integration_AppStoreConnect_Runner_ValidateTargets_Returns {
    if (targets.length === 0) {
      throw new Error('The selected App Store Connect filters matched no local targets.');
    }

    const unsupportedPlatforms: Cli_Integration_AppStoreConnect_Runner_ValidateTargets_UnsupportedPlatforms = [...new Set(targets.map((target) => target['platform']).filter((platform) => platforms.has(platform) === false))];

    if (unsupportedPlatforms.length > 0) {
      throw new Error(`Unsupported App Store platform folder(s): ${unsupportedPlatforms.join(', ')}.`);
    }

    return;
  }

  /**
   * CLI - Integration - App Store Connect - Validate Screenshot Targets.
   *
   * Accepts Apple's standard screenshot folders plus the placement-based iPhone
   * Duo target and rejects mismatched platform and device combinations.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotTargets_Targets} targets - Targets.
   *
   * @private
   *
   * @returns {void}
   *
   * @since 0.34.0
   */
  private static validateScreenshotTargets(targets: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotTargets_Targets): Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotTargets_Returns {
    for (const target of targets) {
      const isDuo: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotTargets_IsDuo = target['target'] === 'iphone-duo';

      if (isDuo === false && screenshotDisplayTypes.has(target['target']) === false) {
        throw new Error(`Unsupported App Store screenshot target: ${target['target']}.`);
      }

      if (target['platform'] === 'macos' && target['target'] !== 'mac') {
        throw new Error(`macos screenshots must use the mac target: ${target['relativePath']}.`);
      }

      if (target['platform'] !== 'macos' && target['target'] === 'mac') {
        throw new Error(`The mac screenshot target belongs under macos: ${target['relativePath']}.`);
      }
    }

    return;
  }

  /**
   * CLI - Integration - App Store Connect - Validate Creative Targets.
   *
   * Requires one image per official creative placement so replacement semantics
   * remain deterministic and do not depend on directory enumeration order.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ValidateCreativeTargets_Targets} targets - Targets.
   *
   * @private
   *
   * @returns {void}
   *
   * @since 0.34.0
   */
  private static validateCreativeTargets(targets: Cli_Integration_AppStoreConnect_Runner_ValidateCreativeTargets_Targets): Cli_Integration_AppStoreConnect_Runner_ValidateCreativeTargets_Returns {
    for (const target of targets) {
      if (creativePlacementTypes.has(target['target']) === false) {
        throw new Error(`Unsupported App Store creative asset target: ${target['target']}.`);
      }

      if (target['files'].length !== 1) {
        throw new Error(`App Store creative asset targets require exactly one image: ${target['relativePath']}.`);
      }
    }

    return;
  }

  /**
   * CLI - Integration - App Store Connect - Create Client.
   *
   * Delays private-key discovery until after plan confirmation, ensuring dry runs
   * never require or read credentials from the developer's machine.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_CreateClient_Options} options - Options.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_CreateClient_Returns}
   *
   * @since 0.34.0
   */
  private static async createClient(options: Cli_Integration_AppStoreConnect_Runner_CreateClient_Options): Cli_Integration_AppStoreConnect_Runner_CreateClient_Returns {
    const credentials: Cli_Integration_AppStoreConnect_Runner_CreateClient_Credentials = await Runner.resolveCredentials(options);

    return new AppStoreConnect(credentials);
  }

  /**
   * CLI - Integration - App Store Connect - Resolve Credentials.
   *
   * Discovers Apple private keys only in the official Transporter locations and
   * keeps key material out of Nova configuration, environment variables, and logs.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Options} options - Options.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Returns}
   *
   * @since 0.34.0
   */
  private static async resolveCredentials(options: Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Options): Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Returns {
    const directories: Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Directories = [
      join(process.cwd(), 'private_keys'),
      join(homedir(), 'private_keys'),
      join(homedir(), '.private_keys'),
      join(homedir(), '.appstoreconnect', 'private_keys'),
    ];
    const candidateGroups: Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_CandidateGroups = await Promise.all(directories.map((directory) => Runner.readKeyDirectory(directory)));
    let candidates: Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Candidates = candidateGroups.flat();

    if (options['keyId'] !== undefined) {
      candidates = candidates.filter((candidate) => candidate['keyId'] === options['keyId']);
    }

    if (candidates.length === 0) {
      throw new Error('No matching App Store Connect .p8 key was found in Apple\'s official private-key search paths.');
    }

    let selectedCandidate: Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_SelectedCandidate = candidates[0];

    if (candidates.length > 1 && options['keyId'] === undefined) {
      if (options['nonInteractive'] === true) {
        throw new Error('Multiple App Store Connect keys were found. Pass --key-id in non-interactive mode.');
      }

      const answers: Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Answers = await prompts({
        type: 'select',
        name: 'path',
        message: 'App Store Connect API key:',
        choices: candidates.map((candidate) => ({
          title: `${candidate['keyId']} (${candidate['path']})`,
          value: candidate['path'],
        })),
      }, {
        onCancel: () => false,
      });
      const selectedPath: Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_SelectedPath = answers['path'];

      selectedCandidate = candidates.find((candidate) => candidate['path'] === selectedPath);
    }

    if (selectedCandidate === undefined) {
      throw new Error('App Store Connect key selection was cancelled.');
    }

    const privateKey: Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_PrivateKey = await fs.readFile(selectedCandidate['path'], 'utf-8');
    const credentials: Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Credentials = {
      keyId: selectedCandidate['keyId'],
      privateKey,
    };

    if (options['issuerId'] !== undefined) {
      Reflect.set(credentials, 'issuerId', options['issuerId']);
    }

    return credentials;
  }

  /**
   * CLI - Integration - App Store Connect - Read Key Directory.
   *
   * Converts recognized AuthKey and ApiKey filenames into safe key candidates
   * while ignoring unrelated files in Apple's credential search directories.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Directory} directory - Directory.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Returns}
   *
   * @since 0.34.0
   */
  private static async readKeyDirectory(directory: Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Directory): Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Returns {
    if (await pathExists(directory) === false) {
      return [];
    }

    const entries: Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Entries = await fs.readdir(directory, { withFileTypes: true });

    return entries.filter((entry) => (
      entry.isFile()
      && entry.name.endsWith('.p8') === true
      && (
        entry.name.startsWith('AuthKey_') === true
        || entry.name.startsWith('ApiKey_') === true
      )
    )).map((entry) => {
      const prefixLength: Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_PrefixLength = (entry.name.startsWith('AuthKey_') === true) ? 'AuthKey_'.length : 'ApiKey_'.length;
      const keyId: Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_KeyId = entry.name.slice(prefixLength, -'.p8'.length);

      return {
        keyId,
        path: join(directory, entry.name),
      };
    }).filter((candidate) => candidate['keyId'] !== '');
  }

  /**
   * CLI - Integration - App Store Connect - Resolve Cached Context.
   *
   * Shares one in-flight platform and locale lookup across concurrent asset
   * targets so a missing localization is created exactly once.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Cache}    cache    - Cache.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Client}   client   - Client.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_App}      app      - App.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Version}  version  - Version.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Platform} platform - Platform.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Locale}   locale   - Locale.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Returns}
   *
   * @since 0.34.0
   */
  private static resolveCachedContext(cache: Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Cache, client: Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Client, app: Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_App, version: Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Version, platform: Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Platform, locale: Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Locale): Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Returns {
    const key: Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Key = `${platform}:${locale}`;
    const cachedContext: Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_CachedContext = cache.get(key);

    if (cachedContext !== undefined) {
      return cachedContext;
    }

    const context: Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Context = Runner.resolveContext(client, app, version, platform, locale);

    cache.set(key, context);

    return context;
  }

  /**
   * CLI - Integration - App Store Connect - Resolve Context.
   *
   * Resolves an editable platform version and its locale, creating only the
   * missing localization explicitly represented by a local target.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveContext_Client}   client   - Client.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveContext_App}      app      - App.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveContext_Version}  version  - Version.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveContext_Platform} platform - Platform.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveContext_Locale}   locale   - Locale.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ResolveContext_Returns}
   *
   * @since 0.34.0
   */
  private static async resolveContext(client: Cli_Integration_AppStoreConnect_Runner_ResolveContext_Client, app: Cli_Integration_AppStoreConnect_Runner_ResolveContext_App, version: Cli_Integration_AppStoreConnect_Runner_ResolveContext_Version, platform: Cli_Integration_AppStoreConnect_Runner_ResolveContext_Platform, locale: Cli_Integration_AppStoreConnect_Runner_ResolveContext_Locale): Cli_Integration_AppStoreConnect_Runner_ResolveContext_Returns {
    const apiPlatform: Cli_Integration_AppStoreConnect_Runner_ResolveContext_ApiPlatform = platforms.get(platform);

    if (apiPlatform === undefined) {
      throw new Error(`Unsupported App Store platform: ${platform}.`);
    }

    const versionResource: Cli_Integration_AppStoreConnect_Runner_ResolveContext_VersionResource = await client.findVersion(Runner.resourceId(app, 'App'), version, apiPlatform);
    const versionId: Cli_Integration_AppStoreConnect_Runner_ResolveContext_VersionId = Runner.resourceId(versionResource, `${platform} version`);
    const localizations: Cli_Integration_AppStoreConnect_Runner_ResolveContext_Localizations = await client.listLocalizations(versionId);
    let localization: Cli_Integration_AppStoreConnect_Runner_ResolveContext_Localization = localizations.find((candidate) => {
      const attributes: Cli_Integration_AppStoreConnect_Runner_ResolveContext_Attributes = requireObject(candidate['attributes'], 'Localization attributes');

      return attributes['locale'] === locale;
    });

    localization ??= await client.createLocalization(versionId, locale);

    return {
      localization,
      version: versionResource,
    };
  }

  /**
   * CLI - Integration - App Store Connect - Resolve Duo Placement Group.
   *
   * Reads Apple's live reference data instead of hard-coding a private placement
   * profile identifier for the iPhone Duo screenshot class.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Client} client - Client.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Returns}
   *
   * @since 0.34.0
   */
  private static async resolveDuoPlacementGroup(client: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Client): Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Returns {
    const query: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Query = new URLSearchParams({
      'fields[appAssetLibraryRefData]': 'placementProfileGroups',
    });
    const response: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Response = await client.request(`/v1/appAssetLibraryRefData?${query.toString()}`);

    if (response === undefined) {
      throw new Error('App Asset Library reference data was empty.');
    }

    const resources: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Resources = requireArray(response['data'], 'App Asset Library reference data').map((resource) => requireObject(resource, 'Reference data resource'));

    if (resources.length !== 1) {
      throw new Error(`Expected one App Asset Library reference resource; found ${resources.length}.`);
    }

    const resource: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Resource = resources[0];

    if (resource === undefined) {
      throw new Error('App Asset Library reference data did not include its expected resource.');
    }

    const attributes: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Attributes = requireObject(resource['attributes'], 'Reference data attributes');
    const groups: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Groups = requireArray(attributes['placementProfileGroups'], 'Reference placement profile groups');
    const group: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Group = groups.map((candidate) => requireObject(candidate, 'Placement profile group')).find((candidate) => candidate['platform'] === 'IPHONE_APP_STORE' && candidate['displayClassId'] === 'IPHONE_DUO');

    if (group === undefined) {
      throw new Error('Apple reference data does not advertise an iPhone Duo placement group.');
    }

    const keys: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Keys = [
      'placementProfileGroupId',
      'placementProfileGroup',
      'placementGroup',
      'groupId',
      'id',
    ];

    for (const key of keys) {
      const value: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Value = group[key];

      if (typeof value === 'string' && value !== '') {
        return value;
      }
    }

    throw new Error('Unable to read the iPhone Duo placement-group identifier from Apple reference data.');
  }

  /**
   * CLI - Integration - App Store Connect - Replace Placement.
   *
   * Deletes placements only for the selected target, creates replacements in
   * local filename order, and submits an explicit ordering request when needed.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Client}         client         - Client.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Context}        context        - Context.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementType}  placementType  - Placement type.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementGroup} placementGroup - Placement group.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_ImageIds}       imageIds       - Image ids.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Returns}
   *
   * @since 0.34.0
   */
  private static async replacePlacement(client: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Client, context: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Context, placementType: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementType, placementGroup: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementGroup, imageIds: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_ImageIds): Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Returns {
    const localizationId: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_LocalizationId = Runner.resourceId(context['localization'], 'App Store localization');
    const query: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Query = new URLSearchParams({
      'filter[placementGroup]': placementGroup,
      'filter[placementType]': placementType,
      'limit': '50',
    });
    const response: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Response = await client.request(`/v1/appStoreVersionLocalizations/${localizationId}/placements?${query.toString()}`);
    const existingPlacements: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_ExistingPlacements = (response === undefined) ? [] : requireArray(response['data'], 'Existing asset placements').map((placement) => requireObject(placement, 'Asset placement'));

    await Promise.all(existingPlacements.map((placement) => client.deleteResource('appAssetLibraryPlacements', Runner.resourceId(placement, 'Asset placement'))));

    const placementResponses: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementResponses = await Promise.all(imageIds.map((imageId) => client.request('/v1/appAssetLibraryPlacements', {
      body: {
        data: {
          attributes: {
            placementGroup,
            placementType,
          },
          relationships: {
            appStoreVersionLocalization: {
              data: {
                id: localizationId,
                type: 'appStoreVersionLocalizations',
              },
            },
            image: {
              data: {
                id: imageId,
                type: 'appAssetLibraryImages',
              },
            },
          },
          type: 'appAssetLibraryPlacements',
        },
      },
      expectedStatuses: [201],
      method: 'POST',
    })));
    const placementIds: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementIds = placementResponses.map((placementResponse) => {
      if (placementResponse === undefined) {
        throw new Error('Creating an App Asset Library placement returned no resource.');
      }

      return Runner.resourceId(requireObject(placementResponse['data'], 'Created asset placement'), 'Created asset placement');
    });

    if (placementIds.length > 1) {
      await client.request('/v1/appAssetLibraryPlacementOrderingRequests', {
        body: {
          data: {
            attributes: {
              placementGroup,
            },
            relationships: {
              appStoreVersionLocalization: {
                data: {
                  id: localizationId,
                  type: 'appStoreVersionLocalizations',
                },
              },
              orderedPlacements: {
                data: placementIds.map((placementId) => ({
                  id: placementId,
                  type: 'appAssetLibraryPlacements',
                })),
              },
            },
            type: 'appAssetLibraryPlacementOrderingRequests',
          },
        },
        expectedStatuses: [201],
        method: 'POST',
      });
    }

    return;
  }

  /**
   * CLI - Integration - App Store Connect - Resource ID.
   *
   * Extracts one required JSON API resource identifier with a contextual error
   * before that value is inserted into another request path or relationship.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ResourceId_Resource} resource - Resource.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResourceId_Name}     name     - Name.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ResourceId_Returns}
   *
   * @since 0.34.0
   */
  private static resourceId(resource: Cli_Integration_AppStoreConnect_Runner_ResourceId_Resource, name: Cli_Integration_AppStoreConnect_Runner_ResourceId_Name): Cli_Integration_AppStoreConnect_Runner_ResourceId_Returns {
    return requireString(resource['id'], `${name} ID`);
  }

  /**
   * CLI - Integration - App Store Connect - File Buffer.
   *
   * Pairs a validated local asset with its loaded bytes and refuses to replace
   * an impossible missing buffer with an empty upload.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_FileBuffer_Buffers}  buffers  - Buffers.
   * @param {Cli_Integration_AppStoreConnect_Runner_FileBuffer_Index}    index    - Index.
   * @param {Cli_Integration_AppStoreConnect_Runner_FileBuffer_FileName} fileName - File name.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_FileBuffer_Returns}
   *
   * @since 0.34.0
   */
  private static fileBuffer(buffers: Cli_Integration_AppStoreConnect_Runner_FileBuffer_Buffers, index: Cli_Integration_AppStoreConnect_Runner_FileBuffer_Index, fileName: Cli_Integration_AppStoreConnect_Runner_FileBuffer_FileName): Cli_Integration_AppStoreConnect_Runner_FileBuffer_Returns {
    const buffer: Cli_Integration_AppStoreConnect_Runner_FileBuffer_Buffer = buffers[index];

    if (buffer === undefined) {
      throw new Error(`Unable to read local asset bytes: ${fileName}`);
    }

    return buffer;
  }

  /**
   * CLI - Integration - App Store Connect - Read Files.
   *
   * Reads a validated target in deterministic order immediately before upload,
   * keeping local planning separate from credential access and remote mutation.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ReadFiles_Target} target - Target.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ReadFiles_Returns}
   *
   * @since 0.34.0
   */
  private static async readFiles(target: Cli_Integration_AppStoreConnect_Runner_ReadFiles_Target): Cli_Integration_AppStoreConnect_Runner_ReadFiles_Returns {
    return Promise.all(target['files'].map((file) => fs.readFile(file['filePath'])));
  }
}
