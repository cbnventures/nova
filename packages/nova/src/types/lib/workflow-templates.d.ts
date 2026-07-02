/**
 * Lib - Workflow Templates - Lib Workflow Templates Metadata.
 *
 * @since 0.18.0
 */
export type Lib_WorkflowTemplates_PermissionRead = 'read';

export type Lib_WorkflowTemplates_PermissionWrite = 'write';

export type Lib_WorkflowTemplates_Permission = Lib_WorkflowTemplates_PermissionRead | Lib_WorkflowTemplates_PermissionWrite;

export type Lib_WorkflowTemplates_PermissionKey = string;

export type Lib_WorkflowTemplates_Permissions = {
  [key: Lib_WorkflowTemplates_PermissionKey]: Lib_WorkflowTemplates_Permission;
};

export type Lib_WorkflowTemplates_VariableFormatSecret = 'secret';

export type Lib_WorkflowTemplates_VariableFormatVar = 'var';

export type Lib_WorkflowTemplates_VariableFormatLiteral = 'literal';

export type Lib_WorkflowTemplates_Variable_Format = Lib_WorkflowTemplates_VariableFormatSecret | Lib_WorkflowTemplates_VariableFormatVar | Lib_WorkflowTemplates_VariableFormatLiteral;

export type Lib_WorkflowTemplates_Variable_Default = string;

export type Lib_WorkflowTemplates_Variable_Auto = true;

export type Lib_WorkflowTemplates_Variable_Description = string;

export type Lib_WorkflowTemplates_Variable_Example = string;

export type Lib_WorkflowTemplates_Variable = {
  format: Lib_WorkflowTemplates_Variable_Format;
  default?: Lib_WorkflowTemplates_Variable_Default;
  auto?: Lib_WorkflowTemplates_Variable_Auto;
  description?: Lib_WorkflowTemplates_Variable_Description;
  example?: Lib_WorkflowTemplates_Variable_Example;
};

export type Lib_WorkflowTemplates_VariableName = string;

export type Lib_WorkflowTemplates_Variables = {
  [key: Lib_WorkflowTemplates_VariableName]: Lib_WorkflowTemplates_Variable;
};

export type Lib_WorkflowTemplates_Target_Description = string;

export type Lib_WorkflowTemplates_TargetArtifactPath = string;

export type Lib_WorkflowTemplates_Target_ArtifactPaths = Lib_WorkflowTemplates_TargetArtifactPath[];

export type Lib_WorkflowTemplates_Target_Variables = Lib_WorkflowTemplates_Variables;

export type Lib_WorkflowTemplates_Target_Permissions = Lib_WorkflowTemplates_Permissions;

export type Lib_WorkflowTemplates_TargetUniquenessKeyEntry = Lib_WorkflowTemplates_VariableName;

export type Lib_WorkflowTemplates_Target_UniquenessKey = Lib_WorkflowTemplates_TargetUniquenessKeyEntry[];

export type Lib_WorkflowTemplates_Target = {
  description: Lib_WorkflowTemplates_Target_Description;
  artifactPaths: Lib_WorkflowTemplates_Target_ArtifactPaths;
  variables: Lib_WorkflowTemplates_Target_Variables;
  permissions: Lib_WorkflowTemplates_Target_Permissions;
  uniquenessKey?: Lib_WorkflowTemplates_Target_UniquenessKey;
};

export type Lib_WorkflowTemplates_TargetType = string;

export type Lib_WorkflowTemplates_Targets = {
  [key: Lib_WorkflowTemplates_TargetType]: Lib_WorkflowTemplates_Target;
};

export type Lib_WorkflowTemplates_Entry_Name = string;

export type Lib_WorkflowTemplates_Entry_Description = string;

export type Lib_WorkflowTemplates_Entry_SupportsScopes = boolean;

export type Lib_WorkflowTemplates_Entry_SupportsTargets = boolean;

export type Lib_WorkflowTemplates_Entry_NeedsManuallyFallback = boolean;

export type Lib_WorkflowTemplates_Entry_Permissions = Lib_WorkflowTemplates_Permissions;

export type Lib_WorkflowTemplates_Entry_JobPermissions = Lib_WorkflowTemplates_Permissions;

export type Lib_WorkflowTemplates_Entry_Variables = Lib_WorkflowTemplates_Variables;

export type Lib_WorkflowTemplates_Entry_Targets = Lib_WorkflowTemplates_Targets;

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
