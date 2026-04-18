import { ESLintUtils } from '@typescript-eslint/utils';

import { LIB_REGEX_PATTERN_CAMEL_CASE_WORDS } from '../../../lib/regex.js';
import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintTypescriptRequireTypeNamingCheckTypeAliasContext,
  RulesEslintTypescriptRequireTypeNamingCheckTypeAliasExpectedPrefix,
  RulesEslintTypescriptRequireTypeNamingCheckTypeAliasNode,
  RulesEslintTypescriptRequireTypeNamingCheckTypeAliasReturns,
  RulesEslintTypescriptRequireTypeNamingCheckTypeAliasTypeName,
  RulesEslintTypescriptRequireTypeNamingDerivePrefixFilename,
  RulesEslintTypescriptRequireTypeNamingDerivePrefixNormalizedFilename,
  RulesEslintTypescriptRequireTypeNamingDerivePrefixRelativePath,
  RulesEslintTypescriptRequireTypeNamingDerivePrefixReturns,
  RulesEslintTypescriptRequireTypeNamingDerivePrefixSegments,
  RulesEslintTypescriptRequireTypeNamingDerivePrefixTypesIndex,
  RulesEslintTypescriptRequireTypeNamingDerivePrefixWords,
  RulesEslintTypescriptRequireTypeNamingRuleDefaultOptionsIgnoreFiles,
  RulesEslintTypescriptRequireTypeNamingRuleNormalizedFilename,
  RulesEslintTypescriptRequireTypeNamingRuleOptions,
} from '../../../types/rules/eslint/typescript/require-type-naming.d.ts';

/**
 * Rules - ESLint - TypeScript - Require Type Naming.
 *
 * Enforces that type alias names in .d.ts files start with a prefix derived from the file
 * path, keeping type names globally unique and traceable to origin.
 *
 * @since 0.15.0
 */
export class RulesEslintTypescriptRequireTypeNaming {
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
      ignoreFiles: [] as RulesEslintTypescriptRequireTypeNamingRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintTypescriptRequireTypeNamingRuleOptions = defaultOptions[0];
      const normalizedFilename: RulesEslintTypescriptRequireTypeNamingRuleNormalizedFilename = context.filename.replaceAll('\\', '/');

      // Only apply to .d.ts files.
      if (normalizedFilename.endsWith('.d.ts') === false) {
        return {};
      }

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        TSTypeAliasDeclaration(node) {
          RulesEslintTypescriptRequireTypeNaming.checkTypeAlias(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - TypeScript - Require Type Naming - Derive Prefix.
   *
   * Converts the file path after the /types/ directory into a PascalCase prefix string.
   * Called by checkTypeAlias to compare against each type name.
   *
   * @private
   *
   * @param {RulesEslintTypescriptRequireTypeNamingDerivePrefixFilename} filename - Filename.
   *
   * @returns {RulesEslintTypescriptRequireTypeNamingDerivePrefixReturns}
   *
   * @since 0.15.0
   */
  private static derivePrefix(filename: RulesEslintTypescriptRequireTypeNamingDerivePrefixFilename): RulesEslintTypescriptRequireTypeNamingDerivePrefixReturns {
    const normalizedFilename: RulesEslintTypescriptRequireTypeNamingDerivePrefixNormalizedFilename = filename.replaceAll('\\', '/');

    // Find the types/ directory anchor.
    const typesIndex: RulesEslintTypescriptRequireTypeNamingDerivePrefixTypesIndex = normalizedFilename.indexOf('/types/');

    if (typesIndex < 0) {
      return '';
    }

    // Extract the path after /types/.
    let relativePath: RulesEslintTypescriptRequireTypeNamingDerivePrefixRelativePath = normalizedFilename.slice(typesIndex + '/types/'.length);

    // Strip the .test.d.ts or .d.ts extension.
    if (relativePath.endsWith('.test.d.ts') === true) {
      relativePath = relativePath.slice(0, relativePath.length - '.test.d.ts'.length);
    }

    if (relativePath.endsWith('.d.ts') === true) {
      relativePath = relativePath.slice(0, relativePath.length - '.d.ts'.length);
    }

    // Split into segments, skip "index" filenames, and convert to PascalCase.
    const segments: RulesEslintTypescriptRequireTypeNamingDerivePrefixSegments = relativePath.split('/').filter(
      (segment) => segment !== 'index',
    );

    return segments.map((segment) => {
      // PascalCase filenames (e.g., MDXComponents) — normalize abbreviations.
      if (segment.includes('-') === false && segment.charAt(0) === segment.charAt(0).toUpperCase()) {
        const words: RulesEslintTypescriptRequireTypeNamingDerivePrefixWords = segment.match(new RegExp(LIB_REGEX_PATTERN_CAMEL_CASE_WORDS.source, 'g'));

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
    }).join('');
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
   * @param {RulesEslintTypescriptRequireTypeNamingCheckTypeAliasContext} context - Context.
   * @param {RulesEslintTypescriptRequireTypeNamingCheckTypeAliasNode}    node    - Node.
   *
   * @returns {RulesEslintTypescriptRequireTypeNamingCheckTypeAliasReturns}
   *
   * @since 0.15.0
   */
  private static checkTypeAlias(context: RulesEslintTypescriptRequireTypeNamingCheckTypeAliasContext, node: RulesEslintTypescriptRequireTypeNamingCheckTypeAliasNode): RulesEslintTypescriptRequireTypeNamingCheckTypeAliasReturns {
    const expectedPrefix: RulesEslintTypescriptRequireTypeNamingCheckTypeAliasExpectedPrefix = RulesEslintTypescriptRequireTypeNaming.derivePrefix(context.filename);

    if (expectedPrefix === '') {
      return;
    }

    const typeName: RulesEslintTypescriptRequireTypeNamingCheckTypeAliasTypeName = node.id.name;

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
