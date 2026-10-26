import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import { Runner as GooglePlayConsole } from '../../api/google-play-console.js';
import {
  collectAssetTargets,
  collectMetadataTargets,
  confirmPlan,
  parseCommaSeparated,
  reportPlan,
  resolveWorkspace,
} from '../../lib/integration.js';
import { Logger } from '../../toolkit/index.js';

import type {
  Cli_Integration_GooglePlayConsole_Runner_CreateClient_Context,
  Cli_Integration_GooglePlayConsole_Runner_CreateClient_Returns,
  Cli_Integration_GooglePlayConsole_Runner_FilterAssetTargets_Locales,
  Cli_Integration_GooglePlayConsole_Runner_FilterAssetTargets_Options,
  Cli_Integration_GooglePlayConsole_Runner_FilterAssetTargets_Returns,
  Cli_Integration_GooglePlayConsole_Runner_FilterAssetTargets_Targets,
  Cli_Integration_GooglePlayConsole_Runner_FilterMetadataTargets_Locales,
  Cli_Integration_GooglePlayConsole_Runner_FilterMetadataTargets_Options,
  Cli_Integration_GooglePlayConsole_Runner_FilterMetadataTargets_Returns,
  Cli_Integration_GooglePlayConsole_Runner_FilterMetadataTargets_Targets,
  Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_Client,
  Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_CollectedTargets,
  Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_Context,
  Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_Directory,
  Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_EditId,
  Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_File,
  Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_FileName,
  Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_Lines,
  Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_Options,
  Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_Returns,
  Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_Targets,
  Cli_Integration_GooglePlayConsole_Runner_Metadata_Client,
  Cli_Integration_GooglePlayConsole_Runner_Metadata_CollectedTargets,
  Cli_Integration_GooglePlayConsole_Runner_Metadata_Context,
  Cli_Integration_GooglePlayConsole_Runner_Metadata_Directory,
  Cli_Integration_GooglePlayConsole_Runner_Metadata_EditId,
  Cli_Integration_GooglePlayConsole_Runner_Metadata_Lines,
  Cli_Integration_GooglePlayConsole_Runner_Metadata_Options,
  Cli_Integration_GooglePlayConsole_Runner_Metadata_Returns,
  Cli_Integration_GooglePlayConsole_Runner_Metadata_Targets,
  Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_ApplicationIdLine,
  Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_ApplicationIdPrefix,
  Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_BuildFile,
  Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_BuildFilePath,
  Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_Lines,
  Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_Options,
  Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_PackageName,
  Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_Returns,
  Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_Workspace,
  Cli_Integration_GooglePlayConsole_Runner_ReplaceImages_Client,
  Cli_Integration_GooglePlayConsole_Runner_ReplaceImages_EditId,
  Cli_Integration_GooglePlayConsole_Runner_ReplaceImages_Returns,
  Cli_Integration_GooglePlayConsole_Runner_ReplaceImages_Target,
  Cli_Integration_GooglePlayConsole_Runner_RollbackEdit_Client,
  Cli_Integration_GooglePlayConsole_Runner_RollbackEdit_EditId,
  Cli_Integration_GooglePlayConsole_Runner_RollbackEdit_Returns,
  Cli_Integration_GooglePlayConsole_Runner_Screenshots_Client,
  Cli_Integration_GooglePlayConsole_Runner_Screenshots_CollectedTargets,
  Cli_Integration_GooglePlayConsole_Runner_Screenshots_Context,
  Cli_Integration_GooglePlayConsole_Runner_Screenshots_Directory,
  Cli_Integration_GooglePlayConsole_Runner_Screenshots_EditId,
  Cli_Integration_GooglePlayConsole_Runner_Screenshots_Lines,
  Cli_Integration_GooglePlayConsole_Runner_Screenshots_Options,
  Cli_Integration_GooglePlayConsole_Runner_Screenshots_Returns,
  Cli_Integration_GooglePlayConsole_Runner_Screenshots_Targets,
  Cli_Integration_GooglePlayConsole_Runner_UploadFiles_Buffer,
  Cli_Integration_GooglePlayConsole_Runner_UploadFiles_Client,
  Cli_Integration_GooglePlayConsole_Runner_UploadFiles_EditId,
  Cli_Integration_GooglePlayConsole_Runner_UploadFiles_File,
  Cli_Integration_GooglePlayConsole_Runner_UploadFiles_Index,
  Cli_Integration_GooglePlayConsole_Runner_UploadFiles_Returns,
  Cli_Integration_GooglePlayConsole_Runner_UploadFiles_Target,
  Cli_Integration_GooglePlayConsole_Runner_ValidateAssetTargets_AllowedTargets,
  Cli_Integration_GooglePlayConsole_Runner_ValidateAssetTargets_OneFile,
  Cli_Integration_GooglePlayConsole_Runner_ValidateAssetTargets_Returns,
  Cli_Integration_GooglePlayConsole_Runner_ValidateAssetTargets_Targets,
  Cli_Integration_GooglePlayConsole_Runner_ValidateMetadataTargets_Returns,
  Cli_Integration_GooglePlayConsole_Runner_ValidateMetadataTargets_Targets,
} from '../../types/cli/integration/google-play-console.d.ts';

