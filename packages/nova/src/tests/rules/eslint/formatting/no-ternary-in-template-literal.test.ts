import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoTernaryInTemplateLiteral } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintFormattingNoTernaryInTemplateLiteralRuleTester } from '../../../../types/tests/rules/eslint/formatting/no-ternary-in-template-literal.test.d.ts';

/**
 * Tests - Rules - ESLint - Formatting - No Ternary In Template Literal.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintFormattingNoTernaryInTemplateLiteralRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noTernaryInTemplateLiteral', NoTernaryInTemplateLiteral['rule'], {
  valid: [
    {
      code: '`text ${label}`;',
    },
    {
      code: '`text ${fn()}`;',
    },
    {
      code: '`plain text`;',
    },
    {
      code: '`text ${a + b}`;',
    },
    {
      code: '`text ${x ? \'a\' : \'b\'}`;',
      options: [{ ignoreFiles: ['ignored-file.ts'] }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: '`text ${x ? \'a\' : \'b\'}`;',
      errors: [{ messageId: 'noTernaryInTemplate' }],
    },
    {
      code: '`${a ? b : c} and ${d ? e : f}`;',
      errors: [
        { messageId: 'noTernaryInTemplate' },
        { messageId: 'noTernaryInTemplate' },
      ],
    },
  ],
});
