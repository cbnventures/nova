import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - TypeScript - No Explicit Any - Check Any Keyword.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_NoExplicitAny_Runner_CheckAnyKeyword_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Typescript_NoExplicitAny_Runner_CheckAnyKeyword_Node = TSESTree.TSAnyKeyword;

export type Rules_Eslint_Typescript_NoExplicitAny_Runner_CheckAnyKeyword_Returns = void;

/**
 * Rules - ESLint - TypeScript - No Explicit Any - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_NoExplicitAny_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Typescript_NoExplicitAny_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Typescript_NoExplicitAny_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Typescript_NoExplicitAny_Runner_RuleOptions_IgnoreFiles;
}>;
