import { promises as fs } from 'node:fs';
import { basename, join, relative } from 'node:path';

import {
  formatDescriptionLimitMessage,
  resolveDestinationDescription,
  resolvePfsenseCommentDestination,
} from '../../../lib/description-limits.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  formatPfsenseInfoDescription,
  replacePfsenseAboutDescription,
  replacePfsenseInfoDescription,
  replacePfsenseMakefileVariable,
  resolvePfsenseMaintainer,
  wrapPfsensePackageDescription,
} from '../../../lib/pfsense-identity.js';
import {
  isProjectRoot,
  pathExists,
  saveGeneratedFile,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_Content,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_DisplayPath,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_IsSilent,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_MissingValueHint,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_Returns,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_UpdatedContent,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_Value,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_VariableName,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_FindInfoFile_Candidates,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_FindInfoFile_Entries,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_FindInfoFile_ExistingCandidates,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_FindInfoFile_Returns,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_FindInfoFile_ShareDirectory,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_ReadOptionalFile_FilePath,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_ReadOptionalFile_Returns,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Report_IsSilent,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Report_Level,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Report_Message,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Report_Returns,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_CurrentDirectory,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_HasMakefile,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_IsAtProjectRoot,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_IsDryRun,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_IsReplaceFile,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_MakefilePath,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_Options,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_PfsenseRecipes,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_Recipes,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_ReplaceFileNotice,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_Returns,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_SyncIdentity,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_TargetCount,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_WorkingFile,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_WorkspaceDirectory,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_WorkspacePaths,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_AboutContent,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_AboutPath,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_ChangedFileUpdates,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_Comment,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_CommentDestination,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_CommentLimitMessage,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_DisplayPath,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_FileUpdates,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_Homepage,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_InfoContent,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_InfoDescription,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_InfoPath,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_IsDryRun,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_IsReplaceFile,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_IsSilent,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_LongDescription,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_Maintainer,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_MakefileContent,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_MakefilePath,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_PackageDescription,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_PackageDescriptionContent,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_PackageDescriptionPath,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_PortDirectory,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_Returns,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_ShortDescription,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_UpdatedAboutContent,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_UpdatedInfoContent,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_UpdatedMakefileContent,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_WorkingFile,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_WorkspaceDirectory,
  Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_WorkspacePath,
} from '../../../types/cli/recipe/pfsense/sync-identity.d.ts';

/**
 * CLI - Recipe - Pfsense - Sync Identity.
 *
 * Keeps the descriptions, homepage, maintainer, and port COMMENT of each pfSense
 * package workspace in step with nova.config.json, editing only those values.
 *
 * @since 0.49.0
 */
export class Runner {
  /**
   * CLI - Recipe - Pfsense - Sync Identity - Run.
   *
   * Verifies the project root and the recipe toggle, then refreshes every
   * configured workspace that has a "port/Makefile.template" file.
   *
   * @param {Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_Returns}
   *
   * @since 0.49.0
   */
  public static async run(options: Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_Options): Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_Returns {
    const currentDirectory: Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_WorkingFile = await new LibNovaConfig().load();
    const recipes: Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_Recipes = workingFile['recipes'];
    const pfsenseRecipes: Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_PfsenseRecipes = (recipes !== undefined) ? recipes['pfsense'] : undefined;
    const syncIdentity: Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_SyncIdentity = (pfsenseRecipes !== undefined) ? pfsenseRecipes['sync-identity'] : undefined;

    if (
      syncIdentity === undefined
      || syncIdentity['enabled'] !== true
    ) {
      Logger.warn('Skipping sync-identity. The recipe is not enabled in the "nova.config.json" file.');

      return;
    }

    const workspacePaths: Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_WorkspacePaths = Object.keys(workingFile['workspaces'] ?? {});
    let targetCount: Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_TargetCount = 0;

    // A pfSense package workspace is one that owns the scaffold's "port/Makefile.template" file.
    for (const workspacePath of workspacePaths) {
      const workspaceDirectory: Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_WorkspaceDirectory = join(currentDirectory, workspacePath);
      const makefilePath: Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_MakefilePath = join(workspaceDirectory, 'port', 'Makefile.template');
      const hasMakefile: Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_HasMakefile = await pathExists(makefilePath);

      if (hasMakefile !== true) {
        continue;
      }

      targetCount += 1;

      await Runner.syncWorkspace(workspaceDirectory, workspacePath, workingFile, isDryRun, isReplaceFile, false);
    }

    if (targetCount === 0) {
      Logger.warn('Skipping sync-identity. No workspace has a "port/Makefile.template" file.');
    }

    return;
  }

