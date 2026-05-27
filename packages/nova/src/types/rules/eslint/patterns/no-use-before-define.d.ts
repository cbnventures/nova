import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Patterns - No Use Before Define - Check Identifier.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Node = TSESTree.Identifier;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Options_IgnoreFiles = string[];

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Options_Variables = boolean;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Options_Functions = boolean;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Options_Classes = boolean;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Options_Types = boolean;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Options_IgnoreFiles;
  variables: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Options_Variables;
  functions: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Options_Functions;
  classes: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Options_Classes;
  types: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Options_Types;
}>;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Returns = void;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Scope = TSESLint.Scope.Scope;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Name = string;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Parent = TSESTree.Node | undefined;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_CurrentScope = TSESLint.Scope.Scope | null;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Variable = TSESLint.Scope.Variable | undefined;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Found = TSESLint.Scope.Variable | undefined;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Defs = TSESLint.Scope.Definition[];

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Def = TSESLint.Scope.Definition | undefined;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_DefNode = TSESTree.Node;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_DefType = string;

/**
 * Rules - ESLint - Patterns - No Use Before Define - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleDefaultOptionsClasses = boolean;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleDefaultOptionsFunctions = boolean;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleDefaultOptionsTypes = boolean;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleDefaultOptionsVariables = boolean;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleOptions_Variables = boolean;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleOptions_Functions = boolean;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleOptions_Classes = boolean;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleOptions_Types = boolean;

export type Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleOptions_IgnoreFiles;
  variables: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleOptions_Variables;
  functions: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleOptions_Functions;
  classes: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleOptions_Classes;
  types: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleOptions_Types;
}>;
