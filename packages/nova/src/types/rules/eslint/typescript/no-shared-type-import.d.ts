import type { TSESTree } from '@typescript-eslint/utils';

/**
 * No shared type import - Check import.
 *
 * @since 1.0.0
 */
export type NoSharedTypeImportCheckImportNode = TSESTree.ImportDeclaration;

export type NoSharedTypeImportCheckImportReturns = void;

/**
 * No shared type import - Default options.
 *
 * @since 1.0.0
 */
export type NoSharedTypeImportDefaultOptionsSharedFiles = string[];
