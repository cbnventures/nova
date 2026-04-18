/**
 * Lib - Workflow Templates - Lib Workflow Templates Metadata.
 *
 * @since 0.20.0
 */
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

export type LibWorkflowTemplatesEntryName = string;

export type LibWorkflowTemplatesEntryDescription = string;

export type LibWorkflowTemplatesEntryVariables = LibWorkflowTemplatesVariables;

export type LibWorkflowTemplatesEntry = {
  name: LibWorkflowTemplatesEntryName;
  description: LibWorkflowTemplatesEntryDescription;
  variables: LibWorkflowTemplatesEntryVariables;
};

export type LibWorkflowTemplatesMetadata = LibWorkflowTemplatesEntry[];
