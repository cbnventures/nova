import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - TypeScript - Require Bracket Property Access - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_RuleDefaultOptionsAllowedProperties = string[];

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - TypeScript - Require Bracket Property Access - Check Member Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Node = TSESTree.MemberExpression;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Options_AllowedProperties = string[];

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Options_IgnoreFiles = string[];

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Options = Readonly<{
  allowedProperties: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Options_AllowedProperties;
  ignoreFiles: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Options_IgnoreFiles;
}>;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Returns = void;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_PropertyName = string;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_ParserServices = ReturnType<typeof import('@typescript-eslint/utils').ESLintUtils.getParserServices>;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Checker = import('typescript').TypeChecker;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_TsNode = import('typescript').Node;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_ObjectType = import('typescript').Type;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Symbol = import('typescript').Symbol | undefined;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Declarations = import('typescript').Declaration[] | undefined;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_SourceFileName = string;

/**
 * Rules - ESLint - TypeScript - Require Bracket Property Access - Check Member Expression - Fix.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Fix_ObjectText = string;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Fix_NeedsParens = boolean;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Fix_WrappedText = string;

/**
 * Rules - ESLint - TypeScript - Require Bracket Property Access - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_Create_Options_AllowedProperties = string[];

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_Create_Options = Readonly<{
  allowedProperties: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_Create_Options_AllowedProperties;
  ignoreFiles: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - TypeScript - Require Bracket Property Access - Create - Member Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_Create_MemberExpression_Node = TSESTree.MemberExpression;

export type Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_Create_MemberExpression_Returns = void;
