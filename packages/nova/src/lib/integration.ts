import { promises as fs } from 'node:fs';
import {
  basename,
  join,
  normalize,
} from 'node:path';

import prompts from 'prompts';

import { Logger } from '../toolkit/index.js';
import { Runner as LibNovaConfig } from './nova-config.js';
import {
  isPlainObject,
  isProjectRoot,
  pathExists,
} from './utility.js';

import type {
  Lib_Integration_CollectAssetTargets_AllowedPositionPrefixes,
  Lib_Integration_CollectAssetTargets_BaseDirectory,
  Lib_Integration_CollectAssetTargets_CanonicalLocales,
  Lib_Integration_CollectAssetTargets_DirectoryEntries,
  Lib_Integration_CollectAssetTargets_FileEntries,
  Lib_Integration_CollectAssetTargets_Files,
  Lib_Integration_CollectAssetTargets_FirstLevelEntries,
  Lib_Integration_CollectAssetTargets_FirstLevelPath,
  Lib_Integration_CollectAssetTargets_Options,
  Lib_Integration_CollectAssetTargets_Position,
  Lib_Integration_CollectAssetTargets_PositionPrefix,
  Lib_Integration_CollectAssetTargets_Positions,
  Lib_Integration_CollectAssetTargets_RelativePath,
  Lib_Integration_CollectAssetTargets_Returns,
  Lib_Integration_CollectAssetTargets_SecondLevelEntries,
  Lib_Integration_CollectAssetTargets_SecondLevelPath,
  Lib_Integration_CollectAssetTargets_Target,
  Lib_Integration_CollectAssetTargets_TargetEntries,
  Lib_Integration_CollectAssetTargets_TargetPath,
  Lib_Integration_CollectAssetTargets_Targets,
  Lib_Integration_CollectMetadataTargets_AllowedFields,
  Lib_Integration_CollectMetadataTargets_Attributes,
  Lib_Integration_CollectMetadataTargets_BaseDirectory,
  Lib_Integration_CollectMetadataTargets_CanonicalLocales,
  Lib_Integration_CollectMetadataTargets_FileEntries,
  Lib_Integration_CollectMetadataTargets_FilePath,
  Lib_Integration_CollectMetadataTargets_FirstLevelEntries,
  Lib_Integration_CollectMetadataTargets_FirstLevelPath,
  Lib_Integration_CollectMetadataTargets_Locale,
  Lib_Integration_CollectMetadataTargets_Parsed,
  Lib_Integration_CollectMetadataTargets_Raw,
  Lib_Integration_CollectMetadataTargets_Returns,
  Lib_Integration_CollectMetadataTargets_Target,
  Lib_Integration_CollectMetadataTargets_Targets,
  Lib_Integration_CollectMetadataTargets_Value,
  Lib_Integration_ConfirmPlan_Answers,
  Lib_Integration_ConfirmPlan_IsDryRun,
  Lib_Integration_ConfirmPlan_IsNonInteractive,
  Lib_Integration_ConfirmPlan_IsYes,
  Lib_Integration_ConfirmPlan_Returns,
  Lib_Integration_ParseCommaSeparated_Returns,
  Lib_Integration_ParseCommaSeparated_Value,
  Lib_Integration_ReadDotenvValue_CandidateKey,
  Lib_Integration_ReadDotenvValue_Content,
  Lib_Integration_ReadDotenvValue_DotenvLine,
  Lib_Integration_ReadDotenvValue_ExportlessLine,
  Lib_Integration_ReadDotenvValue_FilePath,
  Lib_Integration_ReadDotenvValue_Key,
  Lib_Integration_ReadDotenvValue_Lines,
  Lib_Integration_ReadDotenvValue_Returns,
  Lib_Integration_ReadDotenvValue_SeparatorIndex,
  Lib_Integration_ReadDotenvValue_TrimmedLine,
  Lib_Integration_ReadDotenvValue_Value,
  Lib_Integration_ReportPlan_Label,
  Lib_Integration_ReportPlan_Lines,
  Lib_Integration_ReportPlan_Returns,
  Lib_Integration_RequireArray_Name,
  Lib_Integration_RequireArray_Returns,
  Lib_Integration_RequireArray_Value,
  Lib_Integration_RequireNonNegativeInteger_Name,
  Lib_Integration_RequireNonNegativeInteger_Returns,
  Lib_Integration_RequireNonNegativeInteger_Value,
  Lib_Integration_RequireObject_Name,
  Lib_Integration_RequireObject_Returns,
  Lib_Integration_RequireObject_Value,
  Lib_Integration_RequireString_Name,
  Lib_Integration_RequireString_Returns,
  Lib_Integration_RequireString_Value,
  Lib_Integration_ResolveWorkspace_Answers,
  Lib_Integration_ResolveWorkspace_Candidate,
  Lib_Integration_ResolveWorkspace_Candidates,
  Lib_Integration_ResolveWorkspace_Config,
  Lib_Integration_ResolveWorkspace_CurrentDirectory,
  Lib_Integration_ResolveWorkspace_HasMarker,
  Lib_Integration_ResolveWorkspace_IsAtProjectRoot,
  Lib_Integration_ResolveWorkspace_Markers,
  Lib_Integration_ResolveWorkspace_Matches,
  Lib_Integration_ResolveWorkspace_NormalizedPath,
  Lib_Integration_ResolveWorkspace_Options,
  Lib_Integration_ResolveWorkspace_RequestedCandidate,
  Lib_Integration_ResolveWorkspace_RequestedWorkspace,
  Lib_Integration_ResolveWorkspace_Returns,
  Lib_Integration_ResolveWorkspace_SelectedPath,
  Lib_Integration_ResolveWorkspace_SingleCandidate,
  Lib_Integration_ResolveWorkspace_WorkspaceAbsolutePath,
  Lib_Integration_ResolveWorkspace_WorkspaceEntries,
  Lib_Integration_ResolveWorkspace_WorkspaceName,
  Lib_Integration_ResolveWorkspace_WorkspacePath,
  Lib_Integration_Wait_Milliseconds,
  Lib_Integration_Wait_Returns,
} from '../types/lib/integration.d.ts';

