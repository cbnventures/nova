/**
 * Tests - Rules - Vitest - Dotenv.
 *
 * @since 0.20.0
 */
export type Tests_Rules_Vitest_Dotenv_FixtureRoot = string;

export type Tests_Rules_Vitest_Dotenv_ViolationKey = string;

export type Tests_Rules_Vitest_Dotenv_ViolationReason = string;

export type Tests_Rules_Vitest_Dotenv_Violation = {
  key: Tests_Rules_Vitest_Dotenv_ViolationKey;
  reason: Tests_Rules_Vitest_Dotenv_ViolationReason;
};

export type Tests_Rules_Vitest_Dotenv_PresentViolations = Tests_Rules_Vitest_Dotenv_Violation[];

export type Tests_Rules_Vitest_Dotenv_MissingViolations = Tests_Rules_Vitest_Dotenv_Violation[];
