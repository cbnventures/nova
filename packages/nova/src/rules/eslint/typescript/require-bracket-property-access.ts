import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionChecker,
  RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionContext,
  RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionDeclarations,
  RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionNeedsParens,
  RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionNode,
  RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionObjectText,
  RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionObjectType,
  RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionParserServices,
  RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionPropertyName,
  RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionReturns,
  RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionSourceFileName,
  RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionSymbol,
  RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionTsNode,
  RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionWrappedText,
  RulesEslintTypescriptRequireBracketPropertyAccessRuleDefaultOptionsAllowedProperties,
  RulesEslintTypescriptRequireBracketPropertyAccessRuleDefaultOptionsIgnoreFiles,
  RulesEslintTypescriptRequireBracketPropertyAccessRuleOptions,
} from '../../../types/rules/eslint/typescript/require-bracket-property-access.d.ts';

/**
 * Rules - ESLint - TypeScript - Require Bracket Property Access.
 *
 * Enforces bracket notation for property access on project-defined plain objects so the
 * access style stays consistent with bracket assignment via Reflect.set.
 *
 * @since 0.15.0
 */
export class RulesEslintTypescriptRequireBracketPropertyAccess {
  /**
   * Rules - ESLint - TypeScript - Require Bracket Property Access - Rule.
   *
   * Registered under the name require-bracket-property-access and exported through the rules
   * index as RequireBracketPropertyAccess for preset consumption.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-bracket-property-access',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require bracket notation for property access on project-defined plain objects.',
      },
      fixable: 'code',
      messages: {
        requireBracketAccess: 'Use bracket notation `{{ objectName }}[\'{{ propertyName }}\']` for project-defined property access.',
      },
      schema: [{
        type: 'object',
        properties: {
          allowedProperties: {
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
      allowedProperties: [] as RulesEslintTypescriptRequireBracketPropertyAccessRuleDefaultOptionsAllowedProperties,
      ignoreFiles: [] as RulesEslintTypescriptRequireBracketPropertyAccessRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintTypescriptRequireBracketPropertyAccessRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      // Skip files without TypeScript parser services (e.g. .mjs, .js).
      if (
        context.sourceCode.parserServices === undefined
        || context.sourceCode.parserServices.program === undefined
        || context.sourceCode.parserServices.program === null
      ) {
        return {};
      }

      return {
        MemberExpression(node) {
          RulesEslintTypescriptRequireBracketPropertyAccess.checkMemberExpression(context, node, options);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - TypeScript - Require Bracket Property Access - Check Member Expression.
   *
   * Uses the TypeScript type checker to determine whether the accessed property is
   * project-defined. Third-party and class instance access is allowed through.
   *
   * @private
   *
   * @param {RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionContext} context - Context.
   * @param {RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionNode}    node    - Node.
   * @param {RulesEslintTypescriptRequireBracketPropertyAccessRuleOptions}                  options - Options.
   *
   * @returns {RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionReturns}
   *
   * @since 0.15.0
   */
  private static checkMemberExpression(context: RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionContext, node: RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionNode, options: RulesEslintTypescriptRequireBracketPropertyAccessRuleOptions): RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionReturns {
    // Skip computed access (already bracket notation).
    if (node.computed === true) {
      return;
    }

    // Skip private identifiers (#field).
    if (node.property.type === 'PrivateIdentifier') {
      return;
    }

    // Skip method calls (obj.method()).
    if (
      node.parent !== undefined
      && node.parent.type === 'CallExpression'
      && node.parent.callee === node
    ) {
      return;
    }

    // Skip left side of assignments (handled by no-bracket-assignment).
    if (
      node.parent !== undefined
      && node.parent.type === 'AssignmentExpression'
      && node.parent.left === node
    ) {
      return;
    }

    const propertyName: RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionPropertyName = node.property.name;

    // Skip allowed properties.
    if (options['allowedProperties'].includes(propertyName) === true) {
      return;
    }

    // Use TypeScript type checker to determine if the property is project-defined.
    const parserServices: RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionParserServices = ESLintUtils.getParserServices(context);
    const checker: RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionChecker = parserServices.program.getTypeChecker();
    const tsNode: RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionTsNode = parserServices.esTreeNodeToTSNodeMap.get(node.object);
    const objectType: RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionObjectType = checker.getTypeAtLocation(tsNode);

    // Allow class instance property access.
    if (objectType.isClass() === true) {
      return;
    }

    // Check if the property's declaration is from node_modules (built-in, third-party).
    const symbol: RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionSymbol = objectType.getProperty(propertyName);

    if (symbol === undefined) {
      return;
    }

    const declarations: RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionDeclarations = symbol.getDeclarations();

    if (declarations === undefined || declarations.length === 0) {
      return;
    }

    // If all declarations are from node_modules, allow dot notation.
    for (const declaration of declarations) {
      const sourceFileName: RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionSourceFileName = declaration.getSourceFile().fileName;

      if (sourceFileName.includes('node_modules') === false) {
        // Found a project-defined declaration — flag it.
        context.report({
          node,
          messageId: 'requireBracketAccess',
          data: {
            objectName: context.sourceCode.getText(node.object),
            propertyName,
          },
          fix(fixer) {
            const objectText: RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionObjectText = context.sourceCode.getText(node.object);
            const needsParens: RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionNeedsParens = node.object.type === 'AwaitExpression';
            const wrappedText: RulesEslintTypescriptRequireBracketPropertyAccessCheckMemberExpressionWrappedText = (needsParens === true) ? `(${objectText})` : objectText;

            return fixer.replaceText(node, `${wrappedText}['${propertyName}']`);
          },
        });

        return;
      }
    }

    return;
  }
}
