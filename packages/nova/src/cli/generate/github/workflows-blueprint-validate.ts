import { Runner as Variables } from './workflows-blueprint-variables.js';

import type {
  Cli_Generate_Github_WorkflowsBlueprintValidate_AllowedTemplates,
  Cli_Generate_Github_WorkflowsBlueprintValidate_BuildableTargetTypes,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_References,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_Returns,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_Trigger,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_TriggerList,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_TriggerName,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_WorkflowReferences,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DeployMigrationHint_Deploy,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DeployMigrationHint_DeployEntry,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DeployMigrationHint_Returns,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_CurrentDependsOn,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_CurrentId,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_DependsOnMap,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_MapDependsOn,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_MapEntry,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_MapKey,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_MapTriggers,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_Queue,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_RawEntries,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_Returns,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_StartDependsOn,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_StartKey,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_Visited,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_EnvMigrationHint_Returns,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_EnvMigrationHint_WorkspaceEntry,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_EnvMigrationHint_WorkspaceList,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_EnvMigrationHint_Workspaces,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_IsNonEmptyStringArray_Returns,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_IsNonEmptyStringArray_Value,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_IsPlainObject_Returns,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_IsPlainObject_Value,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Composite,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_DependsOnEntries,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_DeployMigration,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_DetailEntries,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Diagnostics,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Entry,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_EntryKeys,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_EnvMigration,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Existing,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_HasError,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_HasWorkflowRunTrigger,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_IsRegisteredScope,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_IsRegisteredWorkingDir,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralResolved,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralTarget,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralTargetMetadata,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralTargetSettings,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralTargetType,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralTargetTypeName,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralVariableMeta,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralVariableName,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Metadata,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_MissingLiterals,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_RawEntries,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_RawKeyEntry,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_RawWorkflows,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Reference,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Resolved,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ResolvedValue,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ResolvedValues,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Returns,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Scope,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Scopes,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_SeenKeys,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Suffix,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_SuffixValue,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Target,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Targets,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TargetType,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TargetTypeName,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Template,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TemplateName,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Trigger,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerList,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerName,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObject,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObjectBranches,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObjectName,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObjectNameValue,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObjectPaths,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObjectTags,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Triggers,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniquenessKey,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniquenessMap,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueTarget,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueTargetMetadata,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueTargetSettings,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueTargetType,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueTargetTypeName,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueVariableMeta,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueVariableMetaResolved,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueVariableName,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ValidatedEntry,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ValidTriggers,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_VariableMeta,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_VariableName,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_WorkflowKey,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_WorkflowMigration,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Workflows,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_WorkflowSettings,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_WorkingDir,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Workspaces,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_WorkflowMigrationHint_Entry,
  Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_WorkflowMigrationHint_Returns,
  Cli_Generate_Github_WorkflowsBlueprintValidate_ValidTriggersByTemplate,
} from '../../../types/cli/generate/github/workflows-blueprint-validate.d.ts';

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Allowed Templates.
 *
 * The three template names the blueprint generator can build. Any workflow
 * whose template is outside this set is rejected with a diagnostic.
 *
 * @since 0.21.0
 */
const allowedTemplates: Cli_Generate_Github_WorkflowsBlueprintValidate_AllowedTemplates = [
  'check-sponsor-gated-issues',
  'lock-inactive-issues',
  'publish',
];

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Buildable Target Types.
 *
 * The nine publish target types with concrete deploy builders. Targets of any
 * other type are rejected because the generator has no job to emit for them.
 *
 * @since 0.21.0
 */
const buildableTargetTypes: Cli_Generate_Github_WorkflowsBlueprintValidate_BuildableTargetTypes = [
  'npm',
  'github-action',
  'github-packages',
  'cloudflare-pages-docusaurus',
  'cloudflare-workers',
  'docker-hub',
  'ghcr',
  'github-pages-docusaurus',
  'vercel-nextjs',
];

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Valid Triggers By Template.
 *
 * Maps each template name to the trigger names it accepts, so a trigger that
 * does not belong to the workflow's template surfaces an explicit diagnostic.
 *
 * @since 0.21.0
 */
