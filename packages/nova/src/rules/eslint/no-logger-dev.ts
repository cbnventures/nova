import { ESLintUtils } from '@typescript-eslint/utils';

import type {
  NoLoggerDevCameFromLoggerCustomizeIdentifier,
  NoLoggerDevCameFromLoggerCustomizeReturns,
  NoLoggerDevFindVariableIdentifier,
  NoLoggerDevFindVariableReturns,
  NoLoggerDevIsLoggerCustomizeCallNode,
  NoLoggerDevIsLoggerCustomizeCallTypeGuard,
} from '@/types/rules/eslint/no-logger-dev.d.ts';

/**
 * No logger dev.
 *
 * @since 1.0.0
 */
const noLoggerDev = ESLintUtils.RuleCreator(() => '#')({
  name: 'no-logger-dev',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow "Logger.dev" in production code.',
    },
    messages: {
      removeDev: 'Remove "Logger.dev" before building to production. Use "Logger.debug" instead if you would like to keep the existing log.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    /**
     * No logger dev - Find variable.
     *
     * @param {NoLoggerDevFindVariableIdentifier} identifier - Identifier.
     *
     * @returns {NoLoggerDevFindVariableReturns}
     *
     * @since 1.0.0
     */
    const findVariable = (identifier: NoLoggerDevFindVariableIdentifier): NoLoggerDevFindVariableReturns => {
      const scopeManager = context.sourceCode.scopeManager;

      if (scopeManager == null) {
        return undefined;
      }

      // Walk every scope so we can pinpoint the exact variable tied to this identifier.
      for (const scope of scopeManager.scopes) {
        const variable = scope.set.get(identifier.name);

        // Confirm the identifier we are examining lines up with the variable's reference entry.
        if (variable !== undefined && variable.references.some((reference) => reference.identifier === identifier)) {
          return variable;
        }
      }

      return undefined;
    };

    /**
     * No logger dev - Is logger customize call.
     *
     * @param {NoLoggerDevIsLoggerCustomizeCallNode} node - Node.
     *
     * @returns {boolean}
     *
     * @since 1.0.0
     */
    const isLoggerCustomizeCall = (node: NoLoggerDevIsLoggerCustomizeCallNode): node is NoLoggerDevIsLoggerCustomizeCallTypeGuard => {
      if (node == null || node.type !== 'CallExpression') {
        return false;
      }

      // Bail out unless the call looks like "something.dev()" (e.g., "Logger.dev()").
      if (node.callee.type !== 'MemberExpression' || node.callee.computed) {
        return false;
      }

      const { object, property } = node.callee;

      // Treat scoped loggers created via "Logger.customize" as equivalent to the base "Logger".
      return (
        object.type === 'Identifier'
        && object.name === 'Logger'
        && property.type === 'Identifier'
        && property.name === 'customize'
      );
    };

    /**
     * No logger dev - Came from logger customize.
     *
     * @param {NoLoggerDevCameFromLoggerCustomizeIdentifier} identifier - Identifier.
     *
     * @returns {NoLoggerDevCameFromLoggerCustomizeReturns}
     *
     * @since 1.0.0
     */
    const cameFromLoggerCustomize = (identifier: NoLoggerDevCameFromLoggerCustomizeIdentifier): NoLoggerDevCameFromLoggerCustomizeReturns => {
      const variable = findVariable(identifier);

      if (variable === undefined) {
        return false;
      }

      // Ensure the identifier originated from "Logger.customize" before flagging usage.
      return variable.defs.some((def) => {
        if (def.type !== 'Variable') {
          return false;
        }

        return isLoggerCustomizeCall(def.node.init ?? null);
      });
    };

    return {
      CallExpression(node) {
        // Bail out unless the call looks like "something.dev()" (e.g., "Logger.dev()").
        if (node.callee.type !== 'MemberExpression' || node.callee.computed) {
          return;
        }

        const { object, property } = node.callee;

        // Ensure the property explicitly reads ".dev" before flagging.
        if (property.type !== 'Identifier' || property.name !== 'dev') {
          return;
        }

        // Flag direct usage such as "Logger.dev"
        if (object.type === 'Identifier' && object.name === 'Logger') {
          context.report({
            node,
            messageId: 'removeDev',
          });

          return;
        }

        // Flag scoped loggers such as "Logger.customize().dev"
        if (isLoggerCustomizeCall(object)) {
          context.report({
            node,
            messageId: 'removeDev',
          });

          return;
        }

        // Catch variables (e.g., "const log = Logger.customize(); log.dev();").
        if (object.type === 'Identifier' && cameFromLoggerCustomize(object)) {
          context.report({
            node,
            messageId: 'removeDev',
          });
        }
      },
    };
  },
});

export default noLoggerDev;
