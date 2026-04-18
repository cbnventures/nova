import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintTypescriptNoCatchUnknownAnnotationCheckCatchClauseContext,
  RulesEslintTypescriptNoCatchUnknownAnnotationCheckCatchClauseNode,
  RulesEslintTypescriptNoCatchUnknownAnnotationCheckCatchClauseParam,
  RulesEslintTypescriptNoCatchUnknownAnnotationCheckCatchClauseReturns,
  RulesEslintTypescriptNoCatchUnknownAnnotationCheckCatchClauseTypeAnnotation,
  RulesEslintTypescriptNoCatchUnknownAnnotationRuleDefaultOptionsIgnoreFiles,
  RulesEslintTypescriptNoCatchUnknownAnnotationRuleOptions,
} from '../../../types/rules/eslint/typescript/no-catch-unknown-annotation.d.ts';

/**
 * Rules - ESLint - TypeScript - No Catch Unknown Annotation.
 *
 * Removes the redundant `: unknown` annotation on catch clause variables. TypeScript already
 * defaults catch parameters to unknown, so the annotation is noise.
 *
 * @since 0.14.0
 */
export class RulesEslintTypescriptNoCatchUnknownAnnotation {
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
      ignoreFiles: [] as RulesEslintTypescriptNoCatchUnknownAnnotationRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintTypescriptNoCatchUnknownAnnotationRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        CatchClause(node) {
          RulesEslintTypescriptNoCatchUnknownAnnotation.checkCatchClause(context, node);

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
   * @param {RulesEslintTypescriptNoCatchUnknownAnnotationCheckCatchClauseContext} context - Context.
   * @param {RulesEslintTypescriptNoCatchUnknownAnnotationCheckCatchClauseNode}    node    - Node.
   *
   * @returns {RulesEslintTypescriptNoCatchUnknownAnnotationCheckCatchClauseReturns}
   *
   * @since 0.14.0
   */
  private static checkCatchClause(context: RulesEslintTypescriptNoCatchUnknownAnnotationCheckCatchClauseContext, node: RulesEslintTypescriptNoCatchUnknownAnnotationCheckCatchClauseNode): RulesEslintTypescriptNoCatchUnknownAnnotationCheckCatchClauseReturns {
    const param: RulesEslintTypescriptNoCatchUnknownAnnotationCheckCatchClauseParam = node.param;

    if (param === undefined || param === null) {
      return;
    }

    const typeAnnotation: RulesEslintTypescriptNoCatchUnknownAnnotationCheckCatchClauseTypeAnnotation = param.typeAnnotation;

    if (typeAnnotation === undefined) {
      return;
    }

    if (typeAnnotation.typeAnnotation.type === 'TSUnknownKeyword') {
      context.report({
        node: typeAnnotation,
        messageId: 'removeCatchAnnotation',
        fix(fixer) {
          return fixer.remove(typeAnnotation);
        },
      });
    }

    return;
  }
}
