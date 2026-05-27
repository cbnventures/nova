import { ESLintUtils } from '@typescript-eslint/utils';

import { LIB_REGEX_PATTERN_KEBAB_CASE_FILENAME } from '../../../lib/regex.js';
import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Context,
  Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_KebabCasePattern,
  Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Options,
  Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Returns,
  Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Stem,
  Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_AllExtensions,
  Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_Basename,
  Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_ExtraExtensions,
  Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_Filename,
  Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_NormalizedFilename,
  Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_Returns,
  Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_RuleDefaultOptionsExtraExtensions,
  Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_RuleOptions,
} from '../../../types/rules/eslint/conventions/require-kebab-case-filename.d.ts';

/**
 * Rules - ESLint - Conventions - Require Kebab Case Filename.
 *
 * Requires all TypeScript file names to use kebab-case. Strips known
 * compound extensions like .test.ts and .d.ts before validating the stem.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * Rules - ESLint - Conventions - Require Kebab Case Filename - Known Extensions.
   *
   * Ordered list of compound file extensions to strip before
   * validating the stem. Longest extensions appear first so .test.d.ts matches before .d.ts.
   *
   * @private
   *
   * @since 0.15.0
   */
  static readonly #knownExtensions = [
    '.test.d.ts',
    '.test.ts',
    '.d.mts',
    '.d.cts',
    '.d.ts',
    '.tsx',
    '.mts',
    '.mjs',
    '.cts',
    '.cjs',
    '.ts',
    '.js',
    '.jsx',
  ];

  /**
   * Rules - ESLint - Conventions - Require Kebab Case Filename - Rule.
   *
   * Registered in eslint.config.ts and runs once per Program node
   * to validate the current file name against the kebab-case pattern.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-kebab-case-filename',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require kebab-case file names for TypeScript files.',
      },
      messages: {
        requireKebabCase: 'File name must use kebab-case.',
      },
      schema: [{
        type: 'object',
        properties: {
          extraExtensions: {
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
      extraExtensions: [] as Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_RuleDefaultOptionsExtraExtensions,
      ignoreFiles: [] as Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_RuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Program() {
          Runner.checkProgram(context, options);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Conventions - Require Kebab Case Filename - Get Stem.
   *
   * Extracts the base file name without its extension by normalizing
   * path separators and stripping the first matching compound extension.
   *
   * @private
   *
   * @param {Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_Filename}        filename        - Filename.
   * @param {Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_ExtraExtensions} extraExtensions - Extra extensions.
   *
   * @returns {Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_Returns}
   *
   * @since 0.15.0
   */
  private static getStem(filename: Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_Filename, extraExtensions: Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_ExtraExtensions): Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_Returns {
    const normalizedFilename: Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_NormalizedFilename = filename.replaceAll('\\', '/');
    const basename: Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_Basename = normalizedFilename.split('/').pop() ?? normalizedFilename;
    const allExtensions: Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_AllExtensions = [
      ...Runner.#knownExtensions,
      ...extraExtensions,
    ];

    for (const allExtension of allExtensions) {
      if (basename.endsWith(allExtension) === true) {
        return basename.slice(0, basename.length - allExtension.length);
      }
    }

    return basename;
  }

  /**
   * Rules - ESLint - Conventions - Require Kebab Case Filename - Check Program.
   *
   * Retrieves the file stem via getStem and tests it against the
   * shared kebab-case regex pattern from lib/regex. Reports at line 1 column 0 on failure.
   *
   * @private
   *
   * @param {Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Context} context - Context.
   * @param {Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Options} options - Options.
   *
   * @returns {Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Returns}
   *
   * @since 0.15.0
   */
  private static checkProgram(context: Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Context, options: Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Options): Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Returns {
    const stem: Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Stem = Runner.getStem(context.filename, options['extraExtensions']);
    const kebabCasePattern: Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_KebabCasePattern = LIB_REGEX_PATTERN_KEBAB_CASE_FILENAME;

    if (kebabCasePattern.test(stem) === false) {
      context.report({
        loc: {
          line: 1,
          column: 0,
        },
        messageId: 'requireKebabCase',
      });
    }

    return;
  }
}
