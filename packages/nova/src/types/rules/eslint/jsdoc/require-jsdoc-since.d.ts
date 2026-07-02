import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Version Cache.
 *
 * @since 0.20.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_VersionCache = Map<string, string>;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Extract Tag Value.
 *
 * @since 0.20.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_CommentValue = string;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_TagPattern = RegExp;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_Returns = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_Lines = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_Line = string;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_Match = RegExpMatchArray | null;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Resolve Package Version.
 *
 * @since 0.20.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Filename = string;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Returns = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Dir = string;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_PackageJsonPath = string;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_RawText = string;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Parsed = Record<string, unknown>;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_VersionField = unknown;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Version = string;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Parent = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Check Node.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Node = TSESTree.ClassDeclaration | TSESTree.MethodDefinition | TSESTree.PropertyDefinition | TSESTree.FunctionDeclaration | TSESTree.TSTypeAliasDeclaration | TSESTree.TSInterfaceDeclaration | TSESTree.TSEnumDeclaration | TSESTree.ExportNamedDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Returns = void;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Comments = TSESTree.Comment[];

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_JsdocComment = TSESTree.Comment | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_PackageVersion = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_SinceValue = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_SinceMatch = RegExpMatchArray | null;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_SinceVersionBad = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_DeprecatedValue = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_DeprecatedMatch = RegExpMatchArray | null;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_DeprecatedVersionBad = boolean;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Create - Class Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_ClassDeclaration_Node = TSESTree.ClassDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_ClassDeclaration_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Create - Export Named Declaration.
 *
 * @since 0.20.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_ExportNamedDeclaration_Node = TSESTree.ExportNamedDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_ExportNamedDeclaration_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Create - Function Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_FunctionDeclaration_Node = TSESTree.FunctionDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_FunctionDeclaration_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Create - Method Definition.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_MethodDefinition_Node = TSESTree.MethodDefinition;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_MethodDefinition_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Create - Property Definition.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_PropertyDefinition_Node = TSESTree.PropertyDefinition;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_PropertyDefinition_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Create - TS Enum Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSEnumDeclaration_Node = TSESTree.TSEnumDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSEnumDeclaration_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Create - TS Interface Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSInterfaceDeclaration_Node = TSESTree.TSInterfaceDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSInterfaceDeclaration_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Create - TS Type Alias Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSTypeAliasDeclaration_Node = TSESTree.TSTypeAliasDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSTypeAliasDeclaration_Returns = void;
