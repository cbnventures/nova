import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoTemplateCurlyInString } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintPatternsNoTemplateCurlyInStringRuleTester } from '../../../../types/tests/rules/eslint/patterns/no-template-curly-in-string.test.d.ts';

/**
 * Tests - Rules - ESLint - Patterns - No Template Curly In String.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintPatternsNoTemplateCurlyInStringRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noTemplateCurlyInString', NoTemplateCurlyInString['rule'], {
  valid: [
    {
      code: 'const msg = `Hello ${name}!`;',
    },
    {
      code: 'const x = "no placeholders here";',
    },
    {
      code: 'const x = 42;',
    },
    {
      code: 'const tpl = `${a} and ${b}`;',
    },
    {
      code: ['const msg = "Hello ${name}!";'].join('\n'),
      options: [{ ignoreFiles: ['ignored-file.ts'] }],
      filename: '/path/to/ignored-file.ts',
    },
    {
      code: ['const pattern = new RegExp("[.*+?^${}()|[\\\\]\\\\\\\\]", "g");'].join('\n'),
    },
  ],
  invalid: [
    {
      code: ['const msg = "Hello ${name}!";'].join('\n'),
      errors: [{ messageId: 'noTemplateCurlyInString' }],
    },
    {
      code: ['const msg = "path/${dir}/file";'].join('\n'),
      errors: [{ messageId: 'noTemplateCurlyInString' }],
    },
    {
      code: ['const msg = \'${a} and ${b}\';'].join('\n'),
      errors: [{ messageId: 'noTemplateCurlyInString' }],
    },
  ],
});
