import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - Require Explicit Return - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_RuleDefaultOptionsExcludeArrowFunctions = boolean;

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_RuleDefaultOptionsExcludeConstructors = boolean;

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_RuleDefaultOptionsExcludeSetters = boolean;

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - Conventions - Require Explicit Return - Check Function.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Node = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Options_ExcludeArrowFunctions = boolean;

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Options_ExcludeConstructors = boolean;

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Options_ExcludeSetters = boolean;

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Options_IgnoreFiles = string[];

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Options = Readonly<{
  excludeArrowFunctions: Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Options_ExcludeArrowFunctions;
  excludeConstructors: Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Options_ExcludeConstructors;
  excludeSetters: Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Options_ExcludeSetters;
  ignoreFiles: Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Options_IgnoreFiles;
}>;

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Returns = void;

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Parent = TSESTree.Node;

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Body = TSESTree.BlockStatement | TSESTree.Expression;

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Statements = TSESTree.Statement[];

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_LastStatement = TSESTree.Statement | undefined;

/**
 * Rules - ESLint - Conventions - Require Explicit Return - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_Create_Options_ExcludeArrowFunctions = boolean;

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_Create_Options_ExcludeConstructors = boolean;

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_Create_Options_ExcludeSetters = boolean;

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_Create_Options = Readonly<{
  excludeArrowFunctions: Rules_Eslint_Conventions_RequireExplicitReturn_Runner_Create_Options_ExcludeArrowFunctions;
  excludeConstructors: Rules_Eslint_Conventions_RequireExplicitReturn_Runner_Create_Options_ExcludeConstructors;
  excludeSetters: Rules_Eslint_Conventions_RequireExplicitReturn_Runner_Create_Options_ExcludeSetters;
  ignoreFiles: Rules_Eslint_Conventions_RequireExplicitReturn_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - Conventions - Require Explicit Return - Has Return Value.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_HasReturnValue_Node = TSESTree.Node;

export type Rules_Eslint_Conventions_RequireExplicitReturn_Runner_HasReturnValue_Returns = boolean;
