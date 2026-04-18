import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoOptionalChaining } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintSyntaxNoOptionalChainingRuleTester } from '../../../../types/tests/rules/eslint/syntax/no-optional-chaining.test.d.ts';

/**
 * Tests - Rules - ESLint - Syntax - No Optional Chaining.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintSyntaxNoOptionalChainingRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noOptionalChaining', NoOptionalChaining['rule'], {
  valid: [
    {
      code: 'const name = user !== undefined ? user.name : undefined;',
    },
    {
      code: 'const name = inputName ?? "default";',
    },
    {
      code: 'const port = config.port ?? 3000;',
    },
    {
      code: 'const value = obj.property;',
    },
    {
      code: 'const name = user?.name;',
      options: [{ ignoreFiles: ['ignored-file.ts'] }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: 'const name = user?.name;',
      errors: [{ messageId: 'noOptionalChaining' }],
    },
    {
      code: 'const first = arr?.[0];',
      errors: [{ messageId: 'noOptionalChaining' }],
    },
    {
      code: 'const result = fn?.();',
      errors: [{ messageId: 'noOptionalChaining' }],
    },
    {
      code: 'const deep = obj?.a?.b?.c;',
      errors: [{ messageId: 'noOptionalChaining' }],
    },
  ],
});
