import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Syntax - No Destructuring - Callback Methods.
 *
 * @since 0.14.0
 */

/**
 * Rules - ESLint - Syntax - No Destructuring - Check Assignment.
 *
 * @since 0.14.0
 */
export type RulesEslintSyntaxNoDestructuringCheckAssignmentContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintSyntaxNoDestructuringCheckAssignmentNode = TSESTree.AssignmentExpression;

export type RulesEslintSyntaxNoDestructuringCheckAssignmentReturns = void;

/**
 * Rules - ESLint - Syntax - No Destructuring - Check Callback.
 *
 * @since 0.14.0
 */
export type RulesEslintSyntaxNoDestructuringCheckCallbackInsideCallbackValue = boolean;

export type RulesEslintSyntaxNoDestructuringCheckCallbackInsideCallback = {
  value: RulesEslintSyntaxNoDestructuringCheckCallbackInsideCallbackValue;
};

export type RulesEslintSyntaxNoDestructuringCheckCallbackContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintSyntaxNoDestructuringCheckCallbackNode = TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression;

export type RulesEslintSyntaxNoDestructuringCheckCallbackReturns = void;

export type RulesEslintSyntaxNoDestructuringCheckCallbackParent = TSESTree.Node | undefined;

export type RulesEslintSyntaxNoDestructuringCheckCallbackCallee = TSESTree.LeftHandSideExpression | TSESTree.Expression;

/**
 * Rules - ESLint - Syntax - No Destructuring - Check Declarator.
 *
 * @since 0.14.0
 */
export type RulesEslintSyntaxNoDestructuringCheckDeclaratorContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintSyntaxNoDestructuringCheckDeclaratorNode = TSESTree.VariableDeclarator;

export type RulesEslintSyntaxNoDestructuringCheckDeclaratorReturns = void;

export type RulesEslintSyntaxNoDestructuringCheckDeclaratorParent = TSESTree.Node | undefined;

/**
 * Rules - ESLint - Syntax - No Destructuring - Check For Of.
 *
 * @since 0.14.0
 */
export type RulesEslintSyntaxNoDestructuringCheckForOfContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintSyntaxNoDestructuringCheckForOfNode = TSESTree.ForOfStatement;

export type RulesEslintSyntaxNoDestructuringCheckForOfReturns = void;

export type RulesEslintSyntaxNoDestructuringCheckForOfLeft = TSESTree.ForOfStatement['left'];

export type RulesEslintSyntaxNoDestructuringCheckForOfDeclarator = TSESTree.VariableDeclarator | undefined;

export type RulesEslintSyntaxNoDestructuringCheckForOfRight = TSESTree.Expression;

/**
 * Rules - ESLint - Syntax - No Destructuring - Check Function.
 *
 * @since 0.14.0
 */
export type RulesEslintSyntaxNoDestructuringCheckFunctionContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintSyntaxNoDestructuringCheckFunctionNode = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

export type RulesEslintSyntaxNoDestructuringCheckFunctionReturns = void;

export type RulesEslintSyntaxNoDestructuringCheckFunctionParent = TSESTree.Node | undefined;

/**
 * Rules - ESLint - Syntax - No Destructuring - Rule.
 *
 * @since 0.14.0
 */
export type RulesEslintSyntaxNoDestructuringRuleDefaultOptionsAssignmentExpressions = boolean;

export type RulesEslintSyntaxNoDestructuringRuleDefaultOptionsCallbackParams = boolean;

export type RulesEslintSyntaxNoDestructuringRuleDefaultOptionsForOfLoops = boolean;

export type RulesEslintSyntaxNoDestructuringRuleDefaultOptionsFunctionParams = boolean;

export type RulesEslintSyntaxNoDestructuringRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintSyntaxNoDestructuringRuleDefaultOptionsVariableDeclarations = boolean;

export type RulesEslintSyntaxNoDestructuringRuleOptionsAssignmentExpressions = boolean;

export type RulesEslintSyntaxNoDestructuringRuleOptionsCallbackParams = boolean;

export type RulesEslintSyntaxNoDestructuringRuleOptionsForOfLoops = boolean;

export type RulesEslintSyntaxNoDestructuringRuleOptionsFunctionParams = boolean;

export type RulesEslintSyntaxNoDestructuringRuleOptionsIgnoreFiles = string[];

export type RulesEslintSyntaxNoDestructuringRuleOptionsVariableDeclarations = boolean;

export type RulesEslintSyntaxNoDestructuringRuleOptions = Readonly<{
  assignmentExpressions: RulesEslintSyntaxNoDestructuringRuleOptionsAssignmentExpressions;
  callbackParams: RulesEslintSyntaxNoDestructuringRuleOptionsCallbackParams;
  forOfLoops: RulesEslintSyntaxNoDestructuringRuleOptionsForOfLoops;
  functionParams: RulesEslintSyntaxNoDestructuringRuleOptionsFunctionParams;
  ignoreFiles: RulesEslintSyntaxNoDestructuringRuleOptionsIgnoreFiles;
  variableDeclarations: RulesEslintSyntaxNoDestructuringRuleOptionsVariableDeclarations;
}>;

export type RulesEslintSyntaxNoDestructuringRuleCheckCallbackParams = boolean;

export type RulesEslintSyntaxNoDestructuringRuleCheckFunctionParams = boolean;

export type RulesEslintSyntaxNoDestructuringRuleCheckForOfLoops = boolean;

export type RulesEslintSyntaxNoDestructuringRuleCheckVariableDeclarations = boolean;

export type RulesEslintSyntaxNoDestructuringRuleCheckAssignmentExpressions = boolean;
