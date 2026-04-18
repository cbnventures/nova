import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoMultilineStrings } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintFormattingNoMultilineStringsRuleTester } from '../../../../types/tests/rules/eslint/formatting/no-multiline-strings.test.d.ts';

/**
 * Tests - Rules - ESLint - Formatting - No Multiline Strings.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintFormattingNoMultilineStringsRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noMultilineStrings', NoMultilineStrings['rule'], {
  valid: [
    {
      code: 'const msg = ["line one", "line two"].join("\\n");',
    },
    {
      code: 'const greeting = `Hello ${name}!`;',
    },
    {
      code: 'const path = `${basePath}/files/${fileName}`;',
    },
    {
      code: 'const single = "just one line";',
    },
    {
      code: 'const padded = "\\nhello";',
    },
    {
      code: 'const padded = "hello\\n";',
    },
    {
      code: 'const padded = "\\nhello\\n";',
    },
    {
      code: 'const padded = "\\n\\nhello\\n\\n";',
    },
    {
      code: 'const padded = `\\nhello`;',
    },
    {
      code: 'const padded = `hello\\n`;',
    },
    {
      code: 'const padded = `\\nhello\\n`;',
    },
    {
      code: 'const padded = `\\n${name}\\n`;',
    },
    {
      code: 'const padded = `\\nhello${name}world\\n`;',
    },
    {
      code: 'const delim = "\\n";',
    },
    {
      code: 'const msg = "line one\\nline two";',
      options: [{
        ignoreFiles: ['ignored-file.ts'], allowEscapeSequences: false,
      }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: 'const msg = "line one \\\nline two";',
      errors: [{ messageId: 'noBackslashContinuation' }],
    },
    {
      code: 'const msg = `line one\nline two`;',
      errors: [{ messageId: 'noVisualNewline' }],
    },
    {
      code: 'const msg = "line one\\nline two";',
      errors: [{ messageId: 'noEscapeNewline' }],
    },
    {
      code: 'const msg = `line one\\nline two`;',
      errors: [{ messageId: 'noEscapeNewline' }],
    },
    {
      code: 'const msg = "\\nline one\\nline two";',
      errors: [{ messageId: 'noEscapeNewline' }],
    },
    {
      code: 'const msg = "line one\\nline two\\n";',
      errors: [{ messageId: 'noEscapeNewline' }],
    },
    {
      code: 'const msg = "\\nline one\\nline two\\n";',
      errors: [{ messageId: 'noEscapeNewline' }],
    },
    {
      code: 'const msg = `\\nhello\\n${name}\\nworld\\n`;',
      errors: [{ messageId: 'noEscapeNewline' }],
    },
    {
      code: 'const msg = `hello\\n${name}\\nworld`;',
      errors: [{ messageId: 'noEscapeNewline' }],
    },
  ],
});
