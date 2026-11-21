import {
  LIB_REGEX_LINEBREAK_CRLF_OR_LF,
  LIB_REGEX_PATTERN_WHITESPACE,
} from './regex.js';

import type {
  Lib_PfsenseIdentity_EscapePhpSingleQuoted_Returns,
  Lib_PfsenseIdentity_EscapePhpSingleQuoted_Value,
  Lib_PfsenseIdentity_FormatPfsenseInfoDescription_Returns,
  Lib_PfsenseIdentity_FormatPfsenseInfoDescription_ShortDescription,
  Lib_PfsenseIdentity_FormatPfsenseInfoDescription_Trimmed,
  Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Content,
  Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Description,
  Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Indent,
  Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Line,
  Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_LineIndex,
  Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Lines,
  Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Returns,
  Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_TrimmedLine,
  Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_CloseIndex,
  Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_CloseMarker,
  Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_Content,
  Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_Description,
  Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_EscapedDescription,
  Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_OpenIndex,
  Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_OpenMarker,
  Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_Returns,
  Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_ValueStart,
  Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_AfterOperator,
  Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Content,
  Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Line,
  Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_LineEnding,
  Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_LineIndex,
  Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Lines,
  Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_OperatorIndex,
  Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Returns,
  Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Separator,
  Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Value,
  Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_VariableName,
  Lib_PfsenseIdentity_ResolvePfsenseMaintainer_Author,
  Lib_PfsenseIdentity_ResolvePfsenseMaintainer_Entities,
  Lib_PfsenseIdentity_ResolvePfsenseMaintainer_Returns,
  Lib_PfsenseIdentity_WrapPfsensePackageDescription_CurrentWords,
  Lib_PfsenseIdentity_WrapPfsensePackageDescription_LongDescription,
  Lib_PfsenseIdentity_WrapPfsensePackageDescription_Paragraphs,
  Lib_PfsenseIdentity_WrapPfsensePackageDescription_Returns,
  Lib_PfsenseIdentity_WrapPfsensePackageDescription_SourceLines,
  Lib_PfsenseIdentity_WrapPfsensePackageDescription_SourceWords,
  Lib_PfsenseIdentity_WrapPfsenseParagraph_CurrentLine,
  Lib_PfsenseIdentity_WrapPfsenseParagraph_Returns,
  Lib_PfsenseIdentity_WrapPfsenseParagraph_Words,
  Lib_PfsenseIdentity_WrapPfsenseParagraph_WrappedLines,
} from '../types/lib/pfsense-identity.d.ts';

/**
 * Lib - Pfsense Identity - Escape Php Single Quoted.
 *
 * Escapes project-controlled values for PHP single-quoted string literals. The
 * pfSense scaffold and the pfSense sync-identity recipe share this escaping.
 *
 * @param {Lib_PfsenseIdentity_EscapePhpSingleQuoted_Value} value - Value.
 *
 * @returns {Lib_PfsenseIdentity_EscapePhpSingleQuoted_Returns}
 *
 * @since 0.49.0
 */
export function escapePhpSingleQuoted(value: Lib_PfsenseIdentity_EscapePhpSingleQuoted_Value): Lib_PfsenseIdentity_EscapePhpSingleQuoted_Returns {
  return value.replaceAll('\\', '\\\\').replaceAll('\'', '\\\'');
}

/**
 * Lib - Pfsense Identity - Format Pfsense Info Description.
 *
 * Turns the short description into the sentence shown in the pfSense package
 * manager, adding a trailing period when the configured value has none.
 *
 * @param {Lib_PfsenseIdentity_FormatPfsenseInfoDescription_ShortDescription} shortDescription - Short description.
 *
 * @returns {Lib_PfsenseIdentity_FormatPfsenseInfoDescription_Returns}
 *
 * @since 0.49.0
 */
export function formatPfsenseInfoDescription(shortDescription: Lib_PfsenseIdentity_FormatPfsenseInfoDescription_ShortDescription): Lib_PfsenseIdentity_FormatPfsenseInfoDescription_Returns {
  if (shortDescription === undefined) {
    return undefined;
  }

  const trimmed: Lib_PfsenseIdentity_FormatPfsenseInfoDescription_Trimmed = shortDescription.trim();

  if (trimmed === '') {
    return undefined;
  }

  return (trimmed.endsWith('.') === true) ? trimmed : `${trimmed}.`;
}

