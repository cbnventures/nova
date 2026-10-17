import { createHash, randomUUID } from 'node:crypto';
import {
  lstat, mkdir, readdir, readFile, readlink, rename, writeFile,
} from 'node:fs/promises';
import { arch, platform } from 'node:os';
import {
  dirname, isAbsolute, relative, resolve, sep,
} from 'node:path';

import type {
  Lib_RunWorkspacesCache_CacheFormatVersion,
  Lib_RunWorkspacesCache_CreateContextDigest_DependencyEntries,
  Lib_RunWorkspacesCache_CreateContextDigest_EnvironmentDigest,
  Lib_RunWorkspacesCache_CreateContextDigest_LockfileContents,
  Lib_RunWorkspacesCache_CreateContextDigest_LockfileName,
  Lib_RunWorkspacesCache_CreateContextDigest_NovaConfigContents,
  Lib_RunWorkspacesCache_CreateContextDigest_Options,
  Lib_RunWorkspacesCache_CreateContextDigest_PackageJsonContents,
  Lib_RunWorkspacesCache_CreateContextDigest_Payload,
  Lib_RunWorkspacesCache_CreateContextDigest_Returns,
  Lib_RunWorkspacesCache_GetEnvironmentDigest_Entries,
  Lib_RunWorkspacesCache_GetEnvironmentDigest_FilteredEntries,
  Lib_RunWorkspacesCache_GetEnvironmentDigest_Returns,
  Lib_RunWorkspacesCache_GetRecordPath_CacheDirectory,
  Lib_RunWorkspacesCache_GetRecordPath_FileName,
  Lib_RunWorkspacesCache_GetRecordPath_Returns,
  Lib_RunWorkspacesCache_GetRecordPath_TaskDigest,
  Lib_RunWorkspacesCache_GetRecordPath_TaskKey,
  Lib_RunWorkspacesCache_GetWorkspaceStateDigest_CacheDirectory,
  Lib_RunWorkspacesCache_GetWorkspaceStateDigest_Hash,
  Lib_RunWorkspacesCache_GetWorkspaceStateDigest_Returns,
  Lib_RunWorkspacesCache_GetWorkspaceStateDigest_WorkspaceDirectory,
  Lib_RunWorkspacesCache_HashText_Returns,
  Lib_RunWorkspacesCache_HashText_Text,
  Lib_RunWorkspacesCache_IsPathInside_CandidatePath,
  Lib_RunWorkspacesCache_IsPathInside_RelativePath,
  Lib_RunWorkspacesCache_IsPathInside_Returns,
  Lib_RunWorkspacesCache_IsPathInside_RootPath,
  Lib_RunWorkspacesCache_ReadCacheRecord_CacheDirectory,
  Lib_RunWorkspacesCache_ReadCacheRecord_Parsed,
  Lib_RunWorkspacesCache_ReadCacheRecord_Raw,
  Lib_RunWorkspacesCache_ReadCacheRecord_RecordPath,
  Lib_RunWorkspacesCache_ReadCacheRecord_Returns,
  Lib_RunWorkspacesCache_ReadCacheRecord_TaskKey,
  Lib_RunWorkspacesCache_ReadOptionalText_Path,
  Lib_RunWorkspacesCache_ReadOptionalText_Returns,
  Lib_RunWorkspacesCache_ResolveCacheDirectory_ConfiguredDirectory,
  Lib_RunWorkspacesCache_ResolveCacheDirectory_RelativeDirectory,
  Lib_RunWorkspacesCache_ResolveCacheDirectory_ResolvedDirectory,
  Lib_RunWorkspacesCache_ResolveCacheDirectory_Returns,
  Lib_RunWorkspacesCache_ResolveCacheDirectory_RootDirectory,
  Lib_RunWorkspacesCache_VisitDirectory_CacheDirectory,
  Lib_RunWorkspacesCache_VisitDirectory_Directory,
  Lib_RunWorkspacesCache_VisitDirectory_Entries,
  Lib_RunWorkspacesCache_VisitDirectory_EntryMode,
  Lib_RunWorkspacesCache_VisitDirectory_EntryPath,
  Lib_RunWorkspacesCache_VisitDirectory_EntryStats,
  Lib_RunWorkspacesCache_VisitDirectory_FileContents,
  Lib_RunWorkspacesCache_VisitDirectory_Hash,
  Lib_RunWorkspacesCache_VisitDirectory_IsCachePath,
  Lib_RunWorkspacesCache_VisitDirectory_IsIgnoredDirectory,
  Lib_RunWorkspacesCache_VisitDirectory_RelativeEntryPath,
  Lib_RunWorkspacesCache_VisitDirectory_Returns,
  Lib_RunWorkspacesCache_VisitDirectory_SymbolicLinkTarget,
  Lib_RunWorkspacesCache_VisitDirectory_WorkspaceDirectory,
  Lib_RunWorkspacesCache_WriteCacheRecord_CacheDirectory,
  Lib_RunWorkspacesCache_WriteCacheRecord_Record,
  Lib_RunWorkspacesCache_WriteCacheRecord_RecordPath,
  Lib_RunWorkspacesCache_WriteCacheRecord_Returns,
  Lib_RunWorkspacesCache_WriteCacheRecord_TaskKey,
  Lib_RunWorkspacesCache_WriteCacheRecord_TemporaryPath,
} from '../types/lib/run-workspaces-cache.d.ts';