  /**
   * CLI - Recipe - Pfsense - Sync Identity - Sync Workspace.
   *
   * Updates one pfSense package workspace from nova.config.json. The pfSense
   * scaffold calls it too, so generated and synced values always match.
   *
   * @param {Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_WorkspaceDirectory} workspaceDirectory - Workspace directory.
   * @param {Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_WorkspacePath}      workspacePath      - Workspace path.
   * @param {Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_WorkingFile}        workingFile        - Working file.
   * @param {Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_IsDryRun}           isDryRun           - Is dry run.
   * @param {Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_IsReplaceFile}      isReplaceFile      - Is replace file.
   * @param {Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_IsSilent}           isSilent           - Is silent.
   *
   * @returns {Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_Returns}
   *
   * @since 0.49.0
   */
  public static async syncWorkspace(workspaceDirectory: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_WorkspaceDirectory, workspacePath: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_WorkspacePath, workingFile: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_WorkingFile, isDryRun: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_IsDryRun, isReplaceFile: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_IsReplaceFile, isSilent: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_IsSilent): Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_Returns {
    const displayPath: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_DisplayPath = workspacePath;
    const commentDestination: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_CommentDestination = resolvePfsenseCommentDestination(workingFile['workspaces'], workspacePath);
    const comment: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_Comment = resolveDestinationDescription(commentDestination, workingFile);

    // A COMMENT that breaks the FreeBSD rules stops this workspace before anything is written.
    if (comment !== undefined) {
      const commentLimitMessage: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_CommentLimitMessage = formatDescriptionLimitMessage(commentDestination, comment);

      if (commentLimitMessage !== undefined) {
        Logger.customize({
          name: 'Runner.syncWorkspace',
          purpose: 'comment',
        }).error(`Skipping "${displayPath}". ${commentLimitMessage}`);

        process.exitCode = 1;

        return false;
      }
    }

    const portDirectory: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_PortDirectory = join(workspaceDirectory, 'port');
    const makefilePath: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_MakefilePath = join(portDirectory, 'Makefile.template');
    const makefileContent: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_MakefileContent = await Runner.readOptionalFile(makefilePath);

    if (makefileContent === undefined) {
      Logger.customize({
        name: 'Runner.syncWorkspace',
        purpose: 'read',
      }).error(`Unable to read "${relative(process.cwd(), makefilePath)}".`);

      process.exitCode = 1;

      return false;
    }

    const shortDescription: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_ShortDescription = (
      workingFile['project'] !== undefined
      && workingFile['project']['description'] !== undefined
    ) ? workingFile['project']['description']['short'] : undefined;
    const longDescription: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_LongDescription = (
      workingFile['project'] !== undefined
      && workingFile['project']['description'] !== undefined
    ) ? workingFile['project']['description']['long'] : undefined;
    const homepage: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_Homepage = (workingFile['urls'] !== undefined) ? workingFile['urls']['homepage'] : undefined;
    const maintainer: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_Maintainer = resolvePfsenseMaintainer(workingFile['entities']);
    const fileUpdates: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_FileUpdates = [];

    // Sync "COMMENT", "WWW", and "MAINTAINER" in the port Makefile template.
    let updatedMakefileContent: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_UpdatedMakefileContent = makefileContent;

    updatedMakefileContent = Runner.applyMakefileVariable(updatedMakefileContent, 'COMMENT', comment, `Set "${commentDestination['overrideField']}" or "project.description.short"`, displayPath, isSilent);
    updatedMakefileContent = Runner.applyMakefileVariable(updatedMakefileContent, 'WWW', homepage, 'Set "urls.homepage"', displayPath, isSilent);
    updatedMakefileContent = Runner.applyMakefileVariable(updatedMakefileContent, 'MAINTAINER', maintainer, 'Add an email to the entity with the "author" role', displayPath, isSilent);

    fileUpdates.push({
      filePath: makefilePath,
      content: makefileContent,
      updatedContent: updatedMakefileContent,
    });

    // Sync "port/pkg-descr" from the long description.
    const packageDescription: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_PackageDescription = wrapPfsensePackageDescription(longDescription);
    const packageDescriptionPath: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_PackageDescriptionPath = join(portDirectory, 'pkg-descr');
    const packageDescriptionContent: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_PackageDescriptionContent = await Runner.readOptionalFile(packageDescriptionPath);

    if (packageDescription === undefined) {
      Runner.report(isSilent, 'warn', `Skipping "pkg-descr" in "${displayPath}". Set "project.description.long" in the "nova.config.json" file.`);
    } else if (packageDescriptionContent === undefined) {
      Runner.report(isSilent, 'warn', `Skipping "pkg-descr" in "${displayPath}". The "port/pkg-descr" file was not found.`);
    } else {
      fileUpdates.push({
        filePath: packageDescriptionPath,
        content: packageDescriptionContent,
        updatedContent: packageDescription,
      });
    }

    // Sync the "descr" element of the package "info.xml" file.
    const infoDescription: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_InfoDescription = formatPfsenseInfoDescription(shortDescription);
    const infoPath: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_InfoPath = await Runner.findInfoFile(join(portDirectory, 'files', 'usr', 'local', 'share'));
    const infoContent: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_InfoContent = (infoPath !== undefined) ? await Runner.readOptionalFile(infoPath) : undefined;

    if (infoDescription === undefined) {
      Runner.report(isSilent, 'warn', `Skipping "info.xml" in "${displayPath}". Set "project.description.short" in the "nova.config.json" file.`);
    } else if (
      infoPath === undefined
      || infoContent === undefined
    ) {
      Runner.report(isSilent, 'warn', `Skipping "info.xml" in "${displayPath}". Exactly one "port/files/usr/local/share/pfSense-pkg-*/info.xml" file is expected.`);
    } else {
      const updatedInfoContent: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_UpdatedInfoContent = replacePfsenseInfoDescription(infoContent, infoDescription);

      if (updatedInfoContent === undefined) {
        Runner.report(isSilent, 'warn', `Skipping "info.xml" in "${displayPath}". No "<descr><![CDATA[...]]></descr>" element was found.`);
      } else {
        fileUpdates.push({
          filePath: infoPath,
          content: infoContent,
          updatedContent: updatedInfoContent,
        });
      }
    }

    // Sync the "$projectDescription" value of the generated About page.
    const aboutPath: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_AboutPath = join(portDirectory, 'files', 'usr', 'local', 'www', `${basename(workspacePath)}-about.php`);
    const aboutContent: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_AboutContent = await Runner.readOptionalFile(aboutPath);

    if (shortDescription === undefined) {
      Runner.report(isSilent, 'warn', `Skipping the About page in "${displayPath}". Set "project.description.short" in the "nova.config.json" file.`);
    } else if (aboutContent === undefined) {
      Runner.report(isSilent, 'warn', `Skipping the About page in "${displayPath}". The "${relative(workspaceDirectory, aboutPath)}" file was not found.`);
    } else {
      const updatedAboutContent: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_UpdatedAboutContent = replacePfsenseAboutDescription(aboutContent, shortDescription);

      if (updatedAboutContent === undefined) {
        Runner.report(isSilent, 'warn', `Skipping the About page in "${displayPath}". No "$projectDescription = '...';" line was found.`);
      } else {
        fileUpdates.push({
          filePath: aboutPath,
          content: aboutContent,
          updatedContent: updatedAboutContent,
        });
      }
    }

    const changedFileUpdates: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_ChangedFileUpdates = fileUpdates.filter((fileUpdate) => fileUpdate['content'] !== fileUpdate['updatedContent']);

    if (changedFileUpdates.length === 0) {
      Runner.report(isSilent, 'info', `Skipping "${displayPath}". The pfSense package identity is already up to date.`);

      return true;
    }

    if (isDryRun === true) {
      for (const changedFileUpdate of changedFileUpdates) {
        Runner.report(isSilent, 'info', `Would update "${relative(process.cwd(), changedFileUpdate['filePath'])}".`);
      }

      return true;
    }

    await Promise.all(changedFileUpdates.map((changedFileUpdate) => saveGeneratedFile(changedFileUpdate['filePath'], changedFileUpdate['updatedContent'], isReplaceFile, undefined, isSilent === false)));

    return true;
  }

