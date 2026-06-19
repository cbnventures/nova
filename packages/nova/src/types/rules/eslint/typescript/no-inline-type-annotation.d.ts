import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation - Rule.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation - Check As Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckAsExpression_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckAsExpression_Node = TSESTree.TSAsExpression;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckAsExpression_Returns = void;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckAsExpression_TypeNode = TSESTree.TypeNode;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckAsExpression_TypeParameterNames = Set<string>;

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation - Check Type Annotation.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckTypeAnnotation_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckTypeAnnotation_Node = TSESTree.TSTypeAnnotation;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckTypeAnnotation_Returns = void;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckTypeAnnotation_TypeNode = TSESTree.TypeNode;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckTypeAnnotation_TypeParameterNames = Set<string>;

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation - Check Variable Declarator.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_Node = TSESTree.VariableDeclarator;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_Returns = void;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_Parent = TSESTree.Node;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_Ancestor = TSESTree.Node | null | undefined;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_InsideFunction = boolean;

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation - Collect Enclosing Type Parameters.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CollectEnclosingTypeParameters_Node = TSESTree.Node;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CollectEnclosingTypeParameters_Returns = Set<string>;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CollectEnclosingTypeParameters_Names = Set<string>;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CollectEnclosingTypeParameters_Current = TSESTree.Node | null | undefined;

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation - Create.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_Create_Options_IgnoreFiles;
}>;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_Create_NormalizedFilename = string;

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation - Create - TS As Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_Create_TSAsExpression_Node = TSESTree.TSAsExpression;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_Create_TSAsExpression_Returns = void;

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation - Create - TS Type Annotation.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_Create_TSTypeAnnotation_Node = TSESTree.TSTypeAnnotation;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_Create_TSTypeAnnotation_Returns = void;

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation - Create - Variable Declarator.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_Create_VariableDeclarator_Node = TSESTree.VariableDeclarator;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_Create_VariableDeclarator_Returns = void;

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation - Has Only Type Parameter Arguments.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_HasOnlyTypeParameterArguments_Node = TSESTree.TSTypeReference;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_HasOnlyTypeParameterArguments_TypeParameterNames = Set<string>;

export type Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_HasOnlyTypeParameterArguments_Returns = boolean;
