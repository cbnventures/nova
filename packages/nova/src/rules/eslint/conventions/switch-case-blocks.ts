import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintConventionsSwitchCaseBlocksCheckCaseConsequent,
  RulesEslintConventionsSwitchCaseBlocksCheckCaseContext,
  RulesEslintConventionsSwitchCaseBlocksCheckCaseFirstConsequent,
  RulesEslintConventionsSwitchCaseBlocksCheckCaseNode,
  RulesEslintConventionsSwitchCaseBlocksCheckCaseReturns,
  RulesEslintConventionsSwitchCaseBlocksCheckSwitchStatementContext,
  RulesEslintConventionsSwitchCaseBlocksCheckSwitchStatementHasDefault,
  RulesEslintConventionsSwitchCaseBlocksCheckSwitchStatementNode,
  RulesEslintConventionsSwitchCaseBlocksCheckSwitchStatementReturns,
  RulesEslintConventionsSwitchCaseBlocksRuleDefaultOptionsIgnoreFiles,
  RulesEslintConventionsSwitchCaseBlocksRuleDefaultOptionsRequireDefault,
  RulesEslintConventionsSwitchCaseBlocksRuleOptions,
} from '../../../types/rules/eslint/conventions/switch-case-blocks.d.ts';

/**
 * Rules - ESLint - Conventions - Switch Case Blocks.
 *
 * Requires every switch case to wrap its body in a block statement and optionally enforces a
 * default case to prevent unhandled branches.
 *
 * @since 0.13.0
 */
export class RulesEslintConventionsSwitchCaseBlocks {
  /**
   * Rules - ESLint - Conventions - Switch Case Blocks - Rule.
   *
   * Exported through the ESLint plugin index and activated in
   * eslint.config.ts. Listens for both SwitchCase and SwitchStatement nodes.
   *
   * @since 0.13.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'switch-case-blocks',
    meta: {
      type: 'layout',
      docs: {
        description: 'Require each switch case to wrap its statements in a block (e.g., "case x: { ... }").',
      },
      messages: {
        requireBlock: 'Wrap this switch case body in a block.',
        requireDefault: 'Always include a default case, even if there\'s nothing to handle.',
      },
      schema: [{
        type: 'object',
        properties: {
          ignoreFiles: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          requireDefault: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      }],
    },
    defaultOptions: [{
      ignoreFiles: [] as RulesEslintConventionsSwitchCaseBlocksRuleDefaultOptionsIgnoreFiles,
      requireDefault: true as RulesEslintConventionsSwitchCaseBlocksRuleDefaultOptionsRequireDefault,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintConventionsSwitchCaseBlocksRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        SwitchCase(node) {
          RulesEslintConventionsSwitchCaseBlocks.checkCase(context, node);

          return;
        },
        SwitchStatement(node) {
          if (options['requireDefault'] === true) {
            RulesEslintConventionsSwitchCaseBlocks.checkSwitchStatement(context, node);
          }

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Conventions - Switch Case Blocks - Check Case.
   *
   * Validates a single SwitchCase node by ensuring its consequent
   * is exactly one BlockStatement. Empty cases are allowed for explicit fallthrough.
   *
   * @private
   *
   * @param {RulesEslintConventionsSwitchCaseBlocksCheckCaseContext} context - Context.
   * @param {RulesEslintConventionsSwitchCaseBlocksCheckCaseNode}    node    - Node.
   *
   * @returns {RulesEslintConventionsSwitchCaseBlocksCheckCaseReturns}
   *
   * @since 0.13.0
   */
  private static checkCase(context: RulesEslintConventionsSwitchCaseBlocksCheckCaseContext, node: RulesEslintConventionsSwitchCaseBlocksCheckCaseNode): RulesEslintConventionsSwitchCaseBlocksCheckCaseReturns {
    const consequent: RulesEslintConventionsSwitchCaseBlocksCheckCaseConsequent = node.consequent;

    // Allow empty cases (fallthrough handled explicitly by author).
    if (consequent.length === 0) {
      return;
    }

    // Valid when the case has exactly one BlockStatement.
    const firstConsequent: RulesEslintConventionsSwitchCaseBlocksCheckCaseFirstConsequent = consequent[0];

    if (
      consequent.length === 1
      && firstConsequent !== undefined
      && firstConsequent.type === 'BlockStatement'
    ) {
      return;
    }

    context.report({
      node,
      messageId: 'requireBlock',
    });

    return;
  }

  /**
   * Rules - ESLint - Conventions - Switch Case Blocks - Check Switch Statement.
   *
   * Checks whether the SwitchStatement includes a default case.
   * Only called when the requireDefault option is enabled in the rule configuration.
   *
   * @private
   *
   * @param {RulesEslintConventionsSwitchCaseBlocksCheckSwitchStatementContext} context - Context.
   * @param {RulesEslintConventionsSwitchCaseBlocksCheckSwitchStatementNode}    node    - Node.
   *
   * @returns {RulesEslintConventionsSwitchCaseBlocksCheckSwitchStatementReturns}
   *
   * @since 0.13.0
   */
  private static checkSwitchStatement(context: RulesEslintConventionsSwitchCaseBlocksCheckSwitchStatementContext, node: RulesEslintConventionsSwitchCaseBlocksCheckSwitchStatementNode): RulesEslintConventionsSwitchCaseBlocksCheckSwitchStatementReturns {
    const hasDefault: RulesEslintConventionsSwitchCaseBlocksCheckSwitchStatementHasDefault = node.cases.some((switchCase) => switchCase.test === null);

    if (hasDefault === false) {
      context.report({
        node,
        messageId: 'requireDefault',
      });
    }

    return;
  }
}
