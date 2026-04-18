import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoBracketMethodCall } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintPatternsNoBracketMethodCallRuleTester } from '../../../../types/tests/rules/eslint/patterns/no-bracket-method-call.test.d.ts';

/**
 * Tests - Rules - ESLint - Patterns - No Bracket Method Call.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintPatternsNoBracketMethodCallRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noBracketMethodCall', NoBracketMethodCall['rule'], {
  valid: [
    {
      code: 'obj.toString();',
    },
    {
      code: 'arr.push(item);',
    },
    {
      code: 'element.addEventListener("click", handler);',
    },
    {
      code: 'const value = obj["some-key"];',
    },
    {
      code: 'const value = obj[dynamicKey];',
    },
    {
      code: 'obj[methodName]();',
    },
    {
      code: 'obj["toString"]();',
      options: [{
        ignoreFiles: ['ignored-file.ts'],
        allowedMethods: [],
      }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: 'obj["toString"]();',
      output: 'obj.toString();',
      errors: [{ messageId: 'noBracketMethodCall' }],
    },
    {
      code: 'obj["hasOwnProperty"]("key");',
      output: 'obj.hasOwnProperty("key");',
      errors: [{ messageId: 'noBracketMethodCall' }],
    },
    {
      code: 'arr["push"](item);',
      output: 'arr.push(item);',
      errors: [{ messageId: 'noBracketMethodCall' }],
    },
    {
      code: 'element["addEventListener"]("click", handler);',
      output: 'element.addEventListener("click", handler);',
      errors: [{ messageId: 'noBracketMethodCall' }],
    },
  ],
});