/**
 * Lib - Run Workspaces Cache - Cache Format Version.
 *
 * Invalidates existing records whenever Nova changes the on-disk cache
 * contract so incompatible data becomes a safe miss.
 *
 * @since 0.32.0
 */
const cacheFormatVersion: Lib_RunWorkspacesCache_CacheFormatVersion = 1;

/**
 * Lib - Run Workspaces Cache - Resolve Cache Directory.
 *
 * Resolves a project-relative cache directory while preventing cache writes
 * outside the Nova project or over the project root itself.
 *
 * @param {Lib_RunWorkspacesCache_ResolveCacheDirectory_RootDirectory}       rootDirectory       - Root directory.
 * @param {Lib_RunWorkspacesCache_ResolveCacheDirectory_ConfiguredDirectory} configuredDirectory - Configured directory.
 *
 * @returns {Lib_RunWorkspacesCache_ResolveCacheDirectory_Returns}
 *
 * @since 0.32.0
 */
export function resolveCacheDirectory(rootDirectory: Lib_RunWorkspacesCache_ResolveCacheDirectory_RootDirectory, configuredDirectory: Lib_RunWorkspacesCache_ResolveCacheDirectory_ConfiguredDirectory): Lib_RunWorkspacesCache_ResolveCacheDirectory_Returns {
  const resolvedDirectory: Lib_RunWorkspacesCache_ResolveCacheDirectory_ResolvedDirectory = resolve(rootDirectory, configuredDirectory);
  const relativeDirectory: Lib_RunWorkspacesCache_ResolveCacheDirectory_RelativeDirectory = relative(rootDirectory, resolvedDirectory);

  if (
    relativeDirectory.length === 0
    || relativeDirectory === '..'
    || relativeDirectory.startsWith(`..${sep}`) === true
    || isAbsolute(relativeDirectory) === true
  ) {
    throw new Error('The workspace cache directory must stay inside the project and cannot be the project root.');
  }

  return resolvedDirectory;
}

/**
 * Lib - Run Workspaces Cache - Get Workspace State Digest.
 *
 * Hashes the complete workspace state without following symbolic links. Git
 * metadata, installed dependencies, and Nova's cache directory are excluded.
 *
 * @param {Lib_RunWorkspacesCache_GetWorkspaceStateDigest_WorkspaceDirectory} workspaceDirectory - Workspace directory.
 * @param {Lib_RunWorkspacesCache_GetWorkspaceStateDigest_CacheDirectory}     cacheDirectory     - Cache directory.
 *
 * @returns {Lib_RunWorkspacesCache_GetWorkspaceStateDigest_Returns}
 *
 * @since 0.32.0
 */