/**
 * CLI - Integration - Google Play Console - Metadata Fields.
 *
 * Restricts listing patches to fields defined by Google's listings resource.
 * Null scaffold placeholders remain local and are never sent to Google Play.
 *
 * @since 0.34.0
 */
const metadataFields = [
  'fullDescription',
  'shortDescription',
  'title',
  'video',
];

/**
 * CLI - Integration - Google Play Console - Screenshot Types.
 *
 * Uses the Android Publisher API's public imageType values without renaming them.
 * Each matching local directory replaces only its corresponding remote target.
 *
 * @since 0.34.0
 */
const screenshotTypes = new Set([
  'phoneScreenshots',
  'sevenInchScreenshots',
  'tenInchScreenshots',
  'tvScreenshots',
  'wearScreenshots',
]);

/**
 * CLI - Integration - Google Play Console - Graphic Asset Types.
 *
 * Preserves Google's official imageType vocabulary for non-screenshot graphics.
 * Every target accepts exactly one local image before replacement begins.
 *
 * @since 0.34.0
 */
const graphicAssetTypes = new Set([
  'featureGraphic',
  'icon',
  'promoGraphic',
  'tvBanner',
]);

/**
 * CLI - Integration - Google Play Console.
 *
 * Applies local listing and image targets through one transactional Google Play
 * edit authenticated exclusively with Application Default Credentials.
 *
 * @since 0.34.0
 */
export class Runner {
  /**
   * CLI - Integration - Google Play Console - Metadata.
   *
   * Validates every selected locale and commits only explicitly populated fields.
   * Failed mutations abandon the edit before the original error is rethrown.
   *
   * @param {Cli_Integration_GooglePlayConsole_Runner_Metadata_Options} options - Options.
   *
   * @returns {Cli_Integration_GooglePlayConsole_Runner_Metadata_Returns}
   *
   * @since 0.34.0
   */
  public static async metadata(options: Cli_Integration_GooglePlayConsole_Runner_Metadata_Options): Cli_Integration_GooglePlayConsole_Runner_Metadata_Returns {
    const context: Cli_Integration_GooglePlayConsole_Runner_Metadata_Context = await Runner.prepareWorkspace(options);
    const directory: Cli_Integration_GooglePlayConsole_Runner_Metadata_Directory = join(process.cwd(), 'assets', 'google-play-console', context['workspace']['name'], 'metadata');
    const collectedTargets: Cli_Integration_GooglePlayConsole_Runner_Metadata_CollectedTargets = await collectMetadataTargets(directory, metadataFields);
    const targets: Cli_Integration_GooglePlayConsole_Runner_Metadata_Targets = Runner.filterMetadataTargets(collectedTargets, options);
    const lines: Cli_Integration_GooglePlayConsole_Runner_Metadata_Lines = targets.map((target) => `${target['locale']}: ${Object.keys(target['attributes']).join(', ')}`);

    Runner.validateMetadataTargets(targets);

    reportPlan(`Update Google Play Console metadata for ${context['packageName']}:`, lines);

    if (await confirmPlan(options['dryRun'] === true, options['nonInteractive'] === true, options['yes'] === true) === false || options['dryRun'] === true) {
      return;
    }

    const client: Cli_Integration_GooglePlayConsole_Runner_Metadata_Client = Runner.createClient(context);
    const editId: Cli_Integration_GooglePlayConsole_Runner_Metadata_EditId = await client.createEdit();

    try {
      await Promise.all(targets.map((target) => client.updateListing(editId, target['locale'], target['attributes'])));

      await client.commitEdit(editId);
    } catch (error) {
      await Runner.rollbackEdit(client, editId);

      throw error;
    }

    Logger.info(`Updated ${targets.length} Google Play listing locale(s).`);

    return;
  }