/**
 * Lib - Integration - Parse Comma Separated.
 *
 * Normalizes repeatable selection flags into stable unique values so vendor
 * commands share one predictable locale and platform filtering contract.
 *
 * @param {Lib_Integration_ParseCommaSeparated_Value} value - Value.
 *
 * @returns {Lib_Integration_ParseCommaSeparated_Returns}
 *
 * @since 0.34.0
 */
export function parseCommaSeparated(value: Lib_Integration_ParseCommaSeparated_Value): Lib_Integration_ParseCommaSeparated_Returns {
  if (value === undefined) {
    return undefined;
  }

  return [...new Set(value.split(',').map((item) => item.trim()).filter((item) => item !== ''))];
}

/**
 * Lib - Integration - Resolve Workspace.
 *
 * Resolves a configured Nova workspace by path, folder name, or package name.
 * Interactive sessions choose among matching marker files when no flag is given.
 *
 * @param {Lib_Integration_ResolveWorkspace_Options} options - Options.
 * @param {Lib_Integration_ResolveWorkspace_Markers} markers - Markers.
 *
 * @returns {Lib_Integration_ResolveWorkspace_Returns}
 *
 * @since 0.34.0
 */
export async function resolveWorkspace(options: Lib_Integration_ResolveWorkspace_Options, markers: Lib_Integration_ResolveWorkspace_Markers): Lib_Integration_ResolveWorkspace_Returns {
  const currentDirectory: Lib_Integration_ResolveWorkspace_CurrentDirectory = process.cwd();
  const isAtProjectRoot: Lib_Integration_ResolveWorkspace_IsAtProjectRoot = await isProjectRoot(currentDirectory);

  if (isAtProjectRoot !== true) {
    throw new Error('Run Nova integrations from the repository root containing nova.config.json.');
  }

  const config: Lib_Integration_ResolveWorkspace_Config = await new LibNovaConfig().load(currentDirectory);
  const workspaceEntries: Lib_Integration_ResolveWorkspace_WorkspaceEntries = Object.entries(config['workspaces'] ?? {});
  const requestedWorkspace: Lib_Integration_ResolveWorkspace_RequestedWorkspace = options['workspace'];
  let candidates: Lib_Integration_ResolveWorkspace_Candidates = [];

  for (const workspaceEntry of workspaceEntries) {
    const workspacePath: Lib_Integration_ResolveWorkspace_WorkspacePath = workspaceEntry[0];
    const normalizedPath: Lib_Integration_ResolveWorkspace_NormalizedPath = normalize((workspacePath.startsWith('./') === true) ? workspacePath.slice(2) : workspacePath);

    if (normalizedPath === '.' || normalizedPath === '') {
      continue;
    }

    const workspaceAbsolutePath: Lib_Integration_ResolveWorkspace_WorkspaceAbsolutePath = join(currentDirectory, normalizedPath);
    let hasMarker: Lib_Integration_ResolveWorkspace_HasMarker = markers.length === 0;

    for (const marker of markers) {
      if (await pathExists(join(workspaceAbsolutePath, marker)) === true) {
        hasMarker = true;

        break;
      }
    }

    if (hasMarker === false) {
      continue;
    }

    const workspaceName: Lib_Integration_ResolveWorkspace_WorkspaceName = basename(normalizedPath);

    candidates.push({
      absolutePath: workspaceAbsolutePath,
      configuredName: workspaceEntry[1]['name'],
      name: workspaceName,
      path: workspacePath,
      relativePath: normalizedPath,
    });
  }

  if (requestedWorkspace !== undefined) {
    const matches: Lib_Integration_ResolveWorkspace_Matches = candidates.filter((candidate) => [
      candidate['configuredName'],
      candidate['name'],
      candidate['path'],
      candidate['relativePath'],
      `./${candidate['relativePath']}`,
    ].includes(requestedWorkspace));

    if (matches.length !== 1) {
      throw new Error(`Expected one configured workspace matching "${requestedWorkspace}"; found ${matches.length}.`);
    }

    const requestedCandidate: Lib_Integration_ResolveWorkspace_RequestedCandidate = matches[0];

    if (requestedCandidate === undefined) {
      throw new Error(`No configured workspace matched "${requestedWorkspace}".`);
    }

    return requestedCandidate;
  }

  if (candidates.length === 0) {
    throw new Error(`No configured workspace contains any required marker: ${markers.join(', ')}.`);
  }

  if (candidates.length === 1) {
    const singleCandidate: Lib_Integration_ResolveWorkspace_SingleCandidate = candidates[0];

    if (singleCandidate === undefined) {
      throw new Error('The compatible workspace could not be resolved.');
    }

    return singleCandidate;
  }

  if (options['nonInteractive'] === true) {
    throw new Error('More than one compatible workspace exists. Pass --workspace in non-interactive mode.');
  }

  candidates = candidates.sort((left, right) => left['relativePath'].localeCompare(right['relativePath']));

  const answers: Lib_Integration_ResolveWorkspace_Answers = await prompts({
    type: 'select',
    name: 'workspacePath',
    message: 'Workspace:',
    choices: candidates.map((candidate) => ({
      title: `${candidate['name']} (${candidate['relativePath']})`,
      value: candidate['path'],
    })),
  }, {
    onCancel: () => false,
  });
  const selectedPath: Lib_Integration_ResolveWorkspace_SelectedPath = answers['workspacePath'];
  const candidate: Lib_Integration_ResolveWorkspace_Candidate = candidates.find((item) => item['path'] === selectedPath);

  if (candidate === undefined) {
    throw new Error('Workspace selection was cancelled.');
  }

  return candidate;
}

