import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Formatting_NoRawTextInCode_Runner_CheckJSXText_Context,
  Rules_Eslint_Formatting_NoRawTextInCode_Runner_CheckJSXText_Node,
  Rules_Eslint_Formatting_NoRawTextInCode_Runner_CheckJSXText_Parent,
  Rules_Eslint_Formatting_NoRawTextInCode_Runner_CheckJSXText_Returns,
  Rules_Eslint_Formatting_NoRawTextInCode_Runner_Create_JSXText_Node,
  Rules_Eslint_Formatting_NoRawTextInCode_Runner_Create_JSXText_Returns,
  Rules_Eslint_Formatting_NoRawTextInCode_Runner_Create_Options,
  Rules_Eslint_Formatting_NoRawTextInCode_Runner_RuleDefaultOptionsIgnoreFiles,
} from '../../../types/rules/eslint/formatting/no-raw-text-in-code.d.ts';

/**
 * Rules - ESLint - Formatting - No Raw Text In Code.
 *
 * Prevents unwrapped text inside JSX code elements so angle
 * brackets and other special characters are not misinterpreted by the MDX parser.
 *
 * @since 0.13.0
 */
export class Runner {
  /**
   * Rules - ESLint - Formatting - No Raw Text In Code - Rule.
   *
   * Registered under the name no-raw-text-in-code and exported through the rules index as
   * NoRawTextInCode for preset consumption.
   *
   * @since 0.13.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-raw-text-in-code',
    meta: {
      type: 'problem',
      docs: {
        description: 'Disallow unwrapped text inside <code> JSX elements. Wrap text in a {} expression to prevent MDX parsing issues.',
      },
      messages: {
        noRawText: 'Do not put unwrapped text inside the <code> element. Wrap the text in a {} expression (e.g., <code>{\'Array<string>\'}</code>) to prevent MDX from parsing special characters as JSX.',
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
        },
        additionalProperties: false,
      }],
    },
    defaultOptions: [{
      ignoreFiles: [] as Rules_Eslint_Formatting_NoRawTextInCode_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Formatting_NoRawTextInCode_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        JSXText(node: Rules_Eslint_Formatting_NoRawTextInCode_Runner_Create_JSXText_Node): Rules_Eslint_Formatting_NoRawTextInCode_Runner_Create_JSXText_Returns {
          Runner.checkJSXText(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Formatting - No Raw Text In Code - Check JSX Text.
   *
   * Checks whether the JSXText node is a direct child of a code
   * JSXElement and reports it so the text is wrapped in a curly-brace expression.
   *
   * @private
   *
   * @param {Rules_Eslint_Formatting_NoRawTextInCode_Runner_CheckJSXText_Context} context - Context.
   * @param {Rules_Eslint_Formatting_NoRawTextInCode_Runner_CheckJSXText_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Formatting_NoRawTextInCode_Runner_CheckJSXText_Returns}
   *
   * @since 0.13.0
   */
  private static checkJSXText(context: Rules_Eslint_Formatting_NoRawTextInCode_Runner_CheckJSXText_Context, node: Rules_Eslint_Formatting_NoRawTextInCode_Runner_CheckJSXText_Node): Rules_Eslint_Formatting_NoRawTextInCode_Runner_CheckJSXText_Returns {
    const parent: Rules_Eslint_Formatting_NoRawTextInCode_Runner_CheckJSXText_Parent = node.parent;

    if (
      parent !== undefined
      && parent.type === 'JSXElement'
      && parent.openingElement.name.type === 'JSXIdentifier'
      && parent.openingElement.name.name === 'code'
    ) {
      context.report({
        node,
        messageId: 'noRawText',
      });
    }

    return;
  }
}
