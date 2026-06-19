import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - Require Hash Private - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_RuleDefaultOptionsSkipMethods = boolean;

/**
 * Rules - ESLint - Conventions - Require Hash Private - Check Member.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_CheckMember_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_CheckMember_Node = TSESTree.PropertyDefinition | TSESTree.MethodDefinition;

export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_CheckMember_Returns = void;

/**
 * Rules - ESLint - Conventions - Require Hash Private - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_Options_SkipMethods = boolean;

export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_Options_IgnoreFiles;
  skipMethods: Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_Options_SkipMethods;
}>;

/**
 * Rules - ESLint - Conventions - Require Hash Private - Create - Method Definition.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_MethodDefinition_Node = TSESTree.MethodDefinition;

export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_MethodDefinition_Returns = void;

/**
 * Rules - ESLint - Conventions - Require Hash Private - Create - Property Definition.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_PropertyDefinition_Node = TSESTree.PropertyDefinition;

export type Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_PropertyDefinition_Returns = void;
