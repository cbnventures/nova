import { test } from 'node:test';

import tsParser from '@typescript-eslint/parser';
import { RuleTester } from '@typescript-eslint/rule-tester';

import { noCatchUnknownAnnotation } from '@/rules/eslint/index.js';

/**
 * No catch unknown annotation.
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
    parser: tsParser,
  },
});

ruleTester.run('noCatchUnknownAnnotation', noCatchUnknownAnnotation, {
  valid: [
    {
      code: 'try {} catch (error) {}',
    },
    {
      code: 'try {} catch {}',
    },
    {
      code: 'try {} catch (error: Error) {}',
    },
  ],
  invalid: [
    {
      code: 'try {} catch (error: unknown) {}',
      errors: [{ messageId: 'removeCatchAnnotation' }],
    },
  ],
});