  /**
   * CLI - Integration - Google Play Console - Screenshots.
   *
   * Replaces selected screenshot types while retaining deterministic filename order.
   * Targets absent from the local asset tree remain unchanged in Google Play.
   *
   * @param {Cli_Integration_GooglePlayConsole_Runner_Screenshots_Options} options - Options.
   *
   * @returns {Cli_Integration_GooglePlayConsole_Runner_Screenshots_Returns}
   *
   * @since 0.34.0
   */
  public static async screenshots(options: Cli_Integration_GooglePlayConsole_Runner_Screenshots_Options): Cli_Integration_GooglePlayConsole_Runner_Screenshots_Returns {
    const context: Cli_Integration_GooglePlayConsole_Runner_Screenshots_Context = await Runner.prepareWorkspace(options);
    const directory: Cli_Integration_GooglePlayConsole_Runner_Screenshots_Directory = join(process.cwd(), 'assets', 'google-play-console', context['workspace']['name'], 'screenshots');
    const collectedTargets: Cli_Integration_GooglePlayConsole_Runner_Screenshots_CollectedTargets = await collectAssetTargets(directory, {
      extensions: [
        '.jpeg',
        '.jpg',
        '.png',
      ],
      positioned: true,
    });
    const targets: Cli_Integration_GooglePlayConsole_Runner_Screenshots_Targets = Runner.filterAssetTargets(collectedTargets, options);
    const lines: Cli_Integration_GooglePlayConsole_Runner_Screenshots_Lines = targets.map((target) => `${target['locale']}/${target['target']}: ${target['files'].length} ordered image(s)`);

    Runner.validateAssetTargets(targets, screenshotTypes, false);

    reportPlan(`Replace Google Play Console screenshots for ${context['packageName']}:`, lines);

    if (await confirmPlan(options['dryRun'] === true, options['nonInteractive'] === true, options['yes'] === true) === false || options['dryRun'] === true) {
      return;
    }

    const client: Cli_Integration_GooglePlayConsole_Runner_Screenshots_Client = Runner.createClient(context);
    const editId: Cli_Integration_GooglePlayConsole_Runner_Screenshots_EditId = await client.createEdit();

    try {
      await Promise.all(targets.map((target) => Runner.replaceImages(client, editId, target)));

      await client.commitEdit(editId);
    } catch (error) {
      await Runner.rollbackEdit(client, editId);

      throw error;
    }

    Logger.info(`Updated ${targets.length} Google Play screenshot target(s).`);

    return;
  }

  /**
   * CLI - Integration - Google Play Console - Graphic Assets.
   *
   * Replaces selected official graphic assets while leaving absent targets alone.
   * Each selected target must contain exactly one supported local image.
   *
   * @param {Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_Options} options - Options.
   *
   * @returns {Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_Returns}
   *
   * @since 0.34.0
   */
  public static async graphicAssets(options: Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_Options): Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_Returns {
    const context: Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_Context = await Runner.prepareWorkspace(options);
    const directory: Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_Directory = join(process.cwd(), 'assets', 'google-play-console', context['workspace']['name'], 'graphic-assets');
    const collectedTargets: Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_CollectedTargets = await collectAssetTargets(directory, {
      extensions: [
        '.jpeg',
        '.jpg',
        '.png',
      ],
      positioned: false,
    });
    const targets: Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_Targets = Runner.filterAssetTargets(collectedTargets, options);
    const lines: Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_Lines = targets.map((target) => {
      const file: Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_File = target['files'][0];
      const fileName: Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_FileName = (file === undefined) ? 'missing' : file['fileName'];

      return `${target['locale']}/${target['target']}: ${fileName}`;
    });

    Runner.validateAssetTargets(targets, graphicAssetTypes, true);

    reportPlan(`Replace Google Play Console graphic assets for ${context['packageName']}:`, lines);

    if (await confirmPlan(options['dryRun'] === true, options['nonInteractive'] === true, options['yes'] === true) === false || options['dryRun'] === true) {
      return;
    }

    const client: Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_Client = Runner.createClient(context);
    const editId: Cli_Integration_GooglePlayConsole_Runner_GraphicAssets_EditId = await client.createEdit();

    try {
      await Promise.all(targets.map((target) => Runner.replaceImages(client, editId, target)));

      await client.commitEdit(editId);
    } catch (error) {
      await Runner.rollbackEdit(client, editId);

      throw error;
    }

    Logger.info(`Updated ${targets.length} Google Play graphic asset target(s).`);

    return;
  }

