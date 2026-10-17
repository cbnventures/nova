import type { Runner as LibNovaConfig } from '../../../lib/nova-config.js';

import type { Shared_NovaConfigConfig } from '../../shared.d.ts';

/**
 * Tests - Lib - Nova Config Ignore Files - Shared Nova Config Ignore Files.
 *
 * @since 0.32.0
 */
export type Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_OriginalCwd = string;

export type Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_TemporaryDirectory = string;

export type Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_SandboxPrefix = string;

export type Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_SandboxRoot = string;

/**
 * Tests - Lib - Nova Config Ignore Files - Shared Nova Config Ignore Files - Loads Every Supported Physical Ignore File.
 *
 * @since 0.32.0
 */
export type Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_LoadsEverySupportedPhysicalIgnoreFile_ProjectDirectory = string;

export type Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_LoadsEverySupportedPhysicalIgnoreFile_ConfigPath = string;

export type Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_LoadsEverySupportedPhysicalIgnoreFile_ConfigContents = string;

export type Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_LoadsEverySupportedPhysicalIgnoreFile_Config = LibNovaConfig;

export type Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_LoadsEverySupportedPhysicalIgnoreFile_Loaded = Pick<Shared_NovaConfigConfig, 'ignoreFiles'>;

/**
 * Tests - Lib - Nova Config Ignore Files - Shared Nova Config Ignore Files - Rejects The Former Gitignore Shape.
 *
 * @since 0.32.0
 */
export type Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_RejectsTheFormerGitignoreShape_ProjectDirectory = string;

export type Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_RejectsTheFormerGitignoreShape_ConfigPath = string;

export type Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_RejectsTheFormerGitignoreShape_ConfigContents = string;

export type Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_RejectsTheFormerGitignoreShape_Config = LibNovaConfig;

export type Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_RejectsTheFormerGitignoreShape_Loaded = Pick<Shared_NovaConfigConfig, 'ignoreFiles'>;
