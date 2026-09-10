import type { RuleTester } from '@typescript-eslint/rule-tester';
import type { Linter } from '@typescript-eslint/utils/ts-eslint';

/**
 * Tests - Rules - ESLint - TypeScript - No Shared Type Import.
 *
 * @since 0.14.0
 */
export type Tests_Rules_Eslint_Typescript_NoSharedTypeImport_TestFilePath = string;

export type Tests_Rules_Eslint_Typescript_NoSharedTypeImport_TestDirectory = string;

export type Tests_Rules_Eslint_Typescript_NoSharedTypeImport_SharedFilePath = string;

export type Tests_Rules_Eslint_Typescript_NoSharedTypeImport_RuleTester = RuleTester;

/**
 * Tests - Rules - ESLint - TypeScript - No Shared Type Import - NoSharedTypeImport Configuration - Accepts A Relative Existing File.
 *
 * @since 0.26.0
 */
export type Tests_Rules_Eslint_Typescript_NoSharedTypeImport_NoSharedTypeImportConfiguration_AcceptsARelativeExistingFile_Messages = Linter.LintMessage[];

/**
 * Tests - Rules - ESLint - TypeScript - No Shared Type Import - NoSharedTypeImport Configuration - Keeps An Empty Array Quiet.
 *
 * @since 0.26.0
 */
export type Tests_Rules_Eslint_Typescript_NoSharedTypeImport_NoSharedTypeImportConfiguration_KeepsAnEmptyArrayQuiet_Messages = Linter.LintMessage[];

/**
 * Tests - Rules - ESLint - TypeScript - No Shared Type Import - NoSharedTypeImport Configuration - Rejects A Configured Directory.
 *
 * @since 0.26.0
 */
export type Tests_Rules_Eslint_Typescript_NoSharedTypeImport_NoSharedTypeImportConfiguration_RejectsAConfiguredDirectory_SharedFiles = string[];

/**
 * Tests - Rules - ESLint - TypeScript - No Shared Type Import - NoSharedTypeImport Configuration - Rejects A Missing Configured File.
 *
 * @since 0.26.0
 */
export type Tests_Rules_Eslint_Typescript_NoSharedTypeImport_NoSharedTypeImportConfiguration_RejectsAMissingConfiguredFile_SharedFiles = string[];

/**
 * Tests - Rules - ESLint - TypeScript - No Shared Type Import - Verify With Shared Files.
 *
 * @since 0.26.0
 */
export type Tests_Rules_Eslint_Typescript_NoSharedTypeImport_VerifyWithSharedFiles_SharedFiles = string[];

export type Tests_Rules_Eslint_Typescript_NoSharedTypeImport_VerifyWithSharedFiles_Returns = Linter.LintMessage[];

export type Tests_Rules_Eslint_Typescript_NoSharedTypeImport_VerifyWithSharedFiles_Linter = Linter;
