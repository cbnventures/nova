import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoBracketMethodCall } from '../../../../rules/eslint/index.js';

import type { Tests_Rules_Eslint_Patterns_NoBracketMethodCall_RuleTester } from '../../../../types/tests/rules/eslint/patterns/no-bracket-method-call.test.d.ts';

/**
 * Tests - Rules - ESLint - Patterns - No Bracket Method Call.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: Tests_Rules_Eslint_Patterns_NoBracketMethodCall_RuleTester = new RuleTester({
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
      code: 'const value = obj["some-key"];',
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
      code: 'obj["$emit"]();',
      output: 'obj.$emit();',
      errors: [{ messageId: 'noBracketMethodCall' }],
    },
    {
      code: 'obj["foo-bar"]();',
      output: null,
      errors: [{ messageId: 'noBracketMethodCall' }],
    },
    {
      code: 'obj["123"]();',
      output: null,
      errors: [{ messageId: 'noBracketMethodCall' }],
    },
  ],
});
