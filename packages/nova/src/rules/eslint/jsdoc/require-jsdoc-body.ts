import { ESLintUtils } from '@typescript-eslint/utils';

import { LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX } from '../../../lib/regex.js';
import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintJsdocRequireJsdocBodyCheckProgramAllComments,
  RulesEslintJsdocRequireJsdocBodyCheckProgramBodyLineCount,
  RulesEslintJsdocRequireJsdocBodyCheckProgramContext,
  RulesEslintJsdocRequireJsdocBodyCheckProgramFoundSummary,
  RulesEslintJsdocRequireJsdocBodyCheckProgramLines,
  RulesEslintJsdocRequireJsdocBodyCheckProgramPastSummary,
  RulesEslintJsdocRequireJsdocBodyCheckProgramReturns,
  RulesEslintJsdocRequireJsdocBodyCheckProgramTrimmed,
  RulesEslintJsdocRequireJsdocBodyRuleDefaultOptionsIgnoreFiles,
  RulesEslintJsdocRequireJsdocBodyRuleDefaultOptionsMaxLines,
  RulesEslintJsdocRequireJsdocBodyRuleDefaultOptionsMaxWidth,
  RulesEslintJsdocRequireJsdocBodyRuleDefaultOptionsMinLines,
  RulesEslintJsdocRequireJsdocBodyRuleDefaultOptionsSkipDirectories,
  RulesEslintJsdocRequireJsdocBodyRuleOptions,
} from '../../../types/rules/eslint/jsdoc/require-jsdoc-body.d.ts';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Body.
 *
 * Enforces that every JSDoc block includes a body paragraph after the summary line. The
 * summary describes "what" and the body explains "why" it exists or when it matters.
 *
 * @since 0.15.0
 */
