import {
  strictEqual,
  throws,
} from 'node:assert/strict';
import {
  dirname,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';

import { RuleTester } from '@typescript-eslint/rule-tester';
import { Linter } from '@typescript-eslint/utils/ts-eslint';
import { afterAll, describe, it } from 'vitest';

import { NoSharedTypeImport } from '../../../../rules/eslint/index.js';

import type {
  Tests_Rules_Eslint_Typescript_NoSharedTypeImport_NoSharedTypeImportConfiguration_AcceptsARelativeExistingFile_Messages,
  Tests_Rules_Eslint_Typescript_NoSharedTypeImport_NoSharedTypeImportConfiguration_KeepsAnEmptyArrayQuiet_Messages,
  Tests_Rules_Eslint_Typescript_NoSharedTypeImport_NoSharedTypeImportConfiguration_RejectsAConfiguredDirectory_SharedFiles,
  Tests_Rules_Eslint_Typescript_NoSharedTypeImport_NoSharedTypeImportConfiguration_RejectsAMissingConfiguredFile_SharedFiles,
  Tests_Rules_Eslint_Typescript_NoSharedTypeImport_RuleTester,
  Tests_Rules_Eslint_Typescript_NoSharedTypeImport_SharedFilePath,
  Tests_Rules_Eslint_Typescript_NoSharedTypeImport_TestDirectory,
  Tests_Rules_Eslint_Typescript_NoSharedTypeImport_TestFilePath,
  Tests_Rules_Eslint_Typescript_NoSharedTypeImport_VerifyWithSharedFiles_Linter,
  Tests_Rules_Eslint_Typescript_NoSharedTypeImport_VerifyWithSharedFiles_Returns,
  Tests_Rules_Eslint_Typescript_NoSharedTypeImport_VerifyWithSharedFiles_SharedFiles,
} from '../../../../types/tests/rules/eslint/typescript/no-shared-type-import.test.d.ts';

/**
 * Tests - Rules - ESLint - TypeScript - No Shared Type Import.
 *
 * @since 0.14.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const testFilePath: Tests_Rules_Eslint_Typescript_NoSharedTypeImport_TestFilePath = fileURLToPath(import.meta.url);
const testDirectory: Tests_Rules_Eslint_Typescript_NoSharedTypeImport_TestDirectory = dirname(testFilePath);
const sharedFilePath: Tests_Rules_Eslint_Typescript_NoSharedTypeImport_SharedFilePath = resolve(testDirectory, '../../../../types/shared.d.ts');

const ruleTester: Tests_Rules_Eslint_Typescript_NoSharedTypeImport_RuleTester = new RuleTester({
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
        sharedFiles: [sharedFilePath],
        ignoreFiles: [],
      }],
    },
    {
      code: 'import type { EntryCategory } from "@/types/shared.d.ts";',
      filename: 'src/types/cli/runner.d.ts',
      options: [{
        sharedFiles: [sharedFilePath],
        ignoreFiles: [],
      }],
    },
    {
      code: 'import type { Something } from "@/types/shared.d.ts";',
      filename: 'src/types/shared.d.ts',
      options: [{
        sharedFiles: [sharedFilePath],
        ignoreFiles: [],
      }],
    },
    {
      code: 'import { Logger } from "@/toolkit/index.js";',
      filename: 'src/cli/runner.ts',
      options: [{
        sharedFiles: [sharedFilePath],
        ignoreFiles: [],
      }],
    },
    {
      code: 'import type { EntryCategory } from "@/types/shared.d.ts";',
      filename: 'src/cli/runner.ts',
      options: [{
        sharedFiles: [sharedFilePath],
        ignoreFiles: ['runner.ts'],
      }],
    },
    {
      code: 'import type { EntryCategory } from "@/types/shared.d.ts";',
      filename: 'src/cli/runner.ts',
      options: [{
        sharedFiles: [],
        ignoreFiles: [],
      }],
    },
  ],
  invalid: [
    {
      code: 'import type { EntryCategory } from "@/types/shared.d.ts";',
      filename: 'src/cli/runner.ts',
      options: [{
        sharedFiles: [sharedFilePath],
        ignoreFiles: [],
      }],
      errors: [{ messageId: 'noSharedTypeImport' }],
    },
    {
      code: 'import type { EntryCategory } from "@/types/shared.d.ts";',
      filename: '/project/src/cli/runner.ts',
      options: [{
        sharedFiles: [sharedFilePath],
        ignoreFiles: [],
      }],
      errors: [{ messageId: 'noSharedTypeImport' }],
    },
  ],
});

/**
 * Tests - Rules - ESLint - TypeScript - No Shared Type Import - Verify With Shared Files.
 *
 * Runs the rule through ESLint with a controlled working directory so configuration
 * path validation can be tested independently from import reporting.
 *
 * @param {Tests_Rules_Eslint_Typescript_NoSharedTypeImport_VerifyWithSharedFiles_SharedFiles} sharedFiles - Shared files.
 *
 * @returns {Tests_Rules_Eslint_Typescript_NoSharedTypeImport_VerifyWithSharedFiles_Returns}
 *
 * @since 0.26.0
 */
function verifyWithSharedFiles(sharedFiles: Tests_Rules_Eslint_Typescript_NoSharedTypeImport_VerifyWithSharedFiles_SharedFiles): Tests_Rules_Eslint_Typescript_NoSharedTypeImport_VerifyWithSharedFiles_Returns {
  const linter: Tests_Rules_Eslint_Typescript_NoSharedTypeImport_VerifyWithSharedFiles_Linter = new Linter({
    configType: 'flat',
    cwd: testDirectory,
  });

  return linter.verify('const value = "text";', [{
    files: ['**/*.js'],
    plugins: {
      '@cbnventures/nova': {
        rules: {
          'no-shared-type-import': NoSharedTypeImport['rule'],
        },
      },
    },
    rules: {
      '@cbnventures/nova/no-shared-type-import': [
        'error',
        {
          ignoreFiles: [],
          sharedFiles,
        },
      ],
    },
  }], {
    filename: 'source.js',
  });
}

/**
 * Tests - Rules - ESLint - TypeScript - No Shared Type Import - NoSharedTypeImport Configuration.
 *
 * @since 0.26.0
 */
describe('noSharedTypeImport configuration', () => {
  it('keeps an empty array quiet', () => {
    const messages: Tests_Rules_Eslint_Typescript_NoSharedTypeImport_NoSharedTypeImportConfiguration_KeepsAnEmptyArrayQuiet_Messages = verifyWithSharedFiles([]);

    strictEqual(messages.length, 0);

    return;
  });

  it('accepts a relative existing file', () => {
    const messages: Tests_Rules_Eslint_Typescript_NoSharedTypeImport_NoSharedTypeImportConfiguration_AcceptsARelativeExistingFile_Messages = verifyWithSharedFiles(['../../../../types/shared.d.ts']);

    strictEqual(messages.length, 0);

    return;
  });

  it('rejects a missing configured file', () => {
    const sharedFiles: Tests_Rules_Eslint_Typescript_NoSharedTypeImport_NoSharedTypeImportConfiguration_RejectsAMissingConfiguredFile_SharedFiles = ['missing-shared.d.ts'];

    throws(() => {
      verifyWithSharedFiles(sharedFiles);

      return;
    });

    return;
  });

  it('rejects a configured directory', () => {
    const sharedFiles: Tests_Rules_Eslint_Typescript_NoSharedTypeImport_NoSharedTypeImportConfiguration_RejectsAConfiguredDirectory_SharedFiles = ['.'];

    throws(() => {
      verifyWithSharedFiles(sharedFiles);

      return;
    });

    return;
  });

  return;
});
