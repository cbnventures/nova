import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - No Default Export Declaration - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - Conventions - No Default Export Declaration - Check Export Default Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_CheckExportDefaultDeclaration_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_CheckExportDefaultDeclaration_Node = TSESTree.ExportDefaultDeclaration;

export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_CheckExportDefaultDeclaration_Returns = void;

export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_CheckExportDefaultDeclaration_Name = string;

/**
 * Rules - ESLint - Conventions - No Default Export Declaration - Check Export Default Declaration - Fix.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_CheckExportDefaultDeclaration_Fix_DeclarationText = string;

/**
 * Rules - ESLint - Conventions - No Default Export Declaration - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - Conventions - No Default Export Declaration - Create - Export Default Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_Create_ExportDefaultDeclaration_Node = TSESTree.ExportDefaultDeclaration;

export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_Create_ExportDefaultDeclaration_Returns = void;
