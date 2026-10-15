import { promises as fs } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Logger } from '../toolkit/index.js';
import {
  LIB_REGEX_LINEBREAK_CRLF_OR_LF,
  LIB_REGEX_PATTERN_ENV_VAR_KEY,
  LIB_REGEX_PATTERN_LEADING_DOT,
} from './regex.js';
import { saveGeneratedFile } from './utility.js';

import type {
  Lib_Dotenv_ClassifyEnvValue_FirstChar,
  Lib_Dotenv_ClassifyEnvValue_Key,
  Lib_Dotenv_ClassifyEnvValue_Returns,
  Lib_Dotenv_ClassifyEnvValue_Trimmed,
  Lib_Dotenv_ClassifyEnvValue_Value,
  Lib_Dotenv_EscapeSampleValue_Result,
  Lib_Dotenv_EscapeSampleValue_Returns,
  Lib_Dotenv_EscapeSampleValue_Value,
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
  Lib_Dotenv_IsQuoteOpen_Escaped,
  Lib_Dotenv_IsQuoteOpen_InQuote,
  Lib_Dotenv_IsQuoteOpen_Returns,
  Lib_Dotenv_IsQuoteOpen_StartOpen,
  Lib_Dotenv_IsQuoteOpen_Text,
  Lib_Dotenv_ParseExistingEnv_BlockLines,
  Lib_Dotenv_ParseExistingEnv_ContinuationLine,
  Lib_Dotenv_ParseExistingEnv_Existing,
  Lib_Dotenv_ParseExistingEnv_FilePath,
  Lib_Dotenv_ParseExistingEnv_IsValueOpen,
  Lib_Dotenv_ParseExistingEnv_KeyMatch,
  Lib_Dotenv_ParseExistingEnv_Line,
  Lib_Dotenv_ParseExistingEnv_LineIndex,
  Lib_Dotenv_ParseExistingEnv_LineKey,
  Lib_Dotenv_ParseExistingEnv_Lines,
  Lib_Dotenv_ParseExistingEnv_Raw,
  Lib_Dotenv_ParseExistingEnv_Returns,
  Lib_Dotenv_ParseExistingEnv_ValuePortion,
  Lib_Dotenv_WriteDotenvFiles_AppendSection,
  Lib_Dotenv_WriteDotenvFiles_BaselineKeyMatch,
  Lib_Dotenv_WriteDotenvFiles_BaselineKeys,
  Lib_Dotenv_WriteDotenvFiles_BaselineTemplate,
  Lib_Dotenv_WriteDotenvFiles_BaselineTemplateLines,
  Lib_Dotenv_WriteDotenvFiles_Content,
  Lib_Dotenv_WriteDotenvFiles_ContentLineKey,
  Lib_Dotenv_WriteDotenvFiles_ContentLines,
  Lib_Dotenv_WriteDotenvFiles_CurrentDirectory,
  Lib_Dotenv_WriteDotenvFiles_CustomSection,
  Lib_Dotenv_WriteDotenvFiles_CustomSectionSample,
  Lib_Dotenv_WriteDotenvFiles_EnvLines,
  Lib_Dotenv_WriteDotenvFiles_ExistingEnv,
  Lib_Dotenv_WriteDotenvFiles_ExistingEnvPath,
  Lib_Dotenv_WriteDotenvFiles_Files,
  Lib_Dotenv_WriteDotenvFiles_IsDryRun,
  Lib_Dotenv_WriteDotenvFiles_IsPrune,
  Lib_Dotenv_WriteDotenvFiles_IsPruneConfirmed,
  Lib_Dotenv_WriteDotenvFiles_IsReplaceFile,
  Lib_Dotenv_WriteDotenvFiles_KeyMatch,
  Lib_Dotenv_WriteDotenvFiles_Options,
  Lib_Dotenv_WriteDotenvFiles_OriginalLine,
  Lib_Dotenv_WriteDotenvFiles_OrphanKeys,
  Lib_Dotenv_WriteDotenvFiles_OrphanLines,
  Lib_Dotenv_WriteDotenvFiles_PreservedLines,
  Lib_Dotenv_WriteDotenvFiles_Returns,
  Lib_Dotenv_WriteDotenvFiles_SampleLines,
  Lib_Dotenv_WriteDotenvFiles_SeenKeys,
  Lib_Dotenv_WriteDotenvFiles_ShouldReport,
  Lib_Dotenv_WriteDotenvFiles_TargetDirectory,
  Lib_Dotenv_WriteDotenvFiles_TargetPath,
  Lib_Dotenv_WriteDotenvFiles_TemplateDirectory,
  Lib_Dotenv_WriteDotenvFiles_TemplateFileName,
  Lib_Dotenv_WriteDotenvFiles_TemplatePath,
  Lib_Dotenv_WriteDotenvFiles_VariableDefault,
  Lib_Dotenv_WriteDotenvFiles_Variables,
} from '../types/lib/dotenv.d.ts';

