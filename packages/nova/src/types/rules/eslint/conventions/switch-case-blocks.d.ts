import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - Switch Case Blocks - Rule.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_RuleDefaultOptionsRequireDefault = boolean;

/**
 * Rules - ESLint - Conventions - Switch Case Blocks - Check Case.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckCase_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckCase_Node = TSESTree.SwitchCase;

export type Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckCase_Returns = void;

export type Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckCase_Consequent = TSESTree.Statement[];

export type Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckCase_FirstConsequent = TSESTree.Statement | undefined;

/**
 * Rules - ESLint - Conventions - Switch Case Blocks - Check Switch Statement.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckSwitchStatement_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckSwitchStatement_Node = TSESTree.SwitchStatement;

export type Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckSwitchStatement_Returns = void;

export type Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckSwitchStatement_HasDefault = boolean;

/**
 * Rules - ESLint - Conventions - Switch Case Blocks - Create.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_Options_RequireDefault = boolean;

export type Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_Options_IgnoreFiles;
  requireDefault: Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_Options_RequireDefault;
}>;

/**
 * Rules - ESLint - Conventions - Switch Case Blocks - Create - Switch Case.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_SwitchCase_Node = TSESTree.SwitchCase;

export type Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_SwitchCase_Returns = void;

/**
 * Rules - ESLint - Conventions - Switch Case Blocks - Create - Switch Statement.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_SwitchStatement_Node = TSESTree.SwitchStatement;

export type Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_SwitchStatement_Returns = void;
