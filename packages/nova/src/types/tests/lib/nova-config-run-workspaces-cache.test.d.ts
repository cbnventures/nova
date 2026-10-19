import type { Runner as LibNovaConfig } from '../../../lib/nova-config.js';

import type { Shared_NovaConfigConfig } from '../../shared.d.ts';

/**
 * Tests - Lib - Nova Config Run Workspaces Cache.
 *
 * @since 0.32.0
 */
export type Tests_Lib_NovaConfigRunWorkspacesCache_OriginalCwd = string;

export type Tests_Lib_NovaConfigRunWorkspacesCache_TemporaryDirectory = string;

export type Tests_Lib_NovaConfigRunWorkspacesCache_TemporaryPrefix = string;

export type Tests_Lib_NovaConfigRunWorkspacesCache_SandboxRoot = string;

/**
 * Tests - Lib - Nova Config Run Workspaces Cache - Reads The Complete Workspace Runner Settings Contract.
 *
 * @since 0.32.0
 */
export type Tests_Lib_NovaConfigRunWorkspacesCache_NovaConfigRunWorkspacesCache_ReadsTheCompleteWorkspaceRunnerSettingsContract_Returns = Promise<void>;

export type Tests_Lib_NovaConfigRunWorkspacesCache_ProjectDirectory = string;

export type Tests_Lib_NovaConfigRunWorkspacesCache_ConfigContents = string;

export type Tests_Lib_NovaConfigRunWorkspacesCache_Config = LibNovaConfig;

export type Tests_Lib_NovaConfigRunWorkspacesCache_Loaded = Shared_NovaConfigConfig;
