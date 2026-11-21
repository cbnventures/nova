import type { vi } from 'vitest';

/**
 * Tests - Lib - Workspace Policy - Workspace Policy - Flags A Distributable Workspace Published Outside Npm.
 *
 * @since 0.49.0
 */
export type Tests_Lib_WorkspacePolicy_WorkspacePolicy_FlagsADistributableWorkspacePublishedOutsideNpm_Messages = string[];

/**
 * Tests - Lib - Workspace Policy - Workspace Policy - Lists The Publish Targets That Are Not Npm Registries.
 *
 * @since 0.49.0
 */
export type Tests_Lib_WorkspacePolicy_WorkspacePolicy_ListsThePublishTargetsThatAreNotNpmRegistries_Targets = string[];

/**
 * Tests - Lib - Workspace Policy - Workspace Policy - Marks Only The Npm Package Scaffolds As Npm Publishers.
 *
 * @since 0.49.0
 */
export type Tests_Lib_WorkspacePolicy_WorkspacePolicy_MarksOnlyTheNpmPackageScaffoldsAsNpmPublishers_RunScaffoldSpy = ReturnType<typeof vi['spyOn']>;

/**
 * Tests - Lib - Workspace Policy - Workspace Policy - Registers A Non Npm Package As Trackable.
 *
 * @since 0.49.0
 */
export type Tests_Lib_WorkspacePolicy_WorkspacePolicy_RegistersANonNpmPackageAsTrackable_ProjectDirectory = string;

export type Tests_Lib_WorkspacePolicy_WorkspacePolicy_RegistersANonNpmPackageAsTrackable_ConfigRaw = string;
