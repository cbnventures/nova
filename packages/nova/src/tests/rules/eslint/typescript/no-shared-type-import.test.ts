import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoSharedTypeImport } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintTypescriptNoSharedTypeImportRuleTester } from '../../../../types/tests/rules/eslint/typescript/no-shared-type-import.test.d.ts';

/**
 * Tests - Rules - ESLint - TypeScript - No Shared Type Import.
 *
 * @since 0.14.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintTypescriptNoSharedTypeImportRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('noSharedTypeImport', NoSharedTypeImport['rule'], {
  valid: [
    {
      code: 'import type { RunnerParseEntries } from "@/types/cli/runner.d.ts";',
      filename: 'src/cli/runner.ts',
      options: [{
        sharedFiles: ['shared.d.ts'], ignoreFiles: [],
      }],
    },
    {
      code: 'import type { EntryCategory } from "@/types/shared.d.ts";',
      filename: 'src/types/cli/runner.d.ts',
      options: [{
        sharedFiles: ['shared.d.ts'], ignoreFiles: [],
      }],
    },
    {
      code: 'import type { Something } from "@/types/shared.d.ts";',
      filename: 'src/types/shared.d.ts',
      options: [{
        sharedFiles: ['shared.d.ts'], ignoreFiles: [],
      }],
    },
    {
      code: 'import { Logger } from "@/toolkit/index.js";',
      filename: 'src/cli/runner.ts',
      options: [{
        sharedFiles: ['shared.d.ts'], ignoreFiles: [],
      }],
    },
    {
      code: 'import type { EntryCategory } from "@/types/shared.d.ts";',
      filename: 'src/cli/runner.ts',
      options: [{
        sharedFiles: ['shared.d.ts'], ignoreFiles: ['runner.ts'],
      }],
    },
  ],
  invalid: [
    {
      code: 'import type { EntryCategory } from "@/types/shared.d.ts";',
      filename: 'src/cli/runner.ts',
      options: [{
        sharedFiles: ['shared.d.ts'], ignoreFiles: [],
      }],
      errors: [{ messageId: 'noSharedTypeImport' }],
    },
    {
      code: 'import type { EntryCategory } from "@/types/shared.d.ts";',
      filename: '/project/src/cli/runner.ts',
      options: [{
        sharedFiles: ['shared.d.ts'], ignoreFiles: [],
      }],
      errors: [{ messageId: 'noSharedTypeImport' }],
    },
  ],
});