/**
 * Lib - Integration - Collect Metadata Targets.
 *
 * Reads platform and locale JSON files while preserving only explicitly supplied
 * fields. Null values remain placeholders and never become remote mutations.
 *
 * @param {Lib_Integration_CollectMetadataTargets_BaseDirectory} baseDirectory - Base directory.
 * @param {Lib_Integration_CollectMetadataTargets_AllowedFields} allowedFields - Allowed fields.
 *
 * @returns {Lib_Integration_CollectMetadataTargets_Returns}
 *
 * @since 0.34.0
 */
export async function collectMetadataTargets(baseDirectory: Lib_Integration_CollectMetadataTargets_BaseDirectory, allowedFields: Lib_Integration_CollectMetadataTargets_AllowedFields): Lib_Integration_CollectMetadataTargets_Returns {
  if (await pathExists(baseDirectory) === false) {
    throw new Error(`Metadata directory does not exist: ${baseDirectory}`);
  }

  const firstLevelEntries: Lib_Integration_CollectMetadataTargets_FirstLevelEntries = await fs.readdir(baseDirectory, { withFileTypes: true });
  const targets: Lib_Integration_CollectMetadataTargets_Targets = [];

  for (const firstLevelEntry of firstLevelEntries.filter((entry) => entry.isDirectory()).sort((left, right) => left.name.localeCompare(right.name))) {
    const firstLevelPath: Lib_Integration_CollectMetadataTargets_FirstLevelPath = join(baseDirectory, firstLevelEntry.name);
    const fileEntries: Lib_Integration_CollectMetadataTargets_FileEntries = await fs.readdir(firstLevelPath, { withFileTypes: true });

    for (const fileEntry of fileEntries.filter((entry) => entry.isFile() && entry.name.endsWith('.json')).sort((left, right) => left.name.localeCompare(right.name))) {
      const locale: Lib_Integration_CollectMetadataTargets_Locale = fileEntry.name.slice(0, -'.json'.length);

      try {
        const canonicalLocales: Lib_Integration_CollectMetadataTargets_CanonicalLocales = Intl.getCanonicalLocales(locale);

        if (canonicalLocales.length !== 1) {
          throw new Error(`Metadata file uses an invalid locale name: ${fileEntry.name}`);
        }
      } catch {
        throw new Error(`Metadata file uses an invalid locale name: ${fileEntry.name}`);
      }

      const filePath: Lib_Integration_CollectMetadataTargets_FilePath = join(firstLevelPath, fileEntry.name);
      const raw: Lib_Integration_CollectMetadataTargets_Raw = await fs.readFile(filePath, 'utf-8');
      const parsed: Lib_Integration_CollectMetadataTargets_Parsed = JSON.parse(raw);

      if (isPlainObject(parsed) === false) {
        throw new Error(`Metadata file must contain a JSON object: ${filePath}`);
      }

      const attributes: Lib_Integration_CollectMetadataTargets_Attributes = {};

      for (const allowedField of allowedFields) {
        const value: Lib_Integration_CollectMetadataTargets_Value = parsed[allowedField];

        if (value === null || value === undefined) {
          continue;
        }

        if (typeof value !== 'string') {
          throw new Error(`Metadata field "${allowedField}" must be a string or null in ${filePath}.`);
        }

        Reflect.set(attributes, allowedField, value);
      }

      if (Object.keys(attributes).length === 0) {
        throw new Error(`Metadata file does not supply any editable fields: ${filePath}`);
      }

      const target: Lib_Integration_CollectMetadataTargets_Target = {
        attributes,
        filePath,
        locale,
        platform: firstLevelEntry.name,
      };

      targets.push(target);
    }
  }

  if (targets.length === 0) {
    throw new Error(`No metadata targets were found in ${baseDirectory}.`);
  }

  return targets;
}

