import { builtinModules } from 'node:module';

import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Base,
  Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Context,
  Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Fix_Fixer,
  Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Fix_Returns,
  Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Quote,
  Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Raw,
  Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Returns,
  Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Source,
  Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Value,
  Rules_Eslint_Conventions_RequireNodeProtocol_Runner_Create_Node,
  Rules_Eslint_Conventions_RequireNodeProtocol_Runner_Create_Options,
  Rules_Eslint_Conventions_RequireNodeProtocol_Runner_Create_Returns,
  Rules_Eslint_Conventions_RequireNodeProtocol_Runner_RuleDefaultOptionsIgnoreFiles,
} from '../../../types/rules/eslint/conventions/require-node-protocol.d.ts';

/**
 * Rules - ESLint - Conventions - Require Node Protocol.
 *
 * Requires the "node:" protocol on every import or export of a Node.js built-in module so
 * built-ins are explicit and never confused with userland packages.
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * Rules - ESLint - Conventions - Require Node Protocol - Rule.
   *
   * Registered under the name require-node-protocol and exported through the rules index as
   * RequireNodeProtocol for preset consumption.
   *
   * @since 0.21.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-node-protocol',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require the "node:" protocol when importing Node.js built-in modules.',
      },
      fixable: 'code',
      messages: {
        requireNodeProtocol: 'Import the "{{module}}" built-in module using the "node:" protocol.',
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
      ignoreFiles: [] as Rules_Eslint_Conventions_RequireNodeProtocol_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Conventions_RequireNodeProtocol_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        'ImportDeclaration, ImportExpression, ExportAllDeclaration, ExportNamedDeclaration'(node: Rules_Eslint_Conventions_RequireNodeProtocol_Runner_Create_Node): Rules_Eslint_Conventions_RequireNodeProtocol_Runner_Create_Returns {
          Runner.checkSource(context, node.source);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Conventions - Require Node Protocol - Check Source.
   *
   * Reports an import of a Node.js built-in that omits the "node:" protocol and provides an
   * auto-fix that inserts the prefix while preserving the original quote style.
   *
   * @param {Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Context} context - Context.
   * @param {Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Source}  source  - Source.
   *
   * @private
   *
   * @returns {Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Returns}
   *
   * @since 0.21.0
   */
  private static checkSource(context: Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Context, source: Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Source): Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Returns {
    // Only string-literal module specifiers are checkable.
    if (
      source === null
      || source.type !== 'Literal'
      || typeof source.value !== 'string'
    ) {
      return;
    }

    const value: Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Value = source.value;

    // Already using the "node:" protocol.
    if (value.startsWith('node:') === true) {
      return;
    }

    // Only Node.js built-ins, matched by the base module before any subpath.
    const base: Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Base = value.split('/')[0];

    if (
      base === undefined
      || (
        builtinModules.includes(value) === false
        && builtinModules.includes(base) === false
      )
    ) {
      return;
    }

    const raw: Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Raw = source.raw;
    const quote: Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Quote = raw.slice(0, 1);

    context.report({
      node: source,
      messageId: 'requireNodeProtocol',
      data: {
        module: value,
      },
      fix(fixer: Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Fix_Fixer): Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Fix_Returns {
        return fixer.replaceText(source, `${quote}node:${value}${quote}`);
      },
    });

    return;
  }
}
