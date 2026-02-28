import { ESLintUtils } from '@typescript-eslint/utils';

import type { NoRawTextInCodeCheckJSXTextNode, NoRawTextInCodeCheckJSXTextReturns } from '@/types/rules/eslint/no-raw-text-in-code.d.ts';

/**
 * No raw text in code.
 *
 * @since 1.0.0
 */
const noRawTextInCode = ESLintUtils.RuleCreator(() => '#')({
  name: 'no-raw-text-in-code',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow unwrapped text inside <code> JSX elements. Wrap text in a {} expression to prevent MDX parsing issues.',
    },
    messages: {
      noRawText: 'Do not put unwrapped text inside the <code> element. Wrap the text in a {} expression (e.g., <code>{\'Array<string>\'}</code>) to prevent MDX from parsing special characters as JSX.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    /**
     * No raw text in code - Check JSX text.
     *
     * @param {NoRawTextInCodeCheckJSXTextNode} node - JSXText node.
     *
     * @returns {NoRawTextInCodeCheckJSXTextReturns}
     *
     * @since 1.0.0
     */
    const checkJSXText = (node: NoRawTextInCodeCheckJSXTextNode): NoRawTextInCodeCheckJSXTextReturns => {
      const { parent } = node;

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
    };

    return {
      JSXText: checkJSXText,
    };
  },
});

export default noRawTextInCode;
