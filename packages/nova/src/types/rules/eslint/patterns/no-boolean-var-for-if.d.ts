import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Patterns - No Boolean Var For If - Check Variable Declaration.
 *
 * @since 0.15.0
 */
export type RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationNode = TSESTree.VariableDeclaration;

export type RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationReturns = void;

export type RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationDeclarator = TSESTree.VariableDeclarator | undefined;

export type RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationInit = TSESTree.Expression | null | undefined;

export type RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationVarName = string;

export type RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationParent = TSESTree.Node | undefined;

export type RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationBody = TSESTree.Statement[];

export type RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationNodeIndex = number;

export type RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationNextStatement = TSESTree.Statement | undefined;

export type RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationIfTest = TSESTree.Expression;

export type RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationScope = TSESLint.Scope.Scope;

export type RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationVariable = TSESLint.Scope.Variable | undefined;

export type RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationReferences = TSESLint.Scope.Reference[];

/**
 * Rules - ESLint - Patterns - No Boolean Var For If - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintPatternsNoBooleanVarForIfRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintPatternsNoBooleanVarForIfRuleOptionsIgnoreFiles = string[];

export type RulesEslintPatternsNoBooleanVarForIfRuleOptions = Readonly<{
  ignoreFiles: RulesEslintPatternsNoBooleanVarForIfRuleOptionsIgnoreFiles;
}>;
