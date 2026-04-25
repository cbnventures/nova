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
 * Rules - ESLint - TypeScript - Require Type Naming - Derive Invalid Prefix Diagnostic.
 *
 * @since 0.17.1
 */
export type RulesEslintTypescriptRequireTypeNamingDeriveInvalidPrefixDiagnosticFilename = string;

export type RulesEslintTypescriptRequireTypeNamingDeriveInvalidPrefixDiagnosticOffendingSegment = string;

export type RulesEslintTypescriptRequireTypeNamingDeriveInvalidPrefixDiagnosticPrefix = string;

export type RulesEslintTypescriptRequireTypeNamingDeriveInvalidPrefixDiagnosticSegments = ReadonlyArray<string>;

export type RulesEslintTypescriptRequireTypeNamingDeriveInvalidPrefixDiagnosticReturns = {
  segment: RulesEslintTypescriptRequireTypeNamingDeriveInvalidPrefixDiagnosticOffendingSegment;
  prefix: RulesEslintTypescriptRequireTypeNamingDeriveInvalidPrefixDiagnosticPrefix;
} | null;

/**
 * Rules - ESLint - TypeScript - Require Type Naming - Derive Prefix.
 *
 * @since 0.15.0
 */
export type RulesEslintTypescriptRequireTypeNamingDerivePrefixFilename = string;

export type RulesEslintTypescriptRequireTypeNamingDerivePrefixReturns = string;

export type RulesEslintTypescriptRequireTypeNamingDerivePrefixSegments = ReadonlyArray<string>;

export type RulesEslintTypescriptRequireTypeNamingDerivePrefixWords = string[] | null;

/**
 * Rules - ESLint - TypeScript - Require Type Naming - Normalized Path Segments.
 *
 * @since 0.17.1
 */
export type RulesEslintTypescriptRequireTypeNamingNormalizedPathSegmentsFilename = string;

export type RulesEslintTypescriptRequireTypeNamingNormalizedPathSegmentsNormalizedFilename = string;

export type RulesEslintTypescriptRequireTypeNamingNormalizedPathSegmentsRelativePath = string;

export type RulesEslintTypescriptRequireTypeNamingNormalizedPathSegmentsReturns = ReadonlyArray<string>;

export type RulesEslintTypescriptRequireTypeNamingNormalizedPathSegmentsTypesIndex = number;

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
