import type {
  Shared_WorkflowTemplatePermissions,
  Shared_WorkflowTemplateTargets,
  Shared_WorkflowTemplateVariables,
} from '../shared.d.ts';

/**
 * Lib - Workflow Templates - Lib Workflow Templates Metadata.
 *
 * @since 0.18.0
 */
export type Lib_WorkflowTemplates_Entry_Name = string;

export type Lib_WorkflowTemplates_Entry_Description = string;

export type Lib_WorkflowTemplates_Entry_SupportsScopes = boolean;

export type Lib_WorkflowTemplates_Entry_SupportsTargets = boolean;

export type Lib_WorkflowTemplates_Entry_NeedsManuallyFallback = boolean;

export type Lib_WorkflowTemplates_Entry_Permissions = Shared_WorkflowTemplatePermissions;

export type Lib_WorkflowTemplates_Entry_JobPermissions = Shared_WorkflowTemplatePermissions;

export type Lib_WorkflowTemplates_Entry_Variables = Shared_WorkflowTemplateVariables;

export type Lib_WorkflowTemplates_Entry_Targets = Shared_WorkflowTemplateTargets;

export type Lib_WorkflowTemplates_Entry = {
  name: Lib_WorkflowTemplates_Entry_Name;
  description: Lib_WorkflowTemplates_Entry_Description;
  supportsScopes: Lib_WorkflowTemplates_Entry_SupportsScopes;
  supportsTargets: Lib_WorkflowTemplates_Entry_SupportsTargets;
  needsManuallyFallback?: Lib_WorkflowTemplates_Entry_NeedsManuallyFallback;
  permissions: Lib_WorkflowTemplates_Entry_Permissions;
  jobPermissions?: Lib_WorkflowTemplates_Entry_JobPermissions;
  variables: Lib_WorkflowTemplates_Entry_Variables;
  targets?: Lib_WorkflowTemplates_Entry_Targets;
};

export type Lib_WorkflowTemplates_Metadata = Lib_WorkflowTemplates_Entry[];
