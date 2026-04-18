import type {
  LibWorkflowTemplatesEntry,
  LibWorkflowTemplatesVariable,
} from '../../lib/workflow-templates.d.ts';

/**
 * Tests - Lib - Workflow Templates - Description Coverage.
 *
 * @since 0.21.0
 */
export type TestsLibWorkflowTemplatesHasDescription = boolean;

/**
 * Tests - Lib - Workflow Templates - File Path.
 *
 * @since 0.20.0
 */
export type TestsLibWorkflowTemplatesFilePath = string;

export type TestsLibWorkflowTemplatesCurrentDirectory = string;

export type TestsLibWorkflowTemplatesTemplatesDir = string;

export type TestsLibWorkflowTemplatesEntry = LibWorkflowTemplatesEntry;

/**
 * Tests - Lib - Workflow Templates - Forward Coverage.
 *
 * @since 0.20.0
 */
export type TestsLibWorkflowTemplatesTemplatePath = string;

export type TestsLibWorkflowTemplatesTemplateContent = string;

export type TestsLibWorkflowTemplatesVariableNames = string[];

export type TestsLibWorkflowTemplatesVariableName = string;

export type TestsLibWorkflowTemplatesVariable = LibWorkflowTemplatesVariable;

export type TestsLibWorkflowTemplatesExpectedRef = string;

export type TestsLibWorkflowTemplatesFound = boolean;

/**
 * Tests - Lib - Workflow Templates - Reverse Coverage.
 *
 * @since 0.20.0
 */
export type TestsLibWorkflowTemplatesSecretPattern = RegExp;

export type TestsLibWorkflowTemplatesVarPattern = RegExp;

export type TestsLibWorkflowTemplatesYamlReferences = string[];

export type TestsLibWorkflowTemplatesSecretMatch = RegExpExecArray | null;

export type TestsLibWorkflowTemplatesSecretMatchCapture = string;

export type TestsLibWorkflowTemplatesVarMatch = RegExpExecArray | null;

export type TestsLibWorkflowTemplatesVarMatchCapture = string;

export type TestsLibWorkflowTemplatesYamlRef = string;

export type TestsLibWorkflowTemplatesMetadataHasKey = boolean;

/**
 * Tests - Lib - Workflow Templates - Template Directory Existence.
 *
 * @since 0.21.0
 */
export type TestsLibWorkflowTemplatesDirExists = boolean;

export type TestsLibWorkflowTemplatesBasePath = string;

export type TestsLibWorkflowTemplatesExists = boolean;
