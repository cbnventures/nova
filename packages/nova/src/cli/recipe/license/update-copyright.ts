import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  LIB_REGEX_PATTERN_REGEX_SPECIAL_CHARS,
  LIB_REGEX_PLACEHOLDER_ENTITY_NAME,
  LIB_REGEX_PLACEHOLDER_YEAR_RANGE,
} from '../../../lib/regex.js';
import {
  collectConsumerWorkspacePaths,
  isProjectRoot,
  resolveTemplatePath,
  saveGeneratedFile,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_EntityCapture,
  Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_EntityIndex,
  Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_EntityLiteral,
  Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_EscapePattern,
  Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_IsEntityNext,
  Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_LeadingSegment,
  Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_NextIndex,
  Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_Pattern,
  Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_Remaining,
  Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_Returns,
  Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_Template,
  Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_TokenIndices,
  Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_YearCapture,
  Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_YearIndex,
  Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_YearLiteral,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_AlreadyCurrentCount,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_CurrentDirectory,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_CurrentYear,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_EntityName,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_ErroredCount,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_HasEntityPlaceholder,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_HasYearPlaceholder,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_IsAtProjectRoot,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_IsDryRun,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_IsReplaceFile,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_LicenseId,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_LicenseRecipes,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_NotFoundCount,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_Options,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_Project,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_Recipes,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_ReplaceFileNotice,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_Result,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_Returns,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_RootPath,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_SkippedCount,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_StartingYear,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_TargetPaths,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_Template,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_TemplatePath,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_UpdateCopyright,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_UpdatedCount,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_WorkingFile,
  Cli_Recipe_License_UpdateCopyright_Runner_Run_YearRange,
  Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_CurrentContent,
  Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_EntityName,
  Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_FilePath,
  Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_Fingerprint,
  Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_IsDryRun,
  Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_IsReplaceFile,
  Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_ReadError,
  Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_ReadErrorCode,
  Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_Regenerated,
  Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_Returns,
  Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_TemplateText,
  Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_YearRange,
} from '../../../types/cli/recipe/license/update-copyright.d.ts';

/**
 * CLI - Recipe - License - Update Copyright.
 *
 * Refreshes the copyright holder and year range inside a nova-generated LICENSE file. A
 * fingerprint gate guarantees a hand-edited, custom, or non-nova LICENSE is never rewritten.
 *
 * @since 0.20.0
 */
export class Runner {
  /**
   * CLI - Recipe - License - Update Copyright - Build Fingerprint.
   *
   * Builds a RegExp from the raw template text that matches only a nova-generated
   * LICENSE for this license id, capturing the holder and year range as groups while escaping
   * literal segments, so per-license copyright formatting is handled from the template.
   *
   * @param {Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_Template} template - Template.
   *
   * @returns {Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_Returns}
   *
   * @since 0.20.0
   */
  public static buildFingerprint(template: Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_Template): Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_Returns {
    const escapePattern: Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_EscapePattern = new RegExp(LIB_REGEX_PATTERN_REGEX_SPECIAL_CHARS.source, 'g');

    // The literal tokens as they appear in the template file (unescaped braces/brackets).
    const entityLiteral: Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_EntityLiteral = '[__ENTITY_NAME__]';
    const yearLiteral: Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_YearLiteral = '[__YEAR_RANGE__]';

    // Capture group patterns injected where each placeholder appeared. Holder spans any
    // non-newline characters lazily via the dot (which never matches a line terminator without
    // the "s" flag); year range is a 4-digit year or a range. The holder is deliberately
    // restricted to a single line: nova only ever emits one [__ENTITY_NAME__] token, always as
    // the final token on its copyright line, so a legitimate nova holder never contains a
    // newline. Allowing the holder to cross newlines would let a dual/second copyright-holder
    // line or a multi-line holder block still satisfy the fingerprint, and the subsequent
    // single-line regeneration would silently delete that hand-edited content.
    const entityCapture: Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_EntityCapture = '(.+?)';
    const yearCapture: Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_YearCapture = '(\\d{4}(?:-\\d{4})?)';

    let pattern: Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_Pattern = '';
    let remaining: Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_Remaining = template;

    // Walk the template, replacing whichever placeholder token appears next with its capture
    // pattern and regex-escaping every literal segment in between. This keeps token ordering
    // fully data-driven so no license needs to be special-cased.
    while (remaining.length > 0) {
      const entityIndex: Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_EntityIndex = remaining.indexOf(entityLiteral);
      const yearIndex: Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_YearIndex = remaining.indexOf(yearLiteral);

      const tokenIndices: Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_TokenIndices = [
        entityIndex,
        yearIndex,
      ].filter((index) => index !== -1);

      if (tokenIndices.length === 0) {
        pattern += remaining.replace(escapePattern, '\\$&');

        break;
      }

      const nextIndex: Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_NextIndex = Math.min(...tokenIndices);
      const isEntityNext: Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_IsEntityNext = entityIndex === nextIndex;
      const leadingSegment: Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_LeadingSegment = remaining.slice(0, nextIndex);

      pattern += leadingSegment.replace(escapePattern, '\\$&');

      if (isEntityNext === true) {
        pattern += entityCapture;

        remaining = remaining.slice(nextIndex + entityLiteral.length);
      } else {
        pattern += yearCapture;

        remaining = remaining.slice(nextIndex + yearLiteral.length);
      }
    }

    return new RegExp(`^${pattern}$`);
  }

