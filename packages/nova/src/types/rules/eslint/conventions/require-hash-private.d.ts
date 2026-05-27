import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - Require Hash Private - Check Member.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_CheckMember_Node = TSESTree.PropertyDefinition | TSESTree.MethodDefinition;

export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_CheckMember_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_CheckMember_Returns = void;

/**
 * Rules - ESLint - Conventions - Require Hash Private - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_RuleDefaultOptionsSkipMethods = boolean;

export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_RuleOptions_SkipMethods = boolean;

export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Conventions_RequireHashPrivate_Runner_RuleOptions_IgnoreFiles;
  skipMethods: Rules_Eslint_Conventions_RequireHashPrivate_Runner_RuleOptions_SkipMethods;
}>;
