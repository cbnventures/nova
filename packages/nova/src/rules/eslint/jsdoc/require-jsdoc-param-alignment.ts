import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_AllComments,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_AllDashesSame,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_AllNameStartsSame,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_Context,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_DashIndex,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_DashPositions,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_Fix_Match,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_FixedLine,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_FixedLines,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_FixedValue,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_Lines,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_Match,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_MatchDash,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_MatchName,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_MatchType,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_MaxNameLength,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_MaxTypeLength,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_NameStartIndex,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_NameStartPositions,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_PadAfterName,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_PadAfterType,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_ParamLines,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_ParsedEntries,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_RebuiltLine,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_TypeEndIndex,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_TypeLength,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_TypeWithBraces,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_RuleOptions,
} from '../../../types/rules/eslint/jsdoc/require-jsdoc-param-alignment.d.ts';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Param Alignment.
 *
 * Enforces vertical alignment of types, names, and dashes across @param lines within a JSDoc
 * block. Provides auto-fix by padding with spaces.
 *
 * @since 0.15.0
 */
export class Runner {
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
      ignoreFiles: [] as Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_RuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Program() {
          Runner.checkProgram(context);

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
   * @param {Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_Context} context - Context.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_Returns}
   *
   * @since 0.15.0
   */
  private static checkProgram(context: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_Context): Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_Returns {
    const allComments: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_AllComments = context.sourceCode.getAllComments();

    for (const comment of allComments) {
      if (comment.type !== 'Block') {
        continue;
      }

      if (comment.value.startsWith('*') === false) {
        continue;
      }

      const lines: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_Lines = comment.value.split('\n');
      const paramLines: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_ParamLines = [];

      for (const line of lines) {
        if (line.includes('@param') === true) {
          paramLines.push(line);
        }
      }

      // Only check blocks with 2 or more @param lines.
      if (paramLines.length < 2) {
        continue;
      }

      const nameStartPositions: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_NameStartPositions = [];
      const dashPositions: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_DashPositions = [];

      for (const paramLine of paramLines) {
        const match: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_Match = Runner.#paramPattern.exec(paramLine);

        if (match === null) {
          continue;
        }

        const matchType: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_MatchType = match[1];
        const matchName: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_MatchName = match[2];
        const matchDash: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_MatchDash = match[3];

        if (
          matchType === undefined
          || matchName === undefined
          || matchDash === undefined
        ) {
          continue;
        }

        const typeEndIndex: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_TypeEndIndex = paramLine.indexOf(matchType) + matchType.length;
        const nameStartIndex: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_NameStartIndex = paramLine.indexOf(matchName, typeEndIndex);
        const dashIndex: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_DashIndex = paramLine.indexOf(matchDash, nameStartIndex + matchName.length);

        nameStartPositions.push(nameStartIndex);

        dashPositions.push(dashIndex);
      }

      // Need at least 2 matched param lines to check alignment.
      if (nameStartPositions.length < 2) {
        continue;
      }

      const allNameStartsSame: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_AllNameStartsSame = nameStartPositions.every((position) => position === nameStartPositions[0]);
      const allDashesSame: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_AllDashesSame = dashPositions.every((position) => position === dashPositions[0]);

      if (
        allNameStartsSame === false
        || allDashesSame === false
      ) {
        // Compute the fixed comment value with aligned @param lines.
        const fixedLines: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_FixedLines = [...lines];
        let maxTypeLength: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_MaxTypeLength = 0;
        let maxNameLength: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_MaxNameLength = 0;

        const parsedEntries: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_ParsedEntries = [];

        for (let i = 0; i < fixedLines.length; i += 1) {
          const fixedLine: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_FixedLine = fixedLines[i];

          if (fixedLine === undefined) {
            continue;
          }

          const fixMatch: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_Fix_Match = fixedLine.match(Runner.#fixPattern);

          if (
            fixMatch !== null
            && fixMatch[1] !== undefined
            && fixMatch[2] !== undefined
            && fixMatch[3] !== undefined
            && fixMatch[4] !== undefined
          ) {
            const typeLength: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_TypeLength = fixMatch[2].length + 2;

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
          const typeWithBraces: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_TypeWithBraces = `{${entry['type']}}`;
          const padAfterType: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_PadAfterType = maxTypeLength - typeWithBraces.length + 1;
          const padAfterName: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_PadAfterName = maxNameLength - entry['name'].length + 1;

          const fixedLine: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_RebuiltLine = `${entry['prefix']}${typeWithBraces}${' '.repeat(padAfterType)}${entry['name']}${' '.repeat(padAfterName)}${entry['description']}`;

          Reflect.set(fixedLines, entry['index'], fixedLine);
        }

        const fixedValue: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_FixedValue = fixedLines.join('\n');

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
