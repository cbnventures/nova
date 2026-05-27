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
export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckAssignment_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckAssignment_Node = TSESTree.AssignmentExpression;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckAssignment_Returns = void;

/**
 * Rules - ESLint - Syntax - No Destructuring - Check Callback.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_InsideCallback_Value = boolean;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_InsideCallback = {
  value: Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_InsideCallback_Value;
};

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_Node = TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_Returns = void;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_Parent = TSESTree.Node | undefined;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_Callee = TSESTree.LeftHandSideExpression | TSESTree.Expression;

/**
 * Rules - ESLint - Syntax - No Destructuring - Check Declarator.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckDeclarator_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckDeclarator_Node = TSESTree.VariableDeclarator;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckDeclarator_Returns = void;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckDeclarator_Parent = TSESTree.Node | undefined;

/**
 * Rules - ESLint - Syntax - No Destructuring - Check For Of.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Node = TSESTree.ForOfStatement;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Returns = void;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Left = TSESTree.ForOfStatement['left'];

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Declarator = TSESTree.VariableDeclarator | undefined;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Right = TSESTree.Expression;

/**
 * Rules - ESLint - Syntax - No Destructuring - Check Function.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckFunction_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckFunction_Node = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckFunction_Returns = void;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_CheckFunction_Parent = TSESTree.Node | undefined;

/**
 * Rules - ESLint - Syntax - No Destructuring - Rule.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Syntax_NoDestructuring_Runner_RuleDefaultOptionsAssignmentExpressions = boolean;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_RuleDefaultOptionsCallbackParams = boolean;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_RuleDefaultOptionsForOfLoops = boolean;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_RuleDefaultOptionsFunctionParams = boolean;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Syntax_NoDestructuring_Runner_RuleDefaultOptionsVariableDeclarations = boolean;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_RuleOptions_AssignmentExpressions = boolean;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_RuleOptions_CallbackParams = boolean;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_RuleOptions_ForOfLoops = boolean;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_RuleOptions_FunctionParams = boolean;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Syntax_NoDestructuring_Runner_RuleOptions_VariableDeclarations = boolean;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_RuleOptions = Readonly<{
  assignmentExpressions: Rules_Eslint_Syntax_NoDestructuring_Runner_RuleOptions_AssignmentExpressions;
  callbackParams: Rules_Eslint_Syntax_NoDestructuring_Runner_RuleOptions_CallbackParams;
  forOfLoops: Rules_Eslint_Syntax_NoDestructuring_Runner_RuleOptions_ForOfLoops;
  functionParams: Rules_Eslint_Syntax_NoDestructuring_Runner_RuleOptions_FunctionParams;
  ignoreFiles: Rules_Eslint_Syntax_NoDestructuring_Runner_RuleOptions_IgnoreFiles;
  variableDeclarations: Rules_Eslint_Syntax_NoDestructuring_Runner_RuleOptions_VariableDeclarations;
}>;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_RuleCheckCallbackParams = boolean;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_RuleCheckFunctionParams = boolean;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_RuleCheckForOfLoops = boolean;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_RuleCheckVariableDeclarations = boolean;

export type Rules_Eslint_Syntax_NoDestructuring_Runner_RuleCheckAssignmentExpressions = boolean;
