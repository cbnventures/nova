import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - TypeScript - No Explicit Any - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_NoExplicitAny_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - TypeScript - No Explicit Any - Check Any Keyword.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_NoExplicitAny_Runner_CheckAnyKeyword_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Typescript_NoExplicitAny_Runner_CheckAnyKeyword_Node = TSESTree.TSAnyKeyword;

export type Rules_Eslint_Typescript_NoExplicitAny_Runner_CheckAnyKeyword_Returns = void;

/**
 * Rules - ESLint - TypeScript - No Explicit Any - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_NoExplicitAny_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Typescript_NoExplicitAny_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Typescript_NoExplicitAny_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - TypeScript - No Explicit Any - Create - TS Any Keyword.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_NoExplicitAny_Runner_Create_TSAnyKeyword_Node = TSESTree.TSAnyKeyword;

export type Rules_Eslint_Typescript_NoExplicitAny_Runner_Create_TSAnyKeyword_Returns = void;