  /**
   * CLI - Integration - Google Play Console - Prepare Workspace.
   *
   * Resolves an Android workspace and derives its application ID unless the caller
   * provides an explicit package name for an unusual existing project layout.
   *
   * @param {Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_Options} options - Options.
   *
   * @private
   *
   * @returns {Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_Returns}
   *
   * @since 0.34.0
   */
  private static async prepareWorkspace(options: Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_Options): Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_Returns {
    const workspace: Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_Workspace = await resolveWorkspace(options, ['app/build.gradle.kts']);
    let packageName: Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_PackageName = options['packageName'];

    if (packageName === undefined) {
      const buildFilePath: Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_BuildFilePath = join(workspace['absolutePath'], 'app', 'build.gradle.kts');
      const buildFile: Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_BuildFile = await fs.readFile(buildFilePath, 'utf-8');
      const lines: Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_Lines = buildFile.replaceAll('\r\n', '\n').split('\n').map((line) => line.trim());
      const applicationIdPrefix: Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_ApplicationIdPrefix = 'applicationId = "';
      const applicationIdLine: Cli_Integration_GooglePlayConsole_Runner_PrepareWorkspace_ApplicationIdLine = lines.find((line) => line.startsWith(applicationIdPrefix) && line.endsWith('"'));

      if (applicationIdLine !== undefined) {
        packageName = applicationIdLine.slice(applicationIdPrefix.length, -1);
      }
    }

    if (packageName === undefined || packageName === '') {
      throw new Error('Unable to derive the Google Play package name. Pass --package-name explicitly.');
    }

    return {
      packageName,
      workspace,
    };
  }

  /**
   * CLI - Integration - Google Play Console - Filter Metadata Targets.
   *
   * Applies the optional locale selector without changing target ordering.
   * Empty selections are rejected by the shared validation that follows.
   *
   * @param {Cli_Integration_GooglePlayConsole_Runner_FilterMetadataTargets_Targets} targets - Targets.
   * @param {Cli_Integration_GooglePlayConsole_Runner_FilterMetadataTargets_Options} options - Options.
   *
   * @private
   *
   * @returns {Cli_Integration_GooglePlayConsole_Runner_FilterMetadataTargets_Returns}
   *
   * @since 0.34.0
   */
  private static filterMetadataTargets(targets: Cli_Integration_GooglePlayConsole_Runner_FilterMetadataTargets_Targets, options: Cli_Integration_GooglePlayConsole_Runner_FilterMetadataTargets_Options): Cli_Integration_GooglePlayConsole_Runner_FilterMetadataTargets_Returns {
    const locales: Cli_Integration_GooglePlayConsole_Runner_FilterMetadataTargets_Locales = parseCommaSeparated(options['locales']);

    return targets.filter((target) => locales === undefined || locales.includes(target['locale']));
  }

  /**
   * CLI - Integration - Google Play Console - Filter Asset Targets.
   *
   * Applies the same locale selection semantics to screenshots and graphic assets.
   * Google Play exposes one Android platform, so no platform filter is required.
   *
   * @param {Cli_Integration_GooglePlayConsole_Runner_FilterAssetTargets_Targets} targets - Targets.
   * @param {Cli_Integration_GooglePlayConsole_Runner_FilterAssetTargets_Options} options - Options.
   *
   * @private
   *
   * @returns {Cli_Integration_GooglePlayConsole_Runner_FilterAssetTargets_Returns}
   *
   * @since 0.34.0
   */
  private static filterAssetTargets(targets: Cli_Integration_GooglePlayConsole_Runner_FilterAssetTargets_Targets, options: Cli_Integration_GooglePlayConsole_Runner_FilterAssetTargets_Options): Cli_Integration_GooglePlayConsole_Runner_FilterAssetTargets_Returns {
    const locales: Cli_Integration_GooglePlayConsole_Runner_FilterAssetTargets_Locales = parseCommaSeparated(options['locales']);

    return targets.filter((target) => locales === undefined || locales.includes(target['locale']));
  }

