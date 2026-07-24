import type { ModuleKind, ParsedCommandLine } from 'typescript';

/**
 * Tests - Exports Module Format - Collect Non Esm Browser Exports.
 *
 * @since 0.21.0
 */
export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageRoot = string;

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Returns = Promise<string[]>;

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageJsonPath = string;

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageJsonText = string;

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageJson_Type = string;

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageJson_Exports = Record<string, unknown>;

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageJson = {
  type?: Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageJson_Type;
  exports?: Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageJson_Exports;
};

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageType = string | undefined;

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_ExportsMap = Record<string, unknown>;

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_NodeExports = Set<string>;

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Project_Name = string;

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Project_Esm = boolean;

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Project_Files = Set<string>;

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Project = {
  name: Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Project_Name;
  esm: Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Project_Esm;
  files: Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Project_Files;
};

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Projects = Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Project[];

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Violations = string[];

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Target = unknown;

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_SourcePath = string | undefined;

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_OwningProjects = Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Project[];

export type Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_OwningProject = Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Project | undefined;

/**
 * Tests - Exports Module Format - Emits Esm.
 *
 * @since 0.21.0
 */
export type Tests_ExportsModuleFormat_EmitsEsm_ModuleKind = ModuleKind;

export type Tests_ExportsModuleFormat_EmitsEsm_PackageType = string | undefined;

export type Tests_ExportsModuleFormat_EmitsEsm_Returns = boolean;

/**
 * Tests - Exports Module Format - Exports Module Format - Emits Every Browser Facing Package Export As Esm.
 *
 * @since 0.21.0
 */
export type Tests_ExportsModuleFormat_ExportsModuleFormat_EmitsEveryBrowserFacingPackageExportAsEsm_PackageRoot = string;

export type Tests_ExportsModuleFormat_ExportsModuleFormat_EmitsEveryBrowserFacingPackageExportAsEsm_Violations = string[];

export type Tests_ExportsModuleFormat_ExportsModuleFormat_EmitsEveryBrowserFacingPackageExportAsEsm_Message = string;

/**
 * Tests - Exports Module Format - Get Package Root.
 *
 * @since 0.21.0
 */
export type Tests_ExportsModuleFormat_GetPackageRoot_Returns = string;

export type Tests_ExportsModuleFormat_GetPackageRoot_CurrentFilePath = string;

export type Tests_ExportsModuleFormat_GetPackageRoot_CurrentFileDirectory = string;

/**
 * Tests - Exports Module Format - Load Project.
 *
 * @since 0.21.0
 */
export type Tests_ExportsModuleFormat_LoadProject_PackageRoot = string;

export type Tests_ExportsModuleFormat_LoadProject_TsconfigName = string;

export type Tests_ExportsModuleFormat_LoadProject_PackageType = string | undefined;

export type Tests_ExportsModuleFormat_LoadProject_Returns_Name = string;

export type Tests_ExportsModuleFormat_LoadProject_Returns_Esm = boolean;

export type Tests_ExportsModuleFormat_LoadProject_Returns_Files = Set<string>;

export type Tests_ExportsModuleFormat_LoadProject_Returns = {
  name: Tests_ExportsModuleFormat_LoadProject_Returns_Name;
  esm: Tests_ExportsModuleFormat_LoadProject_Returns_Esm;
  files: Tests_ExportsModuleFormat_LoadProject_Returns_Files;
};

export type Tests_ExportsModuleFormat_LoadProject_ConfigPath = string;

export type Tests_ExportsModuleFormat_LoadProject_ReadResult_Config = unknown;

export type Tests_ExportsModuleFormat_LoadProject_ReadResult_Error = unknown;

export type Tests_ExportsModuleFormat_LoadProject_ReadResult = {
  config?: Tests_ExportsModuleFormat_LoadProject_ReadResult_Config;
  error?: Tests_ExportsModuleFormat_LoadProject_ReadResult_Error;
};

export type Tests_ExportsModuleFormat_LoadProject_Parsed = ParsedCommandLine;

export type Tests_ExportsModuleFormat_LoadProject_ModuleKind = ModuleKind;

/**
 * Tests - Exports Module Format - Resolve Export Source.
 *
 * @since 0.21.0
 */
export type Tests_ExportsModuleFormat_ResolveExportSource_PackageRoot = string;

export type Tests_ExportsModuleFormat_ResolveExportSource_Target = string;

export type Tests_ExportsModuleFormat_ResolveExportSource_Returns = string | undefined;

export type Tests_ExportsModuleFormat_ResolveExportSource_WithoutBuild = string;

export type Tests_ExportsModuleFormat_ResolveExportSource_RelativeSource = string;

export type Tests_ExportsModuleFormat_ResolveExportSource_Extensions = string[];

export type Tests_ExportsModuleFormat_ResolveExportSource_Candidate = string;
