import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Body,
  Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Context,
  Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Declarator,
  Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_IfTest,
  Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Init,
  Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_NextStatement,
  Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Node,
  Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_NodeIndex,
  Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Parent,
  Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_References,
  Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Returns,
  Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Variable,
  Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_VarName,
  Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_RuleOptions,
} from '../../../types/rules/eslint/patterns/no-boolean-var-for-if.d.ts';

/**
 * Rules - ESLint - Patterns - No Boolean Var For If.
 *
 * Flags single-use boolean variables that exist only to feed the next if-statement. Inlining
 * the condition removes the indirection and keeps logic co-located.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * Rules - ESLint - Patterns - No Boolean Var For If - Rule.
   *
   * Registered under the name no-boolean-var-for-if and exported through the rules index as
   * NoBooleanVarForIf for preset consumption.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-boolean-var-for-if',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Disallow extracting a multi-condition boolean into a single-use variable for the next if-statement.',
      },
      messages: {
        noBooleanVarForIf: 'Inline the condition directly in the if-statement instead of extracting it into a single-use boolean variable.',
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
      ignoreFiles: [] as Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_RuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        VariableDeclaration(node) {
          Runner.checkVariableDeclaration(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Patterns - No Boolean Var For If - Check Variable Declaration.
   *
   * Checks whether a const with a LogicalExpression
   * initializer is referenced exactly once as the test
   * of the immediately following if-statement.
   *
   * @private
   *
   * @param {Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Context} context - Context.
   * @param {Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Returns}
   *
   * @since 0.15.0
   */
  private static checkVariableDeclaration(context: Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Context, node: Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Node): Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Returns {
    if (node.kind !== 'const') {
      return;
    }

    if (node.declarations.length !== 1) {
      return;
    }

    const declarator: Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Declarator = node.declarations[0];

    if (declarator === undefined) {
      return;
    }

    if (declarator.id.type !== 'Identifier') {
      return;
    }

    const init: Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Init = declarator.init;

    if (init === undefined || init === null) {
      return;
    }

    // Only trigger for LogicalExpression initializers.
    if (init.type !== 'LogicalExpression') {
      return;
    }

    const varName: Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_VarName = declarator.id.name;
    const parent: Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Parent = node.parent;

    if (
      parent === undefined
      || parent === null
      || (
        parent.type !== 'BlockStatement'
        && parent.type !== 'Program'
      )
    ) {
      return;
    }

    const body: Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Body = parent.body;
    const nodeIndex: Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_NodeIndex = body.indexOf(node);

    if (nodeIndex < 0 || nodeIndex >= body.length - 1) {
      return;
    }

    const nextStatement: Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_NextStatement = body[nodeIndex + 1];

    if (nextStatement === undefined || nextStatement.type !== 'IfStatement') {
      return;
    }

    const ifTest: Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_IfTest = nextStatement.test;

    if (ifTest.type !== 'Identifier' || ifTest.name !== varName) {
      return;
    }

    // Verify the variable is referenced exactly once using scope analysis.
    const variable: Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Variable = context.sourceCode.getScope(node).variables.find((scopeVariable) => scopeVariable.name === varName);

    if (variable === undefined) {
      return;
    }

    const references: Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_References = variable.references.filter((reference) => reference.isRead() === true);

    if (references.length !== 1) {
      return;
    }

    context.report({
      node,
      messageId: 'noBooleanVarForIf',
    });

    return;
  }
}