/**
 * Lib - Integration - Collect Asset Targets.
 *
 * Reads platform, locale, and vendor target folders. Existing empty target
 * folders fail clearly, while entirely absent targets remain untouched.
 *
 * @param {Lib_Integration_CollectAssetTargets_BaseDirectory} baseDirectory - Base directory.
 * @param {Lib_Integration_CollectAssetTargets_Options}       options       - Options.
 *
 * @returns {Lib_Integration_CollectAssetTargets_Returns}
 *
 * @since 0.34.0
 */
export async function collectAssetTargets(baseDirectory: Lib_Integration_CollectAssetTargets_BaseDirectory, options: Lib_Integration_CollectAssetTargets_Options): Lib_Integration_CollectAssetTargets_Returns {
  if (await pathExists(baseDirectory) === false) {
    throw new Error(`Asset directory does not exist: ${baseDirectory}`);
  }

  const firstLevelEntries: Lib_Integration_CollectAssetTargets_FirstLevelEntries = await fs.readdir(baseDirectory, { withFileTypes: true });
  const targets: Lib_Integration_CollectAssetTargets_Targets = [];
  const allowedPositionPrefixes: Lib_Integration_CollectAssetTargets_AllowedPositionPrefixes = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
  ];

  for (const firstLevelEntry of firstLevelEntries.filter((entry) => entry.isDirectory()).sort((left, right) => left.name.localeCompare(right.name))) {
    const firstLevelPath: Lib_Integration_CollectAssetTargets_FirstLevelPath = join(baseDirectory, firstLevelEntry.name);
    const secondLevelEntries: Lib_Integration_CollectAssetTargets_SecondLevelEntries = await fs.readdir(firstLevelPath, { withFileTypes: true });

    for (const secondLevelEntry of secondLevelEntries.filter((entry) => entry.isDirectory()).sort((left, right) => left.name.localeCompare(right.name))) {
      try {
        const canonicalLocales: Lib_Integration_CollectAssetTargets_CanonicalLocales = Intl.getCanonicalLocales(secondLevelEntry.name);

        if (canonicalLocales.length !== 1) {
          throw new Error(`Asset directory uses an invalid locale name: ${secondLevelEntry.name}`);
        }
      } catch {
        throw new Error(`Asset directory uses an invalid locale name: ${secondLevelEntry.name}`);
      }

      const secondLevelPath: Lib_Integration_CollectAssetTargets_SecondLevelPath = join(firstLevelPath, secondLevelEntry.name);
      const targetEntries: Lib_Integration_CollectAssetTargets_TargetEntries = await fs.readdir(secondLevelPath, { withFileTypes: true });

      for (const targetEntry of targetEntries.filter((entry) => entry.isDirectory()).sort((left, right) => left.name.localeCompare(right.name))) {
        const targetPath: Lib_Integration_CollectAssetTargets_TargetPath = join(secondLevelPath, targetEntry.name);
        const directoryEntries: Lib_Integration_CollectAssetTargets_DirectoryEntries = await fs.readdir(targetPath, { withFileTypes: true });
        const fileEntries: Lib_Integration_CollectAssetTargets_FileEntries = directoryEntries.filter((entry) => entry.isFile() && options['extensions'].includes(entry.name.slice(entry.name.lastIndexOf('.')).toLowerCase()));

        if (fileEntries.length === 0) {
          throw new Error(`Asset target exists but contains no supported files: ${targetPath}`);
        }

        const files: Lib_Integration_CollectAssetTargets_Files = [];
        const positions: Lib_Integration_CollectAssetTargets_Positions = new Set();

        for (const fileEntry of fileEntries.sort((left, right) => left.name.localeCompare(right.name))) {
          let position: Lib_Integration_CollectAssetTargets_Position = files.length + 1;

          if (options['positioned'] === true) {
            const positionPrefix: Lib_Integration_CollectAssetTargets_PositionPrefix = fileEntry.name.slice(0, 2);

            if (allowedPositionPrefixes.includes(positionPrefix) === false) {
              throw new Error(`Asset filename must begin with 01 through 10: ${join(targetPath, fileEntry.name)}`);
            }

            position = Number.parseInt(positionPrefix, 10);

            if (positions.has(position) === true) {
              throw new Error(`Asset target contains duplicate position ${position}: ${targetPath}`);
            }

            positions.add(position);
          }

          files.push({
            fileName: fileEntry.name,
            filePath: join(targetPath, fileEntry.name),
            position,
          });
        }

        const relativePath: Lib_Integration_CollectAssetTargets_RelativePath = [
          firstLevelEntry.name,
          secondLevelEntry.name,
          targetEntry.name,
        ].join('/');
        const target: Lib_Integration_CollectAssetTargets_Target = {
          files: files.sort((left, right) => left['position'] - right['position']),
          locale: secondLevelEntry.name,
          platform: firstLevelEntry.name,
          relativePath,
          target: targetEntry.name,
        };

        targets.push(target);
      }
    }
  }

  if (targets.length === 0) {
    throw new Error(`No asset targets were found in ${baseDirectory}.`);
  }

  return targets;
}

