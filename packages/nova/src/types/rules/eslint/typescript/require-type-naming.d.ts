import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - TypeScript - Require Type Naming - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - TypeScript - Require Type Naming - Check Type Alias.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_CheckTypeAlias_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_CheckTypeAlias_Node = TSESTree.TSTypeAliasDeclaration;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_CheckTypeAlias_Returns = void;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_CheckTypeAlias_ExpectedPrefix = string;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_CheckTypeAlias_TypeName = string;

/**
 * Rules - ESLint - TypeScript - Require Type Naming - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Options_IgnoreFiles;
}>;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_NormalizedFilename = string;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Diagnostic_Object_Segment = string;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Diagnostic_Object_Prefix = string;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Diagnostic_Object = {
  segment: Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Diagnostic_Object_Segment;
  prefix: Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Diagnostic_Object_Prefix;
};

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Diagnostic = Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Diagnostic_Object | null;

/**
 * Rules - ESLint - TypeScript - Require Type Naming - Create - Program.
 *
 * @since 0.17.1
 */
export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Program_Node = TSESTree.Program;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Program_Returns = void;

/**
 * Rules - ESLint - TypeScript - Require Type Naming - Create - TS Type Alias Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_TSTypeAliasDeclaration_Node = TSESTree.TSTypeAliasDeclaration;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_TSTypeAliasDeclaration_Returns = void;

/**
 * Rules - ESLint - TypeScript - Require Type Naming - Derive Invalid Prefix Diagnostic.
 *
 * @since 0.17.1
 */
export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_Filename = string;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_ReturnsObject_Segment = string;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_ReturnsObject_Prefix = string;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_ReturnsObject = {
  segment: Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_ReturnsObject_Segment;
  prefix: Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_ReturnsObject_Prefix;
};

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_Returns = Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_ReturnsObject | null;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_Segments = ReadonlyArray<string>;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_OffendingSegment = string;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_Prefix = string;

/**
 * Rules - ESLint - TypeScript - Require Type Naming - Derive Prefix.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_DerivePrefix_Filename = string;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_DerivePrefix_Returns = string;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_DerivePrefix_Segments = ReadonlyArray<string>;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_DerivePrefix_Words = string[] | null;

/**
 * Rules - ESLint - TypeScript - Require Type Naming - Normalized Path Segments.
 *
 * @since 0.17.1
 */
export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_NormalizedPathSegments_Filename = string;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_NormalizedPathSegments_Returns = ReadonlyArray<string>;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_NormalizedPathSegments_NormalizedFilename = string;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_NormalizedPathSegments_TypesIndex = number;

export type Rules_Eslint_Typescript_RequireTypeNaming_Runner_NormalizedPathSegments_RelativePath = string;
