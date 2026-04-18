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
import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentCommentValue,
  RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentLine,
  RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentLines,
  RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentNewSummary,
  RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentOldSummary,
  RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentReturns,
  RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentSummaryIndex,
  RulesEslintJsdocRequireJsdocHierarchyCheckClassComments,
  RulesEslintJsdocRequireJsdocHierarchyCheckClassContext,
  RulesEslintJsdocRequireJsdocHierarchyCheckClassExpected,
  RulesEslintJsdocRequireJsdocHierarchyCheckClassFixedValue,
  RulesEslintJsdocRequireJsdocHierarchyCheckClassJsdocComment,
  RulesEslintJsdocRequireJsdocHierarchyCheckClassNode,
  RulesEslintJsdocRequireJsdocHierarchyCheckClassReturns,
  RulesEslintJsdocRequireJsdocHierarchyCheckClassSummaryInfo,
  RulesEslintJsdocRequireJsdocHierarchyCheckMethodComments,
  RulesEslintJsdocRequireJsdocHierarchyCheckMethodContext,
  RulesEslintJsdocRequireJsdocHierarchyCheckMethodExpected,
  RulesEslintJsdocRequireJsdocHierarchyCheckMethodFixedValue,
  RulesEslintJsdocRequireJsdocHierarchyCheckMethodJsdocComment,
  RulesEslintJsdocRequireJsdocHierarchyCheckMethodMethodName,
  RulesEslintJsdocRequireJsdocHierarchyCheckMethodNode,
  RulesEslintJsdocRequireJsdocHierarchyCheckMethodReturns,
  RulesEslintJsdocRequireJsdocHierarchyCheckMethodSummaryInfo,
  RulesEslintJsdocRequireJsdocHierarchyCheckNodeComments,
  RulesEslintJsdocRequireJsdocHierarchyCheckNodeContext,
  RulesEslintJsdocRequireJsdocHierarchyCheckNodeDescribeString,
  RulesEslintJsdocRequireJsdocHierarchyCheckNodeDescribeSuffix,
  RulesEslintJsdocRequireJsdocHierarchyCheckNodeExpected,
  RulesEslintJsdocRequireJsdocHierarchyCheckNodeFixedValue,
  RulesEslintJsdocRequireJsdocHierarchyCheckNodeJsdocComment,
  RulesEslintJsdocRequireJsdocHierarchyCheckNodeName,
  RulesEslintJsdocRequireJsdocHierarchyCheckNodeNode,
  RulesEslintJsdocRequireJsdocHierarchyCheckNodeParent,
  RulesEslintJsdocRequireJsdocHierarchyCheckNodePathParts,
  RulesEslintJsdocRequireJsdocHierarchyCheckNodeReturns,
  RulesEslintJsdocRequireJsdocHierarchyCheckNodeSuffix,
  RulesEslintJsdocRequireJsdocHierarchyCheckNodeSummaryInfo,
  RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathMatches,
  RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathPartAtSuffix,
  RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathPathParts,
  RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathPrefixLength,
  RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathRemaining,
  RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathReturns,
  RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathSuffixStart,
  RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathWordAtIndex,
  RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathWords,
  RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixDescribeString,
  RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixDotIndex,
  RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixKnownName,
  RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixLoweredWord,
  RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixMethodPart,
  RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixPathParts,
  RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixPrettyName,
  RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixPrettyWords,
  RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixReturns,
  RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixWords,
  RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyAllParts,
  RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyAnchorIndex,
  RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyAnchorToken,
  RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyFilename,
  RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyFilenameStem,
  RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyLastSlashIndex,
  RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyOptions,
  RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyParts,
  RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyPrettyParts,
  RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyPrettySegments,
  RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyRelativePath,
  RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyReturns,
  RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchySegments,
  RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchySrcIndex,
  RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyStripped,
  RulesEslintJsdocRequireJsdocHierarchyExtractDescribeStringFirstArg,
  RulesEslintJsdocRequireJsdocHierarchyExtractDescribeStringIsDescribe,
  RulesEslintJsdocRequireJsdocHierarchyExtractDescribeStringNode,
  RulesEslintJsdocRequireJsdocHierarchyExtractDescribeStringReturns,
  RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoCommentValue,
  RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoLine,
  RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoLines,
  RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoReturns,
  RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoTrimmed,
  RulesEslintJsdocRequireJsdocHierarchyKnownNames,
  RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameIndex,
  RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameKnownName,
  RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameKnownPair,
  RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameLowered,
  RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameName,
  RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameNext,
  RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNamePair,
  RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameResult,
  RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameReturns,
  RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameWords,
  RulesEslintJsdocRequireJsdocHierarchyPrettySegmentKnownName,
  RulesEslintJsdocRequireJsdocHierarchyPrettySegmentReturns,
  RulesEslintJsdocRequireJsdocHierarchyPrettySegmentSegment,
  RulesEslintJsdocRequireJsdocHierarchyPrettySegmentWordName,
  RulesEslintJsdocRequireJsdocHierarchyRuleDefaultOptionsAnchorDirectories,
  RulesEslintJsdocRequireJsdocHierarchyRuleDefaultOptionsIgnoreFiles,
  RulesEslintJsdocRequireJsdocHierarchyRuleDefaultOptionsKnownNames,
  RulesEslintJsdocRequireJsdocHierarchyRuleDefaultOptionsStripDirectories,
  RulesEslintJsdocRequireJsdocHierarchyRuleOptions,
  RulesEslintJsdocRequireJsdocHierarchyRuleOptionsKnownNames,
  RulesEslintJsdocRequireJsdocHierarchyRuleUserEntries,
} from '../../../types/rules/eslint/jsdoc/require-jsdoc-hierarchy.d.ts';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy.
 *
 * Enforces that every JSDoc summary line follows a
 * dash-separated hierarchy chain derived from the file path and declaration name.
 *
 * @since 0.15.0
 */
