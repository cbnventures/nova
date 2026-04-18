import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintFormattingRequireImportOrderCheckProgramContext,
  RulesEslintFormattingRequireImportOrderCheckProgramCurrent,
  RulesEslintFormattingRequireImportOrderCheckProgramCurrentGroup,
  RulesEslintFormattingRequireImportOrderCheckProgramCurrentSource,
  RulesEslintFormattingRequireImportOrderCheckProgramCurrentStart,
  RulesEslintFormattingRequireImportOrderCheckProgramImports,
  RulesEslintFormattingRequireImportOrderCheckProgramLastGroup,
  RulesEslintFormattingRequireImportOrderCheckProgramPrev,
  RulesEslintFormattingRequireImportOrderCheckProgramPrevEnd,
  RulesEslintFormattingRequireImportOrderCheckProgramPrevGroup,
  RulesEslintFormattingRequireImportOrderCheckProgramPrevSource,
  RulesEslintFormattingRequireImportOrderCheckProgramReturns,
  RulesEslintFormattingRequireImportOrderCheckSpecifiersContext,
  RulesEslintFormattingRequireImportOrderCheckSpecifiersCurrent,
  RulesEslintFormattingRequireImportOrderCheckSpecifiersCurrentName,
  RulesEslintFormattingRequireImportOrderCheckSpecifiersImports,
  RulesEslintFormattingRequireImportOrderCheckSpecifiersPrev,
  RulesEslintFormattingRequireImportOrderCheckSpecifiersPrevName,
  RulesEslintFormattingRequireImportOrderCheckSpecifiersReturns,
  RulesEslintFormattingRequireImportOrderCheckSpecifiersSpecifiers,
  RulesEslintFormattingRequireImportOrderGetGroupImportNode,
  RulesEslintFormattingRequireImportOrderGetGroupIsTypeImport,
  RulesEslintFormattingRequireImportOrderGetGroupReturns,
  RulesEslintFormattingRequireImportOrderGetGroupSource,
  RulesEslintFormattingRequireImportOrderGetGroupSourceBase,
  RulesEslintFormattingRequireImportOrderNodeBuiltins,
  RulesEslintFormattingRequireImportOrderRuleDefaultOptionsIgnoreFiles,
  RulesEslintFormattingRequireImportOrderRuleOptions,
} from '../../../types/rules/eslint/formatting/require-import-order.d.ts';

/**
 * Rules - ESLint - Formatting - Require Import Order.
 *
 * Enforces a strict 6-group import ordering: Node built-ins, third-party, local, then type
 * imports, with blank lines between groups.
 *
 * @since 0.15.0
 */