export async function getWorkspaceStateDigest(workspaceDirectory: Lib_RunWorkspacesCache_GetWorkspaceStateDigest_WorkspaceDirectory, cacheDirectory: Lib_RunWorkspacesCache_GetWorkspaceStateDigest_CacheDirectory): Lib_RunWorkspacesCache_GetWorkspaceStateDigest_Returns {
  const hash: Lib_RunWorkspacesCache_GetWorkspaceStateDigest_Hash = createHash('sha256');

  await visitDirectory(hash, workspaceDirectory, workspaceDirectory, cacheDirectory);

  return hash.digest('hex');
}

/**
 * Lib - Run Workspaces Cache - Create Context Digest.
 *
 * Hashes root manifests, the toolchain, the environment, and upstream task
 * states. Environment values are hashed rather than stored in plain text.
 *
 * @param {Lib_RunWorkspacesCache_CreateContextDigest_Options} options - Options.
 *
 * @returns {Lib_RunWorkspacesCache_CreateContextDigest_Returns}
 *
 * @since 0.32.0
 */
export async function createContextDigest(options: Lib_RunWorkspacesCache_CreateContextDigest_Options): Lib_RunWorkspacesCache_CreateContextDigest_Returns {
  let lockfileName: Lib_RunWorkspacesCache_CreateContextDigest_LockfileName = 'yarn.lock';

  if (options['packageManager'] === 'npm') {
    lockfileName = 'package-lock.json';
  } else if (options['packageManager'] === 'pnpm') {
    lockfileName = 'pnpm-lock.yaml';
  }
  const packageJsonContents: Lib_RunWorkspacesCache_CreateContextDigest_PackageJsonContents = await readOptionalText(resolve(options['rootDirectory'], 'package.json'));
  const novaConfigContents: Lib_RunWorkspacesCache_CreateContextDigest_NovaConfigContents = await readOptionalText(resolve(options['rootDirectory'], 'nova.config.json'));
  const lockfileContents: Lib_RunWorkspacesCache_CreateContextDigest_LockfileContents = await readOptionalText(resolve(options['rootDirectory'], lockfileName));
  const environmentDigest: Lib_RunWorkspacesCache_CreateContextDigest_EnvironmentDigest = getEnvironmentDigest();
  const dependencyEntries: Lib_RunWorkspacesCache_CreateContextDigest_DependencyEntries = [...options['dependencyStateDigests'].entries()].sort((left, right) => left[0].localeCompare(right[0]));
  const payload: Lib_RunWorkspacesCache_CreateContextDigest_Payload = {
    architecture: arch(),
    command: options['task']['command'],
    dependencyStates: dependencyEntries,
    environmentDigest,
    lockfileDigest: hashText(lockfileContents),
    nodeEnv: options['nodeEnv'] ?? null,
    nodeVersion: process.version,
    novaConfigDigest: hashText(novaConfigContents),
    packageJsonDigest: hashText(packageJsonContents),
    packageManagerDescriptor: options['packageManagerDescriptor'],
    platform: platform(),
    script: options['task']['script'],
    scriptArgs: options['scriptArgs'],
    taskKey: options['task']['key'],
    version: cacheFormatVersion,
  };

  return hashText(JSON.stringify(payload));
}

/**
 * Lib - Run Workspaces Cache - Read Cache Record.
 *
 * Reads and validates one task record. Missing, malformed, or outdated records
 * are treated as cache misses so cache damage can never block a real run.
 *
 * @param {Lib_RunWorkspacesCache_ReadCacheRecord_CacheDirectory} cacheDirectory - Cache directory.
 * @param {Lib_RunWorkspacesCache_ReadCacheRecord_TaskKey}        taskKey        - Task key.
 *
 * @returns {Lib_RunWorkspacesCache_ReadCacheRecord_Returns}
 *
 * @since 0.32.0
 */
