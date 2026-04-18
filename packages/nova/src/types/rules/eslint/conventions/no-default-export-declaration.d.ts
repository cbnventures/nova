import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - No Default Export Declaration - Check Export Default Declaration.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationContext = Readonly<RuleContext<string, readonly unknown[]>>;

export type RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationNode = TSESTree.ExportDefaultDeclaration;

export type RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationReturns = void;

export type RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationName = string;

export type RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationDeclarationText = string;

export type RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationSourceCode = string;

/**
 * Rules - ESLint - Conventions - No Default Export Declaration - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsNoDefaultExportDeclarationRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintConventionsNoDefaultExportDeclarationRuleOptionsIgnoreFiles = string[];

export type RulesEslintConventionsNoDefaultExportDeclarationRuleOptions = Readonly<{
  ignoreFiles: RulesEslintConventionsNoDefaultExportDeclarationRuleOptionsIgnoreFiles;
}>;
