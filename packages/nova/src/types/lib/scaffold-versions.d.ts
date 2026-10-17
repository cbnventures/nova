import type { Shared_ScaffoldVersionCatalog_Entry } from '../shared.d.ts';

/**
 * Lib - Scaffold Versions.
 *
 * @since 0.32.0
 */
export type Lib_ScaffoldVersions_Entries = Record<string, Shared_ScaffoldVersionCatalog_Entry>;

/**
 * Lib - Scaffold Versions - Apply Scaffold Version Replacements.
 *
 * @since 0.32.0
 */
export type Lib_ScaffoldVersions_ApplyScaffoldVersionReplacements_Input = string;

export type Lib_ScaffoldVersions_ApplyScaffoldVersionReplacements_Returns = string;

export type Lib_ScaffoldVersions_ApplyScaffoldVersionReplacements_Output = string;

/**
 * Lib - Scaffold Versions - Get Scaffold Version.
 *
 * @since 0.32.0
 */
export type Lib_ScaffoldVersions_GetScaffoldVersion_Key = string;

export type Lib_ScaffoldVersions_GetScaffoldVersion_Returns = string;

export type Lib_ScaffoldVersions_GetScaffoldVersion_Entry = Shared_ScaffoldVersionCatalog_Entry | undefined;
