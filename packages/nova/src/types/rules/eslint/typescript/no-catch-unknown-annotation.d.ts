import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

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
 * Rules - ESLint - TypeScript - No Catch Unknown Annotation - Rule.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_RuleOptions_IgnoreFiles;
}>;
