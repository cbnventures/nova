import { ESLintUtils } from '@typescript-eslint/utils';

import { LIB_REGEX_PATTERN_CAMEL_CASE_WORDS, LIB_REGEX_PATTERN_LEADING_DIGIT } from '../../../lib/regex.js';
import { isIgnoredFile, normalizeRouteSegment } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_CheckTypeAlias_Context,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_CheckTypeAlias_ExpectedPrefix,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_CheckTypeAlias_Node,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_CheckTypeAlias_Returns,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_CheckTypeAlias_TypeName,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Diagnostic,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_NormalizedFilename,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Options,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Program_Node,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Program_Returns,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_TSTypeAliasDeclaration_Node,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_TSTypeAliasDeclaration_Returns,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_Filename,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_OffendingSegment,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_Prefix,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_Returns,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_Segments,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_DerivePrefix_Filename,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_DerivePrefix_Returns,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_DerivePrefix_Segments,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_DerivePrefix_Words,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_NormalizedPathSegments_Filename,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_NormalizedPathSegments_NormalizedFilename,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_NormalizedPathSegments_RelativePath,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_NormalizedPathSegments_Returns,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_NormalizedPathSegments_TypesIndex,
  Rules_Eslint_Typescript_RequireTypeNaming_Runner_RuleDefaultOptionsIgnoreFiles,
} from '../../../types/rules/eslint/typescript/require-type-naming.d.ts';

