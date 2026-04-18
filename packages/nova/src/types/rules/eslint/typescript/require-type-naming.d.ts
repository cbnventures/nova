import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - TypeScript - Require Type Naming - Check Type Alias.
 *
 * @since 0.15.0
 */
export type RulesEslintTypescriptRequireTypeNamingCheckTypeAliasContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintTypescriptRequireTypeNamingCheckTypeAliasNode = TSESTree.TSTypeAliasDeclaration;

export type RulesEslintTypescriptRequireTypeNamingCheckTypeAliasReturns = void;

export type RulesEslintTypescriptRequireTypeNamingCheckTypeAliasExpectedPrefix = string;

export type RulesEslintTypescriptRequireTypeNamingCheckTypeAliasTypeName = string;

/**
 * Rules - ESLint - TypeScript - Require Type Naming - Derive Prefix.
 *
 * @since 0.15.0
 */
export type RulesEslintTypescriptRequireTypeNamingDerivePrefixFilename = string;

export type RulesEslintTypescriptRequireTypeNamingDerivePrefixReturns = string;

export type RulesEslintTypescriptRequireTypeNamingDerivePrefixNormalizedFilename = string;

export type RulesEslintTypescriptRequireTypeNamingDerivePrefixTypesIndex = number;

export type RulesEslintTypescriptRequireTypeNamingDerivePrefixRelativePath = string;

export type RulesEslintTypescriptRequireTypeNamingDerivePrefixSegments = string[];

export type RulesEslintTypescriptRequireTypeNamingDerivePrefixWords = string[] | null;

/**
 * Rules - ESLint - TypeScript - Require Type Naming - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintTypescriptRequireTypeNamingRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintTypescriptRequireTypeNamingRuleOptionsIgnoreFiles = string[];

export type RulesEslintTypescriptRequireTypeNamingRuleOptions = Readonly<{
  ignoreFiles: RulesEslintTypescriptRequireTypeNamingRuleOptionsIgnoreFiles;
}>;

export type RulesEslintTypescriptRequireTypeNamingRuleNormalizedFilename = string;
