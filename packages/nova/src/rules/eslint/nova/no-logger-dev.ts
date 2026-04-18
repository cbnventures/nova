import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintNovaNoLoggerDevCameFromLoggerCustomizeContext,
  RulesEslintNovaNoLoggerDevCameFromLoggerCustomizeIdentifier,
  RulesEslintNovaNoLoggerDevCameFromLoggerCustomizeReturns,
  RulesEslintNovaNoLoggerDevCameFromLoggerCustomizeVariable,
  RulesEslintNovaNoLoggerDevFindVariableContext,
  RulesEslintNovaNoLoggerDevFindVariableIdentifier,
  RulesEslintNovaNoLoggerDevFindVariableReturns,
  RulesEslintNovaNoLoggerDevFindVariableScopeManager,
  RulesEslintNovaNoLoggerDevFindVariableVariable,
  RulesEslintNovaNoLoggerDevIsLoggerCustomizeCallNode,
  RulesEslintNovaNoLoggerDevIsLoggerCustomizeCallObject,
  RulesEslintNovaNoLoggerDevIsLoggerCustomizeCallProperty,
  RulesEslintNovaNoLoggerDevIsLoggerCustomizeCallTypeGuard,
  RulesEslintNovaNoLoggerDevRuleDefaultOptionsIgnoreFiles,
  RulesEslintNovaNoLoggerDevRuleObject,
  RulesEslintNovaNoLoggerDevRuleOptions,
  RulesEslintNovaNoLoggerDevRuleProperty,
} from '../../../types/rules/eslint/nova/no-logger-dev.d.ts';

/**
 * Rules - ESLint - Nova - No Logger Dev.
 *
 * Prevents Logger.dev calls from reaching production
 * builds. Detects direct calls, chained customize calls,
 * and variable-assigned scoped loggers.
 *
 * @since 0.12.0
 */
export class RulesEslintNovaNoLoggerDev {
  /**
   * Rules - ESLint - Nova - No Logger Dev - Rule.
   *
   * Registered in eslint.config.ts and visits every
   * CallExpression to detect Logger.dev usage in direct,
   * chained, and variable-assigned forms.
   *
   * @since 0.12.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-logger-dev',
    meta: {
      type: 'problem',
      docs: {
        description: 'Disallow "Logger.dev" in production code.',
      },
      messages: {
        removeDev: 'Remove "Logger.dev" before building to production. Use "Logger.debug" instead if you would like to keep the existing log.',
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
      ignoreFiles: [] as RulesEslintNovaNoLoggerDevRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintNovaNoLoggerDevRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        CallExpression(node) {
          // Bail out unless the call looks like "something.dev()" (e.g., "Logger.dev()").
          if (node.callee.type !== 'MemberExpression' || node.callee.computed === true) {
            return;
          }

          const object: RulesEslintNovaNoLoggerDevRuleObject = node.callee.object;
          const property: RulesEslintNovaNoLoggerDevRuleProperty = node.callee.property;

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
          if (RulesEslintNovaNoLoggerDev.isLoggerCustomizeCall(object) === true) {
            context.report({
              node,
              messageId: 'removeDev',
            });

            return;
          }

          // Catch variables (e.g., "const log = Logger.customize(); log.dev();").
          if (object.type === 'Identifier' && RulesEslintNovaNoLoggerDev.cameFromLoggerCustomize(context, object) === true) {
            context.report({
              node,
              messageId: 'removeDev',
            });
          }

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Nova - No Logger Dev - Find Variable.
   *
   * Searches all scopes in the scope manager to locate
   * the variable definition tied to an identifier. Used
   * by cameFromLoggerCustomize for alias tracking.
   *
   * @private
   *
   * @param {RulesEslintNovaNoLoggerDevFindVariableContext}    context    - Context.
   * @param {RulesEslintNovaNoLoggerDevFindVariableIdentifier} identifier - Identifier.
   *
   * @returns {RulesEslintNovaNoLoggerDevFindVariableReturns}
   *
   * @since 0.12.0
   */
  private static findVariable(context: RulesEslintNovaNoLoggerDevFindVariableContext, identifier: RulesEslintNovaNoLoggerDevFindVariableIdentifier): RulesEslintNovaNoLoggerDevFindVariableReturns {
    const scopeManager: RulesEslintNovaNoLoggerDevFindVariableScopeManager = context.sourceCode.scopeManager;

    if (scopeManager === undefined || scopeManager === null) {
      return undefined;
    }

    // Walk every scope so we can pinpoint the exact variable tied to this identifier.
    for (const scope of scopeManager.scopes) {
      const variable: RulesEslintNovaNoLoggerDevFindVariableVariable = scope.set.get(identifier.name);

      // Confirm the identifier we are examining lines up with the variable's reference entry.
      if (variable !== undefined && variable.references.some((reference) => reference.identifier === identifier) === true) {
        return variable;
      }
    }

    return undefined;
  }

