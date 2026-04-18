import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireNamingConvention } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintConventionsRequireNamingConventionRuleTester } from '../../../../types/tests/rules/eslint/conventions/require-naming-convention.test.d.ts';

/**
 * Tests - Rules - ESLint - Conventions - Require Naming Convention.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintConventionsRequireNamingConventionRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireNamingConvention', RequireNamingConvention['rule'], {
  valid: [
    {
      code: 'const MAX_RETRIES = 5;',
    },
    {
      code: 'const API_URL = "https://api.example.com";',
    },
    {
      code: 'const IS_PRODUCTION = true;',
    },
    {
      code: 'const items = [1, 2, 3];',
    },
    {
      code: 'const config = { timeout: 30 };',
    },
    {
      code: 'let retryCount = 0;',
    },
    {
      code: 'function processItems(inputData) {}',
    },

    // React component — PascalCase function allowed.
    {
      code: 'function MyComponent() { return null; }',
    },

    // Constructor variable — PascalCase allowed when used with new.
    {
      code: 'const MyClass = getConstructor(); const instance = new MyClass();',
    },
    {
      code: 'const fetchUser = (userId) => {};',
    },
    {
      code: 'class UserService {}',
    },
    {
      code: 'const maxRetries = 5;',
    },
    {
      code: 'const max_retries = 3;',
      options: [{
        ignoreFiles: ['ignored-file.ts'],
        variable: 'camelCase',
        constructorVariable: 'PascalCase',
        constant: 'UPPER_SNAKE_CASE',
        function: 'camelCase',
        parameter: 'camelCase',
        reactComponent: 'PascalCase',
        classDeclaration: 'PascalCase',
        classProperty: 'camelCase',
        classMethod: 'camelCase',
        typeAlias: 'PascalCase',
        interface: 'PascalCase',
        enum: 'PascalCase',
        enumMember: 'PascalCase',
      }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: 'const max_retries = 3;',
      errors: [{ messageId: 'wrongCasing' }],
    },
    {
      code: 'function get_data() {}',
      errors: [{ messageId: 'wrongCasing' }],
    },
    {
      code: 'class myClass {}',
      errors: [{ messageId: 'wrongCasing' }],
    },
  ],
});
