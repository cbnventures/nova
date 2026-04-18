import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintPatternsNoAwaitInLoopCheckAwaitContext,
  RulesEslintPatternsNoAwaitInLoopCheckAwaitDisallowedLoopTypes,
  RulesEslintPatternsNoAwaitInLoopCheckAwaitEnclosingLoop,
  RulesEslintPatternsNoAwaitInLoopCheckAwaitNode,
  RulesEslintPatternsNoAwaitInLoopCheckAwaitOptions,
  RulesEslintPatternsNoAwaitInLoopCheckAwaitReturns,
  RulesEslintPatternsNoAwaitInLoopGetEnclosingLoopCurrent,
  RulesEslintPatternsNoAwaitInLoopGetEnclosingLoopDisallowedLoopTypes,
  RulesEslintPatternsNoAwaitInLoopGetEnclosingLoopNode,
  RulesEslintPatternsNoAwaitInLoopGetEnclosingLoopReturns,
  RulesEslintPatternsNoAwaitInLoopRuleDefaultOptionsAllowFor,
  RulesEslintPatternsNoAwaitInLoopRuleDefaultOptionsAllowForIn,
  RulesEslintPatternsNoAwaitInLoopRuleDefaultOptionsAllowForOf,
  RulesEslintPatternsNoAwaitInLoopRuleDefaultOptionsAllowWhile,
  RulesEslintPatternsNoAwaitInLoopRuleDefaultOptionsIgnoreFiles,
  RulesEslintPatternsNoAwaitInLoopRuleOptions,
} from '../../../types/rules/eslint/patterns/no-await-in-loop.d.ts';

/**
 * Rules - ESLint - Patterns - No Await In Loop.
 *
 * Flags await expressions inside loops to
 * encourage parallel execution with Promise.all
 * instead of sequential awaiting.
 *
 * @since 0.15.0
 */
export class RulesEslintPatternsNoAwaitInLoop {
  /**
   * Rules - ESLint - Patterns - No Await In Loop - Boundary Types.
   *
   * AST node types that create a new async
   * scope and stop the upward search for enclosing loops.
   * Prevents false positives from nested functions.
   *
   * @private
   *
   * @since 0.15.0
   */
  static readonly #boundaryTypes = new Set([
    'FunctionDeclaration',
    'FunctionExpression',
    'ArrowFunctionExpression',
  ]);

  /**
   * Rules - ESLint - Patterns - No Await In Loop - Rule.
   *
   * Registered in eslint.config.ts and visits every
   * AwaitExpression node to check whether it sits inside
   * a disallowed loop construct.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-await-in-loop',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Disallow await inside loops.',
      },
      messages: {
        noAwaitInLoop: 'Unexpected await inside a loop. Use Promise.all() for parallelism.',
      },
      schema: [{
        type: 'object',
        properties: {
          allowFor: {
            type: 'boolean',
          },
          allowForIn: {
            type: 'boolean',
          },
          allowForOf: {
            type: 'boolean',
          },
          allowWhile: {
            type: 'boolean',
          },
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
      allowFor: false as RulesEslintPatternsNoAwaitInLoopRuleDefaultOptionsAllowFor,
      allowForIn: false as RulesEslintPatternsNoAwaitInLoopRuleDefaultOptionsAllowForIn,
      allowForOf: false as RulesEslintPatternsNoAwaitInLoopRuleDefaultOptionsAllowForOf,
      allowWhile: false as RulesEslintPatternsNoAwaitInLoopRuleDefaultOptionsAllowWhile,
      ignoreFiles: [] as RulesEslintPatternsNoAwaitInLoopRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintPatternsNoAwaitInLoopRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        AwaitExpression(node) {
          RulesEslintPatternsNoAwaitInLoop.checkAwait(context, node, options);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Patterns - No Await In Loop - Check Await.
   *
   * Builds the set of disallowed loop types from
   * options then delegates to getEnclosingLoop to determine
   * whether the await sits inside one.
   *
   * @private
   *
   * @param {RulesEslintPatternsNoAwaitInLoopCheckAwaitContext} context - Context.
   * @param {RulesEslintPatternsNoAwaitInLoopCheckAwaitNode}    node    - Node.
   * @param {RulesEslintPatternsNoAwaitInLoopCheckAwaitOptions} options - Options.
   *
   * @returns {RulesEslintPatternsNoAwaitInLoopCheckAwaitReturns}
   *
   * @since 0.15.0
   */
  private static checkAwait(context: RulesEslintPatternsNoAwaitInLoopCheckAwaitContext, node: RulesEslintPatternsNoAwaitInLoopCheckAwaitNode, options: RulesEslintPatternsNoAwaitInLoopCheckAwaitOptions): RulesEslintPatternsNoAwaitInLoopCheckAwaitReturns {
    const disallowedLoopTypes: RulesEslintPatternsNoAwaitInLoopCheckAwaitDisallowedLoopTypes = new Set<string>();

    if (options['allowFor'] !== true) {
      disallowedLoopTypes.add('ForStatement');
    }

    if (options['allowForIn'] !== true) {
      disallowedLoopTypes.add('ForInStatement');
    }

    if (options['allowForOf'] !== true) {
      disallowedLoopTypes.add('ForOfStatement');
    }

    if (options['allowWhile'] !== true) {
      disallowedLoopTypes.add('WhileStatement');
      disallowedLoopTypes.add('DoWhileStatement');
    }

    const enclosingLoop: RulesEslintPatternsNoAwaitInLoopCheckAwaitEnclosingLoop = RulesEslintPatternsNoAwaitInLoop.getEnclosingLoop(node, disallowedLoopTypes);

    if (enclosingLoop === undefined) {
      return;
    }

    context.report({
      node,
      messageId: 'noAwaitInLoop',
    });

    return;
  }

  /**
   * Rules - ESLint - Patterns - No Await In Loop - Get Enclosing Loop.
   *
   * Walks up the AST from the await node and
   * returns the first disallowed loop ancestor. Stops at
   * function boundaries to avoid cross-scope matches.
   *
   * @private
   *
   * @param {RulesEslintPatternsNoAwaitInLoopGetEnclosingLoopNode}                node                - Node.
   * @param {RulesEslintPatternsNoAwaitInLoopGetEnclosingLoopDisallowedLoopTypes} disallowedLoopTypes - Disallowed loop types.
   *
   * @returns {RulesEslintPatternsNoAwaitInLoopGetEnclosingLoopReturns}
   *
   * @since 0.15.0
   */
  private static getEnclosingLoop(node: RulesEslintPatternsNoAwaitInLoopGetEnclosingLoopNode, disallowedLoopTypes: RulesEslintPatternsNoAwaitInLoopGetEnclosingLoopDisallowedLoopTypes): RulesEslintPatternsNoAwaitInLoopGetEnclosingLoopReturns {
    let current: RulesEslintPatternsNoAwaitInLoopGetEnclosingLoopCurrent = node.parent;

    while (current !== undefined) {
      if (RulesEslintPatternsNoAwaitInLoop.#boundaryTypes.has(current.type) === true) {
        return undefined;
      }

      if (disallowedLoopTypes.has(current.type) === true) {
        return current;
      }

      current = current.parent;
    }

    return undefined;
  }
}
