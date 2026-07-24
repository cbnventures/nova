import { ESLintUtils } from '@typescript-eslint/utils';

import {
  LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX,
  LIB_REGEX_PATTERN_JSDOC_RETURNS_TYPE_ONLY,
  LIB_REGEX_PATTERN_JSDOC_TAG_NAME_CAPTURE,
} from '../../../lib/regex.js';
import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_AllComments,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Context,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Line,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Lines,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Match,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_MatchName,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Stripped,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_Options,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_Program_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_RuleDefaultOptionsIgnoreFiles,
} from '../../../types/rules/eslint/jsdoc/require-jsdoc-returns.d.ts';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Returns.
 *
 * Enforces that every @returns tag contains only a type in braces with no
 * trailing description. Reports without auto-fix.
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * Rules - ESLint - JSDoc - Require JSDoc Returns - Rule.
   *
   * Registered in eslint.config.ts and runs once per Program
   * node to scan all block comments for @returns tags with trailing descriptions.
   *
   * @since 0.21.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-jsdoc-returns',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require @returns tags to contain only a type in braces.',
      },
      messages: {
        returnsTypeOnly: 'The @returns tag must contain only a type in braces, with no trailing description.',
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
      ignoreFiles: [] as Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Program(): Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_Program_Returns {
          Runner.checkProgram(context);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Returns - Check Program.
   *
   * Scans all block comments and reports any @returns line that
   * carries more than a single type in braces (a trailing description).
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Context} context - Context.
   *
   * @private
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Returns}
   *
   * @since 0.21.0
   */
  private static checkProgram(context: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Context): Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Returns {
    const allComments: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_AllComments = context.sourceCode.getAllComments();

    for (const comment of allComments) {
      if (comment.type !== 'Block') {
        continue;
      }

      if (comment.value.startsWith('*') === false) {
        continue;
      }

      const lines: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Lines = comment.value.split('\n');

      for (let i = 0; i < lines.length; i += 1) {
        const line: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Line = lines[i];

        if (line === undefined) {
          continue;
        }

        const stripped: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Stripped = line.replace(LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX, '').trim();
        const match: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Match = LIB_REGEX_PATTERN_JSDOC_TAG_NAME_CAPTURE.exec(stripped);

        if (match === null) {
          continue;
        }

        const matchName: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_MatchName = match[1];

        if (matchName !== 'returns') {
          continue;
        }

        if (LIB_REGEX_PATTERN_JSDOC_RETURNS_TYPE_ONLY.test(stripped) === false) {
          context.report({
            node: comment,
            messageId: 'returnsTypeOnly',
          });

          break;
        }
      }
    }

    return;
  }
}