export async function readCacheRecord(cacheDirectory: Lib_RunWorkspacesCache_ReadCacheRecord_CacheDirectory, taskKey: Lib_RunWorkspacesCache_ReadCacheRecord_TaskKey): Lib_RunWorkspacesCache_ReadCacheRecord_Returns {
  const recordPath: Lib_RunWorkspacesCache_ReadCacheRecord_RecordPath = getRecordPath(cacheDirectory, taskKey);

  try {
    const raw: Lib_RunWorkspacesCache_ReadCacheRecord_Raw = await readFile(recordPath, 'utf-8');
    const parsed: Lib_RunWorkspacesCache_ReadCacheRecord_Parsed = JSON.parse(raw);

    if (
      typeof parsed !== 'object'
      || parsed === null
      || Array.isArray(parsed) === true
      || Reflect.get(parsed, 'version') !== cacheFormatVersion
      || typeof Reflect.get(parsed, 'contextDigest') !== 'string'
      || typeof Reflect.get(parsed, 'stateDigest') !== 'string'
    ) {
      return undefined;
    }

    return {
      contextDigest: Reflect.get(parsed, 'contextDigest'),
      stateDigest: Reflect.get(parsed, 'stateDigest'),
      version: cacheFormatVersion,
    };
  } catch {
    return undefined;
  }
}

/**
 * Lib - Run Workspaces Cache - Write Cache Record.
 *
 * Atomically saves a verified successful task state. Interrupted and failed
 * tasks never call this function and therefore cannot poison later runs.
 *
 * @param {Lib_RunWorkspacesCache_WriteCacheRecord_CacheDirectory} cacheDirectory - Cache directory.
 * @param {Lib_RunWorkspacesCache_WriteCacheRecord_TaskKey}        taskKey        - Task key.
 * @param {Lib_RunWorkspacesCache_WriteCacheRecord_Record}         record         - Record.
 *
 * @returns {Lib_RunWorkspacesCache_WriteCacheRecord_Returns}
 *
 * @since 0.32.0
 */
export async function writeCacheRecord(cacheDirectory: Lib_RunWorkspacesCache_WriteCacheRecord_CacheDirectory, taskKey: Lib_RunWorkspacesCache_WriteCacheRecord_TaskKey, record: Lib_RunWorkspacesCache_WriteCacheRecord_Record): Lib_RunWorkspacesCache_WriteCacheRecord_Returns {
  const recordPath: Lib_RunWorkspacesCache_WriteCacheRecord_RecordPath = getRecordPath(cacheDirectory, taskKey);
  const temporaryPath: Lib_RunWorkspacesCache_WriteCacheRecord_TemporaryPath = `${recordPath}.${process.pid}.${randomUUID()}.tmp`;

  await mkdir(dirname(recordPath), { recursive: true });
  await writeFile(temporaryPath, `${JSON.stringify(record, undefined, 2)}\n`, 'utf-8');
  await rename(temporaryPath, recordPath);

  return;
}

/**
 * Lib - Run Workspaces Cache - Visit Directory.
 *
 * Walks a workspace deterministically and streams path, mode, content, and
 * symbolic-link metadata into the active state hash.
 *
 * @param {Lib_RunWorkspacesCache_VisitDirectory_Hash}               hash               - Hash.
 * @param {Lib_RunWorkspacesCache_VisitDirectory_WorkspaceDirectory} workspaceDirectory - Workspace directory.
 * @param {Lib_RunWorkspacesCache_VisitDirectory_Directory}          directory          - Directory.
 * @param {Lib_RunWorkspacesCache_VisitDirectory_CacheDirectory}     cacheDirectory     - Cache directory.
 *
 * @returns {Lib_RunWorkspacesCache_VisitDirectory_Returns}
 *
 * @since 0.32.0
 */
