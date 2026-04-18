import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramAllComments,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramAllDashesSame,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramAllNameStartsSame,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramContext,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramDashIndex,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramDashPositions,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramFixedLine,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramFixedLines,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramFixedValue,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramFixMatch,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramLines,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramMatch,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramMatchDash,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramMatchName,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramMatchType,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramMaxNameLength,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramMaxTypeLength,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramNameStartIndex,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramNameStartPositions,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramPadAfterName,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramPadAfterType,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramParamLines,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramParsedEntries,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramRebuiltLine,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramReturns,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramTypeEndIndex,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramTypeLength,
  RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramTypeWithBraces,
  RulesEslintJsdocRequireJsdocParamAlignmentRuleDefaultOptionsIgnoreFiles,
  RulesEslintJsdocRequireJsdocParamAlignmentRuleOptions,
} from '../../../types/rules/eslint/jsdoc/require-jsdoc-param-alignment.d.ts';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Param Alignment.
 *
 * Enforces vertical alignment of types, names, and dashes across @param lines within a JSDoc
 * block. Provides auto-fix by padding with spaces.
 *
 * @since 0.15.0
 */
export class RulesEslintJsdocRequireJsdocParamAlignment {
  /**
   * Rules - ESLint - JSDoc - Require JSDoc Param Alignment - Param Pattern.
   *
   * Regex that captures the type, name, and dash from a
   * single @param line. Used to measure column positions for alignment comparison.
   *
   * @private
   *
   * @since 0.15.0
   */
  static readonly #paramPattern = new RegExp('@param\\s+(\\{[^}]*\\})\\s+(\\w+)\\s+(-)');

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Param Alignment - Fix Pattern.
   *
   * Regex used by the auto-fixer to parse each @param line into
   * prefix, type, name, and description segments for rebuilding with correct padding.
   *
   * @private
   *
   * @since 0.15.0
   */
  static readonly #fixPattern = new RegExp('^(\\s*\\*\\s*@param\\s+)\\{([^}]+)\\}\\s+(\\[?\\w+\\]?)\\s+(- .+)$');

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Param Alignment - Rule.
   *
   * Registered in eslint.config.ts and runs once per Program
   * node to scan all block comments for misaligned @param tags.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-jsdoc-param-alignment',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require vertical alignment of @param types, names, and dashes in JSDoc blocks.',
      },
      fixable: 'whitespace',
      messages: {
        paramAlignment: '@param tags must be vertically aligned.',
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
      ignoreFiles: [] as RulesEslintJsdocRequireJsdocParamAlignmentRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintJsdocRequireJsdocParamAlignmentRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Program() {
          RulesEslintJsdocRequireJsdocParamAlignment.checkProgram(context);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Param Alignment - Check Program.
   *
   * Scans all block comments for JSDoc blocks with two or more @param
   * tags and reports any whose types, names, or dashes are not vertically aligned.
   *
   * @private
   *
   * @param {RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramContext} context - Context.
   *
   * @returns {RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramReturns}
   *
   * @since 0.15.0
   */
  private static checkProgram(context: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramContext): RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramReturns {
    const allComments: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramAllComments = context.sourceCode.getAllComments();

    for (const comment of allComments) {
      if (comment.type !== 'Block') {
        continue;
      }

      if (comment.value.startsWith('*') === false) {
        continue;
      }

      const lines: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramLines = comment.value.split('\n');
      const paramLines: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramParamLines = [];

      for (const line of lines) {
        if (line.includes('@param') === true) {
          paramLines.push(line);
        }
      }

      // Only check blocks with 2 or more @param lines.
      if (paramLines.length < 2) {
        continue;
      }

      const nameStartPositions: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramNameStartPositions = [];
      const dashPositions: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramDashPositions = [];

      for (const paramLine of paramLines) {
        const match: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramMatch = RulesEslintJsdocRequireJsdocParamAlignment.#paramPattern.exec(paramLine);

        if (match === null) {
          continue;
        }

        const matchType: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramMatchType = match[1];
        const matchName: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramMatchName = match[2];
        const matchDash: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramMatchDash = match[3];

        if (
          matchType === undefined
          || matchName === undefined
          || matchDash === undefined
        ) {
          continue;
        }

        const typeEndIndex: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramTypeEndIndex = paramLine.indexOf(matchType) + matchType.length;
        const nameStartIndex: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramNameStartIndex = paramLine.indexOf(matchName, typeEndIndex);
        const dashIndex: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramDashIndex = paramLine.indexOf(matchDash, nameStartIndex + matchName.length);

        nameStartPositions.push(nameStartIndex);

        dashPositions.push(dashIndex);
      }

      // Need at least 2 matched param lines to check alignment.
      if (nameStartPositions.length < 2) {
        continue;
      }

      const allNameStartsSame: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramAllNameStartsSame = nameStartPositions.every((position) => position === nameStartPositions[0]);
      const allDashesSame: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramAllDashesSame = dashPositions.every((position) => position === dashPositions[0]);

      if (
        allNameStartsSame === false
        || allDashesSame === false
      ) {
        // Compute the fixed comment value with aligned @param lines.
        const fixedLines: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramFixedLines = [...lines];
        let maxTypeLength: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramMaxTypeLength = 0;
        let maxNameLength: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramMaxNameLength = 0;

        const parsedEntries: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramParsedEntries = [];

        for (let i = 0; i < fixedLines.length; i += 1) {
          const fixedLine: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramFixedLine = fixedLines[i];

          if (fixedLine === undefined) {
            continue;
          }

          const fixMatch: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramFixMatch = fixedLine.match(RulesEslintJsdocRequireJsdocParamAlignment.#fixPattern);

          if (
            fixMatch !== null
            && fixMatch[1] !== undefined
            && fixMatch[2] !== undefined
            && fixMatch[3] !== undefined
            && fixMatch[4] !== undefined
          ) {
            const typeLength: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramTypeLength = fixMatch[2].length + 2;

            if (typeLength > maxTypeLength) {
              maxTypeLength = typeLength;
            }

            if (fixMatch[3].length > maxNameLength) {
              maxNameLength = fixMatch[3].length;
            }

            parsedEntries.push({
              index: i,
              prefix: fixMatch[1],
              type: fixMatch[2],
              name: fixMatch[3],
              description: fixMatch[4],
            });
          }
        }

        for (const entry of parsedEntries) {
          const typeWithBraces: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramTypeWithBraces = `{${entry['type']}}`;
          const padAfterType: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramPadAfterType = maxTypeLength - typeWithBraces.length + 1;
          const padAfterName: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramPadAfterName = maxNameLength - entry['name'].length + 1;

          const fixedLine: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramRebuiltLine = `${entry['prefix']}${typeWithBraces}${' '.repeat(padAfterType)}${entry['name']}${' '.repeat(padAfterName)}${entry['description']}`;

          Reflect.set(fixedLines, entry['index'], fixedLine);
        }

        const fixedValue: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramFixedValue = fixedLines.join('\n');

        context.report({
          node: comment,
          messageId: 'paramAlignment',
          fix(fixer) {
            return fixer.replaceTextRange(comment.range, `/*${fixedValue}*/`);
          },
        });
      }
    }

    return;
  }
}
