import type { RuleTester } from '@typescript-eslint/rule-tester';
import type { Linter } from '@typescript-eslint/utils/ts-eslint';

/**
 * Tests - Rules - ESLint - Regex - No Regex Literals.
 *
 * @since 0.14.0
 */
export type Tests_Rules_Eslint_Regex_NoRegexLiterals_TestFilePath = string;

export type Tests_Rules_Eslint_Regex_NoRegexLiterals_TestDirectory = string;

export type Tests_Rules_Eslint_Regex_NoRegexLiterals_RegexFilePath = string;

export type Tests_Rules_Eslint_Regex_NoRegexLiterals_RuleTester = RuleTester;

/**
 * Tests - Rules - ESLint - Regex - No Regex Literals - NoRegexLiterals Configuration - Accepts A Relative Existing File.
 *
 * @since 0.26.0
 */
export type Tests_Rules_Eslint_Regex_NoRegexLiterals_NoRegexLiteralsConfiguration_AcceptsARelativeExistingFile_Messages = Linter.LintMessage[];

/**
 * Tests - Rules - ESLint - Regex - No Regex Literals - NoRegexLiterals Configuration - Keeps An Empty Path Quiet.
 *
 * @since 0.26.0
 */
export type Tests_Rules_Eslint_Regex_NoRegexLiterals_NoRegexLiteralsConfiguration_KeepsAnEmptyPathQuiet_Messages = Linter.LintMessage[];

/**
 * Tests - Rules - ESLint - Regex - No Regex Literals - NoRegexLiterals Configuration - Rejects A Configured Directory.
 *
 * @since 0.26.0
 */
export type Tests_Rules_Eslint_Regex_NoRegexLiterals_NoRegexLiteralsConfiguration_RejectsAConfiguredDirectory_RegexFile = string;

/**
 * Tests - Rules - ESLint - Regex - No Regex Literals - NoRegexLiterals Configuration - Rejects A Missing Configured File.
 *
 * @since 0.26.0
 */
export type Tests_Rules_Eslint_Regex_NoRegexLiterals_NoRegexLiteralsConfiguration_RejectsAMissingConfiguredFile_RegexFile = string;

/**
 * Tests - Rules - ESLint - Regex - No Regex Literals - Verify With Regex File.
 *
 * @since 0.26.0
 */
export type Tests_Rules_Eslint_Regex_NoRegexLiterals_VerifyWithRegexFile_RegexFile = string;

export type Tests_Rules_Eslint_Regex_NoRegexLiterals_VerifyWithRegexFile_Returns = Linter.LintMessage[];

export type Tests_Rules_Eslint_Regex_NoRegexLiterals_VerifyWithRegexFile_Linter = Linter;