  /**
   * CLI - Recipe - Pfsense - Sync Identity - Find Info File.
   *
   * Locates the package "info.xml" under the port's share directory. Exactly one
   * "pfSense-pkg-*" folder must hold it, or the info file is left alone.
   *
   * @param {Cli_Recipe_Pfsense_SyncIdentity_Runner_FindInfoFile_ShareDirectory} shareDirectory - Share directory.
   *
   * @private
   *
   * @returns {Cli_Recipe_Pfsense_SyncIdentity_Runner_FindInfoFile_Returns}
   *
   * @since 0.49.0
   */
  private static async findInfoFile(shareDirectory: Cli_Recipe_Pfsense_SyncIdentity_Runner_FindInfoFile_ShareDirectory): Cli_Recipe_Pfsense_SyncIdentity_Runner_FindInfoFile_Returns {
    let entries: Cli_Recipe_Pfsense_SyncIdentity_Runner_FindInfoFile_Entries = [];

    try {
      entries = await fs.readdir(shareDirectory);
    } catch {
      return undefined;
    }

    const candidates: Cli_Recipe_Pfsense_SyncIdentity_Runner_FindInfoFile_Candidates = entries.filter((entry) => entry.startsWith('pfSense-pkg-') === true).map((entry) => join(shareDirectory, entry, 'info.xml'));
    const existingCandidates: Cli_Recipe_Pfsense_SyncIdentity_Runner_FindInfoFile_ExistingCandidates = [];

    for (const candidate of candidates) {
      if (await pathExists(candidate) === true) {
        existingCandidates.push(candidate);
      }
    }

    return (existingCandidates.length === 1) ? existingCandidates[0] : undefined;
  }

