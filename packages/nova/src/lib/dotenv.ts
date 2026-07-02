import {
  LIB_REGEX_LINEBREAK_CRLF_OR_LF,
  LIB_REGEX_PATTERN_ENV_VAR_KEY,
} from './regex.js';

import type {
  Lib_Dotenv_ClassifyEnvValue_FirstChar,
  Lib_Dotenv_ClassifyEnvValue_Key,
  Lib_Dotenv_ClassifyEnvValue_Returns,
  Lib_Dotenv_ClassifyEnvValue_Trimmed,
  Lib_Dotenv_ClassifyEnvValue_Value,
  Lib_Dotenv_FindEnvQuoteViolations_Content,
  Lib_Dotenv_FindEnvQuoteViolations_Cursor,
  Lib_Dotenv_FindEnvQuoteViolations_Key,
  Lib_Dotenv_FindEnvQuoteViolations_KeyMatch,
  Lib_Dotenv_FindEnvQuoteViolations_Lead,
  Lib_Dotenv_FindEnvQuoteViolations_Line,
  Lib_Dotenv_FindEnvQuoteViolations_Lines,
  Lib_Dotenv_FindEnvQuoteViolations_Reason,
  Lib_Dotenv_FindEnvQuoteViolations_Returns,
  Lib_Dotenv_FindEnvQuoteViolations_Value,
  Lib_Dotenv_FindEnvQuoteViolations_ValueLines,
  Lib_Dotenv_FindEnvQuoteViolations_Violations,
  Lib_Dotenv_HasUnclosedDoubleQuote_Escaped,
  Lib_Dotenv_HasUnclosedDoubleQuote_Open,
  Lib_Dotenv_HasUnclosedDoubleQuote_Returns,
  Lib_Dotenv_HasUnclosedDoubleQuote_Text,
} from '../types/lib/dotenv.d.ts';

/**
 * Lib - Dotenv - Find Env Quote Violations.
 *
 * Walks the lines of raw .env content, skipping comments and blanks, then classifies each
 * KEY=value entry's quote style and accumulates multi-line double-quoted values. Returns
 * one violation per offending key.
 *
 * @param {Lib_Dotenv_FindEnvQuoteViolations_Content} content - Content.
 *
 * @returns {Lib_Dotenv_FindEnvQuoteViolations_Returns}
 *
 * @since 0.20.0
 */
export function findEnvQuoteViolations(content: Lib_Dotenv_FindEnvQuoteViolations_Content): Lib_Dotenv_FindEnvQuoteViolations_Returns {
  const violations: Lib_Dotenv_FindEnvQuoteViolations_Violations = [];
  const lines: Lib_Dotenv_FindEnvQuoteViolations_Lines = content.split(LIB_REGEX_LINEBREAK_CRLF_OR_LF);
  let cursor: Lib_Dotenv_FindEnvQuoteViolations_Cursor = 0;

  while (cursor < lines.length) {
    const line: Lib_Dotenv_FindEnvQuoteViolations_Line = lines[cursor] ?? '';

    cursor += 1;

    const lead: Lib_Dotenv_FindEnvQuoteViolations_Lead = line.trimStart();

    // Skip blank lines and comment lines.
    if (lead === '' || lead.startsWith('#') === true) {
      continue;
    }

    const keyMatch: Lib_Dotenv_FindEnvQuoteViolations_KeyMatch = line.match(LIB_REGEX_PATTERN_ENV_VAR_KEY);

    // Ignore lines that do not start a KEY=value entry.
    if (keyMatch === null) {
      continue;
    }

    const key: Lib_Dotenv_FindEnvQuoteViolations_Key = keyMatch[1] ?? '';
    const valueLines: Lib_Dotenv_FindEnvQuoteViolations_ValueLines = [line.slice(keyMatch[0].length)];

    // Accumulate following lines while a double quote remains open (multi-line value).
    while (hasUnclosedDoubleQuote(valueLines.join('\n')) === true && cursor < lines.length) {
      valueLines.push(lines[cursor] ?? '');

      cursor += 1;
    }

    const value: Lib_Dotenv_FindEnvQuoteViolations_Value = valueLines.join('\n');
    const reason: Lib_Dotenv_FindEnvQuoteViolations_Reason = classifyEnvValue(key, value);

    if (reason !== null) {
      violations.push({
        key,
        reason,
      });
    }
  }

  return violations;
}

/**
 * Lib - Dotenv - Has Unclosed Double Quote.
 *
 * Scans the text and tracks whether a double quote is currently open, honoring backslash
 * escapes so an escaped quote does not toggle the open state.
 *
 * @param {Lib_Dotenv_HasUnclosedDoubleQuote_Text} text - Text.
 *
 * @returns {Lib_Dotenv_HasUnclosedDoubleQuote_Returns}
 *
 * @since 0.20.0
 */
function hasUnclosedDoubleQuote(text: Lib_Dotenv_HasUnclosedDoubleQuote_Text): Lib_Dotenv_HasUnclosedDoubleQuote_Returns {
  let open: Lib_Dotenv_HasUnclosedDoubleQuote_Open = false;
  let escaped: Lib_Dotenv_HasUnclosedDoubleQuote_Escaped = false;

  for (const char of text) {
    if (escaped === true) {
      escaped = false;

      continue;
    }

    if (char === '\\') {
      escaped = true;

      continue;
    }

    if (char === '"') {
      open = open === false;
    }
  }

  return open;
}

/**
 * Lib - Dotenv - Classify Env Value.
 *
 * Inspects a value (already accumulated across multi-line double quotes) and returns a
 * failure reason when its quote style is not a balanced double-quoted string, or null when
 * the value is valid.
 *
 * @param {Lib_Dotenv_ClassifyEnvValue_Key}   key   - Key.
 * @param {Lib_Dotenv_ClassifyEnvValue_Value} value - Value.
 *
 * @returns {Lib_Dotenv_ClassifyEnvValue_Returns}
 *
 * @since 0.20.0
 */
function classifyEnvValue(key: Lib_Dotenv_ClassifyEnvValue_Key, value: Lib_Dotenv_ClassifyEnvValue_Value): Lib_Dotenv_ClassifyEnvValue_Returns {
  const trimmed: Lib_Dotenv_ClassifyEnvValue_Trimmed = value.trimEnd();

  if (trimmed === '') {
    return `${key} has an unquoted empty value; use ${key}=""`;
  }

  const firstChar: Lib_Dotenv_ClassifyEnvValue_FirstChar = trimmed.charAt(0);

  if (firstChar === '"') {
    return (hasUnclosedDoubleQuote(trimmed) === true) ? `${key} has an unterminated double-quoted value` : null;
  }

  if (firstChar === '\'') {
    return `${key} uses single quotes; values must be double-quoted`;
  }

  return `${key} is unquoted; wrap the value in double quotes`;
}
