import {
  LIB_REGEX_PATTERN_HTML_TAGS,
  LIB_REGEX_PATTERN_NON_WORD_CHARS,
  LIB_REGEX_PATTERN_WHITESPACE,
} from './regex.js';

import type {
  Lib_MarkdownSlug_SlugifyHeading_Heading,
  Lib_MarkdownSlug_SlugifyHeading_Returns,
  Lib_MarkdownSlug_StripCodeFences_Content,
  Lib_MarkdownSlug_StripCodeFences_InCodeBlock,
  Lib_MarkdownSlug_StripCodeFences_Lines,
  Lib_MarkdownSlug_StripCodeFences_ProseLines,
  Lib_MarkdownSlug_StripCodeFences_Returns,
} from '../types/lib/markdown-slug.d.ts';

/**
 * Lib - Markdown Slug - Slugify Heading.
 *
 * Turns a heading string into the Docusaurus-style anchor slug used by the link and
 * terminology conformance suites: HTML tags removed, trimmed, lowercased, non-word
 * characters dropped, and whitespace runs collapsed into single hyphens.
 *
 * @param {Lib_MarkdownSlug_SlugifyHeading_Heading} heading - Heading.
 *
 * @returns {Lib_MarkdownSlug_SlugifyHeading_Returns}
 *
 * @since 0.20.0
 */
export function slugifyHeading(heading: Lib_MarkdownSlug_SlugifyHeading_Heading): Lib_MarkdownSlug_SlugifyHeading_Returns {
  return heading
    .replace(new RegExp(LIB_REGEX_PATTERN_HTML_TAGS, 'g'), '')
    .trim()
    .toLowerCase()
    .replace(new RegExp(LIB_REGEX_PATTERN_NON_WORD_CHARS, 'g'), '')
    .replace(new RegExp(LIB_REGEX_PATTERN_WHITESPACE, 'g'), '-');
}

/**
 * Lib - Markdown Slug - Strip Code Fences.
 *
 * Removes fenced code blocks from markdown content by walking lines and dropping every
 * line inside a triple-backtick fence (and the fence lines themselves), returning only
 * the prose lines. Used so link and terminology scans ignore code-sample contents.
 *
 * @param {Lib_MarkdownSlug_StripCodeFences_Content} content - Content.
 *
 * @returns {Lib_MarkdownSlug_StripCodeFences_Returns}
 *
 * @since 0.20.0
 */
export function stripCodeFences(content: Lib_MarkdownSlug_StripCodeFences_Content): Lib_MarkdownSlug_StripCodeFences_Returns {
  const lines: Lib_MarkdownSlug_StripCodeFences_Lines = content.split('\n');
  let inCodeBlock: Lib_MarkdownSlug_StripCodeFences_InCodeBlock = false;
  const proseLines: Lib_MarkdownSlug_StripCodeFences_ProseLines = [];

  for (const line of lines) {
    if (line.trimStart().startsWith('```') === true) {
      inCodeBlock = !inCodeBlock;

      continue;
    }

    if (inCodeBlock === false) {
      proseLines.push(line);
    }
  }

  return proseLines.join('\n');
}
