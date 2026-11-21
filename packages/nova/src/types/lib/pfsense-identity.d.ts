import type { Shared_NovaConfig_Entities, Shared_NovaConfigEntity } from '../shared.d.ts';

/**
 * Lib - Pfsense Identity - Escape Php Single Quoted.
 *
 * @since 0.49.0
 */
export type Lib_PfsenseIdentity_EscapePhpSingleQuoted_Value = string;

export type Lib_PfsenseIdentity_EscapePhpSingleQuoted_Returns = string;

/**
 * Lib - Pfsense Identity - Format Pfsense Info Description.
 *
 * @since 0.49.0
 */
export type Lib_PfsenseIdentity_FormatPfsenseInfoDescription_ShortDescription = string | undefined;

export type Lib_PfsenseIdentity_FormatPfsenseInfoDescription_Returns = string | undefined;

export type Lib_PfsenseIdentity_FormatPfsenseInfoDescription_Trimmed = string;

/**
 * Lib - Pfsense Identity - Replace Pfsense About Description.
 *
 * @since 0.49.0
 */
export type Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Content = string;

export type Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Description = string;

export type Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Returns = string | undefined;

export type Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Lines = string[];

export type Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_LineIndex = number;

export type Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_TrimmedLine = string;

export type Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Line = string;

export type Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Indent = string;

/**
 * Lib - Pfsense Identity - Replace Pfsense Info Description.
 *
 * @since 0.49.0
 */
export type Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_Content = string;

export type Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_Description = string;

export type Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_Returns = string | undefined;

export type Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_OpenMarker = string;

export type Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_CloseMarker = string;

export type Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_OpenIndex = number;

export type Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_ValueStart = number;

export type Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_CloseIndex = number;

export type Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_EscapedDescription = string;

/**
 * Lib - Pfsense Identity - Replace Pfsense Makefile Variable.
 *
 * @since 0.49.0
 */
export type Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Content = string;

export type Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_VariableName = string;

export type Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Value = string;

export type Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Returns = string | undefined;

export type Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Lines = string[];

export type Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_LineIndex = number;

export type Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Line = string;

export type Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_LineEnding = string;

export type Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_OperatorIndex = number;

export type Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_AfterOperator = string;

export type Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Separator = string;

/**
 * Lib - Pfsense Identity - Resolve Pfsense Maintainer.
 *
 * @since 0.49.0
 */
export type Lib_PfsenseIdentity_ResolvePfsenseMaintainer_Entities = Shared_NovaConfig_Entities | undefined;

export type Lib_PfsenseIdentity_ResolvePfsenseMaintainer_Returns = string | undefined;

export type Lib_PfsenseIdentity_ResolvePfsenseMaintainer_Author = Shared_NovaConfigEntity | undefined;

/**
 * Lib - Pfsense Identity - Wrap Pfsense Package Description.
 *
 * @since 0.49.0
 */
export type Lib_PfsenseIdentity_WrapPfsensePackageDescription_LongDescription = string | undefined;

export type Lib_PfsenseIdentity_WrapPfsensePackageDescription_Returns = string | undefined;

export type Lib_PfsenseIdentity_WrapPfsensePackageDescription_SourceLines = string[];

export type Lib_PfsenseIdentity_WrapPfsensePackageDescription_Paragraphs = string[];

export type Lib_PfsenseIdentity_WrapPfsensePackageDescription_CurrentWords = string[];

export type Lib_PfsenseIdentity_WrapPfsensePackageDescription_SourceWords = string[];

/**
 * Lib - Pfsense Identity - Wrap Pfsense Paragraph.
 *
 * @since 0.49.0
 */
export type Lib_PfsenseIdentity_WrapPfsenseParagraph_Words = string[];

export type Lib_PfsenseIdentity_WrapPfsenseParagraph_Returns = string;

export type Lib_PfsenseIdentity_WrapPfsenseParagraph_WrappedLines = string[];

export type Lib_PfsenseIdentity_WrapPfsenseParagraph_CurrentLine = string;