  /**
   * CLI - Recipe - Pfsense - Sync Identity - Read Optional File.
   *
   * Reads a port file as text, returning undefined when it does not exist or
   * cannot be read so each field can be skipped with its own message.
   *
   * @param {Cli_Recipe_Pfsense_SyncIdentity_Runner_ReadOptionalFile_FilePath} filePath - File path.
   *
   * @private
   *
   * @returns {Cli_Recipe_Pfsense_SyncIdentity_Runner_ReadOptionalFile_Returns}
   *
   * @since 0.49.0
   */
  private static async readOptionalFile(filePath: Cli_Recipe_Pfsense_SyncIdentity_Runner_ReadOptionalFile_FilePath): Cli_Recipe_Pfsense_SyncIdentity_Runner_ReadOptionalFile_Returns {
    try {
      return await fs.readFile(filePath, 'utf-8');
    } catch {
      return undefined;
    }
  }

  /**
   * CLI - Recipe - Pfsense - Sync Identity - Apply Makefile Variable.
   *
   * Writes one Makefile variable when a value is configured and the variable is
   * assigned, otherwise reports why it was skipped and keeps the content.
   *
   * @param {Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_Content}          content          - Content.
   * @param {Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_VariableName}     variableName     - Variable name.
   * @param {Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_Value}            value            - Value.
   * @param {Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_MissingValueHint} missingValueHint - Missing value hint.
   * @param {Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_DisplayPath}      displayPath      - Display path.
   * @param {Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_IsSilent}         isSilent         - Is silent.
   *
   * @private
   *
   * @returns {Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_Returns}
   *
   * @since 0.49.0
   */
  private static applyMakefileVariable(content: Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_Content, variableName: Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_VariableName, value: Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_Value, missingValueHint: Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_MissingValueHint, displayPath: Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_DisplayPath, isSilent: Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_IsSilent): Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_Returns {
    if (value === undefined) {
      Runner.report(isSilent, 'warn', `Skipping "${variableName}" in "${displayPath}". ${missingValueHint} in the "nova.config.json" file.`);

      return content;
    }

    const updatedContent: Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_UpdatedContent = replacePfsenseMakefileVariable(content, variableName, value);

    if (updatedContent === undefined) {
      Runner.report(isSilent, 'warn', `Skipping "${variableName}" in "${displayPath}". The "port/Makefile.template" file does not assign it.`);

      return content;
    }

    return updatedContent;
  }

  /**
   * CLI - Recipe - Pfsense - Sync Identity - Report.
   *
   * Prints one recipe message unless the caller asked for silence. The scaffold
   * runs the same sync quietly so its progress output stays readable.
   *
   * @param {Cli_Recipe_Pfsense_SyncIdentity_Runner_Report_IsSilent} isSilent - Is silent.
   * @param {Cli_Recipe_Pfsense_SyncIdentity_Runner_Report_Level}    level    - Level.
   * @param {Cli_Recipe_Pfsense_SyncIdentity_Runner_Report_Message}  message  - Message.
   *
   * @private
   *
   * @returns {Cli_Recipe_Pfsense_SyncIdentity_Runner_Report_Returns}
   *
   * @since 0.49.0
   */
  private static report(isSilent: Cli_Recipe_Pfsense_SyncIdentity_Runner_Report_IsSilent, level: Cli_Recipe_Pfsense_SyncIdentity_Runner_Report_Level, message: Cli_Recipe_Pfsense_SyncIdentity_Runner_Report_Message): Cli_Recipe_Pfsense_SyncIdentity_Runner_Report_Returns {
    if (isSilent === true) {
      return;
    }

    if (level === 'warn') {
      Logger.customize({
        name: 'Runner.syncWorkspace',
        purpose: 'pfsense',
      }).warn(message);

      return;
    }

    Logger.customize({
      name: 'Runner.syncWorkspace',
      purpose: 'pfsense',
    }).info(message);

    return;
  }
}
