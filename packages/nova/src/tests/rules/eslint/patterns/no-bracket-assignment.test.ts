import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoBracketAssignment } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintPatternsNoBracketAssignmentRuleTester } from '../../../../types/tests/rules/eslint/patterns/no-bracket-assignment.test.d.ts';

/**
 * Tests - Rules - ESLint - Patterns - No Bracket Assignment.
 *
 * @since 0.14.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintPatternsNoBracketAssignmentRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noBracketAssignment', NoBracketAssignment['rule'], {
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
    {
      code: 'target[key] = value;',
      options: [{ ignoreFiles: ['ignored-file.ts'] }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: 'target[key] = value;',
      output: 'Reflect.set(target, key, value);',
      errors: [{ messageId: 'useReflectSet' }],
    },
    {
      code: 'target[key] += value;',
      errors: [{ messageId: 'useReflectSet' }],
    },
    {
      code: 'obj[\'name\'] = \'test\';',
      output: 'Reflect.set(obj, \'name\', \'test\');',
      errors: [{ messageId: 'useReflectSet' }],
    },
  ],
});
