import chalk from 'chalk';

import { libEnvNamespace } from '../../../lib/env-namespace.js';
import { libWorkflowTemplatesMetadata } from '../../../lib/workflow-templates.js';

import type {
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Apps,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Environment,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Lines,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_OutputFileName,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_ResolvedName,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Returns,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_ScopeApp,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_ScopeAppPrefix,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_ScopeBuildName,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Scopes,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TargetMetadata,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TargetResolvedName,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Targets,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TargetSettings,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TargetType,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TargetVariableMeta,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TargetVariableName,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Template,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TemplateMetadata,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_ValidatedWorkflow,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_VariableMeta,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_VariableName,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_WorkflowEnvironment,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_WorkflowEnvironments,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_WorkflowName,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_WorkflowPrefix,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_WorkflowSettings,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTargetMetadata_Returns,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTargetMetadata_Targets,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTargetMetadata_TargetType,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTargetMetadata_Template,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTargetMetadata_TemplateMetadata,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTemplateMetadata_Returns,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTemplateMetadata_Template,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_Returns,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_TargetSettings,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_VariableMeta,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_VariableName,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_WorkflowSettings,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_ResolveExpr_DollarBrace,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_ResolveExpr_Format,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_ResolveExpr_ResolvedName,
  Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_ResolveExpr_Returns,
} from '../../../types/cli/generate/github/workflows-blueprint-variables.d.ts';

