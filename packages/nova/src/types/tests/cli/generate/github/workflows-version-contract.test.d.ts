import type {
  Shared_BlueprintConfigWorkflow,
  Shared_NovaConfig_Workspaces,
} from '../../../../shared.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Workflows Version Contract.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Generate_Github_WorkflowsVersionContract_Workspaces = Shared_NovaConfig_Workspaces;

export type Tests_Cli_Generate_Github_WorkflowsVersionContract_RawWorkflows = unknown[];

export type Tests_Cli_Generate_Github_WorkflowsVersionContract_SemverResult_Workflows = Shared_BlueprintConfigWorkflow[];

export type Tests_Cli_Generate_Github_WorkflowsVersionContract_SemverResult_Diagnostic_Severity = 'error';

export type Tests_Cli_Generate_Github_WorkflowsVersionContract_SemverResult_Diagnostic_Message = string;

export type Tests_Cli_Generate_Github_WorkflowsVersionContract_SemverResult_Diagnostic = {
  severity: Tests_Cli_Generate_Github_WorkflowsVersionContract_SemverResult_Diagnostic_Severity;
  message: Tests_Cli_Generate_Github_WorkflowsVersionContract_SemverResult_Diagnostic_Message;
};

export type Tests_Cli_Generate_Github_WorkflowsVersionContract_SemverResult_Diagnostics = Tests_Cli_Generate_Github_WorkflowsVersionContract_SemverResult_Diagnostic[];

export type Tests_Cli_Generate_Github_WorkflowsVersionContract_SemverResult = {
  workflows: Tests_Cli_Generate_Github_WorkflowsVersionContract_SemverResult_Workflows;
  diagnostics: Tests_Cli_Generate_Github_WorkflowsVersionContract_SemverResult_Diagnostics;
};

export type Tests_Cli_Generate_Github_WorkflowsVersionContract_CalverResult_Workflows = Shared_BlueprintConfigWorkflow[];

export type Tests_Cli_Generate_Github_WorkflowsVersionContract_CalverResult_Diagnostic_Severity = 'error';

export type Tests_Cli_Generate_Github_WorkflowsVersionContract_CalverResult_Diagnostic_Message = string;

export type Tests_Cli_Generate_Github_WorkflowsVersionContract_CalverResult_Diagnostic = {
  severity: Tests_Cli_Generate_Github_WorkflowsVersionContract_CalverResult_Diagnostic_Severity;
  message: Tests_Cli_Generate_Github_WorkflowsVersionContract_CalverResult_Diagnostic_Message;
};

export type Tests_Cli_Generate_Github_WorkflowsVersionContract_CalverResult_Diagnostics = Tests_Cli_Generate_Github_WorkflowsVersionContract_CalverResult_Diagnostic[];

export type Tests_Cli_Generate_Github_WorkflowsVersionContract_CalverResult = {
  workflows: Tests_Cli_Generate_Github_WorkflowsVersionContract_CalverResult_Workflows;
  diagnostics: Tests_Cli_Generate_Github_WorkflowsVersionContract_CalverResult_Diagnostics;
};

export type Tests_Cli_Generate_Github_WorkflowsVersionContract_Diagnostic = Tests_Cli_Generate_Github_WorkflowsVersionContract_CalverResult_Diagnostic | undefined;

/**
 * Tests - CLI - Generate - GitHub - Workflows Version Contract - GitHub Action Publishing.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Generate_Github_WorkflowsVersionContract_GitHubActionPublishing_Returns = void;

/**
 * Tests - CLI - Generate - GitHub - Workflows Version Contract - GitHub Action Publishing - Accepts SemVer And Rejects CalVer Before Generating A Floating-major Workflow.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Generate_Github_WorkflowsVersionContract_GitHubActionPublishing_AcceptsSemVerAndRejectsCalVerBeforeGeneratingAFloatingMajorWorkflow_Returns = void;
