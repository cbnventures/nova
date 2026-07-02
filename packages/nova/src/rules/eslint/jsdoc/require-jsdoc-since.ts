import { readFileSync } from 'fs';
import { dirname, join } from 'path';

import { ESLintUtils } from '@typescript-eslint/utils';

import {
  LIB_REGEX_PATTERN_JSDOC_DEPRECATED_TAG_CAPTURE,
  LIB_REGEX_PATTERN_JSDOC_DEPRECATED_TAG_LINE,
  LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX,
  LIB_REGEX_PATTERN_JSDOC_SINCE_TAG_CAPTURE,
  LIB_REGEX_PATTERN_SEMVER_LEADING,
  LIB_REGEX_PATTERN_UNRELEASED_LEADING,
} from '../../../lib/regex.js';
import { compareSemver, isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_CommentValue,
  Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_Line,
  Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_Lines,
  Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_Match,
  Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_TagPattern,
  Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Dir,
  Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Filename,
  Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_PackageJsonPath,
  Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Parent,
  Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Parsed,
  Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_RawText,
  Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Version,
  Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_VersionField,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Comments,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Context,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_DeprecatedMatch,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_DeprecatedValue,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_DeprecatedVersionBad,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_JsdocComment,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Node,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_PackageVersion,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_SinceMatch,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_SinceValue,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_SinceVersionBad,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_ClassDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_ClassDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_ExportNamedDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_ExportNamedDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_FunctionDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_FunctionDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_MethodDefinition_Node,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_MethodDefinition_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_Options,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_PropertyDefinition_Node,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_PropertyDefinition_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSEnumDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSEnumDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSInterfaceDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSInterfaceDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSTypeAliasDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSTypeAliasDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Jsdoc_RequireJsdocSince_VersionCache,
} from '../../../types/rules/eslint/jsdoc/require-jsdoc-since.d.ts';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Version Cache.
 *
 * Module-level cache from directory path to resolved package version string.
 * Populated lazily by resolvePackageVersion on first encounter of each directory.
 *
 * @since 0.20.0
 */
const versionCache: Rules_Eslint_Jsdoc_RequireJsdocSince_VersionCache = new Map();

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Resolve Package Version.
 *
 * Walks upward from the given filename's directory until it finds a package.json,
 * reads its version field, and caches the result keyed by the directory where it was
 * found. Returns undefined when no package.json with a version field can be found.
 *
 * @param {Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Filename} filename - Filename.
 *
 * @returns {Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Returns}
 *
 * @since 0.20.0
 */
function resolvePackageVersion(filename: Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Filename): Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Returns {
  let dir: Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Dir = dirname(filename);

  while (true) {
    if (versionCache.has(dir) === true) {
      return versionCache.get(dir);
    }

    const packageJsonPath: Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_PackageJsonPath = join(dir, 'package.json');

    try {
      const rawText: Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_RawText = readFileSync(packageJsonPath, 'utf-8');
      const parsed: Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Parsed = JSON.parse(rawText);
      const versionField: Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_VersionField = parsed['version'];
      const version: Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Version = (typeof versionField === 'string') ? versionField : '';

      if (version !== '') {
        versionCache.set(dir, version);

        return version;
      }
    } catch {
      /* empty */
    }

    const parent: Rules_Eslint_Jsdoc_RequireJsdocSince_ResolvePackageVersion_Parent = dirname(dir);

    if (parent === dir) {
      break;
    }

    dir = parent;
  }

  return undefined;
}

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Extract Tag Value.
 *
 * Scans each JSDoc comment line for a tag matching the given regex pattern and
 * returns the trimmed captured group. Returns undefined when the tag is absent.
 *
 * @param {Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_CommentValue} commentValue - Comment value.
 * @param {Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_TagPattern}   tagPattern   - Tag pattern.
 *
 * @returns {Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_Returns}
 *
 * @since 0.20.0
 */
