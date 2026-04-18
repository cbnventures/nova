import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - Switch Case Blocks - Check Case.
 *
 * @since 0.13.0
 */
export type RulesEslintConventionsSwitchCaseBlocksCheckCaseContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintConventionsSwitchCaseBlocksCheckCaseNode = TSESTree.SwitchCase;

export type RulesEslintConventionsSwitchCaseBlocksCheckCaseReturns = void;

export type RulesEslintConventionsSwitchCaseBlocksCheckCaseConsequent = TSESTree.Statement[];

export type RulesEslintConventionsSwitchCaseBlocksCheckCaseFirstConsequent = TSESTree.Statement | undefined;

/**
 * Rules - ESLint - Conventions - Switch Case Blocks - Check Switch Statement.
 *
 * @since 0.13.0
 */
export type RulesEslintConventionsSwitchCaseBlocksCheckSwitchStatementContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintConventionsSwitchCaseBlocksCheckSwitchStatementNode = TSESTree.SwitchStatement;

export type RulesEslintConventionsSwitchCaseBlocksCheckSwitchStatementReturns = void;

export type RulesEslintConventionsSwitchCaseBlocksCheckSwitchStatementHasDefault = boolean;

/**
 * Rules - ESLint - Conventions - Switch Case Blocks - Rule.
 *
 * @since 0.13.0
 */
export type RulesEslintConventionsSwitchCaseBlocksRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintConventionsSwitchCaseBlocksRuleDefaultOptionsRequireDefault = boolean;

export type RulesEslintConventionsSwitchCaseBlocksRuleOptionsIgnoreFiles = string[];

export type RulesEslintConventionsSwitchCaseBlocksRuleOptionsRequireDefault = boolean;

export type RulesEslintConventionsSwitchCaseBlocksRuleOptions = Readonly<{
  ignoreFiles: RulesEslintConventionsSwitchCaseBlocksRuleOptionsIgnoreFiles;
  requireDefault: RulesEslintConventionsSwitchCaseBlocksRuleOptionsRequireDefault;
}>;
