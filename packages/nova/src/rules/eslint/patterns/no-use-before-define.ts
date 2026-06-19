import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Context,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_CurrentScope,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Def,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_DefNode,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Defs,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_DefType,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Found,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Name,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Node,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Options,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Parent,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Returns,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Scope,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Variable,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_Create_Identifier_Node,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_Create_Identifier_Returns,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_Create_Options,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleDefaultOptionsClasses,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleDefaultOptionsFunctions,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleDefaultOptionsTypes,
  Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleDefaultOptionsVariables,
} from '../../../types/rules/eslint/patterns/no-use-before-define.d.ts';

/**
 * Rules - ESLint - Patterns - No Use Before Define.
 *
 * Flags variables and constants referenced before their declaration while allowing forward
 * references to hoisted functions, classes, and type aliases.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * Rules - ESLint - Patterns - No Use Before Define - Rule.
   *
   * Registered under the name no-use-before-define and exported through the rules index as
   * NoUseBeforeDefine for preset consumption.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-use-before-define',
    meta: {
      type: 'problem',
      docs: {
        description: 'Disallow use of variables, constants, functions, classes, and types before they are defined.',
      },
      messages: {
        noUseBeforeDefine: '"{{ name }}" was used before it was defined.',
      },
      schema: [{
        type: 'object',
        properties: {
          classes: {
            type: 'boolean',
          },
          functions: {
            type: 'boolean',
          },
          ignoreFiles: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          types: {
            type: 'boolean',
          },
          variables: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      }],
    },
    defaultOptions: [{
      classes: true as Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleDefaultOptionsClasses,
      functions: true as Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleDefaultOptionsFunctions,
      ignoreFiles: [] as Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleDefaultOptionsIgnoreFiles,
      types: true as Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleDefaultOptionsTypes,
      variables: true as Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_RuleDefaultOptionsVariables,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Identifier(node: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_Create_Identifier_Node): Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_Create_Identifier_Returns {
          Runner.checkIdentifier(context, node, options);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Patterns - No Use Before Define - Check Identifier.
   *
   * Walks the scope chain to find the variable
   * definition and compares source positions. Skips declaration
   * identifiers, imports, and configurable categories.
   *
   * @private
   *
   * @param {Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Context} context - Context.
   * @param {Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Node}    node    - Node.
   * @param {Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Options} options - Options.
   *
   * @returns {Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Returns}
   *
   * @since 0.15.0
   */
  private static checkIdentifier(context: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Context, node: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Node, options: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Options): Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Returns {
    const scope: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Scope = context.sourceCode.getScope(node);
    const name: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Name = node.name;

    // Skip if this identifier is the definition itself.
    const parent: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Parent = node.parent;

    if (parent === undefined) {
      return;
    }

    // Skip declaration identifiers.
    if (
      parent.type === 'VariableDeclarator'
      && parent.id === node
    ) {
      return;
    }

    if (
      parent.type === 'FunctionDeclaration'
      && parent.id === node
    ) {
      return;
    }

    if (
      parent.type === 'ClassDeclaration'
      && parent.id === node
    ) {
      return;
    }

    // Skip property access and method calls.
    if (
      parent.type === 'MemberExpression'
      && parent.property === node
      && parent.computed === false
    ) {
      return;
    }

    // Skip property keys in object literals.
    if (
      parent.type === 'Property'
      && parent.key === node
      && parent.computed === false
    ) {
      return;
    }

    // Skip import specifiers.
    if (
      parent.type === 'ImportSpecifier'
      || parent.type === 'ImportDefaultSpecifier'
      || parent.type === 'ImportNamespaceSpecifier'
    ) {
      return;
    }

    // Skip type annotation references.
    if (parent.type === 'TSTypeReference') {
      if (options['types'] === false) {
        return;
      }
    }

    // Look up the variable in scope chain.
    let currentScope: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_CurrentScope = scope;
    let variable: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Variable = undefined;

    while (currentScope !== null) {
      const found: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Found = currentScope.set.get(name);

      if (found !== undefined) {
        variable = found;

        break;
      }

      currentScope = currentScope.upper;
    }

    if (variable === undefined) {
      return;
    }

    const defs: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Defs = variable.defs;

    if (defs.length === 0) {
      return;
    }

    const def: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_Def = defs[0];

    if (def === undefined) {
      return;
    }

    const defNode: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_DefNode = def.node;
    const defType: Rules_Eslint_Patterns_NoUseBeforeDefine_Runner_CheckIdentifier_DefType = def.type;

    // Determine the category of the definition.
    if (defType === 'FunctionName') {
      if (options['functions'] === false) {
        return;
      }
    }

    if (defType === 'ClassName') {
      if (options['classes'] === false) {
        return;
      }
    }

    if (defType === 'Variable') {
      if (options['variables'] === false) {
        return;
      }
    }

    // Check if the usage is before the definition.
    if (node.range[0] < defNode.range[0]) {
      context.report({
        node,
        messageId: 'noUseBeforeDefine',
        data: {
          name,
        },
      });
    }

    return;
  }
}
