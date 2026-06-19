import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext, RuleFix, RuleFixer } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Private - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_RuleDefaultOptionsIgnoreFiles = string[];

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

/**
 * Rules - ESLint - JSDoc - Require JSDoc Private - Check Member - Fix.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Fix_Fixer = RuleFixer;

export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Fix_Returns = RuleFix | null;

export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Fix_SinceIndex = number;

export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Fix_InsertPosition = number;

export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Fix_PrivateTag = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Private - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Private - Create - Method Definition.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_Create_MethodDefinition_Node = TSESTree.MethodDefinition;

export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_Create_MethodDefinition_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Private - Create - Property Definition.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_Create_PropertyDefinition_Node = TSESTree.PropertyDefinition;

export type Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_Create_PropertyDefinition_Returns = void;
