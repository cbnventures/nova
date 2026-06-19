import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Checker,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Context,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Declarations,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Fix_NeedsParens,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Fix_ObjectText,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Fix_WrappedText,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Node,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_ObjectType,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Options,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_ParserServices,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_PropertyName,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Returns,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_SourceFileName,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Symbol,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_TsNode,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_Create_MemberExpression_Node,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_Create_MemberExpression_Returns,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_Create_Options,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_RuleDefaultOptionsAllowedProperties,
  Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_RuleDefaultOptionsIgnoreFiles,
} from '../../../types/rules/eslint/typescript/require-bracket-property-access.d.ts';

/**
 * Rules - ESLint - TypeScript - Require Bracket Property Access.
 *
 * Enforces bracket notation for property access on project-defined plain objects so the
 * access style stays consistent with bracket assignment via Reflect.set.
 *
 * @since 0.15.0
 */
export class Runner {
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
      allowedProperties: [] as Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_RuleDefaultOptionsAllowedProperties,
      ignoreFiles: [] as Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_Create_Options = defaultOptions[0];

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
        MemberExpression(node: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_Create_MemberExpression_Node): Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_Create_MemberExpression_Returns {
          Runner.checkMemberExpression(context, node, options);

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
   * @param {Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Context} context - Context.
   * @param {Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Node}    node    - Node.
   * @param {Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Options} options - Options.
   *
   * @returns {Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Returns}
   *
   * @since 0.15.0
   */
  private static checkMemberExpression(context: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Context, node: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Node, options: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Options): Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Returns {
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

    const propertyName: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_PropertyName = node.property.name;

    // Skip allowed properties.
    if (options['allowedProperties'].includes(propertyName) === true) {
      return;
    }

    // Use TypeScript type checker to determine if the property is project-defined.
    const parserServices: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_ParserServices = ESLintUtils.getParserServices(context);
    const checker: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Checker = parserServices.program.getTypeChecker();
    const tsNode: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_TsNode = parserServices.esTreeNodeToTSNodeMap.get(node.object);
    const objectType: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_ObjectType = checker.getTypeAtLocation(tsNode);

    // Allow class instance property access.
    if (objectType.isClass() === true) {
      return;
    }

    // Check if the property's declaration is from node_modules (built-in, third-party).
    const symbol: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Symbol = objectType.getProperty(propertyName);

    if (symbol === undefined) {
      return;
    }

    const declarations: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Declarations = symbol.getDeclarations();

    if (declarations === undefined || declarations.length === 0) {
      return;
    }

    // If all declarations are from node_modules, allow dot notation.
    for (const declaration of declarations) {
      const sourceFileName: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_SourceFileName = declaration.getSourceFile().fileName;

      if (sourceFileName.includes('node_modules') === false) {
        // Found a project-defined declaration - flag it.
        context.report({
          node,
          messageId: 'requireBracketAccess',
          data: {
            objectName: context.sourceCode.getText(node.object),
            propertyName,
          },
          fix(fixer) {
            const objectText: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Fix_ObjectText = context.sourceCode.getText(node.object);
            const needsParens: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Fix_NeedsParens = node.object.type === 'AwaitExpression';
            const wrappedText: Rules_Eslint_Typescript_RequireBracketPropertyAccess_Runner_CheckMemberExpression_Fix_WrappedText = (needsParens === true) ? `(${objectText})` : objectText;

            return fixer.replaceText(node, `${wrappedText}['${propertyName}']`);
          },
        });

        return;
      }
    }

    return;
  }
}