export class RulesEslintFormattingRequireImportOrder {
  /**
   * Rules - ESLint - Formatting - Require Import Order - Rule.
   *
   * Registered in eslint.config.ts and runs once per Program node to validate import
   * statement ordering and specifier alphabetization.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-import-order',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require 6-group import ordering: Node built-ins, third-party, local, then type imports.',
      },
      messages: {
        importOrder: 'Imports must follow the 6-group ordering: Node built-ins, third-party, local, then type imports.',
        specifierOrder: 'Import specifiers must be in alphabetical order.',
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
      ignoreFiles: [] as RulesEslintFormattingRequireImportOrderRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintFormattingRequireImportOrderRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Program() {
          RulesEslintFormattingRequireImportOrder.checkProgram(context);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Formatting - Require Import Order - Node Builtins.
   *
   * A static set of all Node.js built-in module names used by
   * getGroup to classify bare imports like "fs" or "path" as Node built-in group 1.
   *
   * @private
   *
   * @since 0.15.0
   */
  static readonly #nodeBuiltins: RulesEslintFormattingRequireImportOrderNodeBuiltins = new Set([
    'assert',
    'async_hooks',
    'buffer',
    'child_process',
    'cluster',
    'console',
    'crypto',
    'dgram',
    'diagnostics_channel',
    'dns',
    'domain',
    'events',
    'fs',
    'http',
    'http2',
    'https',
    'inspector',
    'module',
    'net',
    'os',
    'path',
    'perf_hooks',
    'process',
    'punycode',
    'querystring',
    'readline',
    'repl',
    'stream',
    'string_decoder',
    'test',
    'timers',
    'tls',
    'trace_events',
    'tty',
    'url',
    'util',
    'v8',
    'vm',
    'wasi',
    'worker_threads',
    'zlib',
  ]);

  /**
   * Rules - ESLint - Formatting - Require Import Order - Get Group.
   *
   * Maps an import declaration to one of six groups based on its
   * source path and whether it is a type import: Node, third-party, or local.
   *
   * @private
   *
   * @param {RulesEslintFormattingRequireImportOrderGetGroupImportNode} importNode - Import node.
   *
   * @returns {RulesEslintFormattingRequireImportOrderGetGroupReturns}
   *
   * @since 0.15.0
   */
  private static getGroup(importNode: RulesEslintFormattingRequireImportOrderGetGroupImportNode): RulesEslintFormattingRequireImportOrderGetGroupReturns {
    const source: RulesEslintFormattingRequireImportOrderGetGroupSource = importNode.source.value;
    const sourceBase: RulesEslintFormattingRequireImportOrderGetGroupSourceBase = source.split('/')[0] ?? '';
    const isTypeImport: RulesEslintFormattingRequireImportOrderGetGroupIsTypeImport = importNode.importKind === 'type';

    // Node built-ins (group 1 regular, group 4 type).
    if (
      source.startsWith('node:') === true
      || RulesEslintFormattingRequireImportOrder.#nodeBuiltins.has(sourceBase) === true
    ) {
      return (isTypeImport === true) ? 4 : 1;
    }

    // Local imports (group 3 regular, group 6 type).
    if (
      source.startsWith('@/') === true
      || source.startsWith('@site/') === true
      || source.startsWith('./') === true
      || source.startsWith('../') === true
    ) {
      return (isTypeImport === true) ? 6 : 3;
    }

    // Third-party (group 2 regular, group 5 type).
    return (isTypeImport === true) ? 5 : 2;
  }

  /**
   * Rules - ESLint - Formatting - Require Import Order - Check Program.
   *
   * Iterates all import declarations in the file to verify group
   * ordering, blank line separation between groups, and alphabetical order within.
   *
   * @private
   *
   * @param {RulesEslintFormattingRequireImportOrderCheckProgramContext} context - Context.
   *
   * @returns {RulesEslintFormattingRequireImportOrderCheckProgramReturns}
   *
   * @since 0.15.0
   */
  private static checkProgram(context: RulesEslintFormattingRequireImportOrderCheckProgramContext): RulesEslintFormattingRequireImportOrderCheckProgramReturns {
    const imports: RulesEslintFormattingRequireImportOrderCheckProgramImports = context.sourceCode.ast.body.filter(
      (node) => node.type === 'ImportDeclaration',
    );

    // Check specifier ordering within each import.
    RulesEslintFormattingRequireImportOrder.checkSpecifiers(context, imports);

    if (imports.length < 2) {
      return;
    }

    let lastGroup: RulesEslintFormattingRequireImportOrderCheckProgramLastGroup = 0;

    for (let i = 0; i < imports.length; i += 1) {
      const current: RulesEslintFormattingRequireImportOrderCheckProgramCurrent = imports[i];

      if (current === undefined || current.type !== 'ImportDeclaration') {
        continue;
      }

      const currentGroup: RulesEslintFormattingRequireImportOrderCheckProgramCurrentGroup = RulesEslintFormattingRequireImportOrder.getGroup(current);

      // Check group ordering.
      if (currentGroup < lastGroup) {
        context.report({
          node: current,
          messageId: 'importOrder',
        });

        return;
      }

      // Check blank line between groups.
      if (i > 0) {
        const prev: RulesEslintFormattingRequireImportOrderCheckProgramPrev = imports[i - 1];

        if (prev === undefined || prev.type !== 'ImportDeclaration') {
          continue;
        }

        const prevGroup: RulesEslintFormattingRequireImportOrderCheckProgramPrevGroup = RulesEslintFormattingRequireImportOrder.getGroup(prev);

        if (currentGroup !== prevGroup) {
          const prevEnd: RulesEslintFormattingRequireImportOrderCheckProgramPrevEnd = prev.loc.end.line;
          const currentStart: RulesEslintFormattingRequireImportOrderCheckProgramCurrentStart = current.loc.start.line;

          if (currentStart - prevEnd < 2) {
            context.report({
              node: current,
              messageId: 'importOrder',
            });

            return;
          }
        }

        // Check alphabetical within group.
        if (currentGroup === prevGroup) {
          const prevSource: RulesEslintFormattingRequireImportOrderCheckProgramPrevSource = prev.source.value;
          const currentSource: RulesEslintFormattingRequireImportOrderCheckProgramCurrentSource = current.source.value;

          if (currentSource.localeCompare(prevSource) < 0) {
            context.report({
              node: current,
              messageId: 'importOrder',
            });

            return;
          }
        }
      }

      lastGroup = currentGroup;
    }

    return;
  }

  /**
   * Rules - ESLint - Formatting - Require Import Order - Check Specifiers.
   *
   * Validates that named import specifiers within each import
   * declaration are sorted alphabetically by their imported identifier name.
   *
   * @private
   *
   * @param {RulesEslintFormattingRequireImportOrderCheckSpecifiersContext} context - Context.
   * @param {RulesEslintFormattingRequireImportOrderCheckSpecifiersImports} imports - Imports.
   *
   * @returns {RulesEslintFormattingRequireImportOrderCheckSpecifiersReturns}
   *
   * @since 0.15.0
   */
  private static checkSpecifiers(context: RulesEslintFormattingRequireImportOrderCheckSpecifiersContext, imports: RulesEslintFormattingRequireImportOrderCheckSpecifiersImports): RulesEslintFormattingRequireImportOrderCheckSpecifiersReturns {
    for (const importDeclaration of imports) {
      if (importDeclaration === undefined || importDeclaration.type !== 'ImportDeclaration') {
        continue;
      }

      const specifiers: RulesEslintFormattingRequireImportOrderCheckSpecifiersSpecifiers = importDeclaration.specifiers;

      for (let i = 1; i < specifiers.length; i += 1) {
        const prev: RulesEslintFormattingRequireImportOrderCheckSpecifiersPrev = specifiers[i - 1];
        const current: RulesEslintFormattingRequireImportOrderCheckSpecifiersCurrent = specifiers[i];

        if (
          prev === undefined
          || current === undefined
          || prev.type !== 'ImportSpecifier'
          || current.type !== 'ImportSpecifier'
          || prev.imported.type !== 'Identifier'
          || current.imported.type !== 'Identifier'
        ) {
          continue;
        }

        const prevName: RulesEslintFormattingRequireImportOrderCheckSpecifiersPrevName = prev.imported.name;
        const currentName: RulesEslintFormattingRequireImportOrderCheckSpecifiersCurrentName = current.imported.name;

        if (currentName.localeCompare(prevName) < 0) {
          context.report({
            node: current,
            messageId: 'specifierOrder',
          });

          return;
        }
      }
    }

    return;
  }
}