/**
 * Lib - Dotenv - Find Env Quote Violations.
 *
 * Walks the raw .env lines, skipping comments and blanks, then classifies each
 * KEY=value entry's quote style and accumulates multi-line double-quoted values, returning
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

    if (lead === '' || lead.startsWith('#') === true) {
      continue;
    }

    const keyMatch: Lib_Dotenv_FindEnvQuoteViolations_KeyMatch = line.match(LIB_REGEX_PATTERN_ENV_VAR_KEY);

    if (keyMatch === null) {
      continue;
    }

    const key: Lib_Dotenv_FindEnvQuoteViolations_Key = keyMatch[1] ?? '';
    const valueLines: Lib_Dotenv_FindEnvQuoteViolations_ValueLines = [line.slice(keyMatch[0].length)];

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
 * Inspects a value and returns a failure reason when its quote style is not a balanced
 * double-quoted string, or null when the value is valid.
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

/**
 * Lib - Dotenv - Escape Sample Value.
 *
 * Escapes a default value for safe interpolation into a double-quoted
 * ".env.sample" line while removing control characters.
 *
 * @param {Lib_Dotenv_EscapeSampleValue_Value} value - Value.
 *
 * @returns {Lib_Dotenv_EscapeSampleValue_Returns}
 *
 * @since 0.31.0
 */
function escapeSampleValue(value: Lib_Dotenv_EscapeSampleValue_Value): Lib_Dotenv_EscapeSampleValue_Returns {
  let result: Lib_Dotenv_EscapeSampleValue_Result = '';

  for (const character of value) {
    if (character < ' ' || character === '\x7f') {
      continue;
    }

    if (character === '"') {
      result += '\\"';

      continue;
    }

    result += character;
  }

  return result;
}

/**
 * Lib - Dotenv - Is Quote Open.
 *
 * Detects whether a dotenv value continues onto another physical line while
 * preserving the quote state inherited from the preceding line.
 *
 * @param {Lib_Dotenv_IsQuoteOpen_Text}      text      - Text.
 * @param {Lib_Dotenv_IsQuoteOpen_StartOpen} startOpen - Start open.
 *
 * @returns {Lib_Dotenv_IsQuoteOpen_Returns}
 *
 * @since 0.31.0
 */
function isQuoteOpen(text: Lib_Dotenv_IsQuoteOpen_Text, startOpen: Lib_Dotenv_IsQuoteOpen_StartOpen): Lib_Dotenv_IsQuoteOpen_Returns {
  let inQuote: Lib_Dotenv_IsQuoteOpen_InQuote = startOpen;
  let escaped: Lib_Dotenv_IsQuoteOpen_Escaped = false;

  for (const character of text) {
    if (escaped === true) {
      escaped = false;

      continue;
    }

    if (character === '\\') {
      if (inQuote === true) {
        escaped = true;
      }

      continue;
    }

    if (character === '"') {
      inQuote = inQuote === false;
    }
  }

  return inQuote;
}

/**
 * Lib - Dotenv - Parse Existing Env.
 *
 * Maps every existing key to its original line block so regeneration can
 * preserve filled local values.
 *
 * @param {Lib_Dotenv_ParseExistingEnv_FilePath} filePath - File path.
 *
 * @returns {Lib_Dotenv_ParseExistingEnv_Returns}
 *
 * @since 0.31.0
 */
