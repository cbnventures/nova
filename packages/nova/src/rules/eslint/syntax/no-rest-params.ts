import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_AllowPatterns,
  Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_Context,
  Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_FunctionName,
  Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_Node,
  Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_Returns,
  Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_ClassNode,
  Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_Node,
  Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_ObjectNode,
  Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_Parent,
  Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_ParentName,
  Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_Returns,
  Rules_Eslint_Syntax_NoRestParams_Runner_GetParentName_ClassNode,
  Rules_Eslint_Syntax_NoRestParams_Runner_GetParentName_Node,
  Rules_Eslint_Syntax_NoRestParams_Runner_GetParentName_Returns,
  Rules_Eslint_Syntax_NoRestParams_Runner_IsAllowed_Name,
  Rules_Eslint_Syntax_NoRestParams_Runner_IsAllowed_Patterns,
  Rules_Eslint_Syntax_NoRestParams_Runner_IsAllowed_Prefix,
  Rules_Eslint_Syntax_NoRestParams_Runner_IsAllowed_Returns,
  Rules_Eslint_Syntax_NoRestParams_Runner_RuleAllowPatterns,
  Rules_Eslint_Syntax_NoRestParams_Runner_RuleDefaultOptionsAllow,
  Rules_Eslint_Syntax_NoRestParams_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Syntax_NoRestParams_Runner_RuleOptions,
} from '../../../types/rules/eslint/syntax/no-rest-params.d.ts';

/**
 * Rules - ESLint - Syntax - No Rest Params.
 *
 * Bans rest parameters (...args) in function signatures to enforce explicit named
 * parameters. Supports an allow list for variadic APIs like Logger methods.
 *
 * @since 0.15.0
 */
export class Runner {
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
      allow: [] as Rules_Eslint_Syntax_NoRestParams_Runner_RuleDefaultOptionsAllow,
      ignoreFiles: [] as Rules_Eslint_Syntax_NoRestParams_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Syntax_NoRestParams_Runner_RuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      const allowPatterns: Rules_Eslint_Syntax_NoRestParams_Runner_RuleAllowPatterns = options['allow'];

      return {
        FunctionDeclaration(node) {
          Runner.checkFunction(context, node, allowPatterns);

          return;
        },
        FunctionExpression(node) {
          Runner.checkFunction(context, node, allowPatterns);

          return;
        },
        ArrowFunctionExpression(node) {
          Runner.checkFunction(context, node, allowPatterns);

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
   * @param {Rules_Eslint_Syntax_NoRestParams_Runner_GetParentName_Node} node - Node.
   *
   * @returns {Rules_Eslint_Syntax_NoRestParams_Runner_GetParentName_Returns}
   *
   * @since 0.15.0
   */
  private static getParentName(node: Rules_Eslint_Syntax_NoRestParams_Runner_GetParentName_Node): Rules_Eslint_Syntax_NoRestParams_Runner_GetParentName_Returns {
    if (
      node.type === 'MethodDefinition'
      && node.key.type === 'Identifier'
    ) {
      const classNode: Rules_Eslint_Syntax_NoRestParams_Runner_GetParentName_ClassNode = node.parent;

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
      return Runner.getParentName(node.parent);
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
   * @param {Rules_Eslint_Syntax_NoRestParams_Runner_IsAllowed_Name}     name     - Name.
   * @param {Rules_Eslint_Syntax_NoRestParams_Runner_IsAllowed_Patterns} patterns - Patterns.
   *
   * @returns {Rules_Eslint_Syntax_NoRestParams_Runner_IsAllowed_Returns}
   *
   * @since 0.15.0
   */
  private static isAllowed(name: Rules_Eslint_Syntax_NoRestParams_Runner_IsAllowed_Name, patterns: Rules_Eslint_Syntax_NoRestParams_Runner_IsAllowed_Patterns): Rules_Eslint_Syntax_NoRestParams_Runner_IsAllowed_Returns {
    for (const pattern of patterns) {
      // Wildcard match: "Logger.*" matches "Logger.info", "Logger.warn", etc.
      if (pattern.endsWith('.*') === true) {
        const prefix: Rules_Eslint_Syntax_NoRestParams_Runner_IsAllowed_Prefix = pattern.slice(0, -2);

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
   * @param {Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_Node} node - Node.
   *
   * @returns {Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_Returns}
   *
   * @since 0.15.0
   */
  private static getFunctionName(node: Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_Node): Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_Returns {
    const parent: Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_Parent = node.parent;

    // Class method: class Logger { static info(...messages) {} }
    if (
      parent !== undefined
      && parent.type === 'MethodDefinition'
      && parent.key.type === 'Identifier'
    ) {
      const classNode: Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_ClassNode = parent.parent;

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
      const objectNode: Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_ObjectNode = parent.parent;

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
        const parentName: Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_ParentName = Runner.getParentName(objectNode.parent);

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
   * @param {Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_Context}       context       - Context.
   * @param {Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_Node}          node          - Node.
   * @param {Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_AllowPatterns} allowPatterns - Allow patterns.
   *
   * @returns {Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_Returns}
   *
   * @since 0.15.0
   */
  private static checkFunction(context: Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_Context, node: Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_Node, allowPatterns: Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_AllowPatterns): Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_Returns {
    const functionName: Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_FunctionName = Runner.getFunctionName(node);

    for (const param of node.params) {
      if (param.type === 'RestElement') {
        if (functionName !== undefined && Runner.isAllowed(functionName, allowPatterns) === true) {
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
