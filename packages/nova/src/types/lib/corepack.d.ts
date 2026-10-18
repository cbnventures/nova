import type {
  Shared_CorepackCommand,
  Shared_CorepackPackageManagerDescriptor,
  Shared_CorepackPackageManagerDescriptor_Version,
  Shared_CorepackSpawnInvocation,
} from '../shared.d.ts';

/**
 * Lib - Corepack - Runner - Parse Package Manager.
 *
 * @since 0.26.0
 */
export type Lib_Corepack_Runner_ParsePackageManager_Value = unknown;

export type Lib_Corepack_Runner_ParsePackageManager_Returns = Shared_CorepackPackageManagerDescriptor | undefined;

export type Lib_Corepack_Runner_ParsePackageManager_MatchResult = RegExpMatchArray | null;

export type Lib_Corepack_Runner_ParsePackageManager_Name = string | undefined;

export type Lib_Corepack_Runner_ParsePackageManager_Version = Shared_CorepackPackageManagerDescriptor_Version | undefined;

/**
 * Lib - Corepack - Runner - Resolve Spawn Invocation.
 *
 * @since 0.32.0
 */
export type Lib_Corepack_Runner_ResolveSpawnInvocation_Command = Shared_CorepackCommand;

export type Lib_Corepack_Runner_ResolveSpawnInvocation_CommandArguments = string[];

export type Lib_Corepack_Runner_ResolveSpawnInvocation_CurrentPlatform = NodeJS.Platform;

export type Lib_Corepack_Runner_ResolveSpawnInvocation_NodeExecutable = string;

export type Lib_Corepack_Runner_ResolveSpawnInvocation_Returns = Shared_CorepackSpawnInvocation;

export type Lib_Corepack_Runner_ResolveSpawnInvocation_CommandScriptPath = string;
