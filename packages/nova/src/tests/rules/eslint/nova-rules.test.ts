import { strictEqual } from 'node:assert/strict';

import { Linter } from '@typescript-eslint/utils/ts-eslint';
import { describe, it } from 'vitest';

import { isPlainObject } from '../../../lib/utility.js';
import { novaRules } from '../../../rules/eslint/index.js';

import type {
  Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_Config,
  Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_DefaultOption,
  Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_DefaultOptions,
  Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_IgnoreFiles,
  Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_Meta,
  Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_Plugin,
  Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_Plugins,
  Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_Properties,
  Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_RuleDefinition,
  Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_RuleModules,
  Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_RuleName,
  Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_RuleNames,
  Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_Rules,
  Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_Schema,
  Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_SchemaOption,
  Tests_Rules_Eslint_NovaRules_NovaRules_RunsEveryEnabledCustomRuleAgainstAnMJSFileWithoutCrashing_Linter,
  Tests_Rules_Eslint_NovaRules_NovaRules_RunsEveryEnabledCustomRuleAgainstAnMJSFileWithoutCrashing_Messages,
  Tests_Rules_Eslint_NovaRules_NovaRules_RunsEveryEnabledCustomRuleAgainstAnMJSFileWithoutCrashing_SourceCode,
  Tests_Rules_Eslint_NovaRules_NovaRules_RunsEveryEnabledCustomRuleAgainstAnMJSFileWithoutCrashing_TemplateInterpolation,
} from '../../../types/tests/rules/eslint/nova-rules.test.d.ts';

/**
 * Tests - Rules - ESLint - Nova Rules - Nova Rules.
 *
 * Exercises the complete consumer-facing rule collection against plain ESM JavaScript.
 * This guards JavaScript scripts from TypeScript-only AST assumptions in any custom rule.
 *
 * @since 0.29.0
 */
describe('novaRules', () => {
  it('requires every custom rule to support ignoreFiles', () => {
    const ruleModules: Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_RuleModules = new Map();

    for (const configValue of novaRules) {
      const config: Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_Config = configValue;
      const plugins: Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_Plugins = config['plugins'];

      if (plugins === undefined) {
        continue;
      }

      const plugin: Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_Plugin = plugins['@cbnventures/nova'];

      if (plugin === undefined) {
        continue;
      }

      const rules: Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_Rules = plugin['rules'];

      if (rules === undefined) {
        continue;
      }

      for (const ruleName of Object.keys(rules)) {
        ruleModules.set(ruleName, rules[ruleName]);
      }
    }

    strictEqual(ruleModules.size > 0, true);

    const ruleNames: Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_RuleNames = [...ruleModules.keys()].sort();

    for (const ruleNameValue of ruleNames) {
      const ruleName: Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_RuleName = ruleNameValue;
      const ruleDefinition: Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_RuleDefinition = ruleModules.get(ruleName);

      if (isPlainObject(ruleDefinition) === false) {
        throw new TypeError(`Nova rule "${ruleName}" must export a rule module object.`);
      }

      const meta: Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_Meta = ruleDefinition['meta'];

      if (isPlainObject(meta) === false) {
        throw new TypeError(`Nova rule "${ruleName}" must define rule metadata.`);
      }

      const schema: Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_Schema = meta['schema'];

      if (Array.isArray(schema) === false) {
        throw new TypeError(`Nova rule "${ruleName}" must define an array option schema.`);
      }

      const schemaOption: Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_SchemaOption = schema[0];

      if (isPlainObject(schemaOption) === false) {
        throw new TypeError(`Nova rule "${ruleName}" must define an object option schema.`);
      }

      const properties: Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_Properties = schemaOption['properties'];

      if (isPlainObject(properties) === false || Object.hasOwn(properties, 'ignoreFiles') === false) {
        throw new TypeError(`Nova rule "${ruleName}" must expose an ignoreFiles option.`);
      }

      const defaultOptions: Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_DefaultOptions = ruleDefinition['defaultOptions'];

      if (Array.isArray(defaultOptions) === false) {
        throw new TypeError(`Nova rule "${ruleName}" must define default options.`);
      }

      const defaultOption: Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_DefaultOption = defaultOptions[0];

      if (isPlainObject(defaultOption) === false) {
        throw new TypeError(`Nova rule "${ruleName}" must define an object as its first default option.`);
      }

      const ignoreFiles: Tests_Rules_Eslint_NovaRules_NovaRules_RequiresEveryCustomRuleToSupportIgnoreFiles_IgnoreFiles = defaultOption['ignoreFiles'];

      if (Array.isArray(ignoreFiles) === false) {
        throw new TypeError(`Nova rule "${ruleName}" must default ignoreFiles to an array.`);
      }

      strictEqual(ignoreFiles.length, 0, `Nova rule "${ruleName}" must default ignoreFiles to an empty array.`);
    }

    return;
  });

  it('runs every enabled custom rule against an MJS file without crashing', () => {
    const linter: Tests_Rules_Eslint_NovaRules_NovaRules_RunsEveryEnabledCustomRuleAgainstAnMJSFileWithoutCrashing_Linter = new Linter({
      configType: 'flat',
      cwd: process.cwd(),
    });
    const templateInterpolation: Tests_Rules_Eslint_NovaRules_NovaRules_RunsEveryEnabledCustomRuleAgainstAnMJSFileWithoutCrashing_TemplateInterpolation = [
      '$',
      '{input ? "yes" : "no"}',
    ].join('');
    const sourceCode: Tests_Rules_Eslint_NovaRules_NovaRules_RunsEveryEnabledCustomRuleAgainstAnMJSFileWithoutCrashing_SourceCode = [
      'import path from "path";',
      'const sample = { value: 1 };',
      'const { value } = sample;',
      'async function run(input) {',
      '  const answer = input?.value ? /x/g : new RegExp("x");',
      '  for (const item of [answer]) { await Promise.resolve(item); }',
      `  switch (value) { case 1: return \`${templateInterpolation}\`; default: return undefined; }`,
      '}',
      'class Example {',
      '  #field = 1;',
      '  method(...values) { this["value"] = values[0]; return this["value"]; }',
      '}',
      'new Example().method(sample);',
      'export default run;',
    ].join('\n');

    const messages: Tests_Rules_Eslint_NovaRules_NovaRules_RunsEveryEnabledCustomRuleAgainstAnMJSFileWithoutCrashing_Messages = linter.verify(sourceCode, novaRules, {
      filename: 'scripts/nova-rules-safety.mjs',
    });

    strictEqual(messages.length > 0, true);
    strictEqual(messages.some((message) => message.fatal === true), false);

    return;
  });

  return;
});
