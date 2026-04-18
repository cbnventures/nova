import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Patterns - No Use Before Define - Check Identifier.
 *
 * @since 0.15.0
 */
export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierNode = TSESTree.Identifier;

export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierOptionsIgnoreFiles = string[];

export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierOptionsVariables = boolean;

export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierOptionsFunctions = boolean;

export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierOptionsClasses = boolean;

export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierOptionsTypes = boolean;

export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierOptions = Readonly<{
  ignoreFiles: RulesEslintPatternsNoUseBeforeDefineCheckIdentifierOptionsIgnoreFiles;
  variables: RulesEslintPatternsNoUseBeforeDefineCheckIdentifierOptionsVariables;
  functions: RulesEslintPatternsNoUseBeforeDefineCheckIdentifierOptionsFunctions;
  classes: RulesEslintPatternsNoUseBeforeDefineCheckIdentifierOptionsClasses;
  types: RulesEslintPatternsNoUseBeforeDefineCheckIdentifierOptionsTypes;
}>;

export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierReturns = void;

export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierScope = TSESLint.Scope.Scope;

export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierName = string;

export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierParent = TSESTree.Node | undefined;

export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierCurrentScope = TSESLint.Scope.Scope | null;

export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierVariable = TSESLint.Scope.Variable | undefined;

export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierFound = TSESLint.Scope.Variable | undefined;

export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierDefs = TSESLint.Scope.Definition[];

export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierDef = TSESLint.Scope.Definition | undefined;

export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierDefNode = TSESTree.Node;

export type RulesEslintPatternsNoUseBeforeDefineCheckIdentifierDefType = string;

/**
 * Rules - ESLint - Patterns - No Use Before Define - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintPatternsNoUseBeforeDefineRuleDefaultOptionsClasses = boolean;

export type RulesEslintPatternsNoUseBeforeDefineRuleDefaultOptionsFunctions = boolean;

export type RulesEslintPatternsNoUseBeforeDefineRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintPatternsNoUseBeforeDefineRuleDefaultOptionsTypes = boolean;

export type RulesEslintPatternsNoUseBeforeDefineRuleDefaultOptionsVariables = boolean;

export type RulesEslintPatternsNoUseBeforeDefineRuleOptionsIgnoreFiles = string[];

export type RulesEslintPatternsNoUseBeforeDefineRuleOptionsVariables = boolean;

export type RulesEslintPatternsNoUseBeforeDefineRuleOptionsFunctions = boolean;

export type RulesEslintPatternsNoUseBeforeDefineRuleOptionsClasses = boolean;

export type RulesEslintPatternsNoUseBeforeDefineRuleOptionsTypes = boolean;

export type RulesEslintPatternsNoUseBeforeDefineRuleOptions = Readonly<{
  ignoreFiles: RulesEslintPatternsNoUseBeforeDefineRuleOptionsIgnoreFiles;
  variables: RulesEslintPatternsNoUseBeforeDefineRuleOptionsVariables;
  functions: RulesEslintPatternsNoUseBeforeDefineRuleOptionsFunctions;
  classes: RulesEslintPatternsNoUseBeforeDefineRuleOptionsClasses;
  types: RulesEslintPatternsNoUseBeforeDefineRuleOptionsTypes;
}>;
