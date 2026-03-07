import { test } from 'node:test';

import { RuleTester } from '@typescript-eslint/rule-tester';

import { noBracketAssignment } from '@/rules/eslint/index.js';

/**
 * No bracket assignment.
 *
 * @since 1.0.0
 */
RuleTester.afterAll = () => {};
RuleTester.describe = test;
RuleTester.it = test;

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noBracketAssignment', noBracketAssignment, {
  valid: [
    {
      code: 'Reflect.set(target, key, value);',
    },
    {
      code: 'target.prop = value;',
    },
    {
      code: 'const x = target[key];',
    },
  ],
  invalid: [
    {
      code: 'target[key] = value;',
      errors: [{ messageId: 'useReflectSet' }],
    },
    {
      code: 'target[key] += value;',
      errors: [{ messageId: 'useReflectSet' }],
    },
    {
      code: 'obj[\'name\'] = \'test\';',
      errors: [{ messageId: 'useReflectSet' }],
    },
  ],
});
