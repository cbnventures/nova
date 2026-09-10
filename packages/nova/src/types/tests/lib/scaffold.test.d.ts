import type { vi } from 'vitest';

import type {
  Shared_MonorepoContext,
  Shared_ScaffoldConfig,
  Shared_ScaffoldTemplateQuestions,
} from '../../shared.d.ts';

/**
 * Tests - Lib - Scaffold - Template Questions.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_TemplateQuestions = Shared_ScaffoldTemplateQuestions;

/**
 * Tests - Lib - Scaffold - Detect Monorepo Context.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Scaffold_DetectMonorepoContext_OriginalCwd = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_TemporaryDirectory = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_TemporaryPrefix = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_SandboxRoot = string;

/**
 * Tests - Lib - Scaffold - Detect Monorepo Context - Detects Invalid Package Json Before Scaffolding.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsInvalidPackageJsonBeforeScaffolding_ProjectDirectory = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsInvalidPackageJsonBeforeScaffolding_PackageJsonPath = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsInvalidPackageJsonBeforeScaffolding_ResolvedDirectory = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsInvalidPackageJsonBeforeScaffolding_Result = Shared_MonorepoContext;

/**
 * Tests - Lib - Scaffold - Detect Monorepo Context - Detects Monorepo Mode In Empty Directory.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_ProjectDirectory = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_ResolvedDirectory = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_Result_Context = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_Result = Readonly<{
  context: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_Result_Context;
}>;

/**
 * Tests - Lib - Scaffold - Detect Monorepo Context - Detects Standalone Project.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_ProjectDirectory = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_PackageJson = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_PackageContents = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_PackageJsonPath = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_ResolvedDirectory = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_Result_Context = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_Result = Readonly<{
  context: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_Result_Context;
}>;

/**
 * Tests - Lib - Scaffold - Detect Monorepo Context - Detects Workspace Mode At Monorepo Root.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_ProjectDirectory = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_PackageJson = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_PackageContents = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_PackageJsonPath = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_ResolvedDirectory = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_Result_Context = string;

export type Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_Result = Readonly<{
  context: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_Result_Context;
}>;

/**
 * Tests - Lib - Scaffold - Prompts Mock Module.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_Prompts_MockModule_Default = ReturnType<typeof vi['fn']>;

export type Tests_Lib_Scaffold_Prompts_MockModule = Readonly<{
  default: Tests_Lib_Scaffold_Prompts_MockModule_Default;
}>;

/**
 * Tests - Lib - Scaffold - Prompt Scaffold Options - Uses Complete Values Without Prompting.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_PromptScaffoldOptions_UsesCompleteValuesWithoutPrompting_Result = Shared_ScaffoldConfig | undefined;

/**
 * Tests - Lib - Scaffold - Resolve Template Answers - Prompts For A Missing Interactive Value.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_ResolveTemplateAnswers_PromptsForAMissingInteractiveValue_Result = Map<RegExp, string> | undefined;

/**
 * Tests - Lib - Scaffold - Resolve Template Answers - Rejects A Missing Non Interactive Value.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_ResolveTemplateAnswers_RejectsAMissingNonInteractiveValue_Result = Map<RegExp, string> | undefined;

/**
 * Tests - Lib - Scaffold - Resolve Template Answers - Rejects An Invalid Provided Value.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_ResolveTemplateAnswers_RejectsAnInvalidProvidedValue_Result = Map<RegExp, string> | undefined;

/**
 * Tests - Lib - Scaffold - Resolve Template Answers - Uses A Valid Non Interactive Value Without Prompting.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_ResolveTemplateAnswers_UsesAValidNonInteractiveValueWithoutPrompting_Result = Map<RegExp, string> | undefined;

/**
 * Tests - Lib - Scaffold - Workspace Contract - Derives Role Based Package Names.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_WorkspaceContract_DerivesRoleBasedPackageNames_Returns = void;

/**
 * Tests - Lib - Scaffold - Workspace Contract - Normalizes Only Workspace Paths Inside The Root.
 *
 * @since 0.26.0
 */
export type Tests_Lib_Scaffold_WorkspaceContract_NormalizesOnlyWorkspacePathsInsideTheRoot_Returns = void;
