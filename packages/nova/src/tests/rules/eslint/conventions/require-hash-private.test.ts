import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { RequireHashPrivate } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintConventionsRequireHashPrivateRuleTester } from '../../../../types/tests/rules/eslint/conventions/require-hash-private.test.d.ts';

/**
 * Tests - Rules - ESLint - Conventions - Require Hash Private.
 *
 * @since 0.15.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintConventionsRequireHashPrivateRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('requireHashPrivate', RequireHashPrivate['rule'], {
  valid: [
    {
      code: [
        'class MyClass {',
        '  #secret = 42;',
        '}',
      ].join('\n'),
    },
    {
      code: [
        'class MyClass {',
        '  #doWork() {}',
        '}',
      ].join('\n'),
    },
    {
      code: [
        'class MyClass {',
        '  public name = "hello";',
        '}',
      ].join('\n'),
    },
    {
      code: [
        'class MyClass {',
        '  protected value = 10;',
        '}',
      ].join('\n'),
    },
    {
      code: [
        'class MyClass {',
        '  private secret = 42;',
        '}',
      ].join('\n'),
      options: [{
        ignoreFiles: ['ignored-file.ts'], skipMethods: true,
      }],
      filename: '/path/to/ignored-file.ts',
    },
  ],
  invalid: [
    {
      code: [
        'class MyClass {',
        '  private secret = 42;',
        '}',
      ].join('\n'),
      errors: [{ messageId: 'requireHashPrivate' }],
    },
    {
      code: [
        'class MyClass {',
        '  private doWork() {}',
        '}',
      ].join('\n'),
      options: [{
        ignoreFiles: [],
        skipMethods: false,
      }],
      errors: [{ messageId: 'requireHashPrivate' }],
    },
    {
      code: [
        'class MyClass {',
        '  private name = "hello";',
        '  private getValue() { return 1; }',
        '}',
      ].join('\n'),
      options: [{
        ignoreFiles: [],
        skipMethods: false,
      }],
      errors: [
        { messageId: 'requireHashPrivate' },
        { messageId: 'requireHashPrivate' },
      ],
    },
  ],
});
