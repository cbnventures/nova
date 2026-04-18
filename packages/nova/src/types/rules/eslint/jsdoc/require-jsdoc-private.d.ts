import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Private - Check Member.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocPrivateCheckMemberContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintJsdocRequireJsdocPrivateCheckMemberNode = TSESTree.MethodDefinition | TSESTree.PropertyDefinition;

export type RulesEslintJsdocRequireJsdocPrivateCheckMemberReturns = void;

export type RulesEslintJsdocRequireJsdocPrivateCheckMemberIsPrivateKeyword = boolean;

export type RulesEslintJsdocRequireJsdocPrivateCheckMemberIsPrivateIdentifier = boolean;

export type RulesEslintJsdocRequireJsdocPrivateCheckMemberComments = TSESTree.Comment[];

export type RulesEslintJsdocRequireJsdocPrivateCheckMemberJsdocComment = TSESTree.Comment | undefined;

export type RulesEslintJsdocRequireJsdocPrivateCheckMemberSinceIndex = number;

export type RulesEslintJsdocRequireJsdocPrivateCheckMemberInsertPosition = number;

export type RulesEslintJsdocRequireJsdocPrivateCheckMemberPrivateTag = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Private - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocPrivateRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintJsdocRequireJsdocPrivateRuleOptionsIgnoreFiles = string[];

export type RulesEslintJsdocRequireJsdocPrivateRuleOptions = Readonly<{
  ignoreFiles: RulesEslintJsdocRequireJsdocPrivateRuleOptionsIgnoreFiles;
}>;
