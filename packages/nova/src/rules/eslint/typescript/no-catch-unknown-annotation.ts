import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Context,
  Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Fix_Fixer,
  Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Fix_Returns,
  Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Node,
  Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Param,
  Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Returns,
  Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_TypeAnnotation,
  Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_Create_CatchClause_Node,
  Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_Create_CatchClause_Returns,
  Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_Create_Options,
  Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_RuleDefaultOptionsIgnoreFiles,
} from '../../../types/rules/eslint/typescript/no-catch-unknown-annotation.d.ts';

/**
 * Rules - ESLint - TypeScript - No Catch Unknown Annotation.
 *
 * Removes the redundant `: unknown` annotation on catch clause variables. TypeScript already
 * defaults catch parameters to unknown, so the annotation is noise.
 *
 * @since 0.14.0
 */
export class Runner {
  /**
   * Rules - ESLint - TypeScript - No Catch Unknown Annotation - Rule.
   *
   * Registered under the name no-catch-unknown-annotation and exported through the rules
   * index as NoCatchUnknownAnnotation for preset consumption.
   *
   * @since 0.14.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-catch-unknown-annotation',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Disallow redundant `: unknown` annotation on catch clause variables.',
      },
      fixable: 'code',
      messages: {
        removeCatchAnnotation: 'Remove the redundant `: unknown` annotation. TypeScript defaults catch variables to `unknown`.',
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
      ignoreFiles: [] as Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        CatchClause(node: Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_Create_CatchClause_Node): Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_Create_CatchClause_Returns {
          Runner.checkCatchClause(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - TypeScript - No Catch Unknown Annotation - Check Catch Clause.
   *
   * Inspects the catch clause parameter for a
   * TSUnknownKeyword type annotation and provides an
   * auto-fix that removes the redundant annotation.
   *
   * @private
   *
   * @param {Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Context} context - Context.
   * @param {Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Returns}
   *
   * @since 0.14.0
   */
  private static checkCatchClause(context: Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Context, node: Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Node): Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Returns {
    const param: Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Param = node.param;

    if (param === undefined || param === null) {
      return;
    }

    const typeAnnotation: Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_TypeAnnotation = param.typeAnnotation;

    if (typeAnnotation === undefined) {
      return;
    }

    if (typeAnnotation.typeAnnotation.type === 'TSUnknownKeyword') {
      context.report({
        node: typeAnnotation,
        messageId: 'removeCatchAnnotation',
        fix(fixer: Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Fix_Fixer): Rules_Eslint_Typescript_NoCatchUnknownAnnotation_Runner_CheckCatchClause_Fix_Returns {
          return fixer.remove(typeAnnotation);
        },
      });
    }

    return;
  }
}
