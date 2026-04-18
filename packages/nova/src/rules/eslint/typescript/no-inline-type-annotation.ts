import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintTypescriptNoInlineTypeAnnotationCheckAsExpressionContext,
  RulesEslintTypescriptNoInlineTypeAnnotationCheckAsExpressionNode,
  RulesEslintTypescriptNoInlineTypeAnnotationCheckAsExpressionReturns,
  RulesEslintTypescriptNoInlineTypeAnnotationCheckAsExpressionTypeNode,
  RulesEslintTypescriptNoInlineTypeAnnotationCheckAsExpressionTypeParameterNames,
  RulesEslintTypescriptNoInlineTypeAnnotationCheckTypeAnnotationContext,
  RulesEslintTypescriptNoInlineTypeAnnotationCheckTypeAnnotationNode,
  RulesEslintTypescriptNoInlineTypeAnnotationCheckTypeAnnotationReturns,
  RulesEslintTypescriptNoInlineTypeAnnotationCheckTypeAnnotationTypeNode,
  RulesEslintTypescriptNoInlineTypeAnnotationCheckTypeAnnotationTypeParameterNames,
  RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorAncestor,
  RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorContext,
  RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorInsideFunction,
  RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorNode,
  RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorParent,
  RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorReturns,
  RulesEslintTypescriptNoInlineTypeAnnotationCollectEnclosingTypeParametersCurrent,
  RulesEslintTypescriptNoInlineTypeAnnotationCollectEnclosingTypeParametersNames,
  RulesEslintTypescriptNoInlineTypeAnnotationCollectEnclosingTypeParametersNode,
  RulesEslintTypescriptNoInlineTypeAnnotationCollectEnclosingTypeParametersReturns,
  RulesEslintTypescriptNoInlineTypeAnnotationHasOnlyTypeParameterArgumentsNode,
  RulesEslintTypescriptNoInlineTypeAnnotationHasOnlyTypeParameterArgumentsReturns,
  RulesEslintTypescriptNoInlineTypeAnnotationHasOnlyTypeParameterArgumentsTypeParameterNames,
  RulesEslintTypescriptNoInlineTypeAnnotationRuleDefaultOptionsIgnoreFiles,
  RulesEslintTypescriptNoInlineTypeAnnotationRuleNormalizedFilename,
  RulesEslintTypescriptNoInlineTypeAnnotationRuleOptions,
} from '../../../types/rules/eslint/typescript/no-inline-type-annotation.d.ts';

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation.
 *
 * Requires all type annotations to use named aliases from .d.ts files, and requires
 * explicit type annotations on const/let inside function bodies.
 *
 * @since 0.14.0
 */