const validTriggersByTemplate: Cli_Generate_Github_WorkflowsBlueprintValidate_ValidTriggersByTemplate = {
  'check-sponsor-gated-issues': [
    'issues',
    'issue-comment',
  ],
  'lock-inactive-issues': [
    'schedule-weekly',
    'schedule-daily',
    'schedule-monthly',
  ],
  'publish': [
    'release',
    'tag-push',
    'push',
    'workflow-run-success',
    'workflow-run-any',
    'workflow-run-failure',
  ],
};

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate.
 *
 * Parses the raw on-disk workflow entries into a typed, validated model,
 * emitting an actionable diagnostic and excluding any workflow that fails.
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * CLI - Generate - GitHub - Workflows Blueprint Validate - Validate.
   *
   * Runs every parse-and-validate check over the raw entries and the workspaces.
   * The surviving typed workflows and the diagnostics are returned; failures drop.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_RawWorkflows} rawWorkflows - Raw workflows.
   * @param {Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Workspaces}   workspaces   - Workspaces.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Returns}
   *
   * @since 0.21.0
   */
  public static validate(rawWorkflows: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_RawWorkflows, workspaces: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Workspaces): Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Returns {
    const diagnostics: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Diagnostics = [];
    const workflows: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Workflows = [];
    const seenKeys: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_SeenKeys = new Set();
    const uniquenessMap: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniquenessMap = new Map();

    const rawEntries: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_RawEntries = (Array.isArray(rawWorkflows) === true) ? rawWorkflows : [];

    // Migration hint: the retired per-workspace "dotenv" model moved to the
    // top-level "environment" block, so a config still on it hard-errors and
    // aborts the run rather than silently ignoring its variables.
    const envMigration: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_EnvMigration = Runner.envMigrationHint(workspaces);

    if (envMigration !== undefined) {
      diagnostics.push({
        severity: 'error',
        message: envMigration,
      });

      return {
        workflows,
        diagnostics,
      };
    }

    // Ports the old generator's circular depends-on detection. A cycle
    // aborts the entire run, so no workflow survives validation.
    if (Runner.detectCircularDependsOn(rawEntries) === true) {
      diagnostics.push({
        severity: 'error',
        message: 'Circular depends-on references detected. Aborting.',
      });

      return {
        workflows,
        diagnostics,
      };
    }

    // Collect every workflow key so a depends-on reference can be checked
    // against the sibling workflows declared in the same config.
    const entryKeys: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_EntryKeys = new Set();

    for (const rawKeyEntryValue of rawEntries) {
      const rawKeyEntry: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_RawKeyEntry = (typeof rawKeyEntryValue === 'object' && rawKeyEntryValue !== null) ? rawKeyEntryValue as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_RawKeyEntry : {};

      if (typeof rawKeyEntry['template'] !== 'string' || typeof rawKeyEntry['name'] !== 'string') {
        continue;
      }

      entryKeys.add(`${rawKeyEntry['template']}-${rawKeyEntry['name']}`);
    }

    for (const rawEntryValue of rawEntries) {
      const entry: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Entry = (typeof rawEntryValue === 'object' && rawEntryValue !== null) ? rawEntryValue as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Entry : {};

      // Migration hints: an old-shape workflow field is a hard error naming the
      // rename, so a stale config surfaces the exact field to update.
      const workflowMigration: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_WorkflowMigration = Runner.workflowMigrationHint(entry);

      if (workflowMigration !== undefined) {
        diagnostics.push({
          severity: 'error',
          message: workflowMigration,
        });

        continue;
      }

      // Migration hints for a renamed deploy field ride at the workflow level
      // too, so an entry with an old-shape deploy target is rejected wholesale.
      const deployMigration: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_DeployMigration = Runner.deployMigrationHint(entry['deploy']);

      if (deployMigration !== undefined) {
        diagnostics.push({
          severity: 'error',
          message: deployMigration,
        });

        continue;
      }

      const template: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Template = entry['template'];
      const suffix: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Suffix = entry['name'];
      const triggers: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Triggers = entry['triggers'];

      let hasError: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_HasError = false;
      let hasWorkflowRunTrigger: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_HasWorkflowRunTrigger = false;

      // Check 3a: template present, a string, in the allowed set.
      const templateName: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TemplateName = template as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TemplateName;

      if (typeof template !== 'string' || allowedTemplates.includes(templateName) === false) {
        diagnostics.push({
          severity: 'error',
          message: `Unknown template "${String(template)}". Allowed templates: ${allowedTemplates.join(', ')}. Skipping.`,
        });

        continue;
      }

      const metadata: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Metadata = Variables.getTemplateMetadata(templateName);

      if (metadata === undefined) {
        diagnostics.push({
          severity: 'error',
          message: `Unknown template "${templateName}". Allowed templates: ${allowedTemplates.join(', ')}. Skipping.`,
        });

        continue;
      }

      // Check 3b: name present and a non-empty string.
      if (typeof suffix !== 'string' || suffix.length === 0) {
        diagnostics.push({
          severity: 'error',
          message: `Workflow using template "${templateName}" is missing a non-empty "name". Skipping.`,
        });

        continue;
      }

      const suffixValue: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_SuffixValue = suffix;
      const workflowKey: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_WorkflowKey = `${templateName}-${suffixValue}`;
      const validTriggers: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ValidTriggers = validTriggersByTemplate[templateName];

      // Check 3c: triggers present, a non-empty array, each valid for the template.
      if (Array.isArray(triggers) === false || triggers.length === 0) {
        diagnostics.push({
          severity: 'error',
          message: `Workflow "${workflowKey}" is missing a non-empty "triggers" array. Skipping.`,
        });

        continue;
      }

      const triggerList: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerList = triggers;

      for (const triggerValue of triggerList) {
        const trigger: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Trigger = triggerValue;

        if (typeof trigger === 'string') {
          const triggerName: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerName = trigger as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerName;

          if (validTriggers.includes(triggerName) === false) {
            diagnostics.push({
              severity: 'error',
              message: `Trigger "${trigger}" is not valid for template "${templateName}". Allowed triggers: ${validTriggers.join(', ')}. Skipping workflow "${workflowKey}".`,
            });

            hasError = true;

            continue;
          }

          if (
            triggerName === 'workflow-run-success'
            || triggerName === 'workflow-run-any'
            || triggerName === 'workflow-run-failure'
          ) {
            hasWorkflowRunTrigger = true;
          }

          // A bare-string "push" would fire on every branch, so the push
          // trigger must be declared in the object form with a branch filter.
          if (trigger === 'push') {
            diagnostics.push({
              severity: 'error',
              message: `Trigger "push" must use the object form with a non-empty "branches" array, for example { "name": "push", "branches": ["main"] }. Skipping workflow "${workflowKey}".`,
            });

            hasError = true;
          }

          continue;
        }

        if (Runner.isPlainObject(trigger) === false) {
          diagnostics.push({
            severity: 'error',
            message: `Trigger "${String(trigger)}" is not valid for template "${templateName}". Allowed triggers: ${validTriggers.join(', ')}. Skipping workflow "${workflowKey}".`,
          });

          hasError = true;

          continue;
        }

        const triggerObject: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObject = trigger as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObject;
        const triggerObjectName: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObjectName = triggerObject['name'];
        const triggerObjectNameValue: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObjectNameValue = triggerObjectName as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObjectNameValue;

        if (typeof triggerObjectName !== 'string' || validTriggers.includes(triggerObjectNameValue) === false) {
          diagnostics.push({
            severity: 'error',
            message: `Trigger "${String(triggerObjectName)}" is not valid for template "${templateName}". Allowed triggers: ${validTriggers.join(', ')}. Skipping workflow "${workflowKey}".`,
          });

          hasError = true;

          continue;
        }

        if (
          triggerObjectNameValue === 'workflow-run-success'
          || triggerObjectNameValue === 'workflow-run-any'
          || triggerObjectNameValue === 'workflow-run-failure'
        ) {
          hasWorkflowRunTrigger = true;
        }

        // Each filter list declared on an object-form trigger must be a
        // non-empty string array so the on-block never emits a bad filter.
        const triggerObjectBranches: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObjectBranches = triggerObject['branches'];
        const triggerObjectPaths: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObjectPaths = triggerObject['paths'];
        const triggerObjectTags: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObjectTags = triggerObject['tags'];

        if (triggerObjectBranches !== undefined && Runner.isNonEmptyStringArray(triggerObjectBranches) === false) {
          diagnostics.push({
            severity: 'error',
            message: `Trigger "${triggerObjectNameValue}" in workflow "${workflowKey}" has an invalid "branches". It must be a non-empty array of strings.`,
          });

          hasError = true;
        }

        if (triggerObjectPaths !== undefined && Runner.isNonEmptyStringArray(triggerObjectPaths) === false) {
          diagnostics.push({
            severity: 'error',
            message: `Trigger "${triggerObjectNameValue}" in workflow "${workflowKey}" has an invalid "paths". It must be a non-empty array of strings.`,
          });

          hasError = true;
        }

        if (triggerObjectTags !== undefined && Runner.isNonEmptyStringArray(triggerObjectTags) === false) {
          diagnostics.push({
            severity: 'error',
            message: `Trigger "${triggerObjectNameValue}" in workflow "${workflowKey}" has an invalid "tags". It must be a non-empty array of strings.`,
          });

          hasError = true;
        }

        // The push trigger requires an explicit branch filter so a branch
        // CD workflow never fires on every push to every branch.
        if (triggerObjectNameValue === 'push' && triggerObjectBranches === undefined) {
          diagnostics.push({
            severity: 'error',
            message: `Trigger "push" in workflow "${workflowKey}" requires a non-empty "branches" array of strings. Skipping.`,
          });

          hasError = true;
        }
      }

      if (hasError === true) {
        continue;
      }

      // Check 3h: a workflow-run trigger requires "workflows" references on the
      // trigger object that each resolve to a sibling workflow in the config.
      if (hasWorkflowRunTrigger === true) {
        const dependsOnEntries: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_DependsOnEntries = Runner.collectWorkflowRunReferences(triggerList);

        if (dependsOnEntries.length === 0) {
          diagnostics.push({
            severity: 'error',
            message: `Workflow "${workflowKey}" uses a trigger that requires "workflows" references, but none are configured. Skipping.`,
          });

          continue;
        }

        for (const dependsOnReference of dependsOnEntries) {
          const reference: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Reference = dependsOnReference;

          if (entryKeys.has(reference) === false) {
            diagnostics.push({
              severity: 'error',
              message: `Workflow "${workflowKey}" depends on "${reference}" which does not exist. Skipping.`,
            });

            hasError = true;

            break;
          }
        }

        if (hasError === true) {
          continue;
        }
      }

      // Check 3d: duplicate workflow key.
      if (seenKeys.has(workflowKey) === true) {
        diagnostics.push({
          severity: 'error',
          message: `Duplicate workflow "${workflowKey}". Each template must have a unique suffix when used multiple times.`,
        });

        continue;
      }

      const workflowSettings: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_WorkflowSettings = (typeof entry['with'] === 'object' && entry['with'] !== null) ? entry['with'] as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_WorkflowSettings : undefined;
      const targets: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Targets = entry['deploy'];

      // Check 3e: publish build scopes, deploy paths, and deploy destinations.
      if (templateName === 'publish') {
        const scopes: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Scopes = entry['build'];

        if (Array.isArray(scopes) === true) {
          for (const scopeValue of scopes) {
            const scope: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Scope = scopeValue;
            const isRegisteredScope: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_IsRegisteredScope = typeof scope === 'string' && workspaces[scope] !== undefined;

            if (isRegisteredScope === false) {
              diagnostics.push({
                severity: 'error',
                message: `Scope "${String(scope)}" is not a registered workspace. Skipping.`,
              });

              hasError = true;

              continue;
            }
          }
        }

        if (Array.isArray(targets) === true) {
          for (const targetValue of targets) {
            const target: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Target = (typeof targetValue === 'object' && targetValue !== null) ? targetValue as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Target : {};
            const targetType: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TargetType = target['to'];
            const targetTypeName: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TargetTypeName = targetType as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TargetTypeName;
            const workingDir: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_WorkingDir = target['path'];

            if (typeof targetType !== 'string' || buildableTargetTypes.includes(targetTypeName) === false) {
              diagnostics.push({
                severity: 'error',
                message: `Target type "${String(targetType)}" is not supported by template "${templateName}". Allowed target types: ${buildableTargetTypes.join(', ')}. Skipping.`,
              });

              hasError = true;
            }

            const isRegisteredWorkingDir: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_IsRegisteredWorkingDir = typeof workingDir === 'string' && workspaces[workingDir] !== undefined;

            if (isRegisteredWorkingDir === false) {
              diagnostics.push({
                severity: 'error',
                message: `Target working directory "${String(workingDir)}" is not a registered workspace. Skipping.`,
              });

              hasError = true;
            }
          }
        }
      }

      // Check 3f: literal-missing across template-level and target-level variables.
      const missingLiterals: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_MissingLiterals = [];

      for (const variableEntry of Object.entries(metadata['variables'])) {
        const variableName: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_VariableName = variableEntry[0];
        const variableMeta: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_VariableMeta = variableEntry[1];

        // ROOT_WORKING_DIR carries an implicit "./" default now, so an omitted
        // value resolves to the repository root instead of failing validation.
        if (
          variableMeta['format'] !== 'literal'
          || variableMeta['default'] !== undefined
          || variableName === 'ROOT_WORKING_DIR'
        ) {
          continue;
        }

        const resolved: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Resolved = Variables.resolve(variableName, undefined, workflowSettings, variableMeta);

        if (resolved === variableName) {
          missingLiterals.push(variableName);
        }
      }

      if (templateName === 'publish' && Array.isArray(targets) === true) {
        for (const literalTargetValue of targets) {
          const literalTarget: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralTarget = (typeof literalTargetValue === 'object' && literalTargetValue !== null) ? literalTargetValue as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralTarget : {};
          const literalTargetType: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralTargetType = literalTarget['to'];
          const literalTargetTypeName: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralTargetTypeName = literalTargetType as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralTargetTypeName;
          const literalTargetSettings: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralTargetSettings = (typeof literalTarget['with'] === 'object' && literalTarget['with'] !== null) ? literalTarget['with'] as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralTargetSettings : undefined;

          if (typeof literalTargetType !== 'string' || buildableTargetTypes.includes(literalTargetTypeName) === false) {
            continue;
          }

          const literalTargetMetadata: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralTargetMetadata = Variables.getTargetMetadata(templateName, literalTargetTypeName);

          if (literalTargetMetadata === undefined) {
            continue;
          }

          for (const literalVariableEntry of Object.entries(literalTargetMetadata['variables'])) {
            const literalVariableName: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralVariableName = literalVariableEntry[0];
            const literalVariableMeta: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralVariableMeta = literalVariableEntry[1];

            if (literalVariableMeta['format'] !== 'literal' || literalVariableMeta['default'] !== undefined) {
              continue;
            }

            const literalResolved: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralResolved = Variables.resolve(literalVariableName, literalTargetSettings, workflowSettings, literalVariableMeta);

            if (literalResolved === literalVariableName && missingLiterals.includes(literalVariableName) === false) {
              missingLiterals.push(literalVariableName);
            }
          }
        }
      }

      if (missingLiterals.length > 0) {
        diagnostics.push({
          severity: 'error',
          message: `Workflow "${workflowKey}" is missing required literal settings: ${missingLiterals.join(', ')}. Skipping.`,
        });

        hasError = true;
      }

      if (hasError === true) {
        continue;
      }

      // Check 3g: cross-workflow and singleton destination uniqueness.
      if (templateName === 'publish' && Array.isArray(targets) === true) {
        for (const uniqueTargetValue of targets) {
          const uniqueTarget: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueTarget = (typeof uniqueTargetValue === 'object' && uniqueTargetValue !== null) ? uniqueTargetValue as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueTarget : {};
          const uniqueTargetType: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueTargetType = uniqueTarget['to'];
          const uniqueTargetTypeName: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueTargetTypeName = uniqueTargetType as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueTargetTypeName;
          const uniqueTargetSettings: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueTargetSettings = (typeof uniqueTarget['with'] === 'object' && uniqueTarget['with'] !== null) ? uniqueTarget['with'] as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueTargetSettings : undefined;

          if (typeof uniqueTargetType !== 'string' || buildableTargetTypes.includes(uniqueTargetTypeName) === false) {
            continue;
          }

          const uniqueTargetMetadata: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueTargetMetadata = Variables.getTargetMetadata(templateName, uniqueTargetTypeName);

          if (uniqueTargetMetadata === undefined) {
            continue;
          }

          const uniquenessKey: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniquenessKey = uniqueTargetMetadata['uniquenessKey'];

          if (uniquenessKey === undefined) {
            continue;
          }

          const resolvedValues: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ResolvedValues = [];
          const detailEntries: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_DetailEntries = [];

          for (const uniquenessVariableName of uniquenessKey) {
            const uniqueVariableName: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueVariableName = uniquenessVariableName;
            const uniqueVariableMeta: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueVariableMeta = uniqueTargetMetadata['variables'][uniqueVariableName];
            const uniqueVariableMetaResolved: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueVariableMetaResolved = uniqueVariableMeta ?? { format: 'literal' };
            const resolvedValue: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ResolvedValue = Variables.resolve(uniqueVariableName, uniqueTargetSettings, workflowSettings, uniqueVariableMetaResolved);

            resolvedValues.push(resolvedValue);

            detailEntries.push(`${uniqueVariableName}=${resolvedValue}`);
          }

          const composite: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Composite = [
            uniqueTargetTypeName,
            ...resolvedValues,
          ].join('::');
          const existing: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Existing = uniquenessMap.get(composite);

          if (existing !== undefined) {
            if (detailEntries.length === 0) {
              if (existing === workflowKey) {
                diagnostics.push({
                  severity: 'error',
                  message: `Singleton target violation: workflow "${workflowKey}" declares multiple "${uniqueTargetTypeName}" targets, but only one is allowed.`,
                });
              } else {
                diagnostics.push({
                  severity: 'error',
                  message: `Singleton target collision: only one "${uniqueTargetTypeName}" target may be declared across all workflows. Found in workflow "${existing}" and again in workflow "${workflowKey}".`,
                });
              }
            } else if (existing === workflowKey) {
              diagnostics.push({
                severity: 'error',
                message: `Destination collision in workflow "${workflowKey}": multiple "${uniqueTargetTypeName}" targets declare the same destination (${detailEntries.join(', ')}). Each destination must be declared in only one target.`,
              });
            } else {
              diagnostics.push({
                severity: 'error',
                message: `Cross-workflow destination collision: target "${uniqueTargetTypeName}" with destination (${detailEntries.join(', ')}) is declared in workflow "${existing}" and again in workflow "${workflowKey}". Each destination must be declared in only one workflow.`,
              });
            }

            hasError = true;

            continue;
          }

          uniquenessMap.set(composite, workflowKey);
        }
      }

      if (hasError === true) {
        continue;
      }

      seenKeys.add(workflowKey);

      const validatedEntry: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ValidatedEntry = entry as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ValidatedEntry;

      workflows.push(validatedEntry);
    }

    return {
      workflows,
      diagnostics,
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint Validate - Detect Circular Depends On.
   *
   * Walks the depends-on chain for each raw workflow entry and returns true
   * when any circular reference is detected, ported from the old generator.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_RawEntries} rawEntries - Raw entries.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_Returns}
   *
   * @since 0.21.0
   */
  private static detectCircularDependsOn(rawEntries: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_RawEntries): Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_Returns {
    // Index each entry's depends-on list by its workflow key so the walk
    // below resolves references without rescanning the raw entries.
    const dependsOnMap: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_DependsOnMap = new Map();

    for (const rawEntryValue of rawEntries) {
      const mapEntry: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_MapEntry = (typeof rawEntryValue === 'object' && rawEntryValue !== null) ? rawEntryValue as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_MapEntry : {};
      const mapKey: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_MapKey = (typeof mapEntry['name'] === 'string') ? `${String(mapEntry['template'])}-${mapEntry['name']}` : String(mapEntry['template']);
      const mapTriggers: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_MapTriggers = (Array.isArray(mapEntry['triggers']) === true) ? mapEntry['triggers'] as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_MapTriggers : [];
      const mapDependsOn: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_MapDependsOn = Runner.collectWorkflowRunReferences(mapTriggers);

      dependsOnMap.set(mapKey, mapDependsOn);
    }

    for (const dependsOnMapEntry of dependsOnMap.entries()) {
      const startKey: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_StartKey = dependsOnMapEntry[0];
      const startDependsOn: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_StartDependsOn = dependsOnMapEntry[1];

      if (startDependsOn.length === 0) {
        continue;
      }

      const visited: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_Visited = new Set();
      const queue: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_Queue = [...startDependsOn];

      while (queue.length > 0) {
        const currentId: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_CurrentId = queue.shift() as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_CurrentId;

        // Reaching the start key again closes a real cycle back onto this node.
        // A node merely re-seen along a second path (an acyclic fan-in or
        // diamond) is not a cycle, so it is skipped rather than flagged. The
        // visited set only prevents redundant re-expansion, not cycle signalling.
        if (currentId === startKey) {
          return true;
        }

        if (visited.has(currentId) === true) {
          continue;
        }

        visited.add(currentId);

        const currentDependsOn: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_CurrentDependsOn = dependsOnMap.get(currentId) ?? [];

        for (const dependency of currentDependsOn) {
          queue.push(dependency);
        }
      }
    }

    return false;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint Validate - Is Non Empty String Array.
   *
   * Returns true when the value is an array with at least one entry whose
   * entries are all non-empty strings, used to range-check the object-form
   * trigger filter lists.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_IsNonEmptyStringArray_Value} value - Value.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_IsNonEmptyStringArray_Returns}
   *
   * @since 0.21.0
   */
  private static isNonEmptyStringArray(value: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_IsNonEmptyStringArray_Value): Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_IsNonEmptyStringArray_Returns {
    return Array.isArray(value) === true
      && value.length > 0
      && value.every((entry) => typeof entry === 'string' && entry.length > 0) === true;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint Validate - Is Plain Object.
   *
   * Returns true when the value is a non-null, non-array object, used to guard
   * the object-form trigger entries before their fields are inspected.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_IsPlainObject_Value} value - Value.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_IsPlainObject_Returns}
   *
   * @since 0.21.0
   */
  private static isPlainObject(value: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_IsPlainObject_Value): Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_IsPlainObject_Returns {
    return typeof value === 'object'
      && value !== null
      && Array.isArray(value) === false;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint Validate - Collect Workflow Run References.
   *
   * Gathers the sibling workflow keys referenced by every workflow-run trigger
   * object's "workflows" list, the new home of the retired top-level depends-on.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_TriggerList} triggerList - Trigger list.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_Returns}
   *
   * @since 0.21.0
   */
  private static collectWorkflowRunReferences(triggerList: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_TriggerList): Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_Returns {
    const references: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_References = [];

    for (const triggerValue of triggerList) {
      if (Runner.isPlainObject(triggerValue) === false) {
        continue;
      }

      const trigger: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_Trigger = triggerValue as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_Trigger;
      const triggerName: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_TriggerName = trigger['name'];

      if (
        triggerName !== 'workflow-run-success'
        && triggerName !== 'workflow-run-any'
        && triggerName !== 'workflow-run-failure'
      ) {
        continue;
      }

      if (Runner.isNonEmptyStringArray(trigger['workflows']) === false) {
        continue;
      }

      const workflowReferences: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_WorkflowReferences = trigger['workflows'] as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_WorkflowReferences;

      for (const workflowReference of workflowReferences) {
        references.push(workflowReference);
      }
    }

    return references;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint Validate - Workflow Migration Hint.
   *
   * Returns the rename diagnostic for the first old-shape workflow field the
   * entry still carries, or undefined when none of the renamed fields are set.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_WorkflowMigrationHint_Entry} entry - Entry.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_WorkflowMigrationHint_Returns}
   *
   * @since 0.21.0
   */
  private static workflowMigrationHint(entry: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_WorkflowMigrationHint_Entry): Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_WorkflowMigrationHint_Returns {
    if (entry['suffix'] !== undefined) {
      return 'Workflow field "suffix" was renamed to "name". Skipping.';
    }

    if (entry['scopes'] !== undefined) {
      return 'Workflow field "scopes" was renamed to "build". Skipping.';
    }

    if (entry['targets'] !== undefined) {
      return 'Workflow field "targets" was renamed to "deploy". Skipping.';
    }

    if (entry['settings'] !== undefined) {
      return 'Workflow field "settings" was renamed to "with". Skipping.';
    }

    if (entry['depends-on'] !== undefined) {
      return 'Workflow field "depends-on" moved onto the workflow-run trigger as "workflows". Skipping.';
    }

    return undefined;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint Validate - Deploy Migration Hint.
   *
   * Returns the rename diagnostic for the first old-shape deploy field any
   * deploy target still carries, or undefined when the deploy list is clean.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DeployMigrationHint_Deploy} deploy - Deploy.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DeployMigrationHint_Returns}
   *
   * @since 0.21.0
   */
  private static deployMigrationHint(deploy: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DeployMigrationHint_Deploy): Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DeployMigrationHint_Returns {
    if (Array.isArray(deploy) === false) {
      return undefined;
    }

    for (const deployValue of deploy) {
      if (Runner.isPlainObject(deployValue) === false) {
        continue;
      }

      const deployEntry: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DeployMigrationHint_DeployEntry = deployValue as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DeployMigrationHint_DeployEntry;

      if (deployEntry['type'] !== undefined) {
        return 'Deploy field "type" was renamed to "to". Skipping.';
      }

      if (deployEntry['workingDir'] !== undefined) {
        return 'Deploy field "workingDir" was renamed to "path". Skipping.';
      }

      if (deployEntry['needs'] !== undefined) {
        return 'Deploy field "needs" was renamed to "after". Skipping.';
      }

      if (deployEntry['settings'] !== undefined) {
        return 'Deploy field "settings" was renamed to "with". Skipping.';
      }
    }

    return undefined;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint Validate - Env Migration Hint.
   *
   * Returns the migration diagnostic when any workspace still carries the retired
   * "dotenv" block, or undefined when no workspace uses the old-shape env model.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_EnvMigrationHint_Workspaces} workspaces - Workspaces.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_EnvMigrationHint_Returns}
   *
   * @since 0.21.0
   */
  private static envMigrationHint(workspaces: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_EnvMigrationHint_Workspaces): Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_EnvMigrationHint_Returns {
    const workspaceList: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_EnvMigrationHint_WorkspaceList = Object.values(workspaces);

    for (const workspace of workspaceList) {
      const workspaceEntry: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_EnvMigrationHint_WorkspaceEntry = workspace as Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_EnvMigrationHint_WorkspaceEntry;

      if (workspaceEntry['dotenv'] !== undefined) {
        return 'Workspace field "dotenv" moved to the top-level "environment" block classified by "secret". Skipping.';
      }
    }

    return undefined;
  }
}
