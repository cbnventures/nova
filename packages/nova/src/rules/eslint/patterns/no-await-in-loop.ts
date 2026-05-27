import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Context,
  Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_DisallowedLoopTypes,
  Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_EnclosingLoop,
  Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Node,
  Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Options,
  Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Returns,
  Rules_Eslint_Patterns_NoAwaitInLoop_Runner_GetEnclosingLoop_Current,
  Rules_Eslint_Patterns_NoAwaitInLoop_Runner_GetEnclosingLoop_DisallowedLoopTypes,
  Rules_Eslint_Patterns_NoAwaitInLoop_Runner_GetEnclosingLoop_Node,
  Rules_Eslint_Patterns_NoAwaitInLoop_Runner_GetEnclosingLoop_Returns,
  Rules_Eslint_Patterns_NoAwaitInLoop_Runner_RuleDefaultOptionsAllowFor,
  Rules_Eslint_Patterns_NoAwaitInLoop_Runner_RuleDefaultOptionsAllowForIn,
  Rules_Eslint_Patterns_NoAwaitInLoop_Runner_RuleDefaultOptionsAllowForOf,
  Rules_Eslint_Patterns_NoAwaitInLoop_Runner_RuleDefaultOptionsAllowWhile,
  Rules_Eslint_Patterns_NoAwaitInLoop_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Patterns_NoAwaitInLoop_Runner_RuleOptions,
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
export class Runner {
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
      allowFor: false as Rules_Eslint_Patterns_NoAwaitInLoop_Runner_RuleDefaultOptionsAllowFor,
      allowForIn: false as Rules_Eslint_Patterns_NoAwaitInLoop_Runner_RuleDefaultOptionsAllowForIn,
      allowForOf: false as Rules_Eslint_Patterns_NoAwaitInLoop_Runner_RuleDefaultOptionsAllowForOf,
      allowWhile: false as Rules_Eslint_Patterns_NoAwaitInLoop_Runner_RuleDefaultOptionsAllowWhile,
      ignoreFiles: [] as Rules_Eslint_Patterns_NoAwaitInLoop_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_RuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        AwaitExpression(node) {
          Runner.checkAwait(context, node, options);

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
   * @param {Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Context} context - Context.
   * @param {Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Node}    node    - Node.
   * @param {Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Options} options - Options.
   *
   * @returns {Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Returns}
   *
   * @since 0.15.0
   */
  private static checkAwait(context: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Context, node: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Node, options: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Options): Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Returns {
    const disallowedLoopTypes: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_DisallowedLoopTypes = new Set<string>();

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

    const enclosingLoop: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_EnclosingLoop = Runner.getEnclosingLoop(node, disallowedLoopTypes);

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
   * @param {Rules_Eslint_Patterns_NoAwaitInLoop_Runner_GetEnclosingLoop_Node}                node                - Node.
   * @param {Rules_Eslint_Patterns_NoAwaitInLoop_Runner_GetEnclosingLoop_DisallowedLoopTypes} disallowedLoopTypes - Disallowed loop types.
   *
   * @returns {Rules_Eslint_Patterns_NoAwaitInLoop_Runner_GetEnclosingLoop_Returns}
   *
   * @since 0.15.0
   */
  private static getEnclosingLoop(node: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_GetEnclosingLoop_Node, disallowedLoopTypes: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_GetEnclosingLoop_DisallowedLoopTypes): Rules_Eslint_Patterns_NoAwaitInLoop_Runner_GetEnclosingLoop_Returns {
    let current: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_GetEnclosingLoop_Current = node.parent;

    while (current !== undefined) {
      if (Runner.#boundaryTypes.has(current.type) === true) {
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