/**
 * Lib - Integration - Report Plan.
 *
 * Prints the complete local mutation plan before authentication or remote writes
 * so interactive and automated callers can audit the exact targets first.
 *
 * @param {Lib_Integration_ReportPlan_Label} label - Label.
 * @param {Lib_Integration_ReportPlan_Lines} lines - Lines.
 *
 * @returns {Lib_Integration_ReportPlan_Returns}
 *
 * @since 0.34.0
 */
export function reportPlan(label: Lib_Integration_ReportPlan_Label, lines: Lib_Integration_ReportPlan_Lines): Lib_Integration_ReportPlan_Returns {
  Logger.customize({
    name: 'Integration',
    purpose: 'plan',
  }).info([
    label,
    lines.map((line) => `  - ${line}`).join('\n'),
  ].join('\n'));

  return;
}

/**
 * Lib - Integration - Confirm Plan.
 *
 * Applies one confirmation boundary to every mutating integration command.
 * Non-interactive callers must opt in explicitly with --yes.
 *
 * @param {Lib_Integration_ConfirmPlan_IsDryRun}         isDryRun         - Is dry run.
 * @param {Lib_Integration_ConfirmPlan_IsNonInteractive} isNonInteractive - Is non interactive.
 * @param {Lib_Integration_ConfirmPlan_IsYes}            isYes            - Is yes.
 *
 * @returns {Lib_Integration_ConfirmPlan_Returns}
 *
 * @since 0.34.0
 */
