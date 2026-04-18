import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - Require Hash Private - Check Member.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireHashPrivateCheckMemberNode = TSESTree.PropertyDefinition | TSESTree.MethodDefinition;

export type RulesEslintConventionsRequireHashPrivateCheckMemberContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintConventionsRequireHashPrivateCheckMemberReturns = void;

/**
 * Rules - ESLint - Conventions - Require Hash Private - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireHashPrivateRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintConventionsRequireHashPrivateRuleDefaultOptionsSkipMethods = boolean;

export type RulesEslintConventionsRequireHashPrivateRuleOptionsIgnoreFiles = string[];

export type RulesEslintConventionsRequireHashPrivateRuleOptionsSkipMethods = boolean;

export type RulesEslintConventionsRequireHashPrivateRuleOptions = Readonly<{
  ignoreFiles: RulesEslintConventionsRequireHashPrivateRuleOptionsIgnoreFiles;
  skipMethods: RulesEslintConventionsRequireHashPrivateRuleOptionsSkipMethods;
}>;
