import { ESLintUtils } from '@typescript-eslint/utils';

import { LIB_REGEX_PATTERN_KEBAB_CASE_FILENAME } from '../../../lib/regex.js';
import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintConventionsRequireKebabCaseFilenameCheckProgramContext,
  RulesEslintConventionsRequireKebabCaseFilenameCheckProgramKebabCasePattern,
  RulesEslintConventionsRequireKebabCaseFilenameCheckProgramOptions,
  RulesEslintConventionsRequireKebabCaseFilenameCheckProgramReturns,
  RulesEslintConventionsRequireKebabCaseFilenameCheckProgramStem,
  RulesEslintConventionsRequireKebabCaseFilenameGetStemAllExtensions,
  RulesEslintConventionsRequireKebabCaseFilenameGetStemBasename,
  RulesEslintConventionsRequireKebabCaseFilenameGetStemExtraExtensions,
  RulesEslintConventionsRequireKebabCaseFilenameGetStemFilename,
  RulesEslintConventionsRequireKebabCaseFilenameGetStemNormalizedFilename,
  RulesEslintConventionsRequireKebabCaseFilenameGetStemReturns,
  RulesEslintConventionsRequireKebabCaseFilenameRuleDefaultOptionsExtraExtensions,
  RulesEslintConventionsRequireKebabCaseFilenameRuleDefaultOptionsIgnoreFiles,
  RulesEslintConventionsRequireKebabCaseFilenameRuleOptions,
} from '../../../types/rules/eslint/conventions/require-kebab-case-filename.d.ts';

/**
 * Rules - ESLint - Conventions - Require Kebab Case Filename.
 *
 * Requires all TypeScript file names to use kebab-case. Strips known
 * compound extensions like .test.ts and .d.ts before validating the stem.
 *
 * @since 0.15.0
 */
export class RulesEslintConventionsRequireKebabCaseFilename {
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
      extraExtensions: [] as RulesEslintConventionsRequireKebabCaseFilenameRuleDefaultOptionsExtraExtensions,
      ignoreFiles: [] as RulesEslintConventionsRequireKebabCaseFilenameRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintConventionsRequireKebabCaseFilenameRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Program() {
          RulesEslintConventionsRequireKebabCaseFilename.checkProgram(context, options);

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
   * @param {RulesEslintConventionsRequireKebabCaseFilenameGetStemFilename}        filename        - Filename.
   * @param {RulesEslintConventionsRequireKebabCaseFilenameGetStemExtraExtensions} extraExtensions - Extra extensions.
   *
   * @returns {RulesEslintConventionsRequireKebabCaseFilenameGetStemReturns}
   *
   * @since 0.15.0
   */
  private static getStem(filename: RulesEslintConventionsRequireKebabCaseFilenameGetStemFilename, extraExtensions: RulesEslintConventionsRequireKebabCaseFilenameGetStemExtraExtensions): RulesEslintConventionsRequireKebabCaseFilenameGetStemReturns {
    const normalizedFilename: RulesEslintConventionsRequireKebabCaseFilenameGetStemNormalizedFilename = filename.replaceAll('\\', '/');
    const basename: RulesEslintConventionsRequireKebabCaseFilenameGetStemBasename = normalizedFilename.split('/').pop() ?? normalizedFilename;
    const allExtensions: RulesEslintConventionsRequireKebabCaseFilenameGetStemAllExtensions = [
      ...RulesEslintConventionsRequireKebabCaseFilename.#knownExtensions,
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
   * @param {RulesEslintConventionsRequireKebabCaseFilenameCheckProgramContext} context - Context.
   * @param {RulesEslintConventionsRequireKebabCaseFilenameCheckProgramOptions} options - Options.
   *
   * @returns {RulesEslintConventionsRequireKebabCaseFilenameCheckProgramReturns}
   *
   * @since 0.15.0
   */
  private static checkProgram(context: RulesEslintConventionsRequireKebabCaseFilenameCheckProgramContext, options: RulesEslintConventionsRequireKebabCaseFilenameCheckProgramOptions): RulesEslintConventionsRequireKebabCaseFilenameCheckProgramReturns {
    const stem: RulesEslintConventionsRequireKebabCaseFilenameCheckProgramStem = RulesEslintConventionsRequireKebabCaseFilename.getStem(context.filename, options['extraExtensions']);
    const kebabCasePattern: RulesEslintConventionsRequireKebabCaseFilenameCheckProgramKebabCasePattern = LIB_REGEX_PATTERN_KEBAB_CASE_FILENAME;

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
