import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireImportOrder } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintFormattingRequireImportOrderRuleTester } from '../../../../types/tests/rules/eslint/formatting/require-import-order.test.d.ts';

/**
 * Tests - Rules - ESLint - Formatting - Require Import Order.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintFormattingRequireImportOrderRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireImportOrder', RequireImportOrder['rule'], {
  valid: [
    {
      code: [
        'import fs from "node:fs";',
        '',
        'import chalk from "chalk";',
        '',
        'import { helper } from "./helper.js";',
      ].join('\n'),
    },
    {
      code: [
        'import chalk from "chalk";',
        '',
        'import { helper } from "./helper.js";',
      ].join('\n'),
    },
    {
      code: [
        'import fs from "node:fs";',
        'import path from "node:path";',
        '',
        'import chalk from "chalk";',
      ].join('\n'),
    },
    {
      code: 'import chalk from "chalk";',
    },
    {
      code: [
        'import chalk from "chalk";',
        'import fs from "node:fs";',
      ].join('\n'),
      options: [{ ignoreFiles: ['ignored-file.ts'] }],
      filename: '/path/to/ignored-file.ts',
    },
    {
      code: [
        'import fs from "fs";',
        'import path from "path";',
        '',
        'import chalk from "chalk";',
      ].join('\n'),
    },
    {
      code: [
        'import { readFile } from "fs/promises";',
        '',
        'import chalk from "chalk";',
      ].join('\n'),
    },
    {
      code: [
        'import { spawn } from "child_process";',
        'import { promises as fs } from "fs";',
        'import { platform } from "os";',
        'import { resolve } from "path";',
        '',
        'import chalk from "chalk";',
        '',
        'import { Logger } from "./logger.js";',
      ].join('\n'),
    },
    {
      code: [
        'import type { Dirent } from "fs";',
        '',
        'import type { PromptObject } from "prompts";',
        '',
        'import type { Logger } from "./logger.js";',
      ].join('\n'),
    },
    {
      code: [
        'import type { PromptObject } from "prompts";',
        '',
        'import type { Logger } from "./logger.js";',
      ].join('\n'),
    },
    {
      code: [
        'import chalk from "chalk";',
        '',
        'import { Logger } from "./logger.js";',
        '',
        'import type { PromptObject } from "prompts";',
        '',
        'import type { LoggerType } from "./logger.d.ts";',
      ].join('\n'),
    },
  ],
  invalid: [
    {
      code: [
        'import chalk from "chalk";',
        'import fs from "node:fs";',
      ].join('\n'),
      errors: [{ messageId: 'importOrder' }],
    },
    {
      code: [
        'import { helper } from "./helper.js";',
        'import chalk from "chalk";',
      ].join('\n'),
      errors: [{ messageId: 'importOrder' }],
    },
    {
      code: [
        'import fs from "node:fs";',
        'import chalk from "chalk";',
      ].join('\n'),
      errors: [{ messageId: 'importOrder' }],
    },
    {
      code: [
        'import path from "node:path";',
        'import fs from "node:fs";',
        '',
        'import chalk from "chalk";',
      ].join('\n'),
      errors: [{ messageId: 'importOrder' }],
    },
    {
      code: [
        'import chalk from "chalk";',
        '',
        'import fs from "fs";',
      ].join('\n'),
      errors: [{ messageId: 'importOrder' }],
    },
    {
      code: [
        'import chalk from "chalk";',
        'import path from "path";',
      ].join('\n'),
      errors: [{ messageId: 'importOrder' }],
    },
    {
      code: [
        'import fs from "fs";',
        'import chalk from "chalk";',
      ].join('\n'),
      errors: [{ messageId: 'importOrder' }],
    },
    {
      code: [
        'import type { Logger } from "./logger.js";',
        'import type { PromptObject } from "prompts";',
      ].join('\n'),
      errors: [{ messageId: 'importOrder' }],
    },
    {
      code: [
        'import type { Logger } from "./logger.js";',
        '',
        'import type { Dirent } from "fs";',
      ].join('\n'),
      errors: [{ messageId: 'importOrder' }],
    },
    {
      code: ['import { resolve, join } from "path";'].join('\n'),
      errors: [{ messageId: 'specifierOrder' }],
    },
    {
      code: ['import type { Zebra, Alpha } from "./types.d.ts";'].join('\n'),
      errors: [{ messageId: 'specifierOrder' }],
    },
  ],
});