export async function confirmPlan(isDryRun: Lib_Integration_ConfirmPlan_IsDryRun, isNonInteractive: Lib_Integration_ConfirmPlan_IsNonInteractive, isYes: Lib_Integration_ConfirmPlan_IsYes): Lib_Integration_ConfirmPlan_Returns {
  if (isDryRun === true || isYes === true) {
    return true;
  }

  if (isNonInteractive === true) {
    throw new Error('Non-interactive mutations require -y or --yes.');
  }

  const answers: Lib_Integration_ConfirmPlan_Answers = await prompts({
    type: 'confirm',
    name: 'confirmed',
    message: 'Apply this integration plan?',
    initial: false,
  }, {
    onCancel: () => false,
  });

  return answers['confirmed'] === true;
}

/**
 * Lib - Integration - Read Dotenv Value.
 *
 * Reads one exact key from a local dotenv file without loading unrelated values
 * into the current process. This is used only for Discord's conventional token.
 *
 * @param {Lib_Integration_ReadDotenvValue_FilePath} filePath - File path.
 * @param {Lib_Integration_ReadDotenvValue_Key}      key      - Key.
 *
 * @returns {Lib_Integration_ReadDotenvValue_Returns}
 *
 * @since 0.34.0
 */
export async function readDotenvValue(filePath: Lib_Integration_ReadDotenvValue_FilePath, key: Lib_Integration_ReadDotenvValue_Key): Lib_Integration_ReadDotenvValue_Returns {
  if (await pathExists(filePath) === false) {
    return undefined;
  }

  const content: Lib_Integration_ReadDotenvValue_Content = await fs.readFile(filePath, 'utf-8');
  const lines: Lib_Integration_ReadDotenvValue_Lines = content.replaceAll('\r\n', '\n').split('\n');

  for (const line of lines) {
    const trimmedLine: Lib_Integration_ReadDotenvValue_TrimmedLine = line.trim();
    const exportlessLine: Lib_Integration_ReadDotenvValue_ExportlessLine = (trimmedLine.startsWith('export ') === true) ? trimmedLine.slice('export '.length).trimStart() : trimmedLine;
    const separatorIndex: Lib_Integration_ReadDotenvValue_SeparatorIndex = exportlessLine.indexOf('=');

    if (separatorIndex < 1) {
      continue;
    }

    const candidateKey: Lib_Integration_ReadDotenvValue_CandidateKey = exportlessLine.slice(0, separatorIndex).trim();

    if (candidateKey !== key) {
      continue;
    }

    const dotenvLine: Lib_Integration_ReadDotenvValue_DotenvLine = exportlessLine.slice(separatorIndex + 1);
    const value: Lib_Integration_ReadDotenvValue_Value = dotenvLine.trim();

    if (
      (
        value.startsWith('"') === true
        && value.endsWith('"') === true
      )
      || (
        value.startsWith('\'') === true
        && value.endsWith('\'') === true
      )
    ) {
      return value.slice(1, -1);
    }

    return value;
  }

  return undefined;
}