export class RulesEslintJsdocRequireJsdocHierarchy {
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
      anchorDirectories: ['src'] as RulesEslintJsdocRequireJsdocHierarchyRuleDefaultOptionsAnchorDirectories,
      ignoreFiles: [] as RulesEslintJsdocRequireJsdocHierarchyRuleDefaultOptionsIgnoreFiles,
      knownNames: {} as RulesEslintJsdocRequireJsdocHierarchyRuleDefaultOptionsKnownNames,
      stripDirectories: ['types'] as RulesEslintJsdocRequireJsdocHierarchyRuleDefaultOptionsStripDirectories,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintJsdocRequireJsdocHierarchyRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      // Merge built-in names with user-provided knownNames.
      const userKnownNames: RulesEslintJsdocRequireJsdocHierarchyRuleOptionsKnownNames = options['knownNames'];
      const userEntries: RulesEslintJsdocRequireJsdocHierarchyRuleUserEntries = Object.entries(userKnownNames);

      if (userEntries.length > 0) {
        RulesEslintJsdocRequireJsdocHierarchy.#mergedNames = new Map([
          ...RulesEslintJsdocRequireJsdocHierarchy.#knownNames,
          ...userEntries,
        ]);
      } else {
        RulesEslintJsdocRequireJsdocHierarchy.#mergedNames = RulesEslintJsdocRequireJsdocHierarchy.#knownNames;
      }

      return {
        ClassDeclaration(node) {
          RulesEslintJsdocRequireJsdocHierarchy.checkClass(context, node, options);

          return;
        },
        ExportNamedDeclaration(node) {
          RulesEslintJsdocRequireJsdocHierarchy.checkNode(context, node, options);

          return;
        },
        ExpressionStatement(node) {
          RulesEslintJsdocRequireJsdocHierarchy.checkNode(context, node, options);

          return;
        },
        FunctionDeclaration(node) {
          RulesEslintJsdocRequireJsdocHierarchy.checkNode(context, node, options);

          return;
        },
        MethodDefinition(node) {
          RulesEslintJsdocRequireJsdocHierarchy.checkMethod(context, node, options);

          return;
        },
        VariableDeclaration(node) {
          RulesEslintJsdocRequireJsdocHierarchy.checkNode(context, node, options);

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
   * @param {RulesEslintJsdocRequireJsdocHierarchyCheckClassContext} context - Context.
   * @param {RulesEslintJsdocRequireJsdocHierarchyCheckClassNode}    node    - Node.
   * @param {RulesEslintJsdocRequireJsdocHierarchyRuleOptions}       options - Options.
   *
   * @returns {RulesEslintJsdocRequireJsdocHierarchyCheckClassReturns}
   *
   * @since 0.15.0
   */
  private static checkClass(context: RulesEslintJsdocRequireJsdocHierarchyCheckClassContext, node: RulesEslintJsdocRequireJsdocHierarchyCheckClassNode, options: RulesEslintJsdocRequireJsdocHierarchyRuleOptions): RulesEslintJsdocRequireJsdocHierarchyCheckClassReturns {
    const comments: RulesEslintJsdocRequireJsdocHierarchyCheckClassComments = context.sourceCode.getCommentsBefore(node);
    let jsdocComment: RulesEslintJsdocRequireJsdocHierarchyCheckClassJsdocComment = undefined;

    for (const comment of comments) {
      if (comment.type === 'Block' && comment.value.startsWith('*') === true) {
        jsdocComment = comment;
      }
    }

    if (jsdocComment === undefined) {
      return;
    }

    const expected: RulesEslintJsdocRequireJsdocHierarchyCheckClassExpected = RulesEslintJsdocRequireJsdocHierarchy.deriveHierarchy(context.filename, [], options);
    const summaryInfo: RulesEslintJsdocRequireJsdocHierarchyCheckClassSummaryInfo = RulesEslintJsdocRequireJsdocHierarchy.findSummaryInfo(jsdocComment.value);

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
      const fixedValue: RulesEslintJsdocRequireJsdocHierarchyCheckClassFixedValue = RulesEslintJsdocRequireJsdocHierarchy.buildFixedComment(jsdocComment.value, summaryInfo['index'], summaryInfo['text'], expected);

      context.report({
        node: jsdocComment,
        messageId: 'hierarchyMismatch',
        data: {
          expected,
        },
        fix(fixer) {
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
   * @param {RulesEslintJsdocRequireJsdocHierarchyCheckNodeContext} context - Context.
   * @param {RulesEslintJsdocRequireJsdocHierarchyCheckNodeNode}    node    - Node.
   * @param {RulesEslintJsdocRequireJsdocHierarchyRuleOptions}      options - Options.
   *
   * @returns {RulesEslintJsdocRequireJsdocHierarchyCheckNodeReturns}
   *
   * @since 0.15.0
   */
  private static checkNode(context: RulesEslintJsdocRequireJsdocHierarchyCheckNodeContext, node: RulesEslintJsdocRequireJsdocHierarchyCheckNodeNode, options: RulesEslintJsdocRequireJsdocHierarchyRuleOptions): RulesEslintJsdocRequireJsdocHierarchyCheckNodeReturns {
    const comments: RulesEslintJsdocRequireJsdocHierarchyCheckNodeComments = context.sourceCode.getCommentsBefore(node);
    let jsdocComment: RulesEslintJsdocRequireJsdocHierarchyCheckNodeJsdocComment = undefined;

    for (const comment of comments) {
      if (comment.type === 'Block' && comment.value.startsWith('*') === true) {
        jsdocComment = comment;
      }
    }

    if (jsdocComment === undefined) {
      return;
    }

    // Skip if inside a class body. Collect parent function names for nested declarations.
    const parentNames: RulesEslintJsdocRequireJsdocHierarchyCheckNodePathParts = [];
    let parent: RulesEslintJsdocRequireJsdocHierarchyCheckNodeParent = node.parent;

    while (parent !== undefined && parent !== null) {
      if (parent.type === 'ClassBody') {
        return;
      }

      if (parent.type === 'FunctionDeclaration' && parent.id !== null) {
        parentNames.unshift(parent.id.name);
      }

      parent = parent.parent;
    }

    const expected: RulesEslintJsdocRequireJsdocHierarchyCheckNodeExpected = RulesEslintJsdocRequireJsdocHierarchy.deriveHierarchy(context.filename, parentNames, options);
    const summaryInfo: RulesEslintJsdocRequireJsdocHierarchyCheckNodeSummaryInfo = RulesEslintJsdocRequireJsdocHierarchy.findSummaryInfo(jsdocComment.value);

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
    let suffix: RulesEslintJsdocRequireJsdocHierarchyCheckNodeSuffix = undefined;

    if (node.type === 'ExpressionStatement') {
      const describeString: RulesEslintJsdocRequireJsdocHierarchyCheckNodeDescribeString = RulesEslintJsdocRequireJsdocHierarchy.extractDescribeString(node);

      if (describeString !== undefined) {
        const pathParts: RulesEslintJsdocRequireJsdocHierarchyCheckNodePathParts = expected.slice(0, -1).split(' - ');
        const describeSuffix: RulesEslintJsdocRequireJsdocHierarchyCheckNodeDescribeSuffix = RulesEslintJsdocRequireJsdocHierarchy.deriveDescribeSuffix(describeString, pathParts);

        suffix = describeSuffix;
      }
    }

    // Fall back to node name extraction with dedup for variables.
    if (suffix === undefined) {
      const nodeName: RulesEslintJsdocRequireJsdocHierarchyCheckNodeName = RulesEslintJsdocRequireJsdocHierarchy.extractNodeName(node);

      if (nodeName !== undefined) {
        const pathParts: RulesEslintJsdocRequireJsdocHierarchyCheckNodePathParts = expected.slice(0, -1).split(' - ');
        const nameSuffix: RulesEslintJsdocRequireJsdocHierarchyCheckNodeDescribeSuffix = RulesEslintJsdocRequireJsdocHierarchy.deriveDescribeSuffix(nodeName, pathParts);

        suffix = nameSuffix;
      }
    }

    const expectedWithSuffix: RulesEslintJsdocRequireJsdocHierarchyCheckNodeExpected = (suffix !== undefined) ? `${expected.slice(0, -1)} - ${suffix}.` : expected;

    // For type alias declarations, allow sub-section hierarchies (e.g. "Logger - Debug." under "Logger.").
    const expectedPrefix: RulesEslintJsdocRequireJsdocHierarchyCheckNodeExpected = expected.slice(0, -1);

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
      const fixedValue: RulesEslintJsdocRequireJsdocHierarchyCheckNodeFixedValue = RulesEslintJsdocRequireJsdocHierarchy.buildFixedComment(jsdocComment.value, summaryInfo['index'], summaryInfo['text'], expectedWithSuffix);

      context.report({
        node: jsdocComment,
        messageId: 'hierarchyMismatch',
        data: {
          expected: expectedWithSuffix,
        },
        fix(fixer) {
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
   * @param {RulesEslintJsdocRequireJsdocHierarchyCheckNodeNode} node - Node.
   *
   * @returns {RulesEslintJsdocRequireJsdocHierarchyCheckNodeName}
   *
   * @since 0.15.0
   */
  private static extractNodeName(node: RulesEslintJsdocRequireJsdocHierarchyCheckNodeNode): RulesEslintJsdocRequireJsdocHierarchyCheckNodeName {
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
      return RulesEslintJsdocRequireJsdocHierarchy.extractNodeName(node.declaration);
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
   * @param {RulesEslintJsdocRequireJsdocHierarchyCheckMethodContext} context - Context.
   * @param {RulesEslintJsdocRequireJsdocHierarchyCheckMethodNode}    node    - Node.
   * @param {RulesEslintJsdocRequireJsdocHierarchyRuleOptions}        options - Options.
   *
   * @returns {RulesEslintJsdocRequireJsdocHierarchyCheckMethodReturns}
   *
   * @since 0.15.0
   */
  private static checkMethod(context: RulesEslintJsdocRequireJsdocHierarchyCheckMethodContext, node: RulesEslintJsdocRequireJsdocHierarchyCheckMethodNode, options: RulesEslintJsdocRequireJsdocHierarchyRuleOptions): RulesEslintJsdocRequireJsdocHierarchyCheckMethodReturns {
    if (node.key.type !== 'Identifier' && node.kind !== 'constructor') {
      return;
    }

    const comments: RulesEslintJsdocRequireJsdocHierarchyCheckMethodComments = context.sourceCode.getCommentsBefore(node);
    let jsdocComment: RulesEslintJsdocRequireJsdocHierarchyCheckMethodJsdocComment = undefined;

    for (const comment of comments) {
      if (comment.type === 'Block' && comment.value.startsWith('*') === true) {
        jsdocComment = comment;
      }
    }

    if (jsdocComment === undefined) {
      return;
    }

    const methodName: RulesEslintJsdocRequireJsdocHierarchyCheckMethodMethodName = (node.kind === 'constructor' || node.key.type !== 'Identifier') ? node.kind : node.key.name;
    const expected: RulesEslintJsdocRequireJsdocHierarchyCheckMethodExpected = RulesEslintJsdocRequireJsdocHierarchy.deriveHierarchy(context.filename, [methodName], options);
    const summaryInfo: RulesEslintJsdocRequireJsdocHierarchyCheckMethodSummaryInfo = RulesEslintJsdocRequireJsdocHierarchy.findSummaryInfo(jsdocComment.value);

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
      const fixedValue: RulesEslintJsdocRequireJsdocHierarchyCheckMethodFixedValue = RulesEslintJsdocRequireJsdocHierarchy.buildFixedComment(jsdocComment.value, summaryInfo['index'], summaryInfo['text'], expected);

      context.report({
        node: jsdocComment,
        messageId: 'hierarchyMismatch',
        data: {
          expected,
        },
        fix(fixer) {
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
   * @param {RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoCommentValue} commentValue - Comment value.
   *
   * @returns {RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoReturns}
   *
   * @since 0.15.0
   */
  private static findSummaryInfo(commentValue: RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoCommentValue): RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoReturns {
    const lines: RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoLines = commentValue.split('\n');

    for (let i = 0; i < lines.length; i += 1) {
      const line: RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoLine = lines[i];

      if (line === undefined) {
        continue;
      }

      const trimmed: RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoTrimmed = line.replace(LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX, '').trim();

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
   * @param {RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentCommentValue}  commentValue - Comment value.
   * @param {RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentSummaryIndex}  summaryIndex - Summary index.
   * @param {RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentOldSummary}    oldSummary   - Old summary.
   * @param {RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentNewSummary}    newSummary   - New summary.
   *
   * @returns {RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentReturns}
   *
   * @since 0.15.0
   */
  private static buildFixedComment(commentValue: RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentCommentValue, summaryIndex: RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentSummaryIndex, oldSummary: RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentOldSummary, newSummary: RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentNewSummary): RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentReturns {
    const lines: RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentLines = commentValue.split('\n');
    const line: RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentLine = lines[summaryIndex];

    if (line === undefined) {
      return commentValue;
    }

    const replacedLine: RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentLine = line.replace(oldSummary, newSummary);

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
   * @param {RulesEslintJsdocRequireJsdocHierarchyExtractDescribeStringNode} node - Node.
   *
   * @returns {RulesEslintJsdocRequireJsdocHierarchyExtractDescribeStringReturns}
   *
   * @since 0.15.0
   */
  private static extractDescribeString(node: RulesEslintJsdocRequireJsdocHierarchyExtractDescribeStringNode): RulesEslintJsdocRequireJsdocHierarchyExtractDescribeStringReturns {
    if (node.expression.type !== 'CallExpression') {
      return undefined;
    }

    let isDescribe: RulesEslintJsdocRequireJsdocHierarchyExtractDescribeStringIsDescribe = false;

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

    const firstArg: RulesEslintJsdocRequireJsdocHierarchyExtractDescribeStringFirstArg = node.expression.arguments[0];

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
   * @param {RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixDescribeString} describeString - Describe string.
   * @param {RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixPathParts}      pathParts      - Path parts.
   *
   * @returns {RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixReturns}
   *
   * @since 0.15.0
   */
  private static deriveDescribeSuffix(describeString: RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixDescribeString, pathParts: RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixPathParts): RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixReturns {
    // Plain string with spaces — title case each word with known name lookup.
    if (describeString.includes(' ') === true) {
      const words: RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixWords = describeString.split(' ');
      const prettyWords: RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixPrettyWords = [];

      for (const word of words) {
        const loweredWord: RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixLoweredWord = word.toLowerCase();
        const knownName: RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixKnownName = RulesEslintJsdocRequireJsdocHierarchy.#mergedNames.get(loweredWord);

        if (knownName !== undefined) {
          prettyWords.push(knownName);
          continue;
        }

        const hyphenatedWord: RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixLoweredWord = loweredWord.replaceAll('.', '-');
        const hyphenatedName: RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixKnownName = RulesEslintJsdocRequireJsdocHierarchy.#mergedNames.get(hyphenatedWord);

        if (hyphenatedName !== undefined) {
          prettyWords.push(hyphenatedName);
        } else {
          prettyWords.push(word.charAt(0).toUpperCase() + word.slice(1));
        }
      }

      return prettyWords.join(' ');
    }

    // Dot notation: 'ClassName.methodName' — take after last dot.
    if (describeString.includes('.') === true) {
      const dotIndex: RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixDotIndex = describeString.lastIndexOf('.');
      const methodPart: RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixMethodPart = describeString.slice(dotIndex + 1);

      return RulesEslintJsdocRequireJsdocHierarchy.prettyMethodName(methodPart);
    }

    // UPPER_SNAKE_CASE — split on '_', title case, dedup against path.
    if (
      describeString === describeString.toUpperCase()
      && describeString.includes('_') === true
    ) {
      const words: RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixWords = describeString.split('_');
      const prettyWords: RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixPrettyWords = [];

      for (const word of words) {
        const loweredWord: RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixLoweredWord = word.toLowerCase();
        const knownName: RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixKnownName = RulesEslintJsdocRequireJsdocHierarchy.#mergedNames.get(loweredWord);

        if (knownName !== undefined) {
          prettyWords.push(knownName);
        } else {
          prettyWords.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        }
      }

      return RulesEslintJsdocRequireJsdocHierarchy.dedupAgainstPath(prettyWords, pathParts);
    }

    // camelCase/PascalCase — prettify and dedup against path.
    const prettyName: RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixPrettyName = RulesEslintJsdocRequireJsdocHierarchy.prettyMethodName(describeString);
    const words: RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixWords = prettyName.split(' ');

    return RulesEslintJsdocRequireJsdocHierarchy.dedupAgainstPath(words, pathParts);
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Dedup Against Path.
   *
   * Strips leading words from a suffix when they overlap with the
   * trailing segments of the path hierarchy, preventing redundant repetition in the summary.
   *
   * @private
   *
   * @param {RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathWords}     words     - Words.
   * @param {RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathPathParts} pathParts - Path parts.
   *
   * @returns {RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathReturns}
   *
   * @since 0.15.0
   */
  private static dedupAgainstPath(words: RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathWords, pathParts: RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathPathParts): RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathReturns {
    let prefixLength: RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathPrefixLength = 0;

    for (let length = Math.min(words.length, pathParts.length); length > 0; length -= 1) {
      let matches: RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathMatches = true;

      for (let i = 0; i < length; i += 1) {
        const suffixStart: RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathSuffixStart = pathParts.length - length + i;
        const wordAtIndex: RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathWordAtIndex = words[i];
        const partAtSuffix: RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathPartAtSuffix = pathParts[suffixStart];

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

    const remaining: RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathRemaining = words.slice(prefixLength);

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
  static readonly #knownNames: RulesEslintJsdocRequireJsdocHierarchyKnownNames = new Map([
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
  static #mergedNames: RulesEslintJsdocRequireJsdocHierarchyKnownNames = RulesEslintJsdocRequireJsdocHierarchy.#knownNames;

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Pretty Segment.
   *
   * Converts a single path segment like "cli" or "package-json"
   * into title-cased display text, using knownNames for abbreviations and brands.
   *
   * @private
   *
   * @param {RulesEslintJsdocRequireJsdocHierarchyPrettySegmentSegment} segment - Segment.
   *
   * @returns {RulesEslintJsdocRequireJsdocHierarchyPrettySegmentReturns}
   *
   * @since 0.15.0
   */
  private static prettySegment(segment: RulesEslintJsdocRequireJsdocHierarchyPrettySegmentSegment): RulesEslintJsdocRequireJsdocHierarchyPrettySegmentReturns {
    const knownName: RulesEslintJsdocRequireJsdocHierarchyPrettySegmentKnownName = RulesEslintJsdocRequireJsdocHierarchy.#mergedNames.get(segment);

    if (knownName !== undefined) {
      return knownName;
    }

    // PascalCase filenames (e.g., MDXComponents) — split via camelCase logic.
    if (segment.includes('-') === false && segment.charAt(0) === segment.charAt(0).toUpperCase()) {
      return RulesEslintJsdocRequireJsdocHierarchy.prettyMethodName(segment);
    }

    return segment.split('-').map((word) => {
      const wordName: RulesEslintJsdocRequireJsdocHierarchyPrettySegmentWordName = RulesEslintJsdocRequireJsdocHierarchy.#mergedNames.get(word);

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
   * @param {RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameName} name - Name.
   *
   * @returns {RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameReturns}
   *
   * @since 0.15.0
   */
  private static prettyMethodName(name: RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameName): RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameReturns {
    /**
     * Split camelCase into words, keeping consecutive uppercase together.
     *
     * "checkJSXText" → ["check", "JSX", "Text"].
     * "fetchData" → ["fetch", "Data"].
     */
    const words: RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameWords = name.match(new RegExp(LIB_REGEX_PATTERN_CAMEL_CASE_WORDS.source, 'g'));

    if (words === null) {
      return name;
    }

    const result: RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameResult = [];
    let index: RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameIndex = 0;

    while (index < words.length) {
      const current: RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameLowered = words[index] as RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameLowered;

      if (index + 1 < words.length) {
        const next: RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameNext = words[index + 1] as RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameNext;
        const pair: RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNamePair = `${current.toLowerCase()}-${next.toLowerCase()}`;
        const knownPair: RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameKnownPair = RulesEslintJsdocRequireJsdocHierarchy.#mergedNames.get(pair);

        if (knownPair !== undefined) {
          result.push(knownPair);
          index += 2;

          continue;
        }
      }
      const lowered: RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameLowered = current.toLowerCase();
      const knownName: RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameKnownName = RulesEslintJsdocRequireJsdocHierarchy.#mergedNames.get(lowered);

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
   * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Derive Hierarchy.
   *
   * Builds the full expected summary string from the file path relative
   * to an anchor directory and any extra segments like method or parent function names.
   *
   * @private
   *
   * @param {RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyFilename} filename - Filename.
   * @param {RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchySegments} segments - Segments.
   * @param {RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyOptions}  options  - Options.
   *
   * @returns {RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyReturns}
   *
   * @since 0.15.0
   */
  private static deriveHierarchy(filename: RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyFilename, segments: RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchySegments, options: RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyOptions): RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyReturns {
    let srcIndex: RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchySrcIndex = -1;
    let anchorIndex: RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyAnchorIndex = -1;

    for (const dir of options['anchorDirectories']) {
      const anchorToken: RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyAnchorToken = `/${dir}/`;

      anchorIndex = filename.lastIndexOf(anchorToken);

      if (anchorIndex !== -1) {
        srcIndex = anchorIndex + anchorToken.length;

        break;
      }
    }

    // No anchor directory found in path. Use the filename stem as the sole hierarchy base.
    if (srcIndex === -1) {
      const lastSlashIndex: RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyLastSlashIndex = filename.lastIndexOf('/');
      const filenameStem: RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyFilenameStem = filename.slice(lastSlashIndex + 1).replace(LIB_REGEX_PATTERN_EXTENSION, '').replace(LIB_REGEX_PATTERN_EXTENSION, '').replace(LIB_REGEX_PATTERN_EXTENSION, '');

      const prettySegments: RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyPrettySegments = segments.map((segment) => {
        return RulesEslintJsdocRequireJsdocHierarchy.prettyMethodName(segment);
      });

      const prettyParts: RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyPrettyParts = [RulesEslintJsdocRequireJsdocHierarchy.prettySegment(filenameStem)];
      const allParts: RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyAllParts = [
        ...prettyParts,
        ...prettySegments,
      ];

      return `${allParts.join(' - ')}.`;
    }

    const relativePath: RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyRelativePath = filename.slice(srcIndex);
    const stripped: RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyStripped = relativePath.replace(LIB_REGEX_PATTERN_EXTENSION, '').replace(LIB_REGEX_PATTERN_EXTENSION, '').replace(LIB_REGEX_PATTERN_EXTENSION, '');
    const parts: RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyParts = stripped.split('/').filter(
      (part) => part !== 'index' && options['stripDirectories'].includes(part) === false,
    );

    const prettySegments: RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyPrettySegments = segments.map((segment) => {
      return RulesEslintJsdocRequireJsdocHierarchy.prettyMethodName(segment);
    });

    // All segments use ' - ' separator.
    const prettyParts: RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyPrettyParts = parts.map((part) => {
      return RulesEslintJsdocRequireJsdocHierarchy.prettySegment(part);
    });

    const allParts: RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyAllParts = [
      ...prettyParts,
      ...prettySegments,
    ];

    return `${allParts.join(' - ')}.`;
  }
}
