import { ESLintUtils } from '@typescript-eslint/utils';

import {
  LIB_REGEX_PATTERN_JSDOC_CONTENT_STAR_PREFIX,
  LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX,
  LIB_REGEX_PATTERN_JSDOC_TAG_NAME_CAPTURE,
} from '../../../lib/regex.js';
import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_CanonicalTagOrder,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_AllComments,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Context,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Fix_Fixer,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Fix_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Line,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Lines,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Match,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_MatchName,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_MessageId,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_OrderViolation,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Rebuilt,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_SpacingViolation,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Stripped,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_TagEntries,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_TagRank,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Create_Options,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Create_Program_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Current,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Entries,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Previous,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_BlankCount,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Current,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Entries,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_HasText,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Line,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Lines,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Previous,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_StrippedLine,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Blank,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Body,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_BodyLine,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_ContinuationLine,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_DeprecatedGroup,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_EmitGroup,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_FirstTagIndex,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Group,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Groups,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Head,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_HeadLast,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Index,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_LastLine,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Line,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Lines,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Name,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Next,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_ParamLines,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_PrivateGroup,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Result,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_ReturnsGroup,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_SinceGroup,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_StarMatch,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_TagSection,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_TagNameOf_Line,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_TagNameOf_Match,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_TagNameOf_MatchName,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_TagNameOf_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_TagNameOf_Stripped,
} from '../../../types/rules/eslint/jsdoc/require-jsdoc-tag-order.d.ts';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Tag Order - Canonical Tag Order.
 *
 * Ordered list of the known JSDoc tags whose index defines their canonical rank.
 * Tags not present in this list are ignored by the tag-order and tag-spacing checks.
 *
 * @since 0.21.0
 */
const canonicalTagOrder: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_CanonicalTagOrder = [
  'param',
  'private',
  'returns',
  'since',
  'deprecated',
];

