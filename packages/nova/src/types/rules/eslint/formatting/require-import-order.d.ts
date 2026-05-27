import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - Require Import Order - Check Program.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckProgram_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckProgram_Returns = void;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckProgram_SourceCode = Readonly<TSESLint.SourceCode>;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckProgram_Body = TSESTree.ProgramStatement[];

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckProgram_Imports = TSESTree.ProgramStatement[];

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckProgram_LastGroup = number;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckProgram_Current = TSESTree.ProgramStatement | undefined;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckProgram_CurrentGroup = number;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckProgram_Prev = TSESTree.ProgramStatement | undefined;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckProgram_PrevGroup = number;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckProgram_PrevEnd = number;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckProgram_CurrentStart = number;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckProgram_PrevSource = string;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckProgram_CurrentSource = string;

/**
 * Rules - ESLint - Formatting - Require Import Order - Check Specifiers.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckSpecifiers_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckSpecifiers_Imports = TSESTree.ProgramStatement[];

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckSpecifiers_Returns = void;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckSpecifiers_Specifiers = TSESTree.ImportClause[];

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckSpecifiers_Prev = TSESTree.ImportClause | undefined;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckSpecifiers_Current = TSESTree.ImportClause | undefined;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckSpecifiers_PrevName = string;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_CheckSpecifiers_CurrentName = string;

/**
 * Rules - ESLint - Formatting - Require Import Order - Get Group.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireImportOrder_Runner_GetGroup_ImportNode = TSESTree.ImportDeclaration;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_GetGroup_Returns = number;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_GetGroup_Source = string;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_GetGroup_SourceBase = string;

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_GetGroup_IsTypeImport = boolean;

/**
 * Rules - ESLint - Formatting - Require Import Order - Node Builtins.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireImportOrder_Runner_NodeBuiltins = Set<string>;

/**
 * Rules - ESLint - Formatting - Require Import Order - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireImportOrder_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Formatting_RequireImportOrder_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Formatting_RequireImportOrder_Runner_RuleOptions_IgnoreFiles;
}>;
