import type { Hash } from 'node:crypto';
import type { Dirent, Stats } from 'node:fs';

import type {
  Shared_CorepackPackageManager,
  Shared_RunWorkspacesCacheRecord,
  Shared_RunWorkspacesCacheRecord_Version,
  Shared_RunWorkspacesTask,
} from '../shared.d.ts';

/**
 * Lib - Run Workspaces Cache - Cache Format Version.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspacesCache_CacheFormatVersion = Shared_RunWorkspacesCacheRecord_Version;

/**
 * Lib - Run Workspaces Cache - Create Context Digest.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspacesCache_CreateContextDigest_Options_DependencyStateDigests = Map<string, string>;

export type Lib_RunWorkspacesCache_CreateContextDigest_Options_NodeEnv = 'development' | 'production' | 'test' | undefined;

export type Lib_RunWorkspacesCache_CreateContextDigest_Options_PackageManager = Shared_CorepackPackageManager;

export type Lib_RunWorkspacesCache_CreateContextDigest_Options_PackageManagerDescriptor = string;

export type Lib_RunWorkspacesCache_CreateContextDigest_Options_RootDirectory = string;

export type Lib_RunWorkspacesCache_CreateContextDigest_Options_ScriptArgs = string[];

export type Lib_RunWorkspacesCache_CreateContextDigest_Options_Task = Shared_RunWorkspacesTask;

export type Lib_RunWorkspacesCache_CreateContextDigest_Options = {
  dependencyStateDigests: Lib_RunWorkspacesCache_CreateContextDigest_Options_DependencyStateDigests;
  nodeEnv: Lib_RunWorkspacesCache_CreateContextDigest_Options_NodeEnv;
  packageManager: Lib_RunWorkspacesCache_CreateContextDigest_Options_PackageManager;
  packageManagerDescriptor: Lib_RunWorkspacesCache_CreateContextDigest_Options_PackageManagerDescriptor;
  rootDirectory: Lib_RunWorkspacesCache_CreateContextDigest_Options_RootDirectory;
  scriptArgs: Lib_RunWorkspacesCache_CreateContextDigest_Options_ScriptArgs;
  task: Lib_RunWorkspacesCache_CreateContextDigest_Options_Task;
};

export type Lib_RunWorkspacesCache_CreateContextDigest_Returns = Promise<string>;

export type Lib_RunWorkspacesCache_CreateContextDigest_LockfileName = 'package-lock.json' | 'pnpm-lock.yaml' | 'yarn.lock';

export type Lib_RunWorkspacesCache_CreateContextDigest_PackageJsonContents = string;

export type Lib_RunWorkspacesCache_CreateContextDigest_NovaConfigContents = string;

export type Lib_RunWorkspacesCache_CreateContextDigest_LockfileContents = string;

export type Lib_RunWorkspacesCache_CreateContextDigest_EnvironmentDigest = string;

export type Lib_RunWorkspacesCache_CreateContextDigest_DependencyEntries = [string, string][];

export type Lib_RunWorkspacesCache_CreateContextDigest_Payload_Architecture = string;

export type Lib_RunWorkspacesCache_CreateContextDigest_Payload_Command = string;

export type Lib_RunWorkspacesCache_CreateContextDigest_Payload_DependencyStates = Lib_RunWorkspacesCache_CreateContextDigest_DependencyEntries;

export type Lib_RunWorkspacesCache_CreateContextDigest_Payload_EnvironmentDigest = string;

export type Lib_RunWorkspacesCache_CreateContextDigest_Payload_LockfileDigest = string;

export type Lib_RunWorkspacesCache_CreateContextDigest_Payload_NodeEnv = string | null;

export type Lib_RunWorkspacesCache_CreateContextDigest_Payload_NodeVersion = string;

export type Lib_RunWorkspacesCache_CreateContextDigest_Payload_NovaConfigDigest = string;

export type Lib_RunWorkspacesCache_CreateContextDigest_Payload_PackageJsonDigest = string;

export type Lib_RunWorkspacesCache_CreateContextDigest_Payload_PackageManagerDescriptor = string;

export type Lib_RunWorkspacesCache_CreateContextDigest_Payload_Platform = NodeJS.Platform;

export type Lib_RunWorkspacesCache_CreateContextDigest_Payload_Script = string;

export type Lib_RunWorkspacesCache_CreateContextDigest_Payload_ScriptArgs = string[];

export type Lib_RunWorkspacesCache_CreateContextDigest_Payload_TaskKey = string;

export type Lib_RunWorkspacesCache_CreateContextDigest_Payload_Version = Shared_RunWorkspacesCacheRecord_Version;

export type Lib_RunWorkspacesCache_CreateContextDigest_Payload = {
  architecture: Lib_RunWorkspacesCache_CreateContextDigest_Payload_Architecture;
  command: Lib_RunWorkspacesCache_CreateContextDigest_Payload_Command;
  dependencyStates: Lib_RunWorkspacesCache_CreateContextDigest_Payload_DependencyStates;
  environmentDigest: Lib_RunWorkspacesCache_CreateContextDigest_Payload_EnvironmentDigest;
  lockfileDigest: Lib_RunWorkspacesCache_CreateContextDigest_Payload_LockfileDigest;
  nodeEnv: Lib_RunWorkspacesCache_CreateContextDigest_Payload_NodeEnv;
  nodeVersion: Lib_RunWorkspacesCache_CreateContextDigest_Payload_NodeVersion;
  novaConfigDigest: Lib_RunWorkspacesCache_CreateContextDigest_Payload_NovaConfigDigest;
  packageJsonDigest: Lib_RunWorkspacesCache_CreateContextDigest_Payload_PackageJsonDigest;
  packageManagerDescriptor: Lib_RunWorkspacesCache_CreateContextDigest_Payload_PackageManagerDescriptor;
  platform: Lib_RunWorkspacesCache_CreateContextDigest_Payload_Platform;
  script: Lib_RunWorkspacesCache_CreateContextDigest_Payload_Script;
  scriptArgs: Lib_RunWorkspacesCache_CreateContextDigest_Payload_ScriptArgs;
  taskKey: Lib_RunWorkspacesCache_CreateContextDigest_Payload_TaskKey;
  version: Lib_RunWorkspacesCache_CreateContextDigest_Payload_Version;
};

/**
 * Lib - Run Workspaces Cache - Get Environment Digest.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspacesCache_GetEnvironmentDigest_Returns = string;

export type Lib_RunWorkspacesCache_GetEnvironmentDigest_Entries = [string, string | undefined][];

export type Lib_RunWorkspacesCache_GetEnvironmentDigest_FilteredEntries = [string, string | undefined][];

/**
 * Lib - Run Workspaces Cache - Get Record Path.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspacesCache_GetRecordPath_CacheDirectory = string;

export type Lib_RunWorkspacesCache_GetRecordPath_TaskKey = string;

export type Lib_RunWorkspacesCache_GetRecordPath_Returns = string;

export type Lib_RunWorkspacesCache_GetRecordPath_TaskDigest = string;

export type Lib_RunWorkspacesCache_GetRecordPath_FileName = string;

/**
 * Lib - Run Workspaces Cache - Get Workspace State Digest.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspacesCache_GetWorkspaceStateDigest_WorkspaceDirectory = string;

export type Lib_RunWorkspacesCache_GetWorkspaceStateDigest_CacheDirectory = string;

export type Lib_RunWorkspacesCache_GetWorkspaceStateDigest_Returns = Promise<string>;

export type Lib_RunWorkspacesCache_GetWorkspaceStateDigest_Hash = Hash;

/**
 * Lib - Run Workspaces Cache - Hash Text.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspacesCache_HashText_Text = string;

export type Lib_RunWorkspacesCache_HashText_Returns = string;

/**
 * Lib - Run Workspaces Cache - Is Path Inside.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspacesCache_IsPathInside_RootPath = string;

export type Lib_RunWorkspacesCache_IsPathInside_CandidatePath = string;

export type Lib_RunWorkspacesCache_IsPathInside_Returns = boolean;

export type Lib_RunWorkspacesCache_IsPathInside_RelativePath = string;

/**
 * Lib - Run Workspaces Cache - Read Cache Record.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspacesCache_ReadCacheRecord_CacheDirectory = string;

export type Lib_RunWorkspacesCache_ReadCacheRecord_TaskKey = string;

export type Lib_RunWorkspacesCache_ReadCacheRecord_Returns = Promise<Shared_RunWorkspacesCacheRecord | undefined>;

export type Lib_RunWorkspacesCache_ReadCacheRecord_RecordPath = string;

export type Lib_RunWorkspacesCache_ReadCacheRecord_Raw = string;

export type Lib_RunWorkspacesCache_ReadCacheRecord_Parsed = unknown;

/**
 * Lib - Run Workspaces Cache - Read Optional Text.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspacesCache_ReadOptionalText_Path = string;

export type Lib_RunWorkspacesCache_ReadOptionalText_Returns = Promise<string>;

/**
 * Lib - Run Workspaces Cache - Resolve Cache Directory.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspacesCache_ResolveCacheDirectory_RootDirectory = string;

export type Lib_RunWorkspacesCache_ResolveCacheDirectory_ConfiguredDirectory = string;

export type Lib_RunWorkspacesCache_ResolveCacheDirectory_Returns = string;

export type Lib_RunWorkspacesCache_ResolveCacheDirectory_ResolvedDirectory = string;

export type Lib_RunWorkspacesCache_ResolveCacheDirectory_RelativeDirectory = string;

/**
 * Lib - Run Workspaces Cache - Visit Directory.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspacesCache_VisitDirectory_Hash = Hash;

export type Lib_RunWorkspacesCache_VisitDirectory_WorkspaceDirectory = string;

export type Lib_RunWorkspacesCache_VisitDirectory_Directory = string;

export type Lib_RunWorkspacesCache_VisitDirectory_CacheDirectory = string;

export type Lib_RunWorkspacesCache_VisitDirectory_Returns = Promise<void>;

export type Lib_RunWorkspacesCache_VisitDirectory_Entries = Dirent[];

export type Lib_RunWorkspacesCache_VisitDirectory_EntryPath = string;

export type Lib_RunWorkspacesCache_VisitDirectory_IsIgnoredDirectory = boolean;

export type Lib_RunWorkspacesCache_VisitDirectory_IsCachePath = boolean;

export type Lib_RunWorkspacesCache_VisitDirectory_RelativeEntryPath = string;

export type Lib_RunWorkspacesCache_VisitDirectory_SymbolicLinkTarget = string;

export type Lib_RunWorkspacesCache_VisitDirectory_EntryStats = Stats;

export type Lib_RunWorkspacesCache_VisitDirectory_EntryMode = number;

export type Lib_RunWorkspacesCache_VisitDirectory_FileContents = Buffer;

/**
 * Lib - Run Workspaces Cache - Write Cache Record.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspacesCache_WriteCacheRecord_CacheDirectory = string;

export type Lib_RunWorkspacesCache_WriteCacheRecord_TaskKey = string;

export type Lib_RunWorkspacesCache_WriteCacheRecord_Record = Shared_RunWorkspacesCacheRecord;

export type Lib_RunWorkspacesCache_WriteCacheRecord_Returns = Promise<void>;

export type Lib_RunWorkspacesCache_WriteCacheRecord_RecordPath = string;

export type Lib_RunWorkspacesCache_WriteCacheRecord_TemporaryPath = string;