/**
 * Rules - ESLint - JSDoc - Require JSDoc Tag Order.
 *
 * Enforces the canonical ordering of JSDoc tags within a block and the
 * blank-line spacing between adjacent tag groups. Auto-fixes by rewriting the
 * block into canonical tag order and spacing.
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * Rules - ESLint - JSDoc - Require JSDoc Tag Order - Rule.
   *
   * Registered in eslint.config.ts and runs once per Program
   * node to scan all block comments for out-of-order or mis-spaced JSDoc tags.
   *
   * @since 0.21.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-jsdoc-tag-order',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require canonical ordering and spacing of JSDoc tags in JSDoc blocks.',
      },
      fixable: 'code',
      messages: {
        tagOrder: 'JSDoc tags must appear in canonical order.',
        tagSpacing: 'JSDoc tag groups must be separated by exactly one blank line.',
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
      ignoreFiles: [] as Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Program(): Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Create_Program_Returns {
          Runner.checkProgram(context);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Tag Order - Check Program.
   *
   * Scans all block comments and ranks
   * each known JSDoc tag line by its canonical order, then reports blocks whose tags
   * are out of order.
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Context} context - Context.
   *
   * @private
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Returns}
   *
   * @since 0.21.0
   */
  private static checkProgram(context: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Context): Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Returns {
    const allComments: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_AllComments = context.sourceCode.getAllComments();

    for (const comment of allComments) {
      if (comment.type !== 'Block') {
        continue;
      }

      if (comment.value.startsWith('*') === false) {
        continue;
      }

      const lines: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Lines = comment.value.split('\n');
      const tagEntries: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_TagEntries = [];

      for (let i = 0; i < lines.length; i += 1) {
        const line: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Line = lines[i];

        if (line === undefined) {
          continue;
        }

        const stripped: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Stripped = line.replace(LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX, '').trim();
        const match: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Match = LIB_REGEX_PATTERN_JSDOC_TAG_NAME_CAPTURE.exec(stripped);

        if (match === null) {
          continue;
        }

        const matchName: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_MatchName = match[1];

        if (matchName === undefined) {
          continue;
        }

        const tagRank: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_TagRank = canonicalTagOrder.indexOf(matchName);

        if (tagRank === -1) {
          continue;
        }

        tagEntries.push({
          lineIndex: i,
          rank: tagRank,
        });
      }

      if (tagEntries.length === 0) {
        continue;
      }

      const orderViolation: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_OrderViolation = Runner.hasOrderViolation(tagEntries);
      const spacingViolation: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_SpacingViolation = (orderViolation === false) ? Runner.hasSpacingViolation(tagEntries, lines) : false;

      if (orderViolation === false && spacingViolation === false) {
        continue;
      }

      // Order is reported ahead of spacing; both violation kinds share one canonical
      // rebuild, so compute the fixed value once and attach the same fixer to the report.
      const messageId: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_MessageId = (orderViolation === true) ? 'tagOrder' : 'tagSpacing';
      const rebuilt: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Rebuilt = Runner.rebuild(lines);

      context.report({
        node: comment,
        messageId,
        fix(fixer: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Fix_Fixer): Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Fix_Returns {
          return fixer.replaceTextRange(comment.range, `/*${rebuilt}*/`);
        },
      });
    }

    return;
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Tag Order - Has Order Violation.
   *
   * Walks each adjacent pair of ranked tag entries and returns true
   * when a later entry has a strictly lower canonical rank than the one before it.
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Entries} entries - Entries.
   *
   * @private
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Returns}
   *
   * @since 0.21.0
   */
  private static hasOrderViolation(entries: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Entries): Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Returns {
    for (let i = 1; i < entries.length; i += 1) {
      const previous: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Previous = entries[i - 1];
      const current: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Current = entries[i];

      if (previous === undefined || current === undefined) {
        continue;
      }

      if (current['rank'] < previous['rank']) {
        return true;
      }
    }

    return false;
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Tag Order - Has Spacing Violation.
   *
   * Walks each adjacent pair of ranked tag entries.
   * Returns true when spacing is wrong: same-rank pairs allow no gap while group
   * boundaries require one blank line, and any intervening text always fails.
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Entries} entries - Entries.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Lines}   lines   - Lines.
   *
   * @private
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Returns}
   *
   * @since 0.21.0
   */
  private static hasSpacingViolation(entries: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Entries, lines: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Lines): Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Returns {
    for (let i = 1; i < entries.length; i += 1) {
      const previous: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Previous = entries[i - 1];
      const current: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Current = entries[i];

      if (previous === undefined || current === undefined) {
        continue;
      }

      let blankCount: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_BlankCount = 0;
      let hasText: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_HasText = false;

      for (let j = previous['lineIndex'] + 1; j < current['lineIndex']; j += 1) {
        const line: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Line = lines[j];

        if (line === undefined) {
          continue;
        }

        const strippedLine: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_StrippedLine = line.replace(LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX, '').trim();

        if (strippedLine === '') {
          blankCount += 1;
        } else {
          hasText = true;
        }
      }

      if (current['rank'] === previous['rank']) {
        if (blankCount > 0 || hasText === true) {
          return true;
        }
      } else if (blankCount !== 1 || hasText === true) {
        return true;
      }
    }

    return false;
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Tag Order - Tag Name Of.
   *
   * Strips the JSDoc line prefix from a single comment line and returns the
   * canonical tag name when the line begins with a known tag, or null otherwise.
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_TagNameOf_Line} line - Line.
   *
   * @private
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_TagNameOf_Returns}
   *
   * @since 0.21.0
   */
  private static tagNameOf(line: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_TagNameOf_Line): Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_TagNameOf_Returns {
    const stripped: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_TagNameOf_Stripped = line.replace(LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX, '').trim();
    const match: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_TagNameOf_Match = LIB_REGEX_PATTERN_JSDOC_TAG_NAME_CAPTURE.exec(stripped);

    if (match === null) {
      return null;
    }

    const matchName: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_TagNameOf_MatchName = match[1];

    if (matchName === undefined) {
      return null;
    }

    if (canonicalTagOrder.indexOf(matchName) === -1) {
      return null;
    }

    return matchName;
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Tag Order - Rebuild.
   *
   * Rewrites a block's tag section into canonical order with one-blank-line
   * spacing while preserving the opening line, the head prose, each tag line's original text,
   * and the closing indent line so the result reproduces a well-formed block.
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Lines} lines - Lines.
   *
   * @private
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Returns}
   *
   * @since 0.21.0
   */
  private static rebuild(lines: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Lines): Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Returns {
    // Derive the blank separator from the block's own indent so member blocks keep their
    // leading whitespace. The first content line (real text after the star) yields the
    // exact leading-whitespace-plus-star to use for every blank line emitted below.
    let blank: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Blank = ' *';

    for (const line of lines) {
      const starMatch: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_StarMatch = LIB_REGEX_PATTERN_JSDOC_CONTENT_STAR_PREFIX.exec(line);

      if (starMatch !== null && starMatch[1] !== undefined) {
        blank = starMatch[1];

        break;
      }
    }

    const lastLine: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_LastLine = lines[lines.length - 1];
    const body: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Body = lines.slice(0, lines.length - 1);

    // Find the index of the first known-tag line in the body.
    let firstTagIndex: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_FirstTagIndex = -1;

    for (let i = 0; i < body.length; i += 1) {
      const bodyLine: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_BodyLine = body[i];

      if (bodyLine === undefined) {
        continue;
      }

      if (Runner.tagNameOf(bodyLine) !== null) {
        firstTagIndex = i;

        break;
      }
    }

    if (firstTagIndex === -1) {
      return lines.join('\n');
    }

    // Head is everything before the first tag, with trailing blank lines removed.
    let head: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Head = body.slice(0, firstTagIndex);

    while (head.length > 0) {
      const headLast: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_HeadLast = head[head.length - 1];

      if (headLast === undefined || headLast.replace(LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX, '').trim() !== '') {
        break;
      }

      head = head.slice(0, head.length - 1);
    }

    // Collect each present tag group, keeping every line's original text verbatim.
    const paramLines: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_ParamLines = [];
    let privateGroup: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_PrivateGroup = null;
    let returnsGroup: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_ReturnsGroup = null;
    let sinceGroup: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_SinceGroup = null;
    let deprecatedGroup: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_DeprecatedGroup = null;

    let index: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Index = firstTagIndex;

    while (index < body.length) {
      const line: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Line = body[index];

      if (line === undefined) {
        index += 1;

        continue;
      }

      const name: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Name = Runner.tagNameOf(line);

      if (name === null) {
        index += 1;

        continue;
      }

      // Absorb any continuation lines (non-blank, non-tag) that follow this tag.
      const group: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Group = [line];
      let next: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Next = index + 1;

      while (next < body.length) {
        const continuationLine: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_ContinuationLine = body[next];

        if (continuationLine === undefined) {
          break;
        }

        if (Runner.tagNameOf(continuationLine) !== null) {
          break;
        }

        if (continuationLine.replace(LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX, '').trim() === '') {
          break;
        }

        group.push(continuationLine);

        next += 1;
      }

      if (name === 'param') {
        for (const groupLine of group) {
          paramLines.push(groupLine);
        }
      } else if (name === 'private') {
        privateGroup = group;
      } else if (name === 'returns') {
        returnsGroup = group;
      } else if (name === 'since') {
        sinceGroup = group;
      } else if (name === 'deprecated') {
        deprecatedGroup = group;
      }

      index = next;
    }

    // Order the present groups per the canonical sequence.
    const groups: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Groups = [];

    if (paramLines.length > 0) {
      groups.push(paramLines);
    }

    if (privateGroup !== null) {
      groups.push(privateGroup);
    }

    if (returnsGroup !== null) {
      groups.push(returnsGroup);
    }

    if (sinceGroup !== null) {
      groups.push(sinceGroup);
    }

    if (deprecatedGroup !== null) {
      groups.push(deprecatedGroup);
    }

    // Emit each group's lines, separating adjacent groups with one blank line.
    const tagSection: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_TagSection = [];

    for (let g = 0; g < groups.length; g += 1) {
      if (g > 0) {
        tagSection.push(blank);
      }

      const emitGroup: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_EmitGroup = groups[g] ?? [];

      for (const groupLine of emitGroup) {
        tagSection.push(groupLine);
      }
    }

    const result: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Result = [
      ...head,
      blank,
      ...tagSection,
    ];

    if (lastLine !== undefined) {
      result.push(lastLine);
    }

    return result.join('\n');
  }
}