export class RulesEslintTypescriptNoInlineTypeAnnotation {
  /**
   * Rules - ESLint - TypeScript - No Inline Type Annotation - Callback Methods.
   *
   * Used by checkVariableDeclarator to skip
   * variables inside callback arrows passed to array
   * methods like map, filter, find, and reduce.
   *
   * @private
   *
   * @since 0.14.0
   */
  static readonly #callbackMethods = new Set([
    'map',
    'filter',
    'find',
    'findIndex',
    'some',
    'every',
    'reduce',
    'flatMap',
    'forEach',
    'sort',
    'from',
  ]);

  /**
   * Rules - ESLint - TypeScript - No Inline Type Annotation - Rule.
   *
   * Registered as a custom ESLint rule. Skips
   * .d.ts files where inline types are expected, then
   * dispatches to per-node-type check methods.
   *
   * @since 0.14.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-inline-type-annotation',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Disallow inline type annotations in code files. Extract the type to a named alias in a `.d.ts` file.',
      },
      messages: {
        useNamedType: 'Do not use inline type annotations in code files. Extract the type to a named alias in a `.d.ts` file.',
        requireTypeAnnotation: 'Add a named type annotation from a .d.ts file instead of relying on type inference.',
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
      ignoreFiles: [] as RulesEslintTypescriptNoInlineTypeAnnotationRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintTypescriptNoInlineTypeAnnotationRuleOptions = defaultOptions[0];
      const normalizedFilename: RulesEslintTypescriptNoInlineTypeAnnotationRuleNormalizedFilename = context.filename.replaceAll('\\', '/');

      // Skip .d.ts files — inline types are allowed in type definition files.
      if (normalizedFilename.endsWith('.d.ts') === true) {
        return {};
      }

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        TSAsExpression(node) {
          RulesEslintTypescriptNoInlineTypeAnnotation.checkAsExpression(context, node);

          return;
        },
        TSTypeAnnotation(node) {
          RulesEslintTypescriptNoInlineTypeAnnotation.checkTypeAnnotation(context, node);

          return;
        },
        VariableDeclarator(node) {
          RulesEslintTypescriptNoInlineTypeAnnotation.checkVariableDeclarator(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - TypeScript - No Inline Type Annotation - Check As Expression.
   *
   * Reports inline types in "as" casts unless the
   * type reference only uses enclosing generic type
   * parameters collected from parent scopes.
   *
   * @private
   *
   * @param {RulesEslintTypescriptNoInlineTypeAnnotationCheckAsExpressionContext} context - Context.
   * @param {RulesEslintTypescriptNoInlineTypeAnnotationCheckAsExpressionNode}    node    - Node.
   *
   * @returns {RulesEslintTypescriptNoInlineTypeAnnotationCheckAsExpressionReturns}
   *
   * @since 0.15.0
   */
  private static checkAsExpression(context: RulesEslintTypescriptNoInlineTypeAnnotationCheckAsExpressionContext, node: RulesEslintTypescriptNoInlineTypeAnnotationCheckAsExpressionNode): RulesEslintTypescriptNoInlineTypeAnnotationCheckAsExpressionReturns {
    const typeNode: RulesEslintTypescriptNoInlineTypeAnnotationCheckAsExpressionTypeNode = node.typeAnnotation;

    // Allow TSTypeReference when all type arguments are enclosing type parameters.
    if (typeNode.type === 'TSTypeReference') {
      if (typeNode.typeArguments === undefined) {
        return;
      }

      const typeParameterNames: RulesEslintTypescriptNoInlineTypeAnnotationCheckAsExpressionTypeParameterNames = RulesEslintTypescriptNoInlineTypeAnnotation.collectEnclosingTypeParameters(node);

      if (RulesEslintTypescriptNoInlineTypeAnnotation.hasOnlyTypeParameterArguments(typeNode, typeParameterNames) === true) {
        return;
      }
    }

    context.report({
      node: typeNode,
      messageId: 'useNamedType',
    });

    return;
  }

  /**
   * Rules - ESLint - TypeScript - No Inline Type Annotation - Collect Enclosing Type Parameters.
   *
   * Walks up the AST parent chain to gather generic
   * type parameter names from enclosing functions and
   * classes, used to allow forwarded generics.
   *
   * @private
   *
   * @param {RulesEslintTypescriptNoInlineTypeAnnotationCollectEnclosingTypeParametersNode} node - Node.
   *
   * @returns {RulesEslintTypescriptNoInlineTypeAnnotationCollectEnclosingTypeParametersReturns}
   *
   * @since 0.14.0
   */
  private static collectEnclosingTypeParameters(node: RulesEslintTypescriptNoInlineTypeAnnotationCollectEnclosingTypeParametersNode): RulesEslintTypescriptNoInlineTypeAnnotationCollectEnclosingTypeParametersReturns {
    const names: RulesEslintTypescriptNoInlineTypeAnnotationCollectEnclosingTypeParametersNames = new Set();
    let current: RulesEslintTypescriptNoInlineTypeAnnotationCollectEnclosingTypeParametersCurrent = node.parent;

    while (
      current !== undefined
      && current !== null
    ) {
      if (
        'typeParameters' in current
        && current.typeParameters !== undefined
        && current.typeParameters !== null
        && typeof current.typeParameters === 'object'
        && 'params' in current.typeParameters
      ) {
        for (const param of current.typeParameters.params) {
          names.add(param.name.name);
        }
      }

      current = current.parent;
    }

    return names;
  }

  /**
   * Rules - ESLint - TypeScript - No Inline Type Annotation - Has Only Type Parameter Arguments.
   *
   * Returns true when every type argument of a
   * TSTypeReference is an enclosing generic parameter,
   * meaning no concrete inline type is introduced.
   *
   * @private
   *
   * @param {RulesEslintTypescriptNoInlineTypeAnnotationHasOnlyTypeParameterArgumentsNode}               node               - Node.
   * @param {RulesEslintTypescriptNoInlineTypeAnnotationHasOnlyTypeParameterArgumentsTypeParameterNames} typeParameterNames - Type parameter names.
   *
   * @returns {RulesEslintTypescriptNoInlineTypeAnnotationHasOnlyTypeParameterArgumentsReturns}
   *
   * @since 0.14.0
   */
  private static hasOnlyTypeParameterArguments(node: RulesEslintTypescriptNoInlineTypeAnnotationHasOnlyTypeParameterArgumentsNode, typeParameterNames: RulesEslintTypescriptNoInlineTypeAnnotationHasOnlyTypeParameterArgumentsTypeParameterNames): RulesEslintTypescriptNoInlineTypeAnnotationHasOnlyTypeParameterArgumentsReturns {
    if (node.typeArguments === undefined) {
      return true;
    }

    return node.typeArguments.params.every(
      (param) => (
        param.type === 'TSTypeReference'
        && param.typeName.type === 'Identifier'
        && typeParameterNames.has(param.typeName.name) === true
      ),
    );
  }

  /**
   * Rules - ESLint - TypeScript - No Inline Type Annotation - Check Type Annotation.
   *
   * Called by the TSTypeAnnotation visitor to report
   * inline types on variables, parameters, and return types,
   * allowing type predicates and bare references.
   *
   * @private
   *
   * @param {RulesEslintTypescriptNoInlineTypeAnnotationCheckTypeAnnotationContext} context - Context.
   * @param {RulesEslintTypescriptNoInlineTypeAnnotationCheckTypeAnnotationNode}    node    - Node.
   *
   * @returns {RulesEslintTypescriptNoInlineTypeAnnotationCheckTypeAnnotationReturns}
   *
   * @since 0.14.0
   */
  private static checkTypeAnnotation(context: RulesEslintTypescriptNoInlineTypeAnnotationCheckTypeAnnotationContext, node: RulesEslintTypescriptNoInlineTypeAnnotationCheckTypeAnnotationNode): RulesEslintTypescriptNoInlineTypeAnnotationCheckTypeAnnotationReturns {
    const typeNode: RulesEslintTypescriptNoInlineTypeAnnotationCheckTypeAnnotationTypeNode = node.typeAnnotation;

    // Allow type predicates (e.g., `value is MyType`).
    if (typeNode.type === 'TSTypePredicate') {
      return;
    }

    // Allow TSTypeReference when all type arguments are enclosing type parameters.
    if (typeNode.type === 'TSTypeReference') {
      if (typeNode.typeArguments === undefined) {
        return;
      }

      const typeParameterNames: RulesEslintTypescriptNoInlineTypeAnnotationCheckTypeAnnotationTypeParameterNames = RulesEslintTypescriptNoInlineTypeAnnotation.collectEnclosingTypeParameters(node);

      if (RulesEslintTypescriptNoInlineTypeAnnotation.hasOnlyTypeParameterArguments(typeNode, typeParameterNames) === true) {
        return;
      }
    }

    context.report({
      node: typeNode,
      messageId: 'useNamedType',
    });

    return;
  }

  /**
   * Rules - ESLint - TypeScript - No Inline Type Annotation - Check Variable Declarator.
   *
   * Reports const/let declarations inside function
   * bodies that lack an explicit type annotation, skipping
   * loop variables and callback closures.
   *
   * @private
   *
   * @param {RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorContext} context - Context.
   * @param {RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorNode}    node    - Node.
   *
   * @returns {RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorReturns}
   *
   * @since 0.14.0
   */
  private static checkVariableDeclarator(context: RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorContext, node: RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorNode): RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorReturns {
    // Only check identifiers (skip destructuring).
    if (node.id.type !== 'Identifier') {
      return;
    }

    // Skip if already has a type annotation (handled by TSTypeAnnotation visitor).
    if (node.id.typeAnnotation !== undefined) {
      return;
    }

    // Only check const/let inside function/method bodies.
    const parent: RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorParent = node.parent;

    if (parent === undefined || parent.type !== 'VariableDeclaration') {
      return;
    }

    if (parent.kind !== 'const' && parent.kind !== 'let') {
      return;
    }

    // Skip top-level declarations (not inside a function/method body).
    let ancestor: RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorAncestor = parent.parent;
    let insideFunction: RulesEslintTypescriptNoInlineTypeAnnotationCheckVariableDeclaratorInsideFunction = false;

    while (ancestor !== undefined && ancestor !== null) {
      if (
        ancestor.type === 'FunctionDeclaration'
        || ancestor.type === 'FunctionExpression'
        || ancestor.type === 'ArrowFunctionExpression'
        || ancestor.type === 'MethodDefinition'
      ) {
        insideFunction = true;

        break;
      }

      ancestor = ancestor.parent;
    }

    if (insideFunction === false) {
      return;
    }

    // Skip for...of loop variables.
    if (parent.parent !== undefined && parent.parent.type === 'ForOfStatement') {
      return;
    }

    // Skip for loop index variables.
    if (parent.parent !== undefined && parent.parent.type === 'ForStatement') {
      return;
    }

    // Skip for...in loop variables.
    if (parent.parent !== undefined && parent.parent.type === 'ForInStatement') {
      return;
    }

    // Skip callback parameters (e.g., .map, .filter, etc.).
    if (
      parent.parent !== undefined
      && parent.parent.type === 'ArrowFunctionExpression'
      && parent.parent.parent !== undefined
      && parent.parent.parent.type === 'CallExpression'
      && parent.parent.parent.callee.type === 'MemberExpression'
      && parent.parent.parent.callee.property.type === 'Identifier'
      && RulesEslintTypescriptNoInlineTypeAnnotation.#callbackMethods.has(parent.parent.parent.callee.property.name) === true
    ) {
      return;
    }

    context.report({
      node: node.id,
      messageId: 'requireTypeAnnotation',
    });

    return;
  }
}