async function parseExistingEnv(filePath: Lib_Dotenv_ParseExistingEnv_FilePath): Lib_Dotenv_ParseExistingEnv_Returns {
  const existing: Lib_Dotenv_ParseExistingEnv_Existing = new Map();
  let raw: Lib_Dotenv_ParseExistingEnv_Raw = '';

  try {
    raw = await fs.readFile(filePath, 'utf-8');
  } catch {
    return existing;
  }

  const lines: Lib_Dotenv_ParseExistingEnv_Lines = raw.split(LIB_REGEX_LINEBREAK_CRLF_OR_LF);
  let lineIndex: Lib_Dotenv_ParseExistingEnv_LineIndex = 0;

  while (lineIndex < lines.length) {
    const line: Lib_Dotenv_ParseExistingEnv_Line = lines[lineIndex] ?? '';
    const keyMatch: Lib_Dotenv_ParseExistingEnv_KeyMatch = line.match(LIB_REGEX_PATTERN_ENV_VAR_KEY);

    if (keyMatch === null) {
      lineIndex += 1;

      continue;
    }

    const lineKey: Lib_Dotenv_ParseExistingEnv_LineKey = keyMatch[1] ?? '';
    const valuePortion: Lib_Dotenv_ParseExistingEnv_ValuePortion = line.slice(keyMatch[0].length);
    const blockLines: Lib_Dotenv_ParseExistingEnv_BlockLines = [line];
    let isValueOpen: Lib_Dotenv_ParseExistingEnv_IsValueOpen = isQuoteOpen(valuePortion, false);

    while (isValueOpen === true && lineIndex + 1 < lines.length) {
      lineIndex += 1;

      const continuationLine: Lib_Dotenv_ParseExistingEnv_ContinuationLine = lines[lineIndex] ?? '';

      blockLines.push(continuationLine);

      isValueOpen = isQuoteOpen(continuationLine, true);
    }

    existing.set(lineKey, blockLines.join('\n'));

    lineIndex += 1;
  }

  return existing;
}

/**
 * Lib - Dotenv - Write Dotenv Files.
 *
 * Writes Nova's shared ".env" and ".env.sample" templates for one workspace,
 * appends its configured variables, and preserves existing filled values.
 *
 * @param {Lib_Dotenv_WriteDotenvFiles_Options} options - Options.
 *
 * @returns {Lib_Dotenv_WriteDotenvFiles_Returns}
 *
 * @since 0.31.0
 */
