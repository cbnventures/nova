import { test } from 'node:test';

import { RuleTester } from '@typescript-eslint/rule-tester';

import { noSharedTypeImport } from '@/rules/eslint/index.js';

/**
 * No shared type import.
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

ruleTester.run('noSharedTypeImport', noSharedTypeImport, {
  valid: [
    {
      code: 'import type { RunnerParseEntries } from "@/types/cli/runner.d.ts";',
      filename: 'src/cli/runner.ts',
      options: [{ sharedFiles: ['shared.d.ts'] }],
    },
    {
      code: 'import type { EntryCategory } from "@/types/shared.d.ts";',
      filename: 'src/types/cli/runner.d.ts',
      options: [{ sharedFiles: ['shared.d.ts'] }],
    },
    {
      code: 'import type { Something } from "@/types/shared.d.ts";',
      filename: 'src/types/shared.d.ts',
      options: [{ sharedFiles: ['shared.d.ts'] }],
    },
    {
      code: 'import { Logger } from "@/toolkit/index.js";',
      filename: 'src/cli/runner.ts',
      options: [{ sharedFiles: ['shared.d.ts'] }],
    },
  ],
  invalid: [
    {
      code: 'import type { EntryCategory } from "@/types/shared.d.ts";',
      filename: 'src/cli/runner.ts',
      options: [{ sharedFiles: ['shared.d.ts'] }],
      errors: [{ messageId: 'noSharedTypeImport' }],
    },
    {
      code: 'import type { EntryCategory } from "@/types/shared.d.ts";',
      filename: '/project/src/cli/runner.ts',
      options: [{ sharedFiles: ['shared.d.ts'] }],
      errors: [{ messageId: 'noSharedTypeImport' }],
    },
  ],
});
