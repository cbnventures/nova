/**
 * Toolkit - Vitest Reporters - Options.
 *
 * @since 0.50.0
 */
export type Toolkit_VitestReporters_Runner_Options_Returns_GithubActionsOptions_JobSummary_Enabled = false;

export type Toolkit_VitestReporters_Runner_Options_Returns_GithubActionsOptions_JobSummary = {
  enabled: Toolkit_VitestReporters_Runner_Options_Returns_GithubActionsOptions_JobSummary_Enabled;
};

export type Toolkit_VitestReporters_Runner_Options_Returns_GithubActionsOptions = {
  jobSummary: Toolkit_VitestReporters_Runner_Options_Returns_GithubActionsOptions_JobSummary;
};

export type Toolkit_VitestReporters_Runner_Options_Returns = [
  'default',
  ['github-actions', Toolkit_VitestReporters_Runner_Options_Returns_GithubActionsOptions],
];
