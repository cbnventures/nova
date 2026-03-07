import type { TSESTree } from '@typescript-eslint/utils';

/**
 * No regex literals - Check literal.
 *
 * @since 1.0.0
 */
export type NoRegexLiteralsCheckLiteralNode = TSESTree.Literal;

export type NoRegexLiteralsCheckLiteralReturns = void;

/**
 * No regex literals - Default options.
 *
 * @since 1.0.0
 */
export type NoRegexLiteralsDefaultOptionsAllowedFiles = string[];
