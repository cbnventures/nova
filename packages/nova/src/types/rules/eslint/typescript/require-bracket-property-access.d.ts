import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - TypeScript - Require Bracket Property Access - Check Member Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Node = TSESTree.MemberExpression;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Returns = void;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_PropertyName = string;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_ParserServices = ReturnType<typeof import('@typescript-eslint/utils').ESLintUtils.getParserServices>;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Checker = import('typescript').TypeChecker;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_TsNode = import('typescript').Node;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_ObjectType = import('typescript').Type;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Symbol = import('typescript').Symbol | undefined;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Declarations = import('typescript').Declaration[] | undefined;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_SourceFileName = string;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_ObjectText = string;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_NeedsParens = boolean;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_WrappedText = string;

/**
 * Rules - ESLint - TypeScript - Require Bracket Property Access - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_RuleDefaultOptionsAllowedProperties = string[];

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_RuleOptions_AllowedProperties = string[];

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_RuleOptions = Readonly<{
  allowedProperties: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_RuleOptions_AllowedProperties;
  ignoreFiles: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_RuleOptions_IgnoreFiles;
}>;
