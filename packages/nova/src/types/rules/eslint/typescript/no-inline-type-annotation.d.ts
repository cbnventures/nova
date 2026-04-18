import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation - Callback Methods.
 *
 * @since 0.14.0
 */

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation - Check As Expression.
 *
 * @since 0.15.0
 */
export type RulesEslintTypescriptNoInlineTypeAnnotationCheckAsExpressionContext = Readonly<RuleContext<string, readonly unknown[]>>;

export type RulesEslintTypescriptNoInlineTypeAnnotationCheckAsExpressionNode = TSESTree.TSAsExpression;

export type RulesEslintTypescriptNoInlineTypeAnnotationCheckAsExpressionReturns = void;

export type RulesEslintTypescriptNoInlineTypeAnnotationCheckAsExpressionTypeNode = TSESTree.TypeNode;

export type RulesEslintTypescriptNoInlineTypeAnnotationCheckAsExpressionTypeParameterNames = Set<string>;

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation - Check Type Annotation.
 *
 * @since 0.14.0
 */
export type RulesEslintTypescriptNoInlineTypeAnnotationCheckTypeAnnotationContext = Readonly<RuleContext<string, readonly unknown[]>>;

export type RulesEslintTypescriptNoInlineTypeAnnotationCheckTypeAnnotationNode = TSESTree.TSTypeAnnotation;

export type RulesEslintTypescriptNoInlineTypeAnnotationCheckTypeAnnotationReturns = void;

export type RulesEslintTypescriptNoInlineTypeAnnotationCheckTypeAnnotationTypeNode = TSESTree.TypeNode;

export type RulesEslintTypescriptNoInlineTypeAnnotationCheckTypeAnnotationTypeParameterNames = Set<string>;

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation - Check Variable Declarator.
 *
 * @since 0.14.0
 */
export type RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorContext = Readonly<RuleContext<string, readonly unknown[]>>;

export type RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorNode = TSESTree.VariableDeclarator;

export type RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorReturns = void;

export type RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorParent = TSESTree.Node;

export type RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorAncestor = TSESTree.Node | null | undefined;

export type RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorInsideFunction = boolean;

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation - Collect Enclosing Type Parameters.
 *
 * @since 0.14.0
 */
export type RulesEslintTypescriptNoInlineTypeAnnotationCollectEnclosingTypeParametersNode = TSESTree.Node;

export type RulesEslintTypescriptNoInlineTypeAnnotationCollectEnclosingTypeParametersReturns = Set<string>;

export type RulesEslintTypescriptNoInlineTypeAnnotationCollectEnclosingTypeParametersNames = Set<string>;

export type RulesEslintTypescriptNoInlineTypeAnnotationCollectEnclosingTypeParametersCurrent = TSESTree.Node | null | undefined;

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation - Has Only Type Parameter Arguments.
 *
 * @since 0.14.0
 */
export type RulesEslintTypescriptNoInlineTypeAnnotationHasOnlyTypeParameterArgumentsNode = TSESTree.TSTypeReference;

export type RulesEslintTypescriptNoInlineTypeAnnotationHasOnlyTypeParameterArgumentsTypeParameterNames = Set<string>;

export type RulesEslintTypescriptNoInlineTypeAnnotationHasOnlyTypeParameterArgumentsReturns = boolean;

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation - Rule.
 *
 * @since 0.14.0
 */
export type RulesEslintTypescriptNoInlineTypeAnnotationRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintTypescriptNoInlineTypeAnnotationRuleOptionsIgnoreFiles = string[];

export type RulesEslintTypescriptNoInlineTypeAnnotationRuleOptions = Readonly<{
  ignoreFiles: RulesEslintTypescriptNoInlineTypeAnnotationRuleOptionsIgnoreFiles;
}>;

export type RulesEslintTypescriptNoInlineTypeAnnotationRuleNormalizedFilename = string;
