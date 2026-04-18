import tsParser from '@typescript-eslint/parser';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { NoCatchUnknownAnnotation } from '../../../../rules/eslint/index.js';

import type { TestsRulesEslintTypescriptNoCatchUnknownAnnotationRuleTester } from '../../../../types/tests/rules/eslint/typescript/no-catch-unknown-annotation.test.d.ts';

/**
 * Tests - Rules - ESLint - TypeScript - No Catch Unknown Annotation.
 *
 * @since 0.14.0
 */
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester: TestsRulesEslintTypescriptNoCatchUnknownAnnotationRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parser: tsParser,
  },
});

ruleTester.run('noCatchUnknownAnnotation', NoCatchUnknownAnnotation['rule'], {
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
    {
      code: 'try {} catch (error: unknown) {}',
      options: [{ ignoreFiles: ['ignored.ts'] }],
      filename: '/path/to/ignored.ts',
    },
  ],
  invalid: [{
    code: 'try {} catch (error: unknown) {}',
    output: 'try {} catch (error) {}',
    errors: [{ messageId: 'removeCatchAnnotation' }],
  }],
});
