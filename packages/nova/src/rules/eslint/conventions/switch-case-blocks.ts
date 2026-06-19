import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckCase_Consequent,
  Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckCase_Context,
  Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckCase_FirstConsequent,
  Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckCase_Node,
  Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckCase_Returns,
  Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckSwitchStatement_Context,
  Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckSwitchStatement_HasDefault,
  Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckSwitchStatement_Node,
  Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckSwitchStatement_Returns,
  Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_Options,
  Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_SwitchCase_Node,
  Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_SwitchCase_Returns,
  Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_SwitchStatement_Node,
  Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_SwitchStatement_Returns,
  Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_RuleDefaultOptionsRequireDefault,
} from '../../../types/rules/eslint/conventions/switch-case-blocks.d.ts';

/**
 * Rules - ESLint - Conventions - Switch Case Blocks.
 *
 * Requires every switch case to wrap its body in a block statement and optionally enforces a
 * default case to prevent unhandled branches.
 *
 * @since 0.13.0
 */
export class Runner {
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
      ignoreFiles: [] as Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_RuleDefaultOptionsIgnoreFiles,
      requireDefault: true as Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_RuleDefaultOptionsRequireDefault,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        SwitchCase(node: Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_SwitchCase_Node): Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_SwitchCase_Returns {
          Runner.checkCase(context, node);

          return;
        },
        SwitchStatement(node: Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_SwitchStatement_Node): Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_Create_SwitchStatement_Returns {
          if (options['requireDefault'] === true) {
            Runner.checkSwitchStatement(context, node);
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
   * @param {Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckCase_Context} context - Context.
   * @param {Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckCase_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckCase_Returns}
   *
   * @since 0.13.0
   */
  private static checkCase(context: Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckCase_Context, node: Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckCase_Node): Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckCase_Returns {
    const consequent: Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckCase_Consequent = node.consequent;

    // Allow empty cases (fallthrough handled explicitly by author).
    if (consequent.length === 0) {
      return;
    }

    // Valid when the case has exactly one BlockStatement.
    const firstConsequent: Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckCase_FirstConsequent = consequent[0];

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
   * @param {Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckSwitchStatement_Context} context - Context.
   * @param {Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckSwitchStatement_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckSwitchStatement_Returns}
   *
   * @since 0.13.0
   */
  private static checkSwitchStatement(context: Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckSwitchStatement_Context, node: Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckSwitchStatement_Node): Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckSwitchStatement_Returns {
    const hasDefault: Rules_Eslint_Conventions_SwitchCaseBlocks_Runner_CheckSwitchStatement_HasDefault = node.cases.some((switchCase) => switchCase.test === null);

    if (hasDefault === false) {
      context.report({
        node,
        messageId: 'requireDefault',
      });
    }

    return;
  }
}
