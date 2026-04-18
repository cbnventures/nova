import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintSyntaxNoRestParamsCheckFunctionAllowPatterns,
  RulesEslintSyntaxNoRestParamsCheckFunctionContext,
  RulesEslintSyntaxNoRestParamsCheckFunctionFunctionName,
  RulesEslintSyntaxNoRestParamsCheckFunctionNode,
  RulesEslintSyntaxNoRestParamsCheckFunctionReturns,
  RulesEslintSyntaxNoRestParamsGetFunctionNameClassNode,
  RulesEslintSyntaxNoRestParamsGetFunctionNameNode,
  RulesEslintSyntaxNoRestParamsGetFunctionNameObjectNode,
  RulesEslintSyntaxNoRestParamsGetFunctionNameParent,
  RulesEslintSyntaxNoRestParamsGetFunctionNameParentName,
  RulesEslintSyntaxNoRestParamsGetFunctionNameReturns,
  RulesEslintSyntaxNoRestParamsGetParentNameClassNode,
  RulesEslintSyntaxNoRestParamsGetParentNameNode,
  RulesEslintSyntaxNoRestParamsGetParentNameReturns,
  RulesEslintSyntaxNoRestParamsIsAllowedName,
  RulesEslintSyntaxNoRestParamsIsAllowedPatterns,
  RulesEslintSyntaxNoRestParamsIsAllowedPrefix,
  RulesEslintSyntaxNoRestParamsIsAllowedReturns,
  RulesEslintSyntaxNoRestParamsRuleAllowPatterns,
  RulesEslintSyntaxNoRestParamsRuleDefaultOptionsAllow,
  RulesEslintSyntaxNoRestParamsRuleDefaultOptionsIgnoreFiles,
  RulesEslintSyntaxNoRestParamsRuleOptions,
} from '../../../types/rules/eslint/syntax/no-rest-params.d.ts';

/**
 * Rules - ESLint - Syntax - No Rest Params.
 *
 * Bans rest parameters (...args) in function signatures to enforce explicit named
 * parameters. Supports an allow list for variadic APIs like Logger methods.
 *
 * @since 0.15.0
 */
export class RulesEslintSyntaxNoRestParams {
  /**
   * Rules - ESLint - Syntax - No Rest Params - Rule.
   *
   * Registered in eslint.config.ts and visits
   * function declarations, function expressions, and
   * arrow functions to check for rest parameters.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-rest-params',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Disallow rest parameters (...args) in function signatures.',
      },
      messages: {
        noRestParams: 'Unexpected rest parameter. Use explicit named parameters instead.',
      },
      schema: [{
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            items: {
              type: 'string',
            },
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
      allow: [] as RulesEslintSyntaxNoRestParamsRuleDefaultOptionsAllow,
      ignoreFiles: [] as RulesEslintSyntaxNoRestParamsRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintSyntaxNoRestParamsRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      const allowPatterns: RulesEslintSyntaxNoRestParamsRuleAllowPatterns = options['allow'];

      return {
        FunctionDeclaration(node) {
          RulesEslintSyntaxNoRestParams.checkFunction(context, node, allowPatterns);

          return;
        },
        FunctionExpression(node) {
          RulesEslintSyntaxNoRestParams.checkFunction(context, node, allowPatterns);

          return;
        },
        ArrowFunctionExpression(node) {
          RulesEslintSyntaxNoRestParams.checkFunction(context, node, allowPatterns);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Syntax - No Rest Params - Get Parent Name.
   *
   * Walks up the AST from a method definition
   * to find the enclosing class name, producing a qualified
   * name like "ClassName.methodName" for the allow list.
   *
   * @private
   *
   * @param {RulesEslintSyntaxNoRestParamsGetParentNameNode} node - Node.
   *
   * @returns {RulesEslintSyntaxNoRestParamsGetParentNameReturns}
   *
   * @since 0.15.0
   */
  private static getParentName(node: RulesEslintSyntaxNoRestParamsGetParentNameNode): RulesEslintSyntaxNoRestParamsGetParentNameReturns {
    if (
      node.type === 'MethodDefinition'
      && node.key.type === 'Identifier'
    ) {
      const classNode: RulesEslintSyntaxNoRestParamsGetParentNameClassNode = node.parent;

      if (
        classNode !== undefined
        && classNode.type === 'ClassBody'
        && classNode.parent !== undefined
        && classNode.parent.type === 'ClassDeclaration'
        && classNode.parent.id !== null
        && classNode.parent.id !== undefined
      ) {
        return `${classNode.parent.id.name}.${node.key.name}`;
      }

      return node.key.name;
    }

    if (node.parent !== undefined && node.parent.type !== 'Program') {
      return RulesEslintSyntaxNoRestParams.getParentName(node.parent);
    }

    return undefined;
  }

