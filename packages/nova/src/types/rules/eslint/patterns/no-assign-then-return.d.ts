import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Patterns - No Assign Then Return - Check Return.
 *
 * @since 0.14.0
 */
export type RulesEslintPatternsNoAssignThenReturnCheckReturnContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintPatternsNoAssignThenReturnCheckReturnNode = TSESTree.ReturnStatement;

export type RulesEslintPatternsNoAssignThenReturnCheckReturnReturns = void;

export type RulesEslintPatternsNoAssignThenReturnCheckReturnArgument = TSESTree.Expression | null;

export type RulesEslintPatternsNoAssignThenReturnCheckReturnParent = TSESTree.Node | undefined;

export type RulesEslintPatternsNoAssignThenReturnCheckReturnBody = TSESTree.ProgramStatement[] | TSESTree.Statement[];

export type RulesEslintPatternsNoAssignThenReturnCheckReturnNodeIndex = number;

export type RulesEslintPatternsNoAssignThenReturnCheckReturnPrevStatement = TSESTree.ProgramStatement | TSESTree.Statement | undefined;

export type RulesEslintPatternsNoAssignThenReturnCheckReturnDeclarations = TSESTree.VariableDeclarator[];

export type RulesEslintPatternsNoAssignThenReturnCheckReturnDeclarator = TSESTree.VariableDeclarator | undefined;

export type RulesEslintPatternsNoAssignThenReturnCheckReturnInitText = string;

/**
 * Rules - ESLint - Patterns - No Assign Then Return - Rule.
 *
 * @since 0.14.0
 */
export type RulesEslintPatternsNoAssignThenReturnRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintPatternsNoAssignThenReturnRuleOptionsIgnoreFiles = string[];

export type RulesEslintPatternsNoAssignThenReturnRuleOptions = Readonly<{
  ignoreFiles: RulesEslintPatternsNoAssignThenReturnRuleOptionsIgnoreFiles;
}>;