  /**
   * CLI - Recipe - License - Update Copyright - Run.
   *
   * Verifies the working directory is a project root, then rewrites the LICENSE holder and
   * year range only when the on-disk file still matches the nova-generated fingerprint.
   *
   * @param {Cli_Recipe_License_UpdateCopyright_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_License_UpdateCopyright_Runner_Run_Returns}
   *
   * @since 0.20.0
   */
  public static async run(options: Cli_Recipe_License_UpdateCopyright_Runner_Run_Options): Cli_Recipe_License_UpdateCopyright_Runner_Run_Returns {
    const currentDirectory: Cli_Recipe_License_UpdateCopyright_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Recipe_License_UpdateCopyright_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: Cli_Recipe_License_UpdateCopyright_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Recipe_License_UpdateCopyright_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Recipe_License_UpdateCopyright_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Recipe_License_UpdateCopyright_Runner_Run_WorkingFile = await new LibNovaConfig().load();

    const recipes: Cli_Recipe_License_UpdateCopyright_Runner_Run_Recipes = workingFile['recipes'];
    const licenseRecipes: Cli_Recipe_License_UpdateCopyright_Runner_Run_LicenseRecipes = (recipes !== undefined) ? recipes['license'] : undefined;
    const updateCopyright: Cli_Recipe_License_UpdateCopyright_Runner_Run_UpdateCopyright = (licenseRecipes !== undefined) ? licenseRecipes['update-copyright'] : undefined;

    if (
      updateCopyright === undefined
      || updateCopyright['enabled'] !== true
    ) {
      Logger.warn('Skipping update-copyright. The recipe is not enabled in the "nova.config.json" file.');

      return;
    }

    const project: Cli_Recipe_License_UpdateCopyright_Runner_Run_Project = workingFile['project'];
    const entityName: Cli_Recipe_License_UpdateCopyright_Runner_Run_EntityName = (project !== undefined) ? (project['legalName'] ?? '') : '';
    const currentYear: Cli_Recipe_License_UpdateCopyright_Runner_Run_CurrentYear = new Date().getFullYear();
    const startingYear: Cli_Recipe_License_UpdateCopyright_Runner_Run_StartingYear = (project !== undefined) ? (project['startingYear'] ?? currentYear) : currentYear;
    const yearRange: Cli_Recipe_License_UpdateCopyright_Runner_Run_YearRange = (startingYear === currentYear) ? String(currentYear) : `${startingYear}-${currentYear}`;

    const licenseId: Cli_Recipe_License_UpdateCopyright_Runner_Run_LicenseId = (project !== undefined) ? project['license'] : undefined;

    if (licenseId === undefined) {
      Logger.warn('Skipping update-copyright. No license specified in the "nova.config.json" file.');

      return;
    }

    const templatePath: Cli_Recipe_License_UpdateCopyright_Runner_Run_TemplatePath = join(resolveTemplatePath(import.meta.url, 'generators/must-haves/license'), licenseId);
    const template: Cli_Recipe_License_UpdateCopyright_Runner_Run_Template = await fs.readFile(templatePath, 'utf-8');

    const hasEntityPlaceholder: Cli_Recipe_License_UpdateCopyright_Runner_Run_HasEntityPlaceholder = template.includes('[__ENTITY_NAME__]');
    const hasYearPlaceholder: Cli_Recipe_License_UpdateCopyright_Runner_Run_HasYearPlaceholder = template.includes('[__YEAR_RANGE__]');

    // Placeholder-less templates (e.g. CC0-1.0, Unlicense) carry no holder or year to
    // update, so there is nothing to fingerprint and nothing to refresh.
    if (
      hasEntityPlaceholder !== true
      && hasYearPlaceholder !== true
    ) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'license',
      }).info(`Skipping update-copyright. The "${licenseId}" license has no copyright holder or year to update.`);

      return;
    }

    // The generator fans a single LICENSE out to the root plus every consumer-facing
    // workspace (app, package, tool, config). Refresh every copy the generator writes so no
    // consumer copy drifts. Each copy is gated independently below.
    const rootPath: Cli_Recipe_License_UpdateCopyright_Runner_Run_RootPath = join(currentDirectory, 'LICENSE');
    const targetPaths: Cli_Recipe_License_UpdateCopyright_Runner_Run_TargetPaths = [
      rootPath,
      ...collectConsumerWorkspacePaths(currentDirectory, workingFile['workspaces'], 'LICENSE'),
    ];

    let updatedCount: Cli_Recipe_License_UpdateCopyright_Runner_Run_UpdatedCount = 0;
    let skippedCount: Cli_Recipe_License_UpdateCopyright_Runner_Run_SkippedCount = 0;
    let alreadyCurrentCount: Cli_Recipe_License_UpdateCopyright_Runner_Run_AlreadyCurrentCount = 0;
    let notFoundCount: Cli_Recipe_License_UpdateCopyright_Runner_Run_NotFoundCount = 0;
    let erroredCount: Cli_Recipe_License_UpdateCopyright_Runner_Run_ErroredCount = 0;

    // Gate and refresh each LICENSE copy independently. A hand-edited, custom, missing, or
    // unreadable consumer copy is skipped and left byte-identical while a pristine root copy is
    // still refreshed, and vice-versa. Each updateLicenseFile call isolates its own read/write
    // errors and returns a status instead of throwing, so one bad copy can never abort the
    // fan-out or crash the CLI, and every later copy is still processed. The anti-mangle
    // fingerprint runs against each file's own current content, never once against the root and
    // blindly across the rest.
    for (const targetPath of targetPaths) {
      const result: Cli_Recipe_License_UpdateCopyright_Runner_Run_Result = await Runner.updateLicenseFile(targetPath, template, entityName, yearRange, isDryRun, isReplaceFile);

      if (result === 'updated') {
        updatedCount += 1;
      } else if (result === 'skipped') {
        skippedCount += 1;
      } else if (result === 'already-current') {
        alreadyCurrentCount += 1;
      } else if (result === 'errored') {
        erroredCount += 1;
      } else {
        notFoundCount += 1;
      }
    }

    // When not a single target LICENSE exists on disk, there is nothing to refresh anywhere.
    // Warn and return, matching the pre-fan-out behavior for a missing root LICENSE.
    if (notFoundCount === targetPaths.length) {
      Logger.warn('Skipping update-copyright. No LICENSE file was found in the project root.');

      return;
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'license',
    }).info(`update-copyright summary: ${updatedCount} updated, ${skippedCount} skipped, ${alreadyCurrentCount} already current, ${notFoundCount} not found, ${erroredCount} errored.`);

    return;
  }

  /**
   * CLI - Recipe - License - Update Copyright - Update License File.
   *
   * Refreshes a single LICENSE copy independently. Reads the file's own current content,
   * gates it against the nova fingerprint, and rewrites only the holder and year range when
   * the file still matches, so a hand-edited or custom copy is always left byte-identical.
   *
   * @param {Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_FilePath}      filePath      - File path.
   * @param {Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_TemplateText}  templateText  - Template text.
   * @param {Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_EntityName}    entityName    - Entity name.
   * @param {Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_YearRange}     yearRange     - Year range.
   * @param {Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_IsDryRun}      isDryRun      - Is dry run.
   * @param {Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_IsReplaceFile} isReplaceFile - Is replace file.
   *
   * @private
   *
   * @returns {Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_Returns}
   *
   * @since 0.20.0
   */
  private static async updateLicenseFile(filePath: Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_FilePath, templateText: Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_TemplateText, entityName: Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_EntityName, yearRange: Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_YearRange, isDryRun: Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_IsDryRun, isReplaceFile: Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_IsReplaceFile): Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_Returns {
    let currentContent: Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_CurrentContent = undefined;

    // Read the file directly rather than pre-checking with pathExists. A pathExists gate has a
    // TOCTOU gap and, worse, fs.access succeeds on a directory or a present-but-unreadable file,
    // so the later read still throws (EISDIR for a directory named LICENSE, EACCES for a
    // permission-denied file). Catching here keeps one bad copy from aborting the fan-out and
    // crashing the CLI. ENOENT is a missing copy (skip quietly); anything else is a read error on
    // a copy that is present but unreadable (skip with a warning). Either way the loop continues.
    try {
      currentContent = await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      const readErrorCode: Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_ReadErrorCode = (error as Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_ReadError)['code'];

      if (readErrorCode === 'ENOENT') {
        Logger.customize({
          name: 'Runner.updateLicenseFile',
          purpose: 'license',
        }).warn(`Skipping "${filePath}". No LICENSE file was found at this location.`);

        return 'not-found';
      }

      Logger.customize({
        name: 'Runner.updateLicenseFile',
        purpose: 'license',
      }).warn(`Skipping "${filePath}". Could not read the LICENSE file.`);

      return 'errored';
    }

    const fingerprint: Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_Fingerprint = Runner.buildFingerprint(templateText);

    // Anti-mangle gate. If this on-disk LICENSE does not match the nova fingerprint for this
    // license id, it has been hand-edited or is a custom/non-nova file. Never rewrite it. The
    // gate is evaluated against this file's own content, so each copy stands on its own.
    if (fingerprint.test(currentContent) !== true) {
      Logger.customize({
        name: 'Runner.updateLicenseFile',
        purpose: 'license',
      }).warn(`Skipping "${filePath}". The LICENSE file looks hand-edited or custom and will not be touched.`);

      return 'skipped';
    }

    // By construction the regenerated body is byte-identical to the current file except for
    // the holder and year range, so no other content can be lost. The holder and year range
    // are inserted through function replacers so any "$" sequence in the value (such as "$&",
    // "$`", "$'", "$$", or "$1") is written literally instead of being interpreted as a
    // replacement-string metacharacter.
    const regenerated: Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_Regenerated = templateText
      .replace(new RegExp(LIB_REGEX_PLACEHOLDER_ENTITY_NAME.source, 'g'), () => entityName)
      .replace(new RegExp(LIB_REGEX_PLACEHOLDER_YEAR_RANGE.source, 'g'), () => yearRange);

    if (regenerated === currentContent) {
      Logger.customize({
        name: 'Runner.updateLicenseFile',
        purpose: 'license',
      }).info(`Skipping "${filePath}". The LICENSE copyright is already up to date.`);

      return 'already-current';
    }

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.updateLicenseFile',
        purpose: 'license',
      }).info(`Would update "${filePath}" copyright to "${yearRange} ${entityName}".`);

      return 'updated';
    }

    // Isolate the write too. A copy that read cleanly can still fail to write (a read-only file,
    // a permission change between read and write). Catch so one failed write cannot abort the
    // fan-out or crash the CLI, and the remaining copies are still refreshed.
    try {
      await saveGeneratedFile(filePath, regenerated, isReplaceFile);
    } catch {
      Logger.customize({
        name: 'Runner.updateLicenseFile',
        purpose: 'license',
      }).warn(`Skipping "${filePath}". Could not write the LICENSE file.`);

      return 'errored';
    }

    return 'updated';
  }
}
