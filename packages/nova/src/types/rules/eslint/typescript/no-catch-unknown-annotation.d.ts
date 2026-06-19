import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext, RuleFix, RuleFixer } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - TypeScript - No Catch Unknown Annotation - Rule.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - TypeScript - No Catch Unknown Annotation - Check Catch Clause.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Node = TSESTree.CatchClause;

export type Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Returns = void;

export type Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Param = TSESTree.BindingName | null;

export type Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_TypeAnnotation = TSESTree.TSTypeAnnotation | undefined;

/**
 * Rules - ESLint - TypeScript - No Catch Unknown Annotation - Check Catch Clause - Fix.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Fix_Fixer = RuleFixer;

export type Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Fix_Returns = RuleFix;

/**
 * Rules - ESLint - TypeScript - No Catch Unknown Annotation - Create.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - TypeScript - No Catch Unknown Annotation - Create - Catch Clause.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_Create_CatchClause_Node = TSESTree.CatchClause;

export type Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_Create_CatchClause_Returns = void;
