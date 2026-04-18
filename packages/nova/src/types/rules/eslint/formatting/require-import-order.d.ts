import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - Require Import Order - Check Program.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingRequireImportOrderCheckProgramContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintFormattingRequireImportOrderCheckProgramReturns = void;

export type RulesEslintFormattingRequireImportOrderCheckProgramSourceCode = Readonly<TSESLint.SourceCode>;

export type RulesEslintFormattingRequireImportOrderCheckProgramBody = TSESTree.ProgramStatement[];

export type RulesEslintFormattingRequireImportOrderCheckProgramImports = TSESTree.ProgramStatement[];

export type RulesEslintFormattingRequireImportOrderCheckProgramLastGroup = number;

export type RulesEslintFormattingRequireImportOrderCheckProgramCurrent = TSESTree.ProgramStatement | undefined;

export type RulesEslintFormattingRequireImportOrderCheckProgramCurrentGroup = number;

export type RulesEslintFormattingRequireImportOrderCheckProgramPrev = TSESTree.ProgramStatement | undefined;

export type RulesEslintFormattingRequireImportOrderCheckProgramPrevGroup = number;

export type RulesEslintFormattingRequireImportOrderCheckProgramPrevEnd = number;

export type RulesEslintFormattingRequireImportOrderCheckProgramCurrentStart = number;

export type RulesEslintFormattingRequireImportOrderCheckProgramPrevSource = string;

export type RulesEslintFormattingRequireImportOrderCheckProgramCurrentSource = string;

/**
 * Rules - ESLint - Formatting - Require Import Order - Check Specifiers.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingRequireImportOrderCheckSpecifiersContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintFormattingRequireImportOrderCheckSpecifiersImports = TSESTree.ProgramStatement[];

export type RulesEslintFormattingRequireImportOrderCheckSpecifiersReturns = void;

export type RulesEslintFormattingRequireImportOrderCheckSpecifiersSpecifiers = TSESTree.ImportClause[];

export type RulesEslintFormattingRequireImportOrderCheckSpecifiersPrev = TSESTree.ImportClause | undefined;

export type RulesEslintFormattingRequireImportOrderCheckSpecifiersCurrent = TSESTree.ImportClause | undefined;

export type RulesEslintFormattingRequireImportOrderCheckSpecifiersPrevName = string;

export type RulesEslintFormattingRequireImportOrderCheckSpecifiersCurrentName = string;

/**
 * Rules - ESLint - Formatting - Require Import Order - Get Group.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingRequireImportOrderGetGroupImportNode = TSESTree.ImportDeclaration;

export type RulesEslintFormattingRequireImportOrderGetGroupReturns = number;

export type RulesEslintFormattingRequireImportOrderGetGroupSource = string;

export type RulesEslintFormattingRequireImportOrderGetGroupSourceBase = string;

export type RulesEslintFormattingRequireImportOrderGetGroupIsTypeImport = boolean;

/**
 * Rules - ESLint - Formatting - Require Import Order - Node Builtins.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingRequireImportOrderNodeBuiltins = Set<string>;

/**
 * Rules - ESLint - Formatting - Require Import Order - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingRequireImportOrderRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintFormattingRequireImportOrderRuleOptionsIgnoreFiles = string[];

export type RulesEslintFormattingRequireImportOrderRuleOptions = Readonly<{
  ignoreFiles: RulesEslintFormattingRequireImportOrderRuleOptionsIgnoreFiles;
}>;
