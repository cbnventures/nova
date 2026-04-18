import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Check Node.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocSinceCheckNodeContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintJsdocRequireJsdocSinceCheckNodeNode = TSESTree.ClassDeclaration | TSESTree.MethodDefinition | TSESTree.PropertyDefinition | TSESTree.FunctionDeclaration | TSESTree.TSTypeAliasDeclaration | TSESTree.TSInterfaceDeclaration | TSESTree.TSEnumDeclaration;

export type RulesEslintJsdocRequireJsdocSinceCheckNodeReturns = void;

export type RulesEslintJsdocRequireJsdocSinceCheckNodeComments = TSESTree.Comment[];

export type RulesEslintJsdocRequireJsdocSinceCheckNodeJsdocComment = TSESTree.Comment | undefined;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocSinceRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintJsdocRequireJsdocSinceRuleOptionsIgnoreFiles = string[];

export type RulesEslintJsdocRequireJsdocSinceRuleOptions = Readonly<{
  ignoreFiles: RulesEslintJsdocRequireJsdocSinceRuleOptionsIgnoreFiles;
}>;
