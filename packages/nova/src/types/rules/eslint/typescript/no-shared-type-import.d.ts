import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - TypeScript - No Shared Type Import - Rule.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Typescript_NoSharedTypeImport_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Typescript_NoSharedTypeImport_Runner_RuleDefaultOptionsSharedFiles = string[];

/**
 * Rules - ESLint - TypeScript - No Shared Type Import - Check Import.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_Node = TSESTree.ImportDeclaration;

export type Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_SharedFiles = string[];

export type Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_Returns = void;

export type Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_Source = string;

export type Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_NormalizedSource = string;

export type Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_IsShared = boolean;

export type Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_NormalizedSharedFile = string;

/**
 * Rules - ESLint - TypeScript - No Shared Type Import - Create.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Typescript_NoSharedTypeImport_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Typescript_NoSharedTypeImport_Runner_Create_Options_SharedFiles = string[];

export type Rules_Eslint_Typescript_NoSharedTypeImport_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Typescript_NoSharedTypeImport_Runner_Create_Options_IgnoreFiles;
  sharedFiles: Rules_Eslint_Typescript_NoSharedTypeImport_Runner_Create_Options_SharedFiles;
}>;

export type Rules_Eslint_Typescript_NoSharedTypeImport_Runner_Create_NormalizedFilename = string;

/**
 * Rules - ESLint - TypeScript - No Shared Type Import - Create - Import Declaration.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Typescript_NoSharedTypeImport_Runner_Create_ImportDeclaration_Node = TSESTree.ImportDeclaration;

export type Rules_Eslint_Typescript_NoSharedTypeImport_Runner_Create_ImportDeclaration_Returns = void;
