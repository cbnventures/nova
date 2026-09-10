import type { vi } from 'vitest';

import type { Shared_ScaffoldNonInteractiveWorkspaceOptions } from '../../shared.d.ts';

/**
 * Tests - CLI - Index - Runner Mocks.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_RunnerMocks_GithubSyncPoliciesRun = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Index_RunnerMocks_LicenseUpdateCopyrightRun = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Index_RunnerMocks_ReadMeUpdateHeaderRun = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Index_RunnerMocks_ScaffoldAppExpressjsRun = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Index_RunnerMocks_ScaffoldAppNextjsRun = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Index_RunnerMocks_ScaffoldAppViteRun = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Index_RunnerMocks_ScaffoldAppWorkersRun = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Index_RunnerMocks_ScaffoldDocsDocusaurusRun = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Index_RunnerMocks_ScaffoldStarterBaseRun = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Index_RunnerMocks = {
  githubSyncPoliciesRun: Tests_Cli_Index_RunnerMocks_GithubSyncPoliciesRun;
  licenseUpdateCopyrightRun: Tests_Cli_Index_RunnerMocks_LicenseUpdateCopyrightRun;
  readMeUpdateHeaderRun: Tests_Cli_Index_RunnerMocks_ReadMeUpdateHeaderRun;
  scaffoldAppExpressjsRun: Tests_Cli_Index_RunnerMocks_ScaffoldAppExpressjsRun;
  scaffoldAppNextjsRun: Tests_Cli_Index_RunnerMocks_ScaffoldAppNextjsRun;
  scaffoldAppViteRun: Tests_Cli_Index_RunnerMocks_ScaffoldAppViteRun;
  scaffoldAppWorkersRun: Tests_Cli_Index_RunnerMocks_ScaffoldAppWorkersRun;
  scaffoldDocsDocusaurusRun: Tests_Cli_Index_RunnerMocks_ScaffoldDocsDocusaurusRun;
  scaffoldStarterBaseRun: Tests_Cli_Index_RunnerMocks_ScaffoldStarterBaseRun;
};

/**
 * Tests - CLI - Index - CLI Recipe GitHub Sync Policies JS.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_CliRecipeGithubSyncPoliciesJs_MockedRunner_Run = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Index_CliRecipeGithubSyncPoliciesJs_MockedRunner = {
  run: Tests_Cli_Index_CliRecipeGithubSyncPoliciesJs_MockedRunner_Run;
};

/**
 * Tests - CLI - Index - CLI Recipe License Update Copyright JS.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_CliRecipeLicenseUpdateCopyrightJs_MockedRunner_Run = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Index_CliRecipeLicenseUpdateCopyrightJs_MockedRunner = {
  run: Tests_Cli_Index_CliRecipeLicenseUpdateCopyrightJs_MockedRunner_Run;
};

/**
 * Tests - CLI - Index - CLI Recipe Read Me Update Header JS.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_CliRecipeReadMeUpdateHeaderJs_MockedRunner_Run = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Index_CliRecipeReadMeUpdateHeaderJs_MockedRunner = {
  run: Tests_Cli_Index_CliRecipeReadMeUpdateHeaderJs_MockedRunner_Run;
};

/**
 * Tests - CLI - Index - CLI Scaffold App Express.js JS.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_CliScaffoldAppExpressjsJs_MockedRunner_Run = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Index_CliScaffoldAppExpressjsJs_MockedRunner = {
  run: Tests_Cli_Index_CliScaffoldAppExpressjsJs_MockedRunner_Run;
};

/**
 * Tests - CLI - Index - CLI Scaffold App Next.js JS.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_CliScaffoldAppNextjsJs_MockedRunner_Run = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Index_CliScaffoldAppNextjsJs_MockedRunner = {
  run: Tests_Cli_Index_CliScaffoldAppNextjsJs_MockedRunner_Run;
};

/**
 * Tests - CLI - Index - CLI Scaffold App Vite JS.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_CliScaffoldAppViteJs_MockedRunner_Run = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Index_CliScaffoldAppViteJs_MockedRunner = {
  run: Tests_Cli_Index_CliScaffoldAppViteJs_MockedRunner_Run;
};

/**
 * Tests - CLI - Index - CLI Scaffold App Workers JS.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_CliScaffoldAppWorkersJs_MockedRunner_Run = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Index_CliScaffoldAppWorkersJs_MockedRunner = {
  run: Tests_Cli_Index_CliScaffoldAppWorkersJs_MockedRunner_Run;
};

/**
 * Tests - CLI - Index - CLI Scaffold Docs Docusaurus JS.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_CliScaffoldDocsDocusaurusJs_MockedRunner_Run = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Index_CliScaffoldDocsDocusaurusJs_MockedRunner = {
  run: Tests_Cli_Index_CliScaffoldDocsDocusaurusJs_MockedRunner_Run;
};

/**
 * Tests - CLI - Index - CLI Scaffold Starter Base JS.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_CliScaffoldStarterBaseJs_MockedRunner_Run = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Index_CliScaffoldStarterBaseJs_MockedRunner = {
  run: Tests_Cli_Index_CliScaffoldStarterBaseJs_MockedRunner_Run;
};

/**
 * Tests - CLI - Index - Nested Recipe Options.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_NestedRecipeOptions_OriginalArgv = string[];

/**
 * Tests - CLI - Index - Nested Recipe Options - Passes Dry Run And Replace File To A Direct License Recipe.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_NestedRecipeOptions_PassesDryRunAndReplaceFileToADirectLicenseRecipe_ExpectedOptions_DryRun = true;

export type Tests_Cli_Index_NestedRecipeOptions_PassesDryRunAndReplaceFileToADirectLicenseRecipe_ExpectedOptions_ReplaceFile = true;

export type Tests_Cli_Index_NestedRecipeOptions_PassesDryRunAndReplaceFileToADirectLicenseRecipe_ExpectedOptions = {
  dryRun: Tests_Cli_Index_NestedRecipeOptions_PassesDryRunAndReplaceFileToADirectLicenseRecipe_ExpectedOptions_DryRun;
  replaceFile: Tests_Cli_Index_NestedRecipeOptions_PassesDryRunAndReplaceFileToADirectLicenseRecipe_ExpectedOptions_ReplaceFile;
};

/**
 * Tests - CLI - Index - Nested Recipe Options - Passes Dry Run And Replace File To A Direct README Recipe.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_NestedRecipeOptions_PassesDryRunAndReplaceFileToADirectREADMERecipe_ExpectedOptions_DryRun = true;

export type Tests_Cli_Index_NestedRecipeOptions_PassesDryRunAndReplaceFileToADirectREADMERecipe_ExpectedOptions_ReplaceFile = true;

export type Tests_Cli_Index_NestedRecipeOptions_PassesDryRunAndReplaceFileToADirectREADMERecipe_ExpectedOptions = {
  dryRun: Tests_Cli_Index_NestedRecipeOptions_PassesDryRunAndReplaceFileToADirectREADMERecipe_ExpectedOptions_DryRun;
  replaceFile: Tests_Cli_Index_NestedRecipeOptions_PassesDryRunAndReplaceFileToADirectREADMERecipe_ExpectedOptions_ReplaceFile;
};

/**
 * Tests - CLI - Index - Nested Recipe Options - Passes Dry Run To A Direct GitHub Recipe.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_NestedRecipeOptions_PassesDryRunToADirectGitHubRecipe_ExpectedOptions_DryRun = true;

export type Tests_Cli_Index_NestedRecipeOptions_PassesDryRunToADirectGitHubRecipe_ExpectedOptions = {
  dryRun: Tests_Cli_Index_NestedRecipeOptions_PassesDryRunToADirectGitHubRecipe_ExpectedOptions_DryRun;
};

/**
 * Tests - CLI - Index - Scaffold Options.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_ScaffoldOptions_OriginalArgv = string[];

/**
 * Tests - CLI - Index - Scaffold Options - Passes Complete Non Interactive Base Answers.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveBaseAnswers_ExpectedOptions_Name = string;

export type Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveBaseAnswers_ExpectedOptions_NonInteractive = true;

export type Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveBaseAnswers_ExpectedOptions_Output = string;

export type Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveBaseAnswers_ExpectedOptions = {
  name: Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveBaseAnswers_ExpectedOptions_Name;
  nonInteractive: Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveBaseAnswers_ExpectedOptions_NonInteractive;
  output: Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveBaseAnswers_ExpectedOptions_Output;
};

/**
 * Tests - CLI - Index - Scaffold Options - Passes Complete Non Interactive Docusaurus Answers.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveDocusaurusAnswers_ExpectedOptions_Name = string;

export type Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveDocusaurusAnswers_ExpectedOptions_NonInteractive = true;

export type Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveDocusaurusAnswers_ExpectedOptions_Output = string;

export type Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveDocusaurusAnswers_ExpectedOptions_Preset = string;

export type Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveDocusaurusAnswers_ExpectedOptions_WorkspaceName = string;

export type Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveDocusaurusAnswers_ExpectedOptions = {
  name: Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveDocusaurusAnswers_ExpectedOptions_Name;
  nonInteractive: Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveDocusaurusAnswers_ExpectedOptions_NonInteractive;
  output: Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveDocusaurusAnswers_ExpectedOptions_Output;
  preset: Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveDocusaurusAnswers_ExpectedOptions_Preset;
  workspaceName: Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveDocusaurusAnswers_ExpectedOptions_WorkspaceName;
};

/**
 * Tests - CLI - Index - Scaffold Options - Passes Complete Non Interactive Express.js Answers.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveExpressJsAnswers_ExpectedOptions = Shared_ScaffoldNonInteractiveWorkspaceOptions;

/**
 * Tests - CLI - Index - Scaffold Options - Passes Complete Non Interactive Next.js Answers.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveNextJsAnswers_ExpectedOptions = Shared_ScaffoldNonInteractiveWorkspaceOptions;

/**
 * Tests - CLI - Index - Scaffold Options - Passes Complete Non Interactive Vite Answers.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveViteAnswers_ExpectedOptions = Shared_ScaffoldNonInteractiveWorkspaceOptions;

/**
 * Tests - CLI - Index - Scaffold Options - Passes Complete Non Interactive Workers Answers.
 *
 * @since 0.26.0
 */
export type Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveWorkersAnswers_ExpectedOptions = Shared_ScaffoldNonInteractiveWorkspaceOptions;