  /**
   * Rules - ESLint - Nova - No Logger Dev - Is Logger Customize Call.
   *
   * Type guard that checks whether an AST node is a
   * call to Logger.customize so that chained usage like
   * Logger.customize().dev can be detected.
   *
   * @private
   *
   * @param {RulesEslintNovaNoLoggerDevIsLoggerCustomizeCallNode} node - Node.
   *
   * @returns {boolean}
   *
   * @since 0.12.0
   */
  private static isLoggerCustomizeCall(node: RulesEslintNovaNoLoggerDevIsLoggerCustomizeCallNode): node is RulesEslintNovaNoLoggerDevIsLoggerCustomizeCallTypeGuard {
    if (
      node === undefined
      || node === null
      || node.type !== 'CallExpression'
    ) {
      return false;
    }

    // Bail out unless the call looks like "something.dev()" (e.g., "Logger.dev()").
    if (node.callee.type !== 'MemberExpression' || node.callee.computed === true) {
      return false;
    }

    const object: RulesEslintNovaNoLoggerDevIsLoggerCustomizeCallObject = node.callee.object;
    const property: RulesEslintNovaNoLoggerDevIsLoggerCustomizeCallProperty = node.callee.property;

    // Treat scoped loggers created via "Logger.customize" as equivalent to the base "Logger".
    return (
      object.type === 'Identifier'
      && object.name === 'Logger'
      && property.type === 'Identifier'
      && property.name === 'customize'
    );
  }

  /**
   * Rules - ESLint - Nova - No Logger Dev - Came From Logger Customize.
   *
   * Resolves an identifier back to its variable
   * definition to determine if it was initialized from
   * a Logger.customize call.
   *
   * @private
   *
   * @param {RulesEslintNovaNoLoggerDevCameFromLoggerCustomizeContext}    context    - Context.
   * @param {RulesEslintNovaNoLoggerDevCameFromLoggerCustomizeIdentifier} identifier - Identifier.
   *
   * @returns {RulesEslintNovaNoLoggerDevCameFromLoggerCustomizeReturns}
   *
   * @since 0.12.0
   */
  private static cameFromLoggerCustomize(context: RulesEslintNovaNoLoggerDevCameFromLoggerCustomizeContext, identifier: RulesEslintNovaNoLoggerDevCameFromLoggerCustomizeIdentifier): RulesEslintNovaNoLoggerDevCameFromLoggerCustomizeReturns {
    const variable: RulesEslintNovaNoLoggerDevCameFromLoggerCustomizeVariable = RulesEslintNovaNoLoggerDev.findVariable(context, identifier);

    if (variable === undefined) {
      return false;
    }

    // Ensure the identifier originated from "Logger.customize" before flagging usage.
    return variable.defs.some((def) => {
      if (def.type !== 'Variable') {
        return false;
      }

      return RulesEslintNovaNoLoggerDev.isLoggerCustomizeCall(def.node.init ?? null);
    });
  }
}
