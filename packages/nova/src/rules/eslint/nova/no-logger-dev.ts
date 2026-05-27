import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Nova_NoLoggerDev_Runner_CameFromLoggerCustomize_Context,
  Rules_Eslint_Nova_NoLoggerDev_Runner_CameFromLoggerCustomize_Identifier,
  Rules_Eslint_Nova_NoLoggerDev_Runner_CameFromLoggerCustomize_Returns,
  Rules_Eslint_Nova_NoLoggerDev_Runner_CameFromLoggerCustomize_Variable,
  Rules_Eslint_Nova_NoLoggerDev_Runner_FindVariable_Context,
  Rules_Eslint_Nova_NoLoggerDev_Runner_FindVariable_Identifier,
  Rules_Eslint_Nova_NoLoggerDev_Runner_FindVariable_Returns,
  Rules_Eslint_Nova_NoLoggerDev_Runner_FindVariable_ScopeManager,
  Rules_Eslint_Nova_NoLoggerDev_Runner_FindVariable_Variable,
  Rules_Eslint_Nova_NoLoggerDev_Runner_IsLoggerCustomizeCall_Node,
  Rules_Eslint_Nova_NoLoggerDev_Runner_IsLoggerCustomizeCall_Object,
  Rules_Eslint_Nova_NoLoggerDev_Runner_IsLoggerCustomizeCall_Property,
  Rules_Eslint_Nova_NoLoggerDev_Runner_IsLoggerCustomizeCall_TypeGuard,
  Rules_Eslint_Nova_NoLoggerDev_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Nova_NoLoggerDev_Runner_RuleObject,
  Rules_Eslint_Nova_NoLoggerDev_Runner_RuleOptions,
  Rules_Eslint_Nova_NoLoggerDev_Runner_RuleProperty,
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
export class Runner {
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
      ignoreFiles: [] as Rules_Eslint_Nova_NoLoggerDev_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Nova_NoLoggerDev_Runner_RuleOptions = defaultOptions[0];

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

          const object: Rules_Eslint_Nova_NoLoggerDev_Runner_RuleObject = node.callee.object;
          const property: Rules_Eslint_Nova_NoLoggerDev_Runner_RuleProperty = node.callee.property;

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
          if (Runner.isLoggerCustomizeCall(object) === true) {
            context.report({
              node,
              messageId: 'removeDev',
            });

            return;
          }

          // Catch variables (e.g., "const log = Logger.customize(); log.dev();").
          if (object.type === 'Identifier' && Runner.cameFromLoggerCustomize(context, object) === true) {
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
   * @param {Rules_Eslint_Nova_NoLoggerDev_Runner_FindVariable_Context}    context    - Context.
   * @param {Rules_Eslint_Nova_NoLoggerDev_Runner_FindVariable_Identifier} identifier - Identifier.
   *
   * @returns {Rules_Eslint_Nova_NoLoggerDev_Runner_FindVariable_Returns}
   *
   * @since 0.12.0
   */
  private static findVariable(context: Rules_Eslint_Nova_NoLoggerDev_Runner_FindVariable_Context, identifier: Rules_Eslint_Nova_NoLoggerDev_Runner_FindVariable_Identifier): Rules_Eslint_Nova_NoLoggerDev_Runner_FindVariable_Returns {
    const scopeManager: Rules_Eslint_Nova_NoLoggerDev_Runner_FindVariable_ScopeManager = context.sourceCode.scopeManager;

    if (scopeManager === undefined || scopeManager === null) {
      return undefined;
    }

    // Walk every scope so we can pinpoint the exact variable tied to this identifier.
    for (const scope of scopeManager.scopes) {
      const variable: Rules_Eslint_Nova_NoLoggerDev_Runner_FindVariable_Variable = scope.set.get(identifier.name);

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
   * @param {Rules_Eslint_Nova_NoLoggerDev_Runner_IsLoggerCustomizeCall_Node} node - Node.
   *
   * @returns {boolean}
   *
   * @since 0.12.0
   */
  private static isLoggerCustomizeCall(node: Rules_Eslint_Nova_NoLoggerDev_Runner_IsLoggerCustomizeCall_Node): node is Rules_Eslint_Nova_NoLoggerDev_Runner_IsLoggerCustomizeCall_TypeGuard {
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

    const object: Rules_Eslint_Nova_NoLoggerDev_Runner_IsLoggerCustomizeCall_Object = node.callee.object;
    const property: Rules_Eslint_Nova_NoLoggerDev_Runner_IsLoggerCustomizeCall_Property = node.callee.property;

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
   * @param {Rules_Eslint_Nova_NoLoggerDev_Runner_CameFromLoggerCustomize_Context}    context    - Context.
   * @param {Rules_Eslint_Nova_NoLoggerDev_Runner_CameFromLoggerCustomize_Identifier} identifier - Identifier.
   *
   * @returns {Rules_Eslint_Nova_NoLoggerDev_Runner_CameFromLoggerCustomize_Returns}
   *
   * @since 0.12.0
   */
  private static cameFromLoggerCustomize(context: Rules_Eslint_Nova_NoLoggerDev_Runner_CameFromLoggerCustomize_Context, identifier: Rules_Eslint_Nova_NoLoggerDev_Runner_CameFromLoggerCustomize_Identifier): Rules_Eslint_Nova_NoLoggerDev_Runner_CameFromLoggerCustomize_Returns {
    const variable: Rules_Eslint_Nova_NoLoggerDev_Runner_CameFromLoggerCustomize_Variable = Runner.findVariable(context, identifier);

    if (variable === undefined) {
      return false;
    }

    // Ensure the identifier originated from "Logger.customize" before flagging usage.
    return variable.defs.some((def) => {
      if (def.type !== 'Variable') {
        return false;
      }

      return Runner.isLoggerCustomizeCall(def.node.init ?? null);
    });
  }
}
