import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationBody,
  RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationContext,
  RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationDeclarator,
  RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationIfTest,
  RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationInit,
  RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationNextStatement,
  RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationNode,
  RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationNodeIndex,
  RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationParent,
  RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationReferences,
  RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationReturns,
  RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationVariable,
  RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationVarName,
  RulesEslintPatternsNoBooleanVarForIfRuleDefaultOptionsIgnoreFiles,
  RulesEslintPatternsNoBooleanVarForIfRuleOptions,
} from '../../../types/rules/eslint/patterns/no-boolean-var-for-if.d.ts';

/**
 * Rules - ESLint - Patterns - No Boolean Var For If.
 *
 * Flags single-use boolean variables that exist only to feed the next if-statement. Inlining
 * the condition removes the indirection and keeps logic co-located.
 *
 * @since 0.15.0
 */
export class RulesEslintPatternsNoBooleanVarForIf {
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
      ignoreFiles: [] as RulesEslintPatternsNoBooleanVarForIfRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintPatternsNoBooleanVarForIfRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        VariableDeclaration(node) {
          RulesEslintPatternsNoBooleanVarForIf.checkVariableDeclaration(context, node);

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
   * @param {RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationContext} context - Context.
   * @param {RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationNode}    node    - Node.
   *
   * @returns {RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationReturns}
   *
   * @since 0.15.0
   */
  private static checkVariableDeclaration(context: RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationContext, node: RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationNode): RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationReturns {
    if (node.kind !== 'const') {
      return;
    }

    if (node.declarations.length !== 1) {
      return;
    }

    const declarator: RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationDeclarator = node.declarations[0];

    if (declarator === undefined) {
      return;
    }

    if (declarator.id.type !== 'Identifier') {
      return;
    }

    const init: RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationInit = declarator.init;

    if (init === undefined || init === null) {
      return;
    }

    // Only trigger for LogicalExpression initializers.
    if (init.type !== 'LogicalExpression') {
      return;
    }

    const varName: RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationVarName = declarator.id.name;
    const parent: RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationParent = node.parent;

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

    const body: RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationBody = parent.body;
    const nodeIndex: RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationNodeIndex = body.indexOf(node);

    if (nodeIndex < 0 || nodeIndex >= body.length - 1) {
      return;
    }

    const nextStatement: RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationNextStatement = body[nodeIndex + 1];

    if (nextStatement === undefined || nextStatement.type !== 'IfStatement') {
      return;
    }

    const ifTest: RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationIfTest = nextStatement.test;

    if (ifTest.type !== 'Identifier' || ifTest.name !== varName) {
      return;
    }

    // Verify the variable is referenced exactly once using scope analysis.
    const variable: RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationVariable = context.sourceCode.getScope(node).variables.find((scopeVariable) => scopeVariable.name === varName);

    if (variable === undefined) {
      return;
    }

    const references: RulesEslintPatternsNoBooleanVarForIfCheckVariableDeclarationReferences = variable.references.filter((reference) => reference.isRead() === true);

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
