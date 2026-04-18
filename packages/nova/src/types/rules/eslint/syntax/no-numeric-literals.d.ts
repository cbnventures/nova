import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Syntax - No Numeric Literals - Check Literal.
 *
 * @since 0.15.0
 */
export type RulesEslintSyntaxNoNumericLiteralsCheckLiteralContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintSyntaxNoNumericLiteralsCheckLiteralNode = TSESTree.Literal;

export type RulesEslintSyntaxNoNumericLiteralsCheckLiteralOptionsAllowHex = boolean;

export type RulesEslintSyntaxNoNumericLiteralsCheckLiteralOptionsAllowBinary = boolean;

export type RulesEslintSyntaxNoNumericLiteralsCheckLiteralOptionsAllowOctal = boolean;

export type RulesEslintSyntaxNoNumericLiteralsCheckLiteralOptions = {
  allowHex: RulesEslintSyntaxNoNumericLiteralsCheckLiteralOptionsAllowHex;
  allowBinary: RulesEslintSyntaxNoNumericLiteralsCheckLiteralOptionsAllowBinary;
  allowOctal: RulesEslintSyntaxNoNumericLiteralsCheckLiteralOptionsAllowOctal;
};

export type RulesEslintSyntaxNoNumericLiteralsCheckLiteralReturns = void;

export type RulesEslintSyntaxNoNumericLiteralsCheckLiteralRaw = string | undefined;

export type RulesEslintSyntaxNoNumericLiteralsCheckLiteralLowered = string;

/**
 * Rules - ESLint - Syntax - No Numeric Literals - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintSyntaxNoNumericLiteralsRuleDefaultOptionsAllowBinary = boolean;

export type RulesEslintSyntaxNoNumericLiteralsRuleDefaultOptionsAllowHex = boolean;

export type RulesEslintSyntaxNoNumericLiteralsRuleDefaultOptionsAllowOctal = boolean;

export type RulesEslintSyntaxNoNumericLiteralsRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintSyntaxNoNumericLiteralsRuleOptionsIgnoreFiles = string[];

export type RulesEslintSyntaxNoNumericLiteralsRuleOptionsAllowHex = boolean;

export type RulesEslintSyntaxNoNumericLiteralsRuleOptionsAllowBinary = boolean;

export type RulesEslintSyntaxNoNumericLiteralsRuleOptionsAllowOctal = boolean;

export type RulesEslintSyntaxNoNumericLiteralsRuleOptions = Readonly<{
  ignoreFiles: RulesEslintSyntaxNoNumericLiteralsRuleOptionsIgnoreFiles;
  allowHex: RulesEslintSyntaxNoNumericLiteralsRuleOptionsAllowHex;
  allowBinary: RulesEslintSyntaxNoNumericLiteralsRuleOptionsAllowBinary;
  allowOctal: RulesEslintSyntaxNoNumericLiteralsRuleOptionsAllowOctal;
}>;