async function visitDirectory(hash: Lib_RunWorkspacesCache_VisitDirectory_Hash, workspaceDirectory: Lib_RunWorkspacesCache_VisitDirectory_WorkspaceDirectory, directory: Lib_RunWorkspacesCache_VisitDirectory_Directory, cacheDirectory: Lib_RunWorkspacesCache_VisitDirectory_CacheDirectory): Lib_RunWorkspacesCache_VisitDirectory_Returns {
  const entries: Lib_RunWorkspacesCache_VisitDirectory_Entries = await readdir(directory, { withFileTypes: true });

  entries.sort((left, right) => left.name.localeCompare(right.name));

  for (const entry of entries) {
    const entryPath: Lib_RunWorkspacesCache_VisitDirectory_EntryPath = resolve(directory, entry.name);
    const isIgnoredDirectory: Lib_RunWorkspacesCache_VisitDirectory_IsIgnoredDirectory = entry.isDirectory() === true && (
      entry.name === '.git'
      || entry.name === 'node_modules'
    );
    const isCachePath: Lib_RunWorkspacesCache_VisitDirectory_IsCachePath = isPathInside(cacheDirectory, entryPath);

    if (isIgnoredDirectory === true || isCachePath === true) {
      continue;
    }

    const relativeEntryPath: Lib_RunWorkspacesCache_VisitDirectory_RelativeEntryPath = relative(workspaceDirectory, entryPath).split(sep).join('/');

    if (entry.isDirectory() === true) {
      hash.update(`directory\0${relativeEntryPath}\0`);

      await visitDirectory(hash, workspaceDirectory, entryPath, cacheDirectory);

      continue;
    }

    if (entry.isSymbolicLink() === true) {
      const symbolicLinkTarget: Lib_RunWorkspacesCache_VisitDirectory_SymbolicLinkTarget = await readlink(entryPath);

      hash.update(`symlink\0${relativeEntryPath}\0${symbolicLinkTarget}\0`);

      continue;
    }

    const entryStats: Lib_RunWorkspacesCache_VisitDirectory_EntryStats = await lstat(entryPath);
    const entryMode: Lib_RunWorkspacesCache_VisitDirectory_EntryMode = entryStats.mode;

    if (entry.isFile() === true) {
      const fileContents: Lib_RunWorkspacesCache_VisitDirectory_FileContents = await readFile(entryPath);

      hash.update(`file\0${relativeEntryPath}\0${entryMode}\0`);
      hash.update(fileContents);
      hash.update('\0');

      continue;
    }

    hash.update(`special\0${relativeEntryPath}\0${entryStats.mode}\0`);
  }

  return;
}

/**
 * Lib - Run Workspaces Cache - Get Environment Digest.
 *
 * Hashes stable parent-environment entries while excluding terminal-session
 * metadata and npm lifecycle noise that cannot change task semantics.
 *
 * @returns {Lib_RunWorkspacesCache_GetEnvironmentDigest_Returns}
 *
 * @since 0.32.0
 */
function getEnvironmentDigest(): Lib_RunWorkspacesCache_GetEnvironmentDigest_Returns {
  const entries: Lib_RunWorkspacesCache_GetEnvironmentDigest_Entries = Object.entries(process.env);
  const filteredEntries: Lib_RunWorkspacesCache_GetEnvironmentDigest_FilteredEntries = entries.filter((entry) => (
    entry[1] !== undefined
    && entry[0] !== '_'
    && entry[0] !== 'COLORTERM'
    && entry[0] !== 'FORCE_COLOR'
    && entry[0] !== 'INIT_CWD'
    && entry[0] !== 'NO_COLOR'
    && entry[0] !== 'NOVA_WORKSPACE_RUNNER'
    && entry[0] !== 'OLDPWD'
    && entry[0] !== 'PWD'
    && entry[0] !== 'SHLVL'
    && entry[0] !== 'TERM'
    && entry[0] !== 'TERM_PROGRAM'
    && entry[0] !== 'TERM_PROGRAM_VERSION'
    && entry[0] !== 'TERM_SESSION_ID'
    && entry[0].startsWith('npm_') === false
  ));

  filteredEntries.sort((left, right) => left[0].localeCompare(right[0]));

  return hashText(JSON.stringify(filteredEntries));
}