function extractTagValue(commentValue: Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_CommentValue, tagPattern: Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_TagPattern): Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_Returns {
  const lines: Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_Lines = commentValue.split('\n');

  for (const rawLine of lines) {
    const line: Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_Line = rawLine.replace(LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX, '').trim();
    const match: Rules_Eslint_Jsdoc_RequireJsdocSince_ExtractTagValue_Match = line.match(tagPattern);

    if (match !== null && match[1] !== undefined) {
      return match[1].trim();
    }
  }

  return undefined;
}

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since.
 *
 * Ensures every JSDoc block contains a @since tag so consumers
 * can trace when each public API surface was introduced or last changed.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * Rules - ESLint - JSDoc - Require JSDoc Since - Rule.
   *
   * Registered under the name require-jsdoc-since and exported through the rules index as
   * RequireJsdocSince for preset consumption.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-jsdoc-since',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require @since tag in every JSDoc block.',
      },
      messages: {
        requireSinceTag: 'JSDoc block must include a @since tag.',
        invalidSinceVersion: 'The @since value must be "UNRELEASED" or a semver version <= the current package version.',
        invalidDeprecatedVersion: 'The @deprecated value must be "UNRELEASED" or a semver version <= the current package version.',
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
      ignoreFiles: [] as Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        ClassDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_ClassDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_ClassDeclaration_Returns {
          Runner.checkNode(context, node);

          return;
        },
        MethodDefinition(node: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_MethodDefinition_Node): Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_MethodDefinition_Returns {
          Runner.checkNode(context, node);

          return;
        },
        PropertyDefinition(node: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_PropertyDefinition_Node): Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_PropertyDefinition_Returns {
          Runner.checkNode(context, node);

          return;
        },
        FunctionDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_FunctionDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_FunctionDeclaration_Returns {
          Runner.checkNode(context, node);

          return;
        },
        TSTypeAliasDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSTypeAliasDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSTypeAliasDeclaration_Returns {
          Runner.checkNode(context, node);

          return;
        },
        TSInterfaceDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSInterfaceDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSInterfaceDeclaration_Returns {
          Runner.checkNode(context, node);

          return;
        },
        TSEnumDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSEnumDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSEnumDeclaration_Returns {
          Runner.checkNode(context, node);

          return;
        },
        ExportNamedDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_ExportNamedDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_ExportNamedDeclaration_Returns {
          // Re-export lists (export { foo }) carry no declaration and are not documented API; only inline exported declarations are checked.
          if (node.declaration === null) {
            return;
          }

          Runner.checkNode(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Since - Check Node.
   *
   * Retrieves the leading JSDoc block comment for the node and
   * verifies it contains the @since tag with an acceptable value.
   * Reports the comment node when the tag is missing or the value is invalid.
   *
   * @private
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Context} context - Context.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Returns}
   *
   * @since 0.15.0
   */
  private static checkNode(context: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Context, node: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Node): Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Returns {
    const comments: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Comments = context.sourceCode.getCommentsBefore(node);
    let jsdocComment: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_JsdocComment = undefined;

    for (const comment of comments) {
      if (comment.type === 'Block' && comment.value.startsWith('*') === true) {
        jsdocComment = comment;
      }
    }

    if (jsdocComment === undefined) {
      return;
    }

    if (jsdocComment.value.includes('@since') === false) {
      context.report({
        node: jsdocComment,
        messageId: 'requireSinceTag',
      });

      return;
    }

    // Resolve the package version for the file being linted.
    const packageVersion: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_PackageVersion = resolvePackageVersion(context.filename);

    // If no package version is found, or the package is unreleased (0.0.0), skip value validation.
    if (packageVersion === undefined || packageVersion === '0.0.0') {
      return;
    }

    // Validate the @since value.
    const sinceValue: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_SinceValue = extractTagValue(jsdocComment.value, LIB_REGEX_PATTERN_JSDOC_SINCE_TAG_CAPTURE);

    if (sinceValue === undefined || sinceValue === '') {
      context.report({
        node: jsdocComment,
        messageId: 'invalidSinceVersion',
      });

      return;
    }

    // Accept the UNRELEASED sentinel even when followed by trailing prose, mirroring the semver-with-prose affordance.
    if (LIB_REGEX_PATTERN_UNRELEASED_LEADING.test(sinceValue) === false) {
      const sinceMatch: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_SinceMatch = sinceValue.match(LIB_REGEX_PATTERN_SEMVER_LEADING);
      const sinceVersionBad: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_SinceVersionBad = (
        sinceMatch === null
        || sinceMatch[1] === undefined
        || compareSemver(sinceMatch[1], packageVersion) > 0
      );

      if (sinceVersionBad === true) {
        context.report({
          node: jsdocComment,
          messageId: 'invalidSinceVersion',
        });
      }
    }

    // Validate the @deprecated value when a real @deprecated tag line is present (prose mentions are ignored).
    if (LIB_REGEX_PATTERN_JSDOC_DEPRECATED_TAG_LINE.test(jsdocComment.value) === true) {
      const deprecatedValue: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_DeprecatedValue = extractTagValue(jsdocComment.value, LIB_REGEX_PATTERN_JSDOC_DEPRECATED_TAG_CAPTURE);

      if (deprecatedValue === undefined || deprecatedValue === '') {
        // A bare @deprecated (no value) is rejected, mirroring the bare @since branch above.
        context.report({
          node: jsdocComment,
          messageId: 'invalidDeprecatedVersion',
        });
      } else if (LIB_REGEX_PATTERN_UNRELEASED_LEADING.test(deprecatedValue) === false) {
        const deprecatedMatch: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_DeprecatedMatch = deprecatedValue.match(LIB_REGEX_PATTERN_SEMVER_LEADING);
        const deprecatedVersionBad: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_DeprecatedVersionBad = (
          deprecatedMatch === null
          || deprecatedMatch[1] === undefined
          || compareSemver(deprecatedMatch[1], packageVersion) > 0
        );

        if (deprecatedVersionBad === true) {
          context.report({
            node: jsdocComment,
            messageId: 'invalidDeprecatedVersion',
          });
        }
      }
    }

    return;
  }
}