  /**
   * CLI - Integration - Google Play Console - Validate Metadata Targets.
   *
   * Enforces the Android-only vendor tree and rejects locale filters with no match.
   * This keeps malformed paths from becoming Google listing mutations.
   *
   * @param {Cli_Integration_GooglePlayConsole_Runner_ValidateMetadataTargets_Targets} targets - Targets.
   *
   * @private
   *
   * @returns {Cli_Integration_GooglePlayConsole_Runner_ValidateMetadataTargets_Returns}
   *
   * @since 0.34.0
   */
  private static validateMetadataTargets(targets: Cli_Integration_GooglePlayConsole_Runner_ValidateMetadataTargets_Targets): Cli_Integration_GooglePlayConsole_Runner_ValidateMetadataTargets_Returns {
    if (targets.length === 0) {
      throw new Error('The selected Google Play locale filter matched no metadata targets.');
    }

    if (targets.some((target) => target['platform'] !== 'android') === true) {
      throw new Error('Google Play metadata must live under the android platform directory.');
    }

    return;
  }

  /**
   * CLI - Integration - Google Play Console - Validate Asset Targets.
   *
   * Rejects unsupported vendor image types and enforces single-file graphic assets.
   * Existing empty targets are rejected earlier by the shared collector.
   *
   * @param {Cli_Integration_GooglePlayConsole_Runner_ValidateAssetTargets_Targets}        targets        - Targets.
   * @param {Cli_Integration_GooglePlayConsole_Runner_ValidateAssetTargets_AllowedTargets} allowedTargets - Allowed targets.
   * @param {Cli_Integration_GooglePlayConsole_Runner_ValidateAssetTargets_OneFile}        oneFile        - One file.
   *
   * @private
   *
   * @returns {Cli_Integration_GooglePlayConsole_Runner_ValidateAssetTargets_Returns}
   *
   * @since 0.34.0
   */
  private static validateAssetTargets(targets: Cli_Integration_GooglePlayConsole_Runner_ValidateAssetTargets_Targets, allowedTargets: Cli_Integration_GooglePlayConsole_Runner_ValidateAssetTargets_AllowedTargets, oneFile: Cli_Integration_GooglePlayConsole_Runner_ValidateAssetTargets_OneFile): Cli_Integration_GooglePlayConsole_Runner_ValidateAssetTargets_Returns {
    if (targets.length === 0) {
      throw new Error('The selected Google Play locale filter matched no asset targets.');
    }

    for (const target of targets) {
      if (target['platform'] !== 'android') {
        throw new Error(`Google Play assets must live under android: ${target['relativePath']}.`);
      }

      if (allowedTargets.has(target['target']) === false) {
        throw new Error(`Unsupported Google Play image type: ${target['target']}.`);
      }

      if (oneFile === true && target['files'].length !== 1) {
        throw new Error(`Google Play graphic assets require exactly one image: ${target['relativePath']}.`);
      }
    }

    return;
  }

  /**
   * CLI - Integration - Google Play Console - Create Client.
   *
   * Instantiates the ADC client only after the developer confirms the local plan.
   * Dry runs therefore never attempt to locate or read Google credentials.
   *
   * @param {Cli_Integration_GooglePlayConsole_Runner_CreateClient_Context} context - Context.
   *
   * @private
   *
   * @returns {Cli_Integration_GooglePlayConsole_Runner_CreateClient_Returns}
   *
   * @since 0.34.0
   */
  private static createClient(context: Cli_Integration_GooglePlayConsole_Runner_CreateClient_Context): Cli_Integration_GooglePlayConsole_Runner_CreateClient_Returns {
    return new GooglePlayConsole(context['packageName']);
  }