/**
 * CLI - Generate - GitHub - Workflows Blueprint Variables.
 *
 * Helper that reads the shared workflow-template metadata registry and
 * resolves declared variables to their configured names, renders them as
 * per-format expressions, and collects the Setup report lines.
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * CLI - Generate - GitHub - Workflows Blueprint Variables - Get Template Metadata.
   *
   * Returns the metadata entry for a template name, or undefined when no
   * template with that name is registered.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTemplateMetadata_Template} template - Template.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTemplateMetadata_Returns}
   *
   * @since 0.21.0
   */
  public static getTemplateMetadata(template: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTemplateMetadata_Template): Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTemplateMetadata_Returns {
    return libWorkflowTemplatesMetadata.find((candidate) => candidate['name'] === template);
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint Variables - Get Target Metadata.
   *
   * Returns the target metadata (variables, uniquenessKey, permissions) for a
   * target type under a template, or undefined when either is unknown.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTargetMetadata_Template}   template   - Template.
   * @param {Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTargetMetadata_TargetType} targetType - Target type.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTargetMetadata_Returns}
   *
   * @since 0.21.0
   */
  public static getTargetMetadata(template: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTargetMetadata_Template, targetType: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTargetMetadata_TargetType): Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTargetMetadata_Returns {
    const templateMetadata: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTargetMetadata_TemplateMetadata = Runner.getTemplateMetadata(template);

    if (templateMetadata === undefined) {
      return undefined;
    }

    const targets: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTargetMetadata_Targets = templateMetadata['targets'];

    if (targets === undefined) {
      return undefined;
    }

    return targets[targetType];
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint Variables - Resolve.
   *
   * Resolves a declared variable's name using the ordered precedence of
   * target settings, then workflow settings, then the metadata default, then
   * the variable name itself.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_VariableName}     variableName     - Variable name.
   * @param {Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_TargetSettings}   targetSettings   - Target settings.
   * @param {Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_WorkflowSettings} workflowSettings - Workflow settings.
   * @param {Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_VariableMeta}     variableMeta     - Variable meta.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_Returns}
   *
   * @since 0.21.0
   */
  public static resolve(variableName: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_VariableName, targetSettings: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_TargetSettings, workflowSettings: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_WorkflowSettings, variableMeta: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_VariableMeta): Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_Returns {
    if (targetSettings !== undefined && targetSettings[variableName] !== undefined) {
      return targetSettings[variableName];
    }

    if (workflowSettings !== undefined && workflowSettings[variableName] !== undefined) {
      return workflowSettings[variableName];
    }

    return variableMeta['default'] ?? variableName;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint Variables - Resolve Expr.
   *
   * Renders a resolved variable name as a workflow expression per its
   * format: a secret becomes a secrets reference, a var becomes a vars
   * reference, and a literal is emitted inline verbatim.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_ResolveExpr_Format}       format       - Format.
   * @param {Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_ResolveExpr_ResolvedName} resolvedName - Resolved name.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_ResolveExpr_Returns}
   *
   * @since 0.21.0
   */
  public static resolveExpr(format: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_ResolveExpr_Format, resolvedName: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_ResolveExpr_ResolvedName): Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_ResolveExpr_Returns {
    if (format === 'literal') {
      return resolvedName;
    }

    const dollarBrace: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_ResolveExpr_DollarBrace = [
      '$',
      '{',
    ].join('');

    if (format === 'secret') {
      return `${dollarBrace}{ secrets.${resolvedName} }}`;
    }

    return `${dollarBrace}{ vars.${resolvedName} }}`;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint Variables - Collect Setup Lines.
   *
   * Returns one Setup line per non-auto secret or var, and one
   * Variable line per public dotenv variable of a publish workflow's scopes,
   * naming the GitHub Variable the build-env step reads for each one.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_ValidatedWorkflow} validatedWorkflow - Validated workflow.
   * @param {Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_OutputFileName}    outputFileName    - Output file name.
   * @param {Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Environment}       environment       - Environment.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Returns}
   *
   * @since 0.21.0
   */
  public static collectSetupLines(validatedWorkflow: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_ValidatedWorkflow, outputFileName: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_OutputFileName, environment: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Environment): Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Returns {
    const lines: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Lines = [];
    const template: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Template = validatedWorkflow['template'];
    const templateMetadata: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TemplateMetadata = Runner.getTemplateMetadata(template);

    if (templateMetadata === undefined) {
      return lines;
    }

    const workflowSettings: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_WorkflowSettings = validatedWorkflow['with'];

    // Resolve the workflow's namespace prefix by its unique name so each
    // declared config key names the same GitHub Variable or Secret the builder
    // emits (prefix + key); the automatic GITHUB_TOKEN is never prefixed.
    const workflowName: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_WorkflowName = validatedWorkflow['name'];
    const workflowEnvironments: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_WorkflowEnvironments = environment['workflows'];
    const workflowEnvironment: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_WorkflowEnvironment = (workflowEnvironments === undefined) ? undefined : workflowEnvironments[workflowName];
    const workflowPrefix: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_WorkflowPrefix = (workflowEnvironment === undefined) ? undefined : workflowEnvironment['prefix'];

    // Template-level non-auto secrets and vars.
    for (const variableEntry of Object.entries(templateMetadata['variables'])) {
      const variableName: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_VariableName = variableEntry[0];
      const variableMeta: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_VariableMeta = variableEntry[1];

      if (variableMeta['auto'] === true) {
        continue;
      }

      const resolvedName: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_ResolvedName = (workflowPrefix !== undefined && workflowPrefix !== '') ? libEnvNamespace.githubName(workflowPrefix, variableName) : Runner.resolve(variableName, undefined, workflowSettings, variableMeta);

      if (variableMeta['format'] === 'secret') {
        lines.push(` - ${chalk.cyan(outputFileName)}: Secret ${chalk.yellow(resolvedName)}`);
      }

      if (variableMeta['format'] === 'var') {
        lines.push(` - ${chalk.cyan(outputFileName)}: Variable ${chalk.yellow(resolvedName)}`);
      }
    }

    // Build-only environment values per scope. Each app's build-only value
    // names the GitHub Variable or Secret the build-env step reads
    // (prefix + key), so the operator provisions it.
    const scopes: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Scopes = validatedWorkflow['build'] ?? [];
    const apps: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Apps = environment['apps'];

    for (const scope of scopes) {
      const scopeApp: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_ScopeApp = (apps === undefined) ? undefined : apps[scope];

      if (scopeApp === undefined) {
        continue;
      }

      const scopeAppPrefix: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_ScopeAppPrefix = scopeApp['prefix'];

      for (const scopeBuildVariable of scopeApp['variables'] ?? []) {
        if (scopeBuildVariable['buildOnly'] !== true) {
          continue;
        }

        const scopeBuildName: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_ScopeBuildName = libEnvNamespace.githubName(scopeAppPrefix, scopeBuildVariable['key']);

        if (scopeBuildVariable['secret'] === true) {
          lines.push(` - ${chalk.cyan(outputFileName)}: Secret ${chalk.yellow(scopeBuildName)}`);
        } else {
          lines.push(` - ${chalk.cyan(outputFileName)}: Variable ${chalk.yellow(scopeBuildName)}`);
        }
      }
    }

    // Target-level non-auto secrets and vars (for templates with targets).
    const targets: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Targets = validatedWorkflow['deploy'];

    if (targets === undefined) {
      // Two same-type targets declare the same secret/var, so dedupe by the
      // rendered line to list each GitHub secret/variable once per file.
      return Array.from(new Set(lines));
    }

    for (const target of targets) {
      const targetType: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TargetType = target['to'];
      const targetSettings: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TargetSettings = target['with'];
      const targetMetadata: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TargetMetadata = Runner.getTargetMetadata(template, targetType);

      if (targetMetadata === undefined) {
        continue;
      }

      for (const targetVariableEntry of Object.entries(targetMetadata['variables'])) {
        const targetVariableName: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TargetVariableName = targetVariableEntry[0];
        const targetVariableMeta: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TargetVariableMeta = targetVariableEntry[1];

        if (targetVariableMeta['auto'] === true) {
          continue;
        }

        const targetResolvedName: Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TargetResolvedName = Runner.resolve(targetVariableName, targetSettings, workflowSettings, targetVariableMeta);

        if (targetVariableMeta['format'] === 'secret') {
          lines.push(` - ${chalk.cyan(outputFileName)}: Secret ${chalk.yellow(targetResolvedName)}`);
        }

        if (targetVariableMeta['format'] === 'var') {
          lines.push(` - ${chalk.cyan(outputFileName)}: Variable ${chalk.yellow(targetResolvedName)}`);
        }
      }
    }

    return Array.from(new Set(lines));
  }
}
