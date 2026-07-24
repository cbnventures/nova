import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireNodeProtocol } from '../../../../rules/eslint/index.js';

import type { Tests_Rules_Eslint_Conventions_RequireNodeProtocol_RuleTester } from '../../../../types/tests/rules/eslint/conventions/require-node-protocol.test.d.ts';

/**
 * Tests - Rules - ESLint - Conventions - Require Node Protocol.
 *
 * @since 0.21.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: Tests_Rules_Eslint_Conventions_RequireNodeProtocol_RuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireNodeProtocol', RequireNodeProtocol['rule'], {
  valid: [
    {
      code: 'import fs from "node:fs";',
    },
    {
      code: 'import { readFile } from "node:fs/promises";',
    },
    {
      code: 'export { readFile } from "node:fs/promises";',
    },
    {
      code: 'export * from "node:path";',
    },
    {
      code: 'const mod = import("node:os");',
    },
    {
      code: 'import express from "express";',
    },
    {
      code: 'import { helper } from "./helper.js";',
    },
    {
      code: 'import fs from "fs";',
      options: [{ ignoreFiles: ['ignored-file.ts'] }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: 'import fs from "fs";',
      output: 'import fs from "node:fs";',
      errors: [{ messageId: 'requireNodeProtocol' }],
    },
    {
      code: 'import { readFile } from "fs/promises";',
      output: 'import { readFile } from "node:fs/promises";',
      errors: [{ messageId: 'requireNodeProtocol' }],
    },
    {
      code: 'export { readFile } from "fs/promises";',
      output: 'export { readFile } from "node:fs/promises";',
      errors: [{ messageId: 'requireNodeProtocol' }],
    },
    {
      code: 'export * from "path";',
      output: 'export * from "node:path";',
      errors: [{ messageId: 'requireNodeProtocol' }],
    },
    {
      code: 'const mod = import("os");',
      output: 'const mod = import("node:os");',
      errors: [{ messageId: 'requireNodeProtocol' }],
    },
  ],
});
