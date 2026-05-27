import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckAsExpression_Context,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckAsExpression_Node,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckAsExpression_Returns,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckAsExpression_TypeNode,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckAsExpression_TypeParameterNames,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckTypeAnnotation_Context,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckTypeAnnotation_Node,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckTypeAnnotation_Returns,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckTypeAnnotation_TypeNode,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckTypeAnnotation_TypeParameterNames,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_Ancestor,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_Context,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_InsideFunction,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_Node,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_Parent,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_Returns,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CollectEnclosingTypeParameters_Current,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CollectEnclosingTypeParameters_Names,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CollectEnclosingTypeParameters_Node,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CollectEnclosingTypeParameters_Returns,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_HasOnlyTypeParameterArguments_Node,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_HasOnlyTypeParameterArguments_Returns,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_HasOnlyTypeParameterArguments_TypeParameterNames,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_RuleNormalizedFilename,
  Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_RuleOptions,
} from '../../../types/rules/eslint/typescript/no-inline-type-annotation.d.ts';

/**
 * Rules - ESLint - TypeScript - No Inline Type Annotation.
 *
 * Requires all type annotations to use named aliases from .d.ts files, and requires
 * explicit type annotations on const/let inside function bodies.
 *
 * @since 0.14.0
 */
export class Runner {
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
      ignoreFiles: [] as Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_RuleOptions = defaultOptions[0];
      const normalizedFilename: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_RuleNormalizedFilename = context.filename.replaceAll('\\', '/');

      // Skip .d.ts files - inline types are allowed in type definition files.
      if (normalizedFilename.endsWith('.d.ts') === true) {
        return {};
      }

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        TSAsExpression(node) {
          Runner.checkAsExpression(context, node);

          return;
        },
        TSTypeAnnotation(node) {
          Runner.checkTypeAnnotation(context, node);

          return;
        },
        VariableDeclarator(node) {
          Runner.checkVariableDeclarator(context, node);

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
   * @param {Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckAsExpression_Context} context - Context.
   * @param {Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckAsExpression_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckAsExpression_Returns}
   *
   * @since 0.15.0
   */
  private static checkAsExpression(context: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckAsExpression_Context, node: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckAsExpression_Node): Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckAsExpression_Returns {
    const typeNode: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckAsExpression_TypeNode = node.typeAnnotation;

    // Allow TSTypeReference when all type arguments are enclosing type parameters.
    if (typeNode.type === 'TSTypeReference') {
      if (typeNode.typeArguments === undefined) {
        return;
      }

      const typeParameterNames: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckAsExpression_TypeParameterNames = Runner.collectEnclosingTypeParameters(node);

      if (Runner.hasOnlyTypeParameterArguments(typeNode, typeParameterNames) === true) {
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
   * @param {Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CollectEnclosingTypeParameters_Node} node - Node.
   *
   * @returns {Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CollectEnclosingTypeParameters_Returns}
   *
   * @since 0.14.0
   */
  private static collectEnclosingTypeParameters(node: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CollectEnclosingTypeParameters_Node): Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CollectEnclosingTypeParameters_Returns {
    const names: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CollectEnclosingTypeParameters_Names = new Set();
    let current: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CollectEnclosingTypeParameters_Current = node.parent;

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
   * @param {Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_HasOnlyTypeParameterArguments_Node}               node               - Node.
   * @param {Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_HasOnlyTypeParameterArguments_TypeParameterNames} typeParameterNames - Type parameter names.
   *
   * @returns {Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_HasOnlyTypeParameterArguments_Returns}
   *
   * @since 0.14.0
   */
  private static hasOnlyTypeParameterArguments(node: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_HasOnlyTypeParameterArguments_Node, typeParameterNames: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_HasOnlyTypeParameterArguments_TypeParameterNames): Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_HasOnlyTypeParameterArguments_Returns {
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
   * @param {Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckTypeAnnotation_Context} context - Context.
   * @param {Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckTypeAnnotation_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckTypeAnnotation_Returns}
   *
   * @since 0.14.0
   */
  private static checkTypeAnnotation(context: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckTypeAnnotation_Context, node: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckTypeAnnotation_Node): Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckTypeAnnotation_Returns {
    const typeNode: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckTypeAnnotation_TypeNode = node.typeAnnotation;

    // Allow type predicates (e.g., `value is MyType`).
    if (typeNode.type === 'TSTypePredicate') {
      return;
    }

    // Allow TSTypeReference when all type arguments are enclosing type parameters.
    if (typeNode.type === 'TSTypeReference') {
      if (typeNode.typeArguments === undefined) {
        return;
      }

      const typeParameterNames: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckTypeAnnotation_TypeParameterNames = Runner.collectEnclosingTypeParameters(node);

      if (Runner.hasOnlyTypeParameterArguments(typeNode, typeParameterNames) === true) {
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
   * @param {Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_Context} context - Context.
   * @param {Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_Returns}
   *
   * @since 0.14.0
   */
  private static checkVariableDeclarator(context: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_Context, node: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_Node): Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_Returns {
    // Only check identifiers (skip destructuring).
    if (node.id.type !== 'Identifier') {
      return;
    }

    // Skip if already has a type annotation (handled by TSTypeAnnotation visitor).
    if (node.id.typeAnnotation !== undefined) {
      return;
    }

    // Only check const/let inside function/method bodies.
    const parent: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_Parent = node.parent;

    if (parent === undefined || parent.type !== 'VariableDeclaration') {
      return;
    }

    if (parent.kind !== 'const' && parent.kind !== 'let') {
      return;
    }

    // Skip top-level declarations (not inside a function/method body).
    let ancestor: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_Ancestor = parent.parent;
    let insideFunction: Rules_Eslint_Typescript_NoInlineTypeAnnotation_Runner_CheckVariableDeclarator_InsideFunction = false;

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
      && Runner.#callbackMethods.has(parent.parent.parent.callee.property.name) === true
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
