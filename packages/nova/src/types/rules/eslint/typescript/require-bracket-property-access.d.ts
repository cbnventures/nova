import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - TypeScript - Require Bracket Property Access - Check Member Expression.
 *
 * @since 0.15.0
 */
export type RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionContext = Readonly<RuleContext<string, readonly unknown[]>>;

export type RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionNode = TSESTree.MemberExpression;

export type RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionReturns = void;

export type RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionPropertyName = string;

export type RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionParserServices = ReturnType<typeof import('@typescript-eslint/utils').ESLintUtils.getParserServices>;

export type RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionChecker = import('typescript').TypeChecker;

export type RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionTsNode = import('typescript').Node;

export type RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionObjectType = import('typescript').Type;

export type RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionSymbol = import('typescript').Symbol | undefined;

export type RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionDeclarations = import('typescript').Declaration[] | undefined;

export type RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionSourceFileName = string;

export type RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionObjectText = string;

export type RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionNeedsParens = boolean;

export type RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionWrappedText = string;

/**
 * Rules - ESLint - TypeScript - Require Bracket Property Access - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintTypescriptRequireBracketPropertyAccessRuleDefaultOptionsAllowedProperties = string[];

export type RulesEslintTypescriptRequireBracketPropertyAccessRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintTypescriptRequireBracketPropertyAccessRuleOptionsAllowedProperties = string[];

export type RulesEslintTypescriptRequireBracketPropertyAccessRuleOptionsIgnoreFiles = string[];

export type RulesEslintTypescriptRequireBracketPropertyAccessRuleOptions = Readonly<{
  allowedProperties: RulesEslintTypescriptRequireBracketPropertyAccessRuleOptionsAllowedProperties;
  ignoreFiles: RulesEslintTypescriptRequireBracketPropertyAccessRuleOptionsIgnoreFiles;
}>;
