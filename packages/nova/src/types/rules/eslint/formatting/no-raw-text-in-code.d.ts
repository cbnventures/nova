import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - No Raw Text In Code - Rule.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Formatting_NoRawTextInCode_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - Formatting - No Raw Text In Code - Check JSX Text.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Formatting_NoRawTextInCode_Runner_CheckJSXText_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Formatting_NoRawTextInCode_Runner_CheckJSXText_Node = TSESTree.JSXText;

export type Rules_Eslint_Formatting_NoRawTextInCode_Runner_CheckJSXText_Returns = void;

export type Rules_Eslint_Formatting_NoRawTextInCode_Runner_CheckJSXText_Parent = TSESTree.Node | undefined;

/**
 * Rules - ESLint - Formatting - No Raw Text In Code - Create.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Formatting_NoRawTextInCode_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Formatting_NoRawTextInCode_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Formatting_NoRawTextInCode_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - Formatting - No Raw Text In Code - Create - JSX Text.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Formatting_NoRawTextInCode_Runner_Create_JSXText_Node = TSESTree.JSXText;

export type Rules_Eslint_Formatting_NoRawTextInCode_Runner_Create_JSXText_Returns = void;