/**
 * Rules - ESLint - TypeScript - Require Type Naming.
 *
 * Enforces that type alias names in .d.ts files start with a prefix derived from the file
 * path, keeping type names globally unique and traceable to origin.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * Rules - ESLint - TypeScript - Require Type Naming - Rule.
   *
   * Registered via the ESLint plugin index and activated in eslint.config.ts. Only applies
   * to .d.ts files and skips any paths listed in ignoreFiles.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-type-naming',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require type alias names in .d.ts files to start with the class name prefix derived from the file path.',
      },
      messages: {
        invalidIdentifierPrefix: 'Directory segment `{{ segment }}` produces an invalid TypeScript identifier prefix `{{ prefix }}`. Rename the directory to start with a letter.',
        typeNamingPrefix: 'Type alias \'{{ typeName }}\' must start with \'{{ expectedPrefix }}\'.',
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
      ignoreFiles: [] as Rules_Eslint_Typescript_RequireTypeNaming_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Options = defaultOptions[0];
      const normalizedFilename: Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_NormalizedFilename = context.filename.replaceAll('\\', '/');

      // Only apply to .d.ts files.
      if (normalizedFilename.endsWith('.d.ts') === false) {
        return {};
      }

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      const diagnostic: Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Diagnostic = Runner.deriveInvalidPrefixDiagnostic(context.filename);

      if (diagnostic !== null) {
        return {
          Program(node: Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Program_Node): Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_Program_Returns {
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

      return {
        TSTypeAliasDeclaration(node: Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_TSTypeAliasDeclaration_Node): Rules_Eslint_Typescript_RequireTypeNaming_Runner_Create_TSTypeAliasDeclaration_Returns {
          Runner.checkTypeAlias(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - TypeScript - Require Type Naming - Normalized Path Segments.
   *
   * Produces the normalized segment list shared by derivePrefix and the invalid
   * prefix diagnostic. Returns an empty list when the filename lacks the
   * expected `/types/` anchor so callers can skip enforcement.
   *
   * @private
   *
   * @param {Rules_Eslint_Typescript_RequireTypeNaming_Runner_NormalizedPathSegments_Filename} filename - Filename.
   *
   * @returns {Rules_Eslint_Typescript_RequireTypeNaming_Runner_NormalizedPathSegments_Returns}
   *
   * @since 0.17.0
   */
  private static normalizedPathSegments(filename: Rules_Eslint_Typescript_RequireTypeNaming_Runner_NormalizedPathSegments_Filename): Rules_Eslint_Typescript_RequireTypeNaming_Runner_NormalizedPathSegments_Returns {
    const normalizedFilename: Rules_Eslint_Typescript_RequireTypeNaming_Runner_NormalizedPathSegments_NormalizedFilename = filename.replaceAll('\\', '/');
    const typesIndex: Rules_Eslint_Typescript_RequireTypeNaming_Runner_NormalizedPathSegments_TypesIndex = normalizedFilename.indexOf('/types/');

    if (typesIndex < 0) {
      return [];
    }

    let relativePath: Rules_Eslint_Typescript_RequireTypeNaming_Runner_NormalizedPathSegments_RelativePath = normalizedFilename.slice(typesIndex + '/types/'.length);

    if (relativePath.endsWith('.test.d.ts') === true) {
      relativePath = relativePath.slice(0, relativePath.length - '.test.d.ts'.length);
    }

    if (relativePath.endsWith('.d.ts') === true) {
      relativePath = relativePath.slice(0, relativePath.length - '.d.ts'.length);
    }

    return relativePath
      .split('/')
      .filter((segment) => segment !== 'index')
      .map((segment) => normalizeRouteSegment(segment))
      .filter((segment) => segment !== '');
  }

  /**
   * Rules - ESLint - TypeScript - Require Type Naming - Derive Prefix.
   *
   * Converts the file path after the /types/ directory into an
   * underscore-separated PascalCase prefix string (e.g. `Cli_Utility_Changelog`).
   * Called by checkTypeAlias to compare against each type name.
   *
   * @private
   *
   * @param {Rules_Eslint_Typescript_RequireTypeNaming_Runner_DerivePrefix_Filename} filename - Filename.
   *
   * @returns {Rules_Eslint_Typescript_RequireTypeNaming_Runner_DerivePrefix_Returns}
   *
   * @since 0.15.0
   */
  private static derivePrefix(filename: Rules_Eslint_Typescript_RequireTypeNaming_Runner_DerivePrefix_Filename): Rules_Eslint_Typescript_RequireTypeNaming_Runner_DerivePrefix_Returns {
    const segments: Rules_Eslint_Typescript_RequireTypeNaming_Runner_DerivePrefix_Segments = Runner.normalizedPathSegments(filename);

    if (segments.length === 0) {
      return '';
    }

    return segments.map((segment) => {
      // PascalCase filenames (e.g., MDXComponents) - normalize abbreviations.
      if (segment.includes('-') === false && segment.charAt(0) === segment.charAt(0).toUpperCase()) {
        const words: Rules_Eslint_Typescript_RequireTypeNaming_Runner_DerivePrefix_Words = segment.match(new RegExp(LIB_REGEX_PATTERN_CAMEL_CASE_WORDS.source, 'g'));

        if (words !== null) {
          return words.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }).join('');
        }
      }

      return segment
        .split('-')
        .map((part) => {
          return part.charAt(0).toUpperCase() + part.slice(1);
        })
        .join('');
    }).join('_');
  }

  /**
   * Rules - ESLint - TypeScript - Require Type Naming - Derive Invalid Prefix Diagnostic.
   *
   * Inspects the derived prefix and returns the offending segment plus the
   * resulting prefix when the first character would be a digit. Null otherwise
   * so the caller can proceed with normal naming enforcement.
   *
   * @private
   *
   * @param {Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_Filename} filename - Filename.
   *
   * @returns {Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_Returns}
   *
   * @since 0.17.0
   */
  private static deriveInvalidPrefixDiagnostic(filename: Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_Filename): Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_Returns {
    const segments: Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_Segments = Runner.normalizedPathSegments(filename);

    if (segments.length === 0) {
      return null;
    }

    const offendingSegment: Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_OffendingSegment = segments[0] ?? '';

    if (LIB_REGEX_PATTERN_LEADING_DIGIT.test(offendingSegment) === false) {
      return null;
    }

    const prefix: Rules_Eslint_Typescript_RequireTypeNaming_Runner_DeriveInvalidPrefixDiagnostic_Prefix = segments.map((segment) => {
      return segment.split('-').map((part) => {
        return part.charAt(0).toUpperCase() + part.slice(1);
      }).join('');
    }).join('_');

    return {
      segment: offendingSegment,
      prefix,
    };
  }

  /**
   * Rules - ESLint - TypeScript - Require Type Naming - Check Type Alias.
   *
   * Validates a single TSTypeAliasDeclaration node
   * by checking that its name starts with the prefix
   * derived from the current file path.
   *
   * @private
   *
   * @param {Rules_Eslint_Typescript_RequireTypeNaming_Runner_CheckTypeAlias_Context} context - Context.
   * @param {Rules_Eslint_Typescript_RequireTypeNaming_Runner_CheckTypeAlias_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Typescript_RequireTypeNaming_Runner_CheckTypeAlias_Returns}
   *
   * @since 0.15.0
   */
  private static checkTypeAlias(context: Rules_Eslint_Typescript_RequireTypeNaming_Runner_CheckTypeAlias_Context, node: Rules_Eslint_Typescript_RequireTypeNaming_Runner_CheckTypeAlias_Node): Rules_Eslint_Typescript_RequireTypeNaming_Runner_CheckTypeAlias_Returns {
    const expectedPrefix: Rules_Eslint_Typescript_RequireTypeNaming_Runner_CheckTypeAlias_ExpectedPrefix = Runner.derivePrefix(context.filename);

    if (expectedPrefix === '') {
      return;
    }

    const typeName: Rules_Eslint_Typescript_RequireTypeNaming_Runner_CheckTypeAlias_TypeName = node.id.name;

    if (typeName.startsWith(expectedPrefix) === false) {
      context.report({
        node: node.id,
        messageId: 'typeNamingPrefix',
        data: {
          typeName,
          expectedPrefix,
        },
      });
    }

    return;
  }
}