  /**
   * Rules - ESLint - Syntax - No Rest Params - Is Allowed.
   *
   * Checks whether a function name matches any pattern in the allow list. Supports exact
   * matches and wildcard patterns like "Logger.*" for entire classes.
   *
   * @private
   *
   * @param {RulesEslintSyntaxNoRestParamsIsAllowedName}     name     - Name.
   * @param {RulesEslintSyntaxNoRestParamsIsAllowedPatterns} patterns - Patterns.
   *
   * @returns {RulesEslintSyntaxNoRestParamsIsAllowedReturns}
   *
   * @since 0.15.0
   */
  private static isAllowed(name: RulesEslintSyntaxNoRestParamsIsAllowedName, patterns: RulesEslintSyntaxNoRestParamsIsAllowedPatterns): RulesEslintSyntaxNoRestParamsIsAllowedReturns {
    for (const pattern of patterns) {
      // Wildcard match: "Logger.*" matches "Logger.info", "Logger.warn", etc.
      if (pattern.endsWith('.*') === true) {
        const prefix: RulesEslintSyntaxNoRestParamsIsAllowedPrefix = pattern.slice(0, -2);

        if (name.startsWith(`${prefix}.`) === true) {
          return true;
        }
      }

      // Exact match: "Logger.info" matches "Logger.info".
      if (name === pattern) {
        return true;
      }
    }

    return false;
  }

  /**
   * Rules - ESLint - Syntax - No Rest Params - Get Function Name.
   *
   * Resolves the qualified name of a function node
   * by inspecting its parent: class methods, object methods,
   * variable assignments, and named declarations.
   *
   * @private
   *
   * @param {RulesEslintSyntaxNoRestParamsGetFunctionNameNode} node - Node.
   *
   * @returns {RulesEslintSyntaxNoRestParamsGetFunctionNameReturns}
   *
   * @since 0.15.0
   */
  private static getFunctionName(node: RulesEslintSyntaxNoRestParamsGetFunctionNameNode): RulesEslintSyntaxNoRestParamsGetFunctionNameReturns {
    const parent: RulesEslintSyntaxNoRestParamsGetFunctionNameParent = node.parent;

    // Class method: class Logger { static info(...messages) {} }
    if (
      parent !== undefined
      && parent.type === 'MethodDefinition'
      && parent.key.type === 'Identifier'
    ) {
      const classNode: RulesEslintSyntaxNoRestParamsGetFunctionNameClassNode = parent.parent;

      if (
        classNode !== undefined
        && classNode.type === 'ClassBody'
        && classNode.parent !== undefined
        && classNode.parent.type === 'ClassDeclaration'
        && classNode.parent.id !== null
        && classNode.parent.id !== undefined
      ) {
        return `${classNode.parent.id.name}.${parent.key.name}`;
      }

      return parent.key.name;
    }

    // Object method: const logger = { info(...messages) {} }
    if (
      parent !== undefined
      && parent.type === 'Property'
      && parent.key.type === 'Identifier'
    ) {
      const objectNode: RulesEslintSyntaxNoRestParamsGetFunctionNameObjectNode = parent.parent;

      if (
        objectNode !== undefined
        && objectNode.type === 'ObjectExpression'
        && objectNode.parent !== undefined
        && objectNode.parent.type === 'VariableDeclarator'
        && objectNode.parent.id.type === 'Identifier'
      ) {
        return `${objectNode.parent.id.name}.${parent.key.name}`;
      }

      // Returned object method: class Logger { static customize() { return { info(...messages) {} } } }
      if (
        objectNode !== undefined
        && objectNode.type === 'ObjectExpression'
        && objectNode.parent !== undefined
        && objectNode.parent.type === 'ReturnStatement'
      ) {
        const parentName: RulesEslintSyntaxNoRestParamsGetFunctionNameParentName = RulesEslintSyntaxNoRestParams.getParentName(objectNode.parent);

        if (parentName !== undefined) {
          return `${parentName}.${parent.key.name}`;
        }
      }

      return parent.key.name;
    }

    // Variable assignment: const log = (...messages) => {}
    if (
      parent !== undefined
      && parent.type === 'VariableDeclarator'
      && parent.id.type === 'Identifier'
    ) {
      return parent.id.name;
    }

    // Named function: function log(...messages) {}
    if (
      node.type === 'FunctionDeclaration'
      && node.id !== null
      && node.id !== undefined
    ) {
      return node.id.name;
    }

    return undefined;
  }

  /**
   * Rules - ESLint - Syntax - No Rest Params - Check Function.
   *
   * Called by the rule visitor for every function
   * node. Reports each rest parameter unless the function
   * name appears in the configured allow list.
   *
   * @private
   *
   * @param {RulesEslintSyntaxNoRestParamsCheckFunctionContext}       context       - Context.
   * @param {RulesEslintSyntaxNoRestParamsCheckFunctionNode}          node          - Node.
   * @param {RulesEslintSyntaxNoRestParamsCheckFunctionAllowPatterns} allowPatterns - Allow patterns.
   *
   * @returns {RulesEslintSyntaxNoRestParamsCheckFunctionReturns}
   *
   * @since 0.15.0
   */
  private static checkFunction(context: RulesEslintSyntaxNoRestParamsCheckFunctionContext, node: RulesEslintSyntaxNoRestParamsCheckFunctionNode, allowPatterns: RulesEslintSyntaxNoRestParamsCheckFunctionAllowPatterns): RulesEslintSyntaxNoRestParamsCheckFunctionReturns {
    const functionName: RulesEslintSyntaxNoRestParamsCheckFunctionFunctionName = RulesEslintSyntaxNoRestParams.getFunctionName(node);

    for (const param of node.params) {
      if (param.type === 'RestElement') {
        if (functionName !== undefined && RulesEslintSyntaxNoRestParams.isAllowed(functionName, allowPatterns) === true) {
          continue;
        }

        context.report({
          node: param,
          messageId: 'noRestParams',
        });
      }
    }

    return;
  }
}
