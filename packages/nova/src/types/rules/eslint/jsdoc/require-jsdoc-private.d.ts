import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Private - Check Member.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Node = TSESTree.MethodDefinition | TSESTree.PropertyDefinition;

export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Returns = void;

export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_IsPrivateKeyword = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_IsPrivateIdentifier = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Comments = TSESTree.Comment[];

export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_JsdocComment = TSESTree.Comment | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_SinceIndex = number;

export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_InsertPosition = number;

export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_PrivateTag = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Private - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_RuleOptions_IgnoreFiles;
}>;