/**
 * Lib - Pfsense Identity - Replace Pfsense About Description.
 *
 * Rewrites only the "$projectDescription" assignment on the generated About page.
 * Returns undefined when the assignment line is missing so the caller can skip it.
 *
 * @param {Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Content}     content     - Content.
 * @param {Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Description} description - Description.
 *
 * @returns {Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Returns}
 *
 * @since 0.49.0
 */
export function replacePfsenseAboutDescription(content: Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Content, description: Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Description): Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Returns {
  const lines: Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Lines = content.split('\n');
  const lineIndex: Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_LineIndex = lines.findIndex((line) => {
    const trimmedLine: Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_TrimmedLine = line.trim();

    return (
      trimmedLine.startsWith('$projectDescription = \'') === true
      && trimmedLine.endsWith('\';') === true
    );
  });

  if (lineIndex === -1) {
    return undefined;
  }

  const line: Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Line = lines[lineIndex] ?? '';
  const indent: Lib_PfsenseIdentity_ReplacePfsenseAboutDescription_Indent = line.slice(0, line.length - line.trimStart().length);

  lines.splice(lineIndex, 1, `${indent}$projectDescription = '${escapePhpSingleQuoted(description)}';`);

  return lines.join('\n');
}

/**
 * Lib - Pfsense Identity - Replace Pfsense Info Description.
 *
 * Rewrites only the CDATA text inside the first "descr" element of info.xml.
 * Returns undefined when the element is missing so the caller can skip it.
 *
 * @param {Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_Content}     content     - Content.
 * @param {Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_Description} description - Description.
 *
 * @returns {Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_Returns}
 *
 * @since 0.49.0
 */
export function replacePfsenseInfoDescription(content: Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_Content, description: Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_Description): Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_Returns {
  const openMarker: Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_OpenMarker = '<descr><![CDATA[';
  const closeMarker: Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_CloseMarker = ']]></descr>';
  const openIndex: Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_OpenIndex = content.indexOf(openMarker);

  if (openIndex === -1) {
    return undefined;
  }

  const valueStart: Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_ValueStart = openIndex + openMarker.length;
  const closeIndex: Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_CloseIndex = content.indexOf(closeMarker, valueStart);

  if (closeIndex === -1) {
    return undefined;
  }

  // A literal "]]>" would end the CDATA section early, so split it across two sections.
  const escapedDescription: Lib_PfsenseIdentity_ReplacePfsenseInfoDescription_EscapedDescription = description.replaceAll(']]>', ']]]]><![CDATA[>');

  return `${content.slice(0, valueStart)}${escapedDescription}${content.slice(closeIndex)}`;
}

/**
 * Lib - Pfsense Identity - Replace Pfsense Makefile Variable.
 *
 * Rewrites the value of one top-level variable in a port Makefile, keeping its
 * operator and separator. Returns undefined when the variable is not assigned.
 *
 * @param {Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Content}      content      - Content.
 * @param {Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_VariableName} variableName - Variable name.
 * @param {Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Value}        value        - Value.
 *
 * @returns {Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Returns}
 *
 * @since 0.49.0
 */
export function replacePfsenseMakefileVariable(content: Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Content, variableName: Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_VariableName, value: Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Value): Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Returns {
  const lines: Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Lines = content.split('\n');
  const lineIndex: Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_LineIndex = lines.findIndex((line) => line.startsWith(`${variableName}=`) === true || line.startsWith(`${variableName}?=`) === true);

  if (lineIndex === -1) {
    return undefined;
  }

  const line: Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Line = lines[lineIndex] ?? '';
  const lineEnding: Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_LineEnding = (line.endsWith('\r') === true) ? '\r' : '';
  const operatorIndex: Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_OperatorIndex = line.indexOf('=');
  const afterOperator: Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_AfterOperator = line.slice(operatorIndex + 1);
  let separator: Lib_PfsenseIdentity_ReplacePfsenseMakefileVariable_Separator = afterOperator.slice(0, afterOperator.length - afterOperator.trimStart().length);

  if (separator === '') {
    separator = '\t';
  }

  lines.splice(lineIndex, 1, `${line.slice(0, operatorIndex + 1)}${separator}${value}${lineEnding}`);

  return lines.join('\n');
}

