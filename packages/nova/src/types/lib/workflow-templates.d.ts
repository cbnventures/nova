/**
 * Lib - Workflow Templates - Lib Workflow Templates Metadata.
 *
 * @since 0.20.0
 */
export type LibWorkflowTemplatesPermissionRead = 'read';

export type LibWorkflowTemplatesPermissionWrite = 'write';

export type LibWorkflowTemplatesPermission = LibWorkflowTemplatesPermissionRead | LibWorkflowTemplatesPermissionWrite;

export type LibWorkflowTemplatesPermissionKey = string;

export type LibWorkflowTemplatesPermissions = {
  [key: LibWorkflowTemplatesPermissionKey]: LibWorkflowTemplatesPermission;
};

export type LibWorkflowTemplatesVariableFormatSecret = 'secret';

export type LibWorkflowTemplatesVariableFormatVar = 'var';

export type LibWorkflowTemplatesVariableFormatLiteral = 'literal';

export type LibWorkflowTemplatesVariableFormat = LibWorkflowTemplatesVariableFormatSecret | LibWorkflowTemplatesVariableFormatVar | LibWorkflowTemplatesVariableFormatLiteral;

export type LibWorkflowTemplatesVariableDefault = string;

export type LibWorkflowTemplatesVariableAuto = true;

export type LibWorkflowTemplatesVariableDescription = string;

export type LibWorkflowTemplatesVariableExample = string;

export type LibWorkflowTemplatesVariable = {
  format: LibWorkflowTemplatesVariableFormat;
  default?: LibWorkflowTemplatesVariableDefault;
  auto?: LibWorkflowTemplatesVariableAuto;
  description?: LibWorkflowTemplatesVariableDescription;
  example?: LibWorkflowTemplatesVariableExample;
};

export type LibWorkflowTemplatesVariableName = string;

export type LibWorkflowTemplatesVariables = {
  [key: LibWorkflowTemplatesVariableName]: LibWorkflowTemplatesVariable;
};

export type LibWorkflowTemplatesTargetDescription = string;

export type LibWorkflowTemplatesTargetArtifactPath = string;

export type LibWorkflowTemplatesTargetArtifactPaths = LibWorkflowTemplatesTargetArtifactPath[];

export type LibWorkflowTemplatesTargetVariables = LibWorkflowTemplatesVariables;

export type LibWorkflowTemplatesTargetPermissions = LibWorkflowTemplatesPermissions;

export type LibWorkflowTemplatesTarget = {
  description: LibWorkflowTemplatesTargetDescription;
  artifactPaths: LibWorkflowTemplatesTargetArtifactPaths;
  variables: LibWorkflowTemplatesTargetVariables;
  permissions: LibWorkflowTemplatesTargetPermissions;
};

export type LibWorkflowTemplatesTargetType = string;

export type LibWorkflowTemplatesTargets = {
  [key: LibWorkflowTemplatesTargetType]: LibWorkflowTemplatesTarget;
};

export type LibWorkflowTemplatesEntryName = string;

export type LibWorkflowTemplatesEntryDescription = string;

export type LibWorkflowTemplatesEntrySupportsScopes = boolean;

export type LibWorkflowTemplatesEntrySupportsTargets = boolean;

export type LibWorkflowTemplatesEntryNeedsManuallyFallback = boolean;

export type LibWorkflowTemplatesEntryPermissions = LibWorkflowTemplatesPermissions;

export type LibWorkflowTemplatesEntryJobPermissions = LibWorkflowTemplatesPermissions;

export type LibWorkflowTemplatesEntryVariables = LibWorkflowTemplatesVariables;

export type LibWorkflowTemplatesEntryTargets = LibWorkflowTemplatesTargets;

export type LibWorkflowTemplatesEntry = {
  name: LibWorkflowTemplatesEntryName;
  description: LibWorkflowTemplatesEntryDescription;
  supportsScopes: LibWorkflowTemplatesEntrySupportsScopes;
  supportsTargets: LibWorkflowTemplatesEntrySupportsTargets;
  needsManuallyFallback?: LibWorkflowTemplatesEntryNeedsManuallyFallback;
  permissions: LibWorkflowTemplatesEntryPermissions;
  jobPermissions?: LibWorkflowTemplatesEntryJobPermissions;
  variables: LibWorkflowTemplatesEntryVariables;
  targets?: LibWorkflowTemplatesEntryTargets;
};

export type LibWorkflowTemplatesMetadata = LibWorkflowTemplatesEntry[];
