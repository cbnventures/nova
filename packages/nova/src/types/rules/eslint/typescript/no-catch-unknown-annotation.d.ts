import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - TypeScript - No Catch Unknown Annotation - Check Catch Clause.
 *
 * @since 0.14.0
 */
export type RulesEslintTypescriptNoCatchUnknownAnnotationCheckCatchClauseContext = Readonly<RuleContext<string, readonly unknown[]>>;

export type RulesEslintTypescriptNoCatchUnknownAnnotationCheckCatchClauseNode = TSESTree.CatchClause;

export type RulesEslintTypescriptNoCatchUnknownAnnotationCheckCatchClauseReturns = void;

export type RulesEslintTypescriptNoCatchUnknownAnnotationCheckCatchClauseParam = TSESTree.BindingName | null;

export type RulesEslintTypescriptNoCatchUnknownAnnotationCheckCatchClauseTypeAnnotation = TSESTree.TSTypeAnnotation | undefined;

/**
 * Rules - ESLint - TypeScript - No Catch Unknown Annotation - Rule.
 *
 * @since 0.14.0
 */
export type RulesEslintTypescriptNoCatchUnknownAnnotationRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintTypescriptNoCatchUnknownAnnotationRuleOptionsIgnoreFiles = string[];

export type RulesEslintTypescriptNoCatchUnknownAnnotationRuleOptions = Readonly<{
  ignoreFiles: RulesEslintTypescriptNoCatchUnknownAnnotationRuleOptionsIgnoreFiles;
}>;