/**
 * Lib - Run Workspaces Cache - Get Record Path.
 *
 * Maps a task key to a stable filename without exposing package names as
 * filesystem paths or permitting path traversal.
 *
 * @param {Lib_RunWorkspacesCache_GetRecordPath_CacheDirectory} cacheDirectory - Cache directory.
 * @param {Lib_RunWorkspacesCache_GetRecordPath_TaskKey}        taskKey        - Task key.
 *
 * @returns {Lib_RunWorkspacesCache_GetRecordPath_Returns}
 *
 * @since 0.32.0
 */
function getRecordPath(cacheDirectory: Lib_RunWorkspacesCache_GetRecordPath_CacheDirectory, taskKey: Lib_RunWorkspacesCache_GetRecordPath_TaskKey): Lib_RunWorkspacesCache_GetRecordPath_Returns {
  const taskDigest: Lib_RunWorkspacesCache_GetRecordPath_TaskDigest = hashText(taskKey);
  const fileName: Lib_RunWorkspacesCache_GetRecordPath_FileName = `${taskDigest}.json`;

  return resolve(cacheDirectory, fileName);
}

/**
 * Lib - Run Workspaces Cache - Hash Text.
 *
 * Produces the SHA-256 digest used by workspace state, execution context, and
 * cache-record identifiers.
 *
 * @param {Lib_RunWorkspacesCache_HashText_Text} text - Text.
 *
 * @returns {Lib_RunWorkspacesCache_HashText_Returns}
 *
 * @since 0.32.0
 */
function hashText(text: Lib_RunWorkspacesCache_HashText_Text): Lib_RunWorkspacesCache_HashText_Returns {
  return createHash('sha256').update(text).digest('hex');
}

/**
 * Lib - Run Workspaces Cache - Is Path Inside.
 *
 * Checks path containment with normalized relative paths rather than unsafe
 * string-prefix comparisons.
 *
 * @param {Lib_RunWorkspacesCache_IsPathInside_RootPath}      rootPath      - Root path.
 * @param {Lib_RunWorkspacesCache_IsPathInside_CandidatePath} candidatePath - Candidate path.
 *
 * @returns {Lib_RunWorkspacesCache_IsPathInside_Returns}
 *
 * @since 0.32.0
 */
function isPathInside(rootPath: Lib_RunWorkspacesCache_IsPathInside_RootPath, candidatePath: Lib_RunWorkspacesCache_IsPathInside_CandidatePath): Lib_RunWorkspacesCache_IsPathInside_Returns {
  const relativePath: Lib_RunWorkspacesCache_IsPathInside_RelativePath = relative(rootPath, candidatePath);

  return relativePath.length === 0 || (
    relativePath !== '..'
    && relativePath.startsWith(`..${sep}`) === false
    && isAbsolute(relativePath) === false
  );
}

/**
 * Lib - Run Workspaces Cache - Read Optional Text.
 *
 * Reads an optional root context file and represents absence with an empty
 * string so cache validation remains deterministic.
 *
 * @param {Lib_RunWorkspacesCache_ReadOptionalText_Path} path - Path.
 *
 * @returns {Lib_RunWorkspacesCache_ReadOptionalText_Returns}
 *
 * @since 0.32.0
 */
async function readOptionalText(path: Lib_RunWorkspacesCache_ReadOptionalText_Path): Lib_RunWorkspacesCache_ReadOptionalText_Returns {
  try {
    return await readFile(path, 'utf-8');
  } catch (error) {
    if (
      typeof error === 'object'
      && error !== null
      && 'code' in error
      && error.code === 'ENOENT'
    ) {
      return '';
    }

    throw error;
  }
}
