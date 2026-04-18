import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - TypeScript - No Shared Type Import - Check Import.
 *
 * @since 0.14.0
 */
export type RulesEslintTypescriptNoSharedTypeImportCheckImportContext = Readonly<RuleContext<string, readonly unknown[]>>;

export type RulesEslintTypescriptNoSharedTypeImportCheckImportNode = TSESTree.ImportDeclaration;

export type RulesEslintTypescriptNoSharedTypeImportCheckImportSharedFiles = string[];

export type RulesEslintTypescriptNoSharedTypeImportCheckImportReturns = void;

export type RulesEslintTypescriptNoSharedTypeImportCheckImportSource = string;

export type RulesEslintTypescriptNoSharedTypeImportCheckImportNormalizedSource = string;

export type RulesEslintTypescriptNoSharedTypeImportCheckImportIsShared = boolean;

export type RulesEslintTypescriptNoSharedTypeImportCheckImportNormalizedSharedFile = string;

/**
 * Rules - ESLint - TypeScript - No Shared Type Import - Rule.
 *
 * @since 0.14.0
 */
export type RulesEslintTypescriptNoSharedTypeImportRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintTypescriptNoSharedTypeImportRuleDefaultOptionsSharedFiles = string[];

export type RulesEslintTypescriptNoSharedTypeImportRuleOptionsIgnoreFiles = string[];

export type RulesEslintTypescriptNoSharedTypeImportRuleOptionsSharedFiles = string[];

export type RulesEslintTypescriptNoSharedTypeImportRuleOptions = Readonly<{
  ignoreFiles: RulesEslintTypescriptNoSharedTypeImportRuleOptionsIgnoreFiles;
  sharedFiles: RulesEslintTypescriptNoSharedTypeImportRuleOptionsSharedFiles;
}>;

export type RulesEslintTypescriptNoSharedTypeImportRuleNormalizedFilename = string;
