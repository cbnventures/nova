import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - Require Undefined Init - Check Declarator.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireUndefinedInitCheckDeclaratorContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintConventionsRequireUndefinedInitCheckDeclaratorNode = TSESTree.VariableDeclarator;

export type RulesEslintConventionsRequireUndefinedInitCheckDeclaratorReturns = void;

export type RulesEslintConventionsRequireUndefinedInitCheckDeclaratorParent = TSESTree.Node | undefined;

export type RulesEslintConventionsRequireUndefinedInitCheckDeclaratorGrandparent = TSESTree.Node | undefined;

/**
 * Rules - ESLint - Conventions - Require Undefined Init - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireUndefinedInitRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintConventionsRequireUndefinedInitRuleOptionsIgnoreFiles = string[];

export type RulesEslintConventionsRequireUndefinedInitRuleOptions = Readonly<{
  ignoreFiles: RulesEslintConventionsRequireUndefinedInitRuleOptionsIgnoreFiles;
}>;
