import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintPatternsNoUseBeforeDefineCheckIdentifierContext,
  RulesEslintPatternsNoUseBeforeDefineCheckIdentifierCurrentScope,
  RulesEslintPatternsNoUseBeforeDefineCheckIdentifierDef,
  RulesEslintPatternsNoUseBeforeDefineCheckIdentifierDefNode,
  RulesEslintPatternsNoUseBeforeDefineCheckIdentifierDefs,
  RulesEslintPatternsNoUseBeforeDefineCheckIdentifierDefType,
  RulesEslintPatternsNoUseBeforeDefineCheckIdentifierFound,
  RulesEslintPatternsNoUseBeforeDefineCheckIdentifierName,
  RulesEslintPatternsNoUseBeforeDefineCheckIdentifierNode,
  RulesEslintPatternsNoUseBeforeDefineCheckIdentifierOptions,
  RulesEslintPatternsNoUseBeforeDefineCheckIdentifierParent,
  RulesEslintPatternsNoUseBeforeDefineCheckIdentifierReturns,
  RulesEslintPatternsNoUseBeforeDefineCheckIdentifierScope,
  RulesEslintPatternsNoUseBeforeDefineCheckIdentifierVariable,
  RulesEslintPatternsNoUseBeforeDefineRuleDefaultOptionsClasses,
  RulesEslintPatternsNoUseBeforeDefineRuleDefaultOptionsFunctions,
  RulesEslintPatternsNoUseBeforeDefineRuleDefaultOptionsIgnoreFiles,
  RulesEslintPatternsNoUseBeforeDefineRuleDefaultOptionsTypes,
  RulesEslintPatternsNoUseBeforeDefineRuleDefaultOptionsVariables,
  RulesEslintPatternsNoUseBeforeDefineRuleOptions,
} from '../../../types/rules/eslint/patterns/no-use-before-define.d.ts';

/**
 * Rules - ESLint - Patterns - No Use Before Define.
 *
 * Flags variables and constants referenced before their declaration while allowing forward
 * references to hoisted functions, classes, and type aliases.
 *
 * @since 0.15.0
 */
export class RulesEslintPatternsNoUseBeforeDefine {
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
      classes: true as RulesEslintPatternsNoUseBeforeDefineRuleDefaultOptionsClasses,
      functions: true as RulesEslintPatternsNoUseBeforeDefineRuleDefaultOptionsFunctions,
      ignoreFiles: [] as RulesEslintPatternsNoUseBeforeDefineRuleDefaultOptionsIgnoreFiles,
      types: true as RulesEslintPatternsNoUseBeforeDefineRuleDefaultOptionsTypes,
      variables: true as RulesEslintPatternsNoUseBeforeDefineRuleDefaultOptionsVariables,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintPatternsNoUseBeforeDefineRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Identifier(node) {
          RulesEslintPatternsNoUseBeforeDefine.checkIdentifier(context, node, options);

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
   * @param {RulesEslintPatternsNoUseBeforeDefineCheckIdentifierContext} context - Context.
   * @param {RulesEslintPatternsNoUseBeforeDefineCheckIdentifierNode}    node    - Node.
   * @param {RulesEslintPatternsNoUseBeforeDefineCheckIdentifierOptions} options - Options.
   *
   * @returns {RulesEslintPatternsNoUseBeforeDefineCheckIdentifierReturns}
   *
   * @since 0.15.0
   */
  private static checkIdentifier(context: RulesEslintPatternsNoUseBeforeDefineCheckIdentifierContext, node: RulesEslintPatternsNoUseBeforeDefineCheckIdentifierNode, options: RulesEslintPatternsNoUseBeforeDefineCheckIdentifierOptions): RulesEslintPatternsNoUseBeforeDefineCheckIdentifierReturns {
    const scope: RulesEslintPatternsNoUseBeforeDefineCheckIdentifierScope = context.sourceCode.getScope(node);
    const name: RulesEslintPatternsNoUseBeforeDefineCheckIdentifierName = node.name;

    // Skip if this identifier is the definition itself.
    const parent: RulesEslintPatternsNoUseBeforeDefineCheckIdentifierParent = node.parent;

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
    let currentScope: RulesEslintPatternsNoUseBeforeDefineCheckIdentifierCurrentScope = scope;
    let variable: RulesEslintPatternsNoUseBeforeDefineCheckIdentifierVariable = undefined;

    while (currentScope !== null) {
      const found: RulesEslintPatternsNoUseBeforeDefineCheckIdentifierFound = currentScope.set.get(name);

      if (found !== undefined) {
        variable = found;

        break;
      }

      currentScope = currentScope.upper;
    }

    if (variable === undefined) {
      return;
    }

    const defs: RulesEslintPatternsNoUseBeforeDefineCheckIdentifierDefs = variable.defs;

    if (defs.length === 0) {
      return;
    }

    const def: RulesEslintPatternsNoUseBeforeDefineCheckIdentifierDef = defs[0];

    if (def === undefined) {
      return;
    }

    const defNode: RulesEslintPatternsNoUseBeforeDefineCheckIdentifierDefNode = def.node;
    const defType: RulesEslintPatternsNoUseBeforeDefineCheckIdentifierDefType = def.type;

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
