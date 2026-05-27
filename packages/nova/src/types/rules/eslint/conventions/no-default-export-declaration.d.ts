import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - No Default Export Declaration - Check Export Default Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_CheckExportDefaultDeclaration_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_CheckExportDefaultDeclaration_Node = TSESTree.ExportDefaultDeclaration;

export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_CheckExportDefaultDeclaration_Returns = void;

export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_CheckExportDefaultDeclaration_Name = string;

export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_CheckExportDefaultDeclaration_DeclarationText = string;

export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_CheckExportDefaultDeclaration_SourceCode = string;

/**
 * Rules - ESLint - Conventions - No Default Export Declaration - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Conventions_NoDefaultExportDeclaration_Runner_RuleOptions_IgnoreFiles;
}>;