/**
 * Lib - Pfsense Identity - Resolve Pfsense Maintainer.
 *
 * Finds the email of the first author entity that has one. The port Makefile's
 * MAINTAINER field uses it in both the scaffold and the sync-identity recipe.
 *
 * @param {Lib_PfsenseIdentity_ResolvePfsenseMaintainer_Entities} entities - Entities.
 *
 * @returns {Lib_PfsenseIdentity_ResolvePfsenseMaintainer_Returns}
 *
 * @since 0.49.0
 */
export function resolvePfsenseMaintainer(entities: Lib_PfsenseIdentity_ResolvePfsenseMaintainer_Entities): Lib_PfsenseIdentity_ResolvePfsenseMaintainer_Returns {
  const author: Lib_PfsenseIdentity_ResolvePfsenseMaintainer_Author = (entities ?? []).find((entity) => {
    return (
      entity['roles'] !== undefined
      && entity['roles'].includes('author') === true
      && typeof entity['email'] === 'string'
      && entity['email'].trim() !== ''
    );
  });

  if (
    author === undefined
    || typeof author['email'] !== 'string'
  ) {
    return undefined;
  }

  return author['email'].trim();
}

/**
 * Lib - Pfsense Identity - Wrap Pfsense Package Description.
 *
 * Formats the long description as a FreeBSD pkg-descr file: paragraphs kept,
 * words wrapped at 80 columns, and one trailing newline. No WWW line is added.
 *
 * @param {Lib_PfsenseIdentity_WrapPfsensePackageDescription_LongDescription} longDescription - Long description.
 *
 * @returns {Lib_PfsenseIdentity_WrapPfsensePackageDescription_Returns}
 *
 * @since 0.49.0
 */
export function wrapPfsensePackageDescription(longDescription: Lib_PfsenseIdentity_WrapPfsensePackageDescription_LongDescription): Lib_PfsenseIdentity_WrapPfsensePackageDescription_Returns {
  if (longDescription === undefined) {
    return undefined;
  }

  const sourceLines: Lib_PfsenseIdentity_WrapPfsensePackageDescription_SourceLines = longDescription.split(LIB_REGEX_LINEBREAK_CRLF_OR_LF);
  const paragraphs: Lib_PfsenseIdentity_WrapPfsensePackageDescription_Paragraphs = [];
  let currentWords: Lib_PfsenseIdentity_WrapPfsensePackageDescription_CurrentWords = [];

  // Blank lines separate paragraphs; every other line break is reflowed.
  for (const sourceLine of sourceLines) {
    const sourceWords: Lib_PfsenseIdentity_WrapPfsensePackageDescription_SourceWords = sourceLine.split(LIB_REGEX_PATTERN_WHITESPACE).filter((sourceWord) => sourceWord !== '');

    if (sourceWords.length > 0) {
      currentWords.push(...sourceWords);

      continue;
    }

    if (currentWords.length > 0) {
      paragraphs.push(wrapPfsenseParagraph(currentWords));

      currentWords = [];
    }
  }

  if (currentWords.length > 0) {
    paragraphs.push(wrapPfsenseParagraph(currentWords));
  }

  if (paragraphs.length === 0) {
    return undefined;
  }

  return `${paragraphs.join('\n\n')}\n`;
}

/**
 * Lib - Pfsense Identity - Wrap Pfsense Paragraph.
 *
 * Joins words into lines of at most 80 characters. A single word longer than
 * that, such as a URL, stays whole on its own line instead of being split.
 *
 * @param {Lib_PfsenseIdentity_WrapPfsenseParagraph_Words} words - Words.
 *
 * @returns {Lib_PfsenseIdentity_WrapPfsenseParagraph_Returns}
 *
 * @since 0.49.0
 */
function wrapPfsenseParagraph(words: Lib_PfsenseIdentity_WrapPfsenseParagraph_Words): Lib_PfsenseIdentity_WrapPfsenseParagraph_Returns {
  const wrappedLines: Lib_PfsenseIdentity_WrapPfsenseParagraph_WrappedLines = [];
  let currentLine: Lib_PfsenseIdentity_WrapPfsenseParagraph_CurrentLine = '';

  for (const word of words) {
    if (currentLine === '') {
      currentLine = word;
    } else if (currentLine.length + 1 + word.length <= 80) {
      currentLine = `${currentLine} ${word}`;
    } else {
      wrappedLines.push(currentLine);

      currentLine = word;
    }
  }

  if (currentLine !== '') {
    wrappedLines.push(currentLine);
  }

  return wrappedLines.join('\n');
}