/**
 * Lib - Integration - Require Object.
 *
 * Narrows untrusted vendor API data to a plain record before callers read it,
 * keeping malformed responses from leaking into later mutation decisions.
 *
 * @param {Lib_Integration_RequireObject_Value} value - Value.
 * @param {Lib_Integration_RequireObject_Name}  name  - Name.
 *
 * @returns {Lib_Integration_RequireObject_Returns}
 *
 * @since 0.34.0
 */
export function requireObject(value: Lib_Integration_RequireObject_Value, name: Lib_Integration_RequireObject_Name): Lib_Integration_RequireObject_Returns {
  if (isPlainObject(value) === false) {
    throw new TypeError(`${name} must be an object.`);
  }

  return value;
}

/**
 * Lib - Integration - Require Array.
 *
 * Narrows untrusted vendor API collections before callers iterate them so an
 * unexpected response shape produces one actionable validation error.
 *
 * @param {Lib_Integration_RequireArray_Value} value - Value.
 * @param {Lib_Integration_RequireArray_Name}  name  - Name.
 *
 * @returns {Lib_Integration_RequireArray_Returns}
 *
 * @since 0.34.0
 */
export function requireArray(value: Lib_Integration_RequireArray_Value, name: Lib_Integration_RequireArray_Name): Lib_Integration_RequireArray_Returns {
  if (Array.isArray(value) === false) {
    throw new TypeError(`${name} must be an array.`);
  }

  return value;
}

/**
 * Lib - Integration - Require String.
 *
 * Narrows required vendor identifiers and fields to non-empty strings before
 * they are used in request paths, authentication, or verification output.
 *
 * @param {Lib_Integration_RequireString_Value} value - Value.
 * @param {Lib_Integration_RequireString_Name}  name  - Name.
 *
 * @returns {Lib_Integration_RequireString_Returns}
 *
 * @since 0.34.0
 */
export function requireString(value: Lib_Integration_RequireString_Value, name: Lib_Integration_RequireString_Name): Lib_Integration_RequireString_Returns {
  if (typeof value !== 'string' || value === '') {
    throw new TypeError(`${name} must be a non-empty string.`);
  }

  return value;
}

/**
 * Lib - Integration - Require Non Negative Integer.
 *
 * Validates byte ranges returned by upload reservation APIs before slicing
 * local files, preventing malformed operations from reading outside a buffer.
 *
 * @param {Lib_Integration_RequireNonNegativeInteger_Value} value - Value.
 * @param {Lib_Integration_RequireNonNegativeInteger_Name}  name  - Name.
 *
 * @returns {Lib_Integration_RequireNonNegativeInteger_Returns}
 *
 * @since 0.34.0
 */
export function requireNonNegativeInteger(value: Lib_Integration_RequireNonNegativeInteger_Value, name: Lib_Integration_RequireNonNegativeInteger_Name): Lib_Integration_RequireNonNegativeInteger_Returns {
  if (
    typeof value !== 'number'
    || Number.isInteger(value) === false
    || value < 0
  ) {
    throw new TypeError(`${name} must be a non-negative integer.`);
  }

  return value;
}

/**
 * Lib - Integration - Wait.
 *
 * Pauses retry and remote-processing loops without blocking the Node.js event
 * loop, allowing all vendor clients to share one timing implementation.
 *
 * @param {Lib_Integration_Wait_Milliseconds} milliseconds - Milliseconds.
 *
 * @returns {Lib_Integration_Wait_Returns}
 *
 * @since 0.34.0
 */
export async function wait(milliseconds: Lib_Integration_Wait_Milliseconds): Lib_Integration_Wait_Returns {
  await new Promise((resolvePromise) => {
    setTimeout(resolvePromise, milliseconds);

    return;
  });

  return;
}