  /**
   * CLI - Integration - Google Play Console - Rollback Edit.
   *
   * Best-effort cleanup abandons a failed edit without masking the original error.
   * Google also expires edits, but explicit cleanup keeps retries unambiguous.
   *
   * @param {Cli_Integration_GooglePlayConsole_Runner_RollbackEdit_Client} client - Client.
   * @param {Cli_Integration_GooglePlayConsole_Runner_RollbackEdit_EditId} editId - Edit id.
   *
   * @private
   *
   * @returns {Cli_Integration_GooglePlayConsole_Runner_RollbackEdit_Returns}
   *
   * @since 0.34.0
   */
  private static async rollbackEdit(client: Cli_Integration_GooglePlayConsole_Runner_RollbackEdit_Client, editId: Cli_Integration_GooglePlayConsole_Runner_RollbackEdit_EditId): Cli_Integration_GooglePlayConsole_Runner_RollbackEdit_Returns {
    try {
      await client.deleteEdit(editId);
    } catch {
      Logger.warn(`Unable to abandon Google Play edit ${editId}; Google will expire it automatically.`);
    }

    return;
  }

  /**
   * CLI - Integration - Google Play Console - Replace Images.
   *
   * Deletes one selected vendor image type and uploads its local files in order.
   * Recursive upload avoids concurrent requests changing the visible ordering.
   *
   * @param {Cli_Integration_GooglePlayConsole_Runner_ReplaceImages_Client} client - Client.
   * @param {Cli_Integration_GooglePlayConsole_Runner_ReplaceImages_EditId} editId - Edit id.
   * @param {Cli_Integration_GooglePlayConsole_Runner_ReplaceImages_Target} target - Target.
   *
   * @private
   *
   * @returns {Cli_Integration_GooglePlayConsole_Runner_ReplaceImages_Returns}
   *
   * @since 0.34.0
   */
  private static async replaceImages(client: Cli_Integration_GooglePlayConsole_Runner_ReplaceImages_Client, editId: Cli_Integration_GooglePlayConsole_Runner_ReplaceImages_EditId, target: Cli_Integration_GooglePlayConsole_Runner_ReplaceImages_Target): Cli_Integration_GooglePlayConsole_Runner_ReplaceImages_Returns {
    await client.deleteImages(editId, target['locale'], target['target']);

    await Runner.uploadFiles(client, editId, target, 0);

    return;
  }

  /**
   * CLI - Integration - Google Play Console - Upload Files.
   *
   * Uploads one file and recurses to the next to preserve developer filename order.
   * The terminal case returns without reading or sending an undefined file.
   *
   * @param {Cli_Integration_GooglePlayConsole_Runner_UploadFiles_Client} client - Client.
   * @param {Cli_Integration_GooglePlayConsole_Runner_UploadFiles_EditId} editId - Edit id.
   * @param {Cli_Integration_GooglePlayConsole_Runner_UploadFiles_Target} target - Target.
   * @param {Cli_Integration_GooglePlayConsole_Runner_UploadFiles_Index}  index  - Index.
   *
   * @private
   *
   * @returns {Cli_Integration_GooglePlayConsole_Runner_UploadFiles_Returns}
   *
   * @since 0.34.0
   */
  private static async uploadFiles(client: Cli_Integration_GooglePlayConsole_Runner_UploadFiles_Client, editId: Cli_Integration_GooglePlayConsole_Runner_UploadFiles_EditId, target: Cli_Integration_GooglePlayConsole_Runner_UploadFiles_Target, index: Cli_Integration_GooglePlayConsole_Runner_UploadFiles_Index): Cli_Integration_GooglePlayConsole_Runner_UploadFiles_Returns {
    const file: Cli_Integration_GooglePlayConsole_Runner_UploadFiles_File = target['files'][index];

    if (file === undefined) {
      return;
    }

    const buffer: Cli_Integration_GooglePlayConsole_Runner_UploadFiles_Buffer = await fs.readFile(file['filePath']);

    await client.uploadImage(editId, target['locale'], target['target'], file['fileName'], buffer);

    await Runner.uploadFiles(client, editId, target, index + 1);

    return;
  }
}
