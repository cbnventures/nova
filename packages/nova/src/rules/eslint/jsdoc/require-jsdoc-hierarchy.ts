import { ESLintUtils } from '@typescript-eslint/utils';

import {
  libItemPrettyNamesAbbreviation,
  libItemPrettyNamesKeyword,
} from '../../../lib/item.js';
import {
  LIB_REGEX_PATTERN_CAMEL_CASE_WORDS,
  LIB_REGEX_PATTERN_EXTENSION,
  LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX,
} from '../../../lib/regex.js';
import { isIgnoredFile, normalizeRouteSegment } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_CommentValue,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_Line,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_Lines,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_NewSummary,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_OldSummary,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_ReplacedLine,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_SummaryIndex,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Comments,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Context,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Expected,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Fix_Fixer,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Fix_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_FixedValue,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_JsdocComment,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Node,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Options,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_SummaryInfo,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Comments,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Context,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Expected,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Fix_Fixer,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Fix_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_FixedValue,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_JsdocComment,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_MethodName,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Node,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Options,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_SummaryInfo,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Comments,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Context,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_DescribeString,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_DescribeSuffix,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Expected,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_ExpectedPrefix,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_ExpectedWithSuffix,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Fix_Fixer,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Fix_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_FixedValue,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_JsdocComment,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_NamePathParts,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_NameSuffix,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Node,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_NodeName,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Options,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Parent,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_ParentNames,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_PathParts,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Suffix,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_SummaryInfo,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_ClassDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_ClassDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_Diagnostic,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_ExportNamedDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_ExportNamedDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_ExpressionStatement_Node,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_ExpressionStatement_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_FunctionDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_FunctionDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_MethodDefinition_Node,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_MethodDefinition_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_Options,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_Program_Node,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_Program_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_UserEntries,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_UserKnownNames,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_VariableDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_VariableDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_Matches,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_PartAtSuffix,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_PathParts,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_PrefixLength,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_Remaining,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_SuffixStart,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_WordAtIndex,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_Words,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_CamelWords,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_DescribeString,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_DotIndex,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_HyphenatedName,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_HyphenatedWord,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_KnownName,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_LoweredWord,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_MethodPart,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_PathParts,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_PrettyName,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_PrettyWords,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_SnakeKnownName,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_SnakeLoweredWord,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_SnakePrettyWords,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_SnakeWords,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_Words,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_AllParts,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Filename,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_FilenameStem,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_LastSlashIndex,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_NormalizedStem,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Options,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Parts,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_PrettyParts,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_PrettySegments,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_SafeExtensionPattern,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Segments,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_StemAllParts,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_StemPrettyParts,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_StemPrettySegments,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_Filename,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_FirstSegment,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_Options,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_Parts,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_Prefix,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_AnchorIndex,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_AnchorToken,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_Filename,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_LastSegmentIndex,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_Options,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_RawSegments,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_RelativePath,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_SrcIndex,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractDescribeString_FirstArg,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractDescribeString_IsDescribe,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractDescribeString_Node,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractDescribeString_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractNodeName_Node,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractNodeName_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_CommentValue,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_Line,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_Lines,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_Trimmed,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_KnownNames,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Current,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Index,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_KnownName,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_KnownPair,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Lowered,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Name,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Next,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Pair,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Result,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Words,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettySegment_KnownName,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettySegment_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettySegment_Segment,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettySegment_WordName,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_RuleDefaultOptionsAnchorDirectories,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_RuleDefaultOptionsKnownNames,
  Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_RuleDefaultOptionsStripDirectories,
} from '../../../types/rules/eslint/jsdoc/require-jsdoc-hierarchy.d.ts';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy.
 *
 * Enforces that every JSDoc summary line follows a
 * dash-separated hierarchy chain derived from the file path and declaration name.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Rule.
   *
   * Registered in eslint.config.ts and handles six AST node types:
   * class, method, function, variable, export, and expression statement declarations.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-jsdoc-hierarchy',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require summary lines to follow hierarchy chain from file path.',
      },
      fixable: 'code',
      messages: {
        hierarchyMismatch: 'JSDoc summary must follow the hierarchy chain: \'{{ expected }}\'.',
        invalidIdentifierPrefix: 'Directory segment `{{ segment }}` produces an invalid TypeScript identifier prefix `{{ prefix }}`. Rename the directory to start with a letter.',
      },
      schema: [{
        type: 'object',
        properties: {
          anchorDirectories: {
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
          knownNames: {
            type: 'object',
            additionalProperties: {
              type: 'string',
            },
          },
          stripDirectories: {
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
      anchorDirectories: ['src'] as Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_RuleDefaultOptionsAnchorDirectories,
      ignoreFiles: [] as Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_RuleDefaultOptionsIgnoreFiles,
      knownNames: {} as Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_RuleDefaultOptionsKnownNames,
      stripDirectories: ['types'] as Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_RuleDefaultOptionsStripDirectories,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      const diagnostic: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_Diagnostic = Runner.deriveInvalidPrefixDiagnostic(context.filename, options);

      if (diagnostic !== null) {
        return {
          Program(node: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_Program_Node): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_Program_Returns {
            context.report({
              node,
              messageId: 'invalidIdentifierPrefix',
              data: {
                segment: diagnostic['segment'],
                prefix: diagnostic['prefix'],
              },
            });

            return;
          },
        };
      }

      // Merge built-in names with user-provided knownNames.
      const userKnownNames: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_UserKnownNames = options['knownNames'];
      const userEntries: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_UserEntries = Object.entries(userKnownNames);

      if (userEntries.length > 0) {
        Runner.#mergedNames = new Map([
          ...Runner.#knownNames,
          ...userEntries,
        ]);
      } else {
        Runner.#mergedNames = Runner.#knownNames;
      }

      return {
        ClassDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_ClassDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_ClassDeclaration_Returns {
          Runner.checkClass(context, node, options);

          return;
        },
        ExportNamedDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_ExportNamedDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_ExportNamedDeclaration_Returns {
          Runner.checkNode(context, node, options);

          return;
        },
        ExpressionStatement(node: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_ExpressionStatement_Node): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_ExpressionStatement_Returns {
          Runner.checkNode(context, node, options);

          return;
        },
        FunctionDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_FunctionDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_FunctionDeclaration_Returns {
          Runner.checkNode(context, node, options);

          return;
        },
        MethodDefinition(node: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_MethodDefinition_Node): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_MethodDefinition_Returns {
          Runner.checkMethod(context, node, options);

          return;
        },
        VariableDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_VariableDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_Create_VariableDeclaration_Returns {
          Runner.checkNode(context, node, options);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Check Class.
   *
   * Called for ClassDeclaration nodes to verify the summary
   * matches the file path hierarchy with no method suffix appended.
   *
   * @private
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Context} context - Context.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Node}    node    - Node.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Options} options - Options.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Returns}
   *
   * @since 0.15.0
   */
  private static checkClass(context: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Context, node: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Node, options: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Options): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Returns {
    const comments: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Comments = context.sourceCode.getCommentsBefore(node);
    let jsdocComment: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_JsdocComment = undefined;

    for (const comment of comments) {
      if (comment.type === 'Block' && comment.value.startsWith('*') === true) {
        jsdocComment = comment;
      }
    }

    if (jsdocComment === undefined) {
      return;
    }

    const expected: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Expected = Runner.deriveHierarchy(context.filename, [], options);
    const summaryInfo: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_SummaryInfo = Runner.findSummaryInfo(jsdocComment.value);

    if (summaryInfo === undefined) {
      context.report({
        node: jsdocComment,
        messageId: 'hierarchyMismatch',
        data: {
          expected,
        },
      });

      return;
    }

    if (summaryInfo['text'] !== expected) {
      const fixedValue: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_FixedValue = Runner.buildFixedComment(jsdocComment.value, summaryInfo['index'], summaryInfo['text'], expected);

      context.report({
        node: jsdocComment,
        messageId: 'hierarchyMismatch',
        data: {
          expected,
        },
        fix(fixer: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Fix_Fixer): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Fix_Returns {
          return fixer.replaceTextRange(jsdocComment.range, `/*${fixedValue}*/`);
        },
      });
    }

    return;
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Check Node.
   *
   * Handles exports, functions, variables, and expression
   * statements. Skips nodes inside class bodies and appends a suffix from describe strings.
   *
   * @private
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Context} context - Context.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Node}    node    - Node.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Options} options - Options.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Returns}
   *
   * @since 0.15.0
   */
  private static checkNode(context: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Context, node: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Node, options: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Options): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Returns {
    const comments: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Comments = context.sourceCode.getCommentsBefore(node);
    let jsdocComment: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_JsdocComment = undefined;

    for (const comment of comments) {
      if (comment.type === 'Block' && comment.value.startsWith('*') === true) {
        jsdocComment = comment;
      }
    }

    if (jsdocComment === undefined) {
      return;
    }

    // Skip if inside a class body. Collect parent function names for nested declarations.
    const parentNames: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_ParentNames = [];
    let parent: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Parent = node.parent;

    while (parent !== undefined && parent !== null) {
      if (parent.type === 'ClassBody') {
        return;
      }

      if (parent.type === 'FunctionDeclaration' && parent.id !== null) {
        parentNames.unshift(parent.id.name);
      }

      parent = parent.parent;
    }

    const expected: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Expected = Runner.deriveHierarchy(context.filename, parentNames, options);
    const summaryInfo: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_SummaryInfo = Runner.findSummaryInfo(jsdocComment.value);

    if (summaryInfo === undefined) {
      context.report({
        node: jsdocComment,
        messageId: 'hierarchyMismatch',
        data: {
          expected,
        },
      });

      return;
    }

    // Try describe/test string extraction for ExpressionStatements.
    let suffix: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Suffix = undefined;

    if (node.type === 'ExpressionStatement') {
      const describeString: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_DescribeString = Runner.extractDescribeString(node);

      if (describeString !== undefined) {
        const pathParts: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_PathParts = expected.slice(0, -1).split(' - ');
        const describeSuffix: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_DescribeSuffix = Runner.deriveDescribeSuffix(describeString, pathParts);

        suffix = describeSuffix;
      }
    }

    // Fall back to node name extraction with dedup for variables.
    if (suffix === undefined) {
      const nodeName: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_NodeName = Runner.extractNodeName(node);

      if (nodeName !== undefined) {
        const namePathParts: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_NamePathParts = expected.slice(0, -1).split(' - ');
        const nameSuffix: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_NameSuffix = Runner.deriveDescribeSuffix(nodeName, namePathParts);

        suffix = nameSuffix;
      }
    }

    const expectedWithSuffix: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_ExpectedWithSuffix = (suffix !== undefined) ? `${expected.slice(0, -1)} - ${suffix}.` : expected;

    // For type alias declarations, allow sub-section hierarchies (e.g. "Logger - Debug." under "Logger.").
    const expectedPrefix: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_ExpectedPrefix = expected.slice(0, -1);

    if (
      node.type === 'ExportNamedDeclaration'
      && node.declaration !== null
      && node.declaration.type === 'TSTypeAliasDeclaration'
      && summaryInfo['text'].startsWith(expectedPrefix) === true
      && summaryInfo['text'].endsWith('.') === true
    ) {
      return;
    }

    if (summaryInfo['text'] !== expectedWithSuffix) {
      const fixedValue: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_FixedValue = Runner.buildFixedComment(jsdocComment.value, summaryInfo['index'], summaryInfo['text'], expectedWithSuffix);

      context.report({
        node: jsdocComment,
        messageId: 'hierarchyMismatch',
        data: {
          expected: expectedWithSuffix,
        },
        fix(fixer: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Fix_Fixer): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Fix_Returns {
          return fixer.replaceTextRange(jsdocComment.range, `/*${fixedValue}*/`);
        },
      });
    }

    return;
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Extract Node Name.
   *
   * Pulls the identifier name from function, variable, or
   * unwrapped export declarations so checkNode can build its hierarchy suffix.
   *
   * @private
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractNodeName_Node} node - Node.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractNodeName_Returns}
   *
   * @since 0.15.0
   */
  private static extractNodeName(node: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractNodeName_Node): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractNodeName_Returns {
    if (node.type === 'FunctionDeclaration' && node.id !== null) {
      return node.id.name;
    }

    if (
      node.type === 'VariableDeclaration'
      && node.declarations.length > 0
      && node.declarations[0].id.type === 'Identifier'
    ) {
      return node.declarations[0].id.name;
    }

    if (node.type === 'ExportNamedDeclaration' && node.declaration !== null) {
      return Runner.extractNodeName(node.declaration);
    }

    return undefined;
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Check Method.
   *
   * Called for MethodDefinition nodes inside classes. Appends the
   * method name or "constructor" as the final segment of the expected hierarchy chain.
   *
   * @private
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Context} context - Context.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Node}    node    - Node.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Options} options - Options.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Returns}
   *
   * @since 0.15.0
   */
  private static checkMethod(context: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Context, node: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Node, options: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Options): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Returns {
    if (node.key.type !== 'Identifier' && node.kind !== 'constructor') {
      return;
    }

    const comments: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Comments = context.sourceCode.getCommentsBefore(node);
    let jsdocComment: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_JsdocComment = undefined;

    for (const comment of comments) {
      if (comment.type === 'Block' && comment.value.startsWith('*') === true) {
        jsdocComment = comment;
      }
    }

    if (jsdocComment === undefined) {
      return;
    }

    const methodName: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_MethodName = (node.kind === 'constructor' || node.key.type !== 'Identifier') ? node.kind : node.key.name;
    const expected: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Expected = Runner.deriveHierarchy(context.filename, [methodName], options);
    const summaryInfo: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_SummaryInfo = Runner.findSummaryInfo(jsdocComment.value);

    if (summaryInfo === undefined) {
      context.report({
        node: jsdocComment,
        messageId: 'hierarchyMismatch',
        data: {
          expected,
        },
      });

      return;
    }

    if (summaryInfo['text'] !== expected) {
      const fixedValue: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_FixedValue = Runner.buildFixedComment(jsdocComment.value, summaryInfo['index'], summaryInfo['text'], expected);

      context.report({
        node: jsdocComment,
        messageId: 'hierarchyMismatch',
        data: {
          expected,
        },
        fix(fixer: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Fix_Fixer): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Fix_Returns {
          return fixer.replaceTextRange(jsdocComment.range, `/*${fixedValue}*/`);
        },
      });
    }

    return;
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Find Summary Info.
   *
   * Scans the raw JSDoc comment text line by line to locate the
   * first non-empty, non-tag line, returning its index and trimmed text for comparison.
   *
   * @private
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_CommentValue} commentValue - Comment value.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_Returns}
   *
   * @since 0.15.0
   */
  private static findSummaryInfo(commentValue: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_CommentValue): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_Returns {
    const lines: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_Lines = commentValue.split('\n');

    for (let i = 0; i < lines.length; i += 1) {
      const line: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_Line = lines[i];

      if (line === undefined) {
        continue;
      }

      const trimmed: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_Trimmed = line.replace(LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX, '').trim();

      if (trimmed === '' || trimmed === '*') {
        continue;
      }

      if (trimmed.startsWith('@') === true) {
        continue;
      }

      return {
        index: i,
        text: trimmed,
      };
    }

    return undefined;
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Build Fixed Comment.
   *
   * Produces the corrected comment text used by the ESLint fixer
   * by replacing the old summary line at the given index with the expected hierarchy string.
   *
   * @private
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_CommentValue}  commentValue - Comment value.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_SummaryIndex}  summaryIndex - Summary index.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_OldSummary}    oldSummary   - Old summary.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_NewSummary}    newSummary   - New summary.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_Returns}
   *
   * @since 0.15.0
   */
  private static buildFixedComment(commentValue: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_CommentValue, summaryIndex: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_SummaryIndex, oldSummary: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_OldSummary, newSummary: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_NewSummary): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_Returns {
    const lines: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_Lines = commentValue.split('\n');
    const line: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_Line = lines[summaryIndex];

    if (line === undefined) {
      return commentValue;
    }

    const replacedLine: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_ReplacedLine = line.replace(oldSummary, newSummary);

    Reflect.set(lines, summaryIndex, replacedLine);

    return lines.join('\n');
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Extract Describe String.
   *
   * Detects describe() and test() call expressions in ExpressionStatement
   * nodes and returns the first string argument used as the test suite label.
   *
   * @private
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractDescribeString_Node} node - Node.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractDescribeString_Returns}
   *
   * @since 0.15.0
   */
  private static extractDescribeString(node: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractDescribeString_Node): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractDescribeString_Returns {
    if (node.expression.type !== 'CallExpression') {
      return undefined;
    }

    let isDescribe: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractDescribeString_IsDescribe = false;

    if (node.expression.callee.type === 'Identifier') {
      if (
        node.expression.callee.name === 'describe'
        || node.expression.callee.name === 'test'
      ) {
        isDescribe = true;
      }
    }

    if (
      node.expression.callee.type === 'MemberExpression'
      && node.expression.callee.object.type === 'Identifier'
    ) {
      if (
        node.expression.callee.object.name === 'describe'
        || node.expression.callee.object.name === 'test'
      ) {
        isDescribe = true;
      }
    }

    if (isDescribe === false) {
      return undefined;
    }

    if (node.expression.arguments.length === 0) {
      return undefined;
    }

    const firstArg: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractDescribeString_FirstArg = node.expression.arguments[0];

    if (
      firstArg === undefined
      || firstArg.type !== 'Literal'
      || typeof firstArg.value !== 'string'
    ) {
      return undefined;
    }

    return firstArg.value;
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Derive Describe Suffix.
   *
   * Converts a describe/test label or variable name into a pretty hierarchy
   * suffix. Handles plain strings, dot notation, UPPER_SNAKE_CASE, and camelCase.
   *
   * @private
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_DescribeString} describeString - Describe string.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_PathParts}      pathParts      - Path parts.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_Returns}
   *
   * @since 0.15.0
   */
  private static deriveDescribeSuffix(describeString: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_DescribeString, pathParts: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_PathParts): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_Returns {
    // Plain string with spaces - title case each word with known name lookup.
    if (describeString.includes(' ') === true) {
      const words: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_Words = describeString.split(' ');
      const prettyWords: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_PrettyWords = [];

      for (const word of words) {
        const loweredWord: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_LoweredWord = word.toLowerCase();
        const knownName: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_KnownName = Runner.#mergedNames.get(loweredWord);

        if (knownName !== undefined) {
          prettyWords.push(knownName);
          continue;
        }

        const hyphenatedWord: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_HyphenatedWord = loweredWord.replaceAll('.', '-');
        const hyphenatedName: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_HyphenatedName = Runner.#mergedNames.get(hyphenatedWord);

        if (hyphenatedName !== undefined) {
          prettyWords.push(hyphenatedName);
        } else {
          prettyWords.push(word.charAt(0).toUpperCase() + word.slice(1));
        }
      }

      return prettyWords.join(' ');
    }

    // Dot notation: 'ClassName.methodName' - take after last dot.
    if (describeString.includes('.') === true) {
      const dotIndex: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_DotIndex = describeString.lastIndexOf('.');
      const methodPart: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_MethodPart = describeString.slice(dotIndex + 1);

      return Runner.prettyMethodName(methodPart);
    }

    // UPPER_SNAKE_CASE - split on '_', title case, dedup against path.
    if (
      describeString === describeString.toUpperCase()
      && describeString.includes('_') === true
    ) {
      const snakeWords: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_SnakeWords = describeString.split('_');
      const snakePrettyWords: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_SnakePrettyWords = [];

      for (const word of snakeWords) {
        const snakeLoweredWord: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_SnakeLoweredWord = word.toLowerCase();
        const snakeKnownName: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_SnakeKnownName = Runner.#mergedNames.get(snakeLoweredWord);

        if (snakeKnownName !== undefined) {
          snakePrettyWords.push(snakeKnownName);
        } else {
          snakePrettyWords.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        }
      }

      return Runner.dedupAgainstPath(snakePrettyWords, pathParts);
    }

    // camelCase/PascalCase - prettify and dedup against path.
    const prettyName: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_PrettyName = Runner.prettyMethodName(describeString);
    const camelWords: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_CamelWords = prettyName.split(' ');

    return Runner.dedupAgainstPath(camelWords, pathParts);
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Dedup Against Path.
   *
   * Strips leading words from a suffix when they overlap with the
   * trailing segments of the path hierarchy, preventing redundant repetition in the summary.
   *
   * @private
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_Words}     words     - Words.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_PathParts} pathParts - Path parts.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_Returns}
   *
   * @since 0.15.0
   */
  private static dedupAgainstPath(words: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_Words, pathParts: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_PathParts): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_Returns {
    let prefixLength: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_PrefixLength = 0;

    for (let length = Math.min(words.length, pathParts.length); length > 0; length -= 1) {
      let matches: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_Matches = true;

      for (let i = 0; i < length; i += 1) {
        const suffixStart: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_SuffixStart = pathParts.length - length + i;
        const wordAtIndex: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_WordAtIndex = words[i];
        const partAtSuffix: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_PartAtSuffix = pathParts[suffixStart];

        if (
          wordAtIndex === undefined
          || partAtSuffix === undefined
          || wordAtIndex.toLowerCase() !== partAtSuffix.toLowerCase()
        ) {
          matches = false;

          break;
        }
      }

      if (matches === true) {
        prefixLength = length;

        break;
      }
    }

    const remaining: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_Remaining = words.slice(prefixLength);

    if (remaining.length === 0) {
      return undefined;
    }

    return remaining.join(' ');
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Known Names.
   *
   * Merges abbreviation and keyword maps from libItem so segments
   * like "cli" render as "CLI" and "eslint" renders as "ESLint" in hierarchy strings.
   *
   * @private
   *
   * @since 0.15.0
   */
  static readonly #knownNames: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_KnownNames = new Map([
    ...Object.entries(libItemPrettyNamesAbbreviation),
    ...Object.entries(libItemPrettyNamesKeyword),
  ]);

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Merged Names.
   *
   * Holds the combined built-in and user-provided name mappings,
   * rebuilt on each create() call so user entries take precedence over built-ins.
   *
   * @private
   *
   * @since 0.15.0
   */
  static #mergedNames: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_KnownNames = Runner.#knownNames;

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Pretty Segment.
   *
   * Converts a single path segment like "cli" or "package-json"
   * into title-cased display text, using knownNames for abbreviations and brands.
   *
   * @private
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettySegment_Segment} segment - Segment.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettySegment_Returns}
   *
   * @since 0.15.0
   */
  private static prettySegment(segment: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettySegment_Segment): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettySegment_Returns {
    const knownName: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettySegment_KnownName = Runner.#mergedNames.get(segment);

    if (knownName !== undefined) {
      return knownName;
    }

    // PascalCase filenames (e.g., MDXComponents) - split via camelCase logic.
    if (segment.includes('-') === false && segment.charAt(0) === segment.charAt(0).toUpperCase()) {
      return Runner.prettyMethodName(segment);
    }

    return segment.split('-').map((word) => {
      const wordName: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettySegment_WordName = Runner.#mergedNames.get(word);

      if (wordName !== undefined) {
        return wordName;
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Pretty Method Name.
   *
   * Splits a camelCase or PascalCase identifier into space-separated
   * title-cased words, merging adjacent pairs that match a known brand or abbreviation.
   *
   * @private
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Name} name - Name.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Returns}
   *
   * @since 0.15.0
   */
  private static prettyMethodName(name: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Name): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Returns {
    /**
     * Split camelCase into words, keeping consecutive uppercase together.
     *
     * "checkJSXText" -> ["check", "JSX", "Text"].
     * "fetchData" -> ["fetch", "Data"].
     */
    const words: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Words = name.match(new RegExp(LIB_REGEX_PATTERN_CAMEL_CASE_WORDS.source, 'g'));

    if (words === null) {
      return name;
    }

    const result: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Result = [];
    let index: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Index = 0;

    while (index < words.length) {
      const current: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Current = words[index] as Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Current;

      if (index + 1 < words.length) {
        const next: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Next = words[index + 1] as Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Next;
        const pair: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Pair = `${current.toLowerCase()}-${next.toLowerCase()}`;
        const knownPair: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_KnownPair = Runner.#mergedNames.get(pair);

        if (knownPair !== undefined) {
          result.push(knownPair);
          index += 2;

          continue;
        }
      }
      const lowered: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Lowered = current.toLowerCase();
      const knownName: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_KnownName = Runner.#mergedNames.get(lowered);

      if (knownName !== undefined) {
        result.push(knownName);
      } else {
        result.push(current.charAt(0).toUpperCase() + current.slice(1).toLowerCase());
      }

      index += 1;
    }

    return result.join(' ');
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Derive Path Parts.
   *
   * Produces the normalized segment list shared by deriveHierarchy and the invalid
   * prefix diagnostic. Returns an empty array when the filename lacks an anchor
   * directory so callers can handle the missing-anchor case independently.
   *
   * @private
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_Filename} filename - Filename.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_Options}  options  - Options.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_Returns}
   *
   * @since 0.17.1
   */
  private static derivePathParts(filename: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_Filename, options: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_Options): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_Returns {
    let srcIndex: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_SrcIndex = -1;
    let anchorIndex: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_AnchorIndex = -1;

    for (const dir of options['anchorDirectories']) {
      const anchorToken: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_AnchorToken = `/${dir}/`;

      anchorIndex = filename.lastIndexOf(anchorToken);

      if (anchorIndex !== -1) {
        srcIndex = anchorIndex + anchorToken.length;

        break;
      }
    }

    if (srcIndex === -1) {
      return [];
    }

    const relativePath: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_RelativePath = filename.slice(srcIndex);
    const rawSegments: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_RawSegments = relativePath.split('/');
    const lastSegmentIndex: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_LastSegmentIndex = rawSegments.length - 1;

    return rawSegments
      .map((part, index) => {
        if (index === lastSegmentIndex) {
          return part.replace(LIB_REGEX_PATTERN_EXTENSION, '').replace(LIB_REGEX_PATTERN_EXTENSION, '').replace(LIB_REGEX_PATTERN_EXTENSION, '');
        }

        return part;
      })
      .filter((part) => part !== 'index' && options['stripDirectories'].includes(part) === false)
      .map((part) => normalizeRouteSegment(part))
      .filter((part) => part !== '');
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Derive Invalid Prefix Diagnostic.
   *
   * Inspects the first normalized path segment and returns the offending segment plus the
   * resulting prefix when the first character would be a digit. Null otherwise so the
   * caller can proceed with normal hierarchy enforcement.
   *
   * @private
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_Filename} filename - Filename.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_Options}  options  - Options.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_Returns}
   *
   * @since 0.17.1
   */
  private static deriveInvalidPrefixDiagnostic(filename: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_Filename, options: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_Options): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_Returns {
    const parts: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_Parts = Runner.derivePathParts(filename, options);

    if (parts.length === 0) {
      return null;
    }

    const firstSegment: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_FirstSegment = parts[0] ?? '';

    if (new RegExp('^[0-9]').test(firstSegment) === false) {
      return null;
    }

    const prefix: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_Prefix = parts.map((part) => {
      return part.split('-').map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join('');
    }).join('');

    return {
      segment: firstSegment,
      prefix,
    };
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Derive Hierarchy.
   *
   * Builds the full expected summary string from the file path relative
   * to an anchor directory and any extra segments like method or parent function names.
   *
   * @private
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Filename} filename - Filename.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Segments} segments - Segments.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Options}  options  - Options.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Returns}
   *
   * @since 0.15.0
   */
  private static deriveHierarchy(filename: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Filename, segments: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Segments, options: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Options): Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Returns {
    const parts: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Parts = Runner.derivePathParts(filename, options);

    // No anchor directory found in path. Use the filename stem as the sole hierarchy base.
    if (parts.length === 0) {
      const lastSlashIndex: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_LastSlashIndex = filename.lastIndexOf('/');
      const safeExtensionPattern: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_SafeExtensionPattern = new RegExp('\\.[a-zA-Z0-9]+$');
      const filenameStem: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_FilenameStem = filename.slice(lastSlashIndex + 1).replace(safeExtensionPattern, '').replace(safeExtensionPattern, '').replace(safeExtensionPattern, '');
      const normalizedStem: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_NormalizedStem = normalizeRouteSegment(filenameStem);

      const stemPrettySegments: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_StemPrettySegments = segments.map((segment) => {
        return Runner.prettyMethodName(segment);
      });

      const stemPrettyParts: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_StemPrettyParts = [Runner.prettySegment(normalizedStem)];
      const stemAllParts: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_StemAllParts = [
        ...stemPrettyParts,
        ...stemPrettySegments,
      ];

      return `${stemAllParts.join(' - ')}.`;
    }

    const prettySegments: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_PrettySegments = segments.map((segment) => {
      return Runner.prettyMethodName(segment);
    });

    // All segments use ' - ' separator.
    const prettyParts: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_PrettyParts = parts.map((part) => {
      return Runner.prettySegment(part);
    });

    const allParts: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_AllParts = [
      ...prettyParts,
      ...prettySegments,
    ];

    return `${allParts.join(' - ')}.`;
  }
}