export async function writeDotenvFiles(options: Lib_Dotenv_WriteDotenvFiles_Options): Lib_Dotenv_WriteDotenvFiles_Returns {
  const targetDirectory: Lib_Dotenv_WriteDotenvFiles_TargetDirectory = options['targetDirectory'];
  const variables: Lib_Dotenv_WriteDotenvFiles_Variables = options['variables'];
  const isDryRun: Lib_Dotenv_WriteDotenvFiles_IsDryRun = options['dryRun'] === true;
  const isReplaceFile: Lib_Dotenv_WriteDotenvFiles_IsReplaceFile = options['replaceFile'] === true;
  const isPrune: Lib_Dotenv_WriteDotenvFiles_IsPrune = options['prune'] === true;
  const shouldReport: Lib_Dotenv_WriteDotenvFiles_ShouldReport = options['report'] !== false;
  const currentDirectory: Lib_Dotenv_WriteDotenvFiles_CurrentDirectory = dirname(fileURLToPath(import.meta.url));
  const templateDirectory: Lib_Dotenv_WriteDotenvFiles_TemplateDirectory = resolve(currentDirectory, '../../templates/generators/must-haves/dotenv');
  const files: Lib_Dotenv_WriteDotenvFiles_Files = [
    '.env',
    '.env.sample',
  ];
  const baselineKeys: Lib_Dotenv_WriteDotenvFiles_BaselineKeys = new Set();

  try {
    const baselineTemplate: Lib_Dotenv_WriteDotenvFiles_BaselineTemplate = await fs.readFile(join(templateDirectory, 'env'), 'utf-8');
    const baselineTemplateLines: Lib_Dotenv_WriteDotenvFiles_BaselineTemplateLines = baselineTemplate.split(LIB_REGEX_LINEBREAK_CRLF_OR_LF);

    for (const baselineTemplateLine of baselineTemplateLines) {
      const baselineKeyMatch: Lib_Dotenv_WriteDotenvFiles_BaselineKeyMatch = baselineTemplateLine.match(LIB_REGEX_PATTERN_ENV_VAR_KEY);

      if (baselineKeyMatch !== null) {
        baselineKeys.add(baselineKeyMatch[1] ?? '');
      }
    }
  } catch {
    /* empty */
  }

  const envLines: Lib_Dotenv_WriteDotenvFiles_EnvLines = [];
  const sampleLines: Lib_Dotenv_WriteDotenvFiles_SampleLines = [];

  for (const variable of variables) {
    if (baselineKeys.has(variable['key']) === true) {
      continue;
    }

    envLines.push(`${variable['key']}=""`);

    const variableDefault: Lib_Dotenv_WriteDotenvFiles_VariableDefault = ('defaultValue' in variable && variable['defaultValue'] !== undefined) ? variable['defaultValue'] : '';

    sampleLines.push(`${variable['key']}="${escapeSampleValue(variableDefault)}"`);
  }

  const customSection: Lib_Dotenv_WriteDotenvFiles_CustomSection = envLines.join('\n');
  const customSectionSample: Lib_Dotenv_WriteDotenvFiles_CustomSectionSample = sampleLines.join('\n');
  const existingEnvPath: Lib_Dotenv_WriteDotenvFiles_ExistingEnvPath = join(targetDirectory, '.env');
  const existingEnv: Lib_Dotenv_WriteDotenvFiles_ExistingEnv = await parseExistingEnv(existingEnvPath);

  for (const fileName of files) {
    const templateFileName: Lib_Dotenv_WriteDotenvFiles_TemplateFileName = fileName.replace(LIB_REGEX_PATTERN_LEADING_DOT, '');
    const templatePath: Lib_Dotenv_WriteDotenvFiles_TemplatePath = join(templateDirectory, templateFileName);
    const targetPath: Lib_Dotenv_WriteDotenvFiles_TargetPath = join(targetDirectory, fileName);
    let content: Lib_Dotenv_WriteDotenvFiles_Content = undefined;

    try {
      content = await fs.readFile(templatePath, 'utf-8');
    } catch {
      Logger.customize({
        name: 'writeDotenvFiles',
        purpose: 'read',
      }).error(`Failed to read template "${templatePath}". Skipping ...`);

      continue;
    }

    const appendSection: Lib_Dotenv_WriteDotenvFiles_AppendSection = (fileName === '.env.sample') ? customSectionSample : customSection;

    if (appendSection !== '') {
      content = `${content}${appendSection}\n`;
    }

    if (fileName === '.env' && existingEnv.size > 0) {
      const contentLines: Lib_Dotenv_WriteDotenvFiles_ContentLines = content.split('\n');
      const seenKeys: Lib_Dotenv_WriteDotenvFiles_SeenKeys = new Set();
      const preservedLines: Lib_Dotenv_WriteDotenvFiles_PreservedLines = contentLines.map((contentLine) => {
        const keyMatch: Lib_Dotenv_WriteDotenvFiles_KeyMatch = contentLine.match(LIB_REGEX_PATTERN_ENV_VAR_KEY);

        if (keyMatch === null) {
          return contentLine;
        }

        const contentLineKey: Lib_Dotenv_WriteDotenvFiles_ContentLineKey = keyMatch[1] ?? '';

        seenKeys.add(contentLineKey);

        const originalLine: Lib_Dotenv_WriteDotenvFiles_OriginalLine = existingEnv.get(contentLineKey);

        return originalLine ?? contentLine;
      });

      content = preservedLines.join('\n');

      const orphanKeys: Lib_Dotenv_WriteDotenvFiles_OrphanKeys = [...existingEnv.keys()].filter((existingKey) => seenKeys.has(existingKey) === false);

      if (orphanKeys.length > 0) {
        let isPruneConfirmed: Lib_Dotenv_WriteDotenvFiles_IsPruneConfirmed = false;

        if (
          isPrune === true
          && isDryRun === false
          && options['confirmPrune'] !== undefined
        ) {
          isPruneConfirmed = await options.confirmPrune(existingEnvPath, orphanKeys);
        }

        if (isPruneConfirmed === false) {
          const orphanLines: Lib_Dotenv_WriteDotenvFiles_OrphanLines = orphanKeys.map((orphanKey) => existingEnv.get(orphanKey) ?? '');

          content = `${content}${orphanLines.join('\n')}\n`;
        }
      }
    }

    if (isDryRun === true) {
      continue;
    }

    await saveGeneratedFile(targetPath, content, isReplaceFile, {
      command: 'nova generate must-haves dotenv',
      docsSlug: 'cli/generators/must-haves/dotenv',
      mode: (fileName === '.env') ? 'fillable' : 'strict',
    }, shouldReport);
  }

  return;
}