export class RulesEslintJsdocRequireJsdocBody {
  /**
   * Rules - ESLint - JSDoc - Require JSDoc Body - Rule.
   *
   * Defines the ESLint rule metadata, schema, and entry
   * point for checking JSDoc body paragraphs across the program.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-jsdoc-body',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require a body paragraph in JSDoc blocks that explains why the declaration exists.',
      },
      messages: {
        requireBodyDescription: 'JSDoc blocks must include a body paragraph after the summary line explaining why this exists.',
        bodyTooShort: 'JSDoc body must have at least {{ minLines }} line(s). Found {{ actual }}.',
        bodyTooLong: 'JSDoc body must have at most {{ maxLines }} line(s). Found {{ actual }}.',
        bodyLineTooWide: 'JSDoc body line exceeds {{ maxWidth }} characters. Found {{ actual }}.',
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
          maxLines: {
            type: 'integer',
            minimum: 1,
          },
          maxWidth: {
            type: 'integer',
            minimum: 1,
          },
          minLines: {
            type: 'integer',
            minimum: 1,
          },
          skipDirectories: {
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
      ignoreFiles: [] as RulesEslintJsdocRequireJsdocBodyRuleDefaultOptionsIgnoreFiles,
      maxLines: 3 as RulesEslintJsdocRequireJsdocBodyRuleDefaultOptionsMaxLines,
      maxWidth: 80 as RulesEslintJsdocRequireJsdocBodyRuleDefaultOptionsMaxWidth,
      minLines: 2 as RulesEslintJsdocRequireJsdocBodyRuleDefaultOptionsMinLines,
      skipDirectories: [] as RulesEslintJsdocRequireJsdocBodyRuleDefaultOptionsSkipDirectories,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintJsdocRequireJsdocBodyRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      // Skip files in configured directories.
      for (const skipDirectory of options['skipDirectories']) {
        if (context.filename.includes(`/${skipDirectory}/`) === true) {
          return {};
        }
      }

      // Validate that maxLines is not less than minLines.
      if (options['maxLines'] < options['minLines']) {
        return {};
      }

      return {
        Program() {
          RulesEslintJsdocRequireJsdocBody.checkProgram(context, options);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Body - Check Program.
   *
   * Scans all block comments for JSDoc blocks and verifies
   * each has a body paragraph between the summary and the first tag.
   *
   * @private
   *
   * @param {RulesEslintJsdocRequireJsdocBodyCheckProgramContext} context - Context.
   * @param {RulesEslintJsdocRequireJsdocBodyRuleOptions}         options - Options.
   *
   * @returns {RulesEslintJsdocRequireJsdocBodyCheckProgramReturns}
   *
   * @since 0.15.0
   */
  private static checkProgram(context: RulesEslintJsdocRequireJsdocBodyCheckProgramContext, options: RulesEslintJsdocRequireJsdocBodyRuleOptions): RulesEslintJsdocRequireJsdocBodyCheckProgramReturns {
    const allComments: RulesEslintJsdocRequireJsdocBodyCheckProgramAllComments = context.sourceCode.getAllComments();

    for (const comment of allComments) {
      if (comment.type !== 'Block') {
        continue;
      }

      if (comment.value.startsWith('*') === false) {
        continue;
      }

      const lines: RulesEslintJsdocRequireJsdocBodyCheckProgramLines = comment.value.split('\n');
      let foundSummary: RulesEslintJsdocRequireJsdocBodyCheckProgramFoundSummary = false;
      let pastSummary: RulesEslintJsdocRequireJsdocBodyCheckProgramPastSummary = false;
      let bodyLineCount: RulesEslintJsdocRequireJsdocBodyCheckProgramBodyLineCount = 0;

      for (const line of lines) {
        const trimmed: RulesEslintJsdocRequireJsdocBodyCheckProgramTrimmed = line.replace(LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX, '').trim();

        // Skip empty lines.
        if (trimmed === '' || trimmed === '*') {
          if (foundSummary === true) {
            pastSummary = true;
          }

          continue;
        }

        // Tag lines end the body search.
        if (trimmed.startsWith('@') === true) {
          break;
        }

        // First non-empty, non-tag line is the summary.
        if (foundSummary === false) {
          foundSummary = true;

          continue;
        }

        // Any non-empty, non-tag line after the summary is body text.
        if (pastSummary === true) {
          bodyLineCount += 1;
        }
      }

      // Only check blocks that have a summary.
      if (foundSummary === false) {
        continue;
      }

      if (bodyLineCount === 0) {
        context.report({
          node: comment,
          messageId: 'requireBodyDescription',
        });

        continue;
      }

      if (bodyLineCount < options['minLines']) {
        context.report({
          node: comment,
          messageId: 'bodyTooShort',
          data: {
            minLines: String(options['minLines']),
            actual: String(bodyLineCount),
          },
        });

        continue;
      }

      if (bodyLineCount > options['maxLines']) {
        context.report({
          node: comment,
          messageId: 'bodyTooLong',
          data: {
            maxLines: String(options['maxLines']),
            actual: String(bodyLineCount),
          },
        });

        continue;
      }

      // Check body line widths.
      if (options['maxWidth'] > 0) {
        let bodyReached: RulesEslintJsdocRequireJsdocBodyCheckProgramFoundSummary = false;
        let bodyPast: RulesEslintJsdocRequireJsdocBodyCheckProgramPastSummary = false;

        for (const line of lines) {
          const trimmed: RulesEslintJsdocRequireJsdocBodyCheckProgramTrimmed = line.replace(LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX, '').trim();

          if (trimmed === '' || trimmed === '*') {
            if (bodyReached === true) {
              bodyPast = true;
            }

            continue;
          }

          if (trimmed.startsWith('@') === true) {
            break;
          }

          if (bodyReached === false) {
            bodyReached = true;

            continue;
          }

          if (bodyPast === true && trimmed.length > options['maxWidth']) {
            context.report({
              node: comment,
              messageId: 'bodyLineTooWide',
              data: {
                maxWidth: String(options['maxWidth']),
                actual: String(trimmed.length),
              },
            });

            break;
          }
        }
      }
    }

    return;
  }
}
