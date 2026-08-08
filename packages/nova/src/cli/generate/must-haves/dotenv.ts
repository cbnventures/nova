import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import prompts from 'prompts';

import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import { LIB_REGEX_LINEBREAK_CRLF_OR_LF, LIB_REGEX_PATTERN_ENV_VAR_KEY, LIB_REGEX_PATTERN_LEADING_DOT } from '../../../lib/regex.js';
import {
  isProjectRoot,
  resolveTemplatePath,
  saveGeneratedFile,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_FilePath,
  Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Keys,
  Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Response,
  Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Returns,
  Cli_Generate_MustHaves_Dotenv_Runner_EscapeSampleValue_Result,
  Cli_Generate_MustHaves_Dotenv_Runner_EscapeSampleValue_Returns,
  Cli_Generate_MustHaves_Dotenv_Runner_EscapeSampleValue_Value,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_AppendSection,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_BaselineKeyMatch,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_BaselineKeys,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_BaselineTemplate,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_BaselineTemplateLines,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Content,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_ContentLineKey,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_ContentLines,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_CustomSection,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_CustomSectionSample,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_EnvLines,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_ExistingEnv,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_ExistingEnvPath,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Files,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_IsDryRun,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_IsPrune,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_IsPruneConfirmed,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_IsReplaceFile,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_KeyMatch,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Options,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_OriginalLine,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_OrphanKeys,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_OrphanLines,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_PreservedLines,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Returns,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_SampleLines,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_SeenKeys,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_TargetDirectory,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_TargetPath,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_TemplateDirectory,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_TemplateFileName,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_TemplatePath,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_VariableDefault,
  Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Variables,
  Cli_Generate_MustHaves_Dotenv_Runner_IsQuoteOpen_Escaped,
  Cli_Generate_MustHaves_Dotenv_Runner_IsQuoteOpen_InQuote,
  Cli_Generate_MustHaves_Dotenv_Runner_IsQuoteOpen_Returns,
  Cli_Generate_MustHaves_Dotenv_Runner_IsQuoteOpen_StartOpen,
  Cli_Generate_MustHaves_Dotenv_Runner_IsQuoteOpen_Text,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_BlockLines,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_ContinuationLine,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_Existing,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_FilePath,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_IsValueOpen,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_KeyMatch,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_Line,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_LineIndex,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_LineKey,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_Lines,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_Raw,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_Returns,
  Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_ValuePortion,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_CurrentDirectory,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_Environment,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_GeneratedCount,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_IsAtProjectRoot,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_IsDryRun,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_IsPrune,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_IsReplaceFile,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_Options,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_ReplaceFileNotice,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_Returns,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_Variables,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_WorkingFile,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_Workspace,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_WorkspacePath,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_Workspaces,
} from '../../../types/cli/generate/must-haves/dotenv.d.ts';

/**
 * CLI - Generate - Must Haves - Dotenv.
 *
 * Generates ".env" and ".env.sample" for every declared workspace, appending
 * each workspace's configured variables from "environment.workspaces" in nova.config.json.
 * The ".env" preserves filled values; ".env.sample" keeps non-secret defaults.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Generate - Must Haves - Dotenv - Run.
   *
   * Called by the CLI index via executeCommand. Loads nova.config.json and then
   * generates env files for each workspace under "environment.workspaces", delegating the
   * per-directory work to generateForTarget, warning when no workspace declares values.
   *
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Generate_MustHaves_Dotenv_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Generate_MustHaves_Dotenv_Runner_Run_Options): Cli_Generate_MustHaves_Dotenv_Runner_Run_Returns {
    const currentDirectory: Cli_Generate_MustHaves_Dotenv_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Generate_MustHaves_Dotenv_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: Cli_Generate_MustHaves_Dotenv_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Generate_MustHaves_Dotenv_Runner_Run_IsReplaceFile = options['replaceFile'] === true;
    const isPrune: Cli_Generate_MustHaves_Dotenv_Runner_Run_IsPrune = options['prune'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Generate_MustHaves_Dotenv_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Generate_MustHaves_Dotenv_Runner_Run_WorkingFile = await new LibNovaConfig().load();
    const environment: Cli_Generate_MustHaves_Dotenv_Runner_Run_Environment = workingFile['environment'] ?? {};
    const workspaces: Cli_Generate_MustHaves_Dotenv_Runner_Run_Workspaces = environment['workspaces'] ?? {};

    let generatedCount: Cli_Generate_MustHaves_Dotenv_Runner_Run_GeneratedCount = 0;

    // Generate ".env"/".env.sample" for every workspace declared under "environment.workspaces"; the repo root uses the "./" path.
    for (const workspaceEntry of Object.entries(workspaces)) {
      const workspacePath: Cli_Generate_MustHaves_Dotenv_Runner_Run_WorkspacePath = workspaceEntry[0];
      const workspace: Cli_Generate_MustHaves_Dotenv_Runner_Run_Workspace = workspaceEntry[1];
      const variables: Cli_Generate_MustHaves_Dotenv_Runner_Run_Variables = workspace['variables'] ?? [];

      generatedCount += 1;

      await Runner.generateForTarget({
        targetDirectory: join(currentDirectory, workspacePath),
        variables,
        isDryRun,
        isReplaceFile,
        isPrune,
      });
    }

    if (generatedCount === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'environment',
      }).warn('No workspaces declare environment variables. Nothing to generate.');
    }

    return 'completed';
  }

  /**
   * CLI - Generate - Must Haves - Dotenv - Generate For Target.
   *
   * Writes ".env" and ".env.sample" for one workspace directory from the bundled templates,
   * appending the configured variables and preserving filled ".env" values.
   *
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Options} options - Options.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Returns}
   *
   * @since 0.20.0
   */
  private static async generateForTarget(options: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Options): Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Returns {
    const targetDirectory: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_TargetDirectory = options['targetDirectory'];
    const variables: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Variables = options['variables'];
    const isDryRun: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_IsDryRun = options['isDryRun'];
    const isReplaceFile: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_IsReplaceFile = options['isReplaceFile'];
    const isPrune: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_IsPrune = options['isPrune'];

    const templateDirectory: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_TemplateDirectory = resolveTemplatePath(import.meta.url, 'generators/must-haves/dotenv');

    const files: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Files = [
      '.env',
      '.env.sample',
    ];

    // Derive the baseline keys shipped in the ".env" template so config variables cannot duplicate them.
    const baselineKeys: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_BaselineKeys = new Set();

    try {
      const baselineTemplate: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_BaselineTemplate = await fs.readFile(join(templateDirectory, 'env'), 'utf-8');
      const baselineTemplateLines: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_BaselineTemplateLines = baselineTemplate.split(LIB_REGEX_LINEBREAK_CRLF_OR_LF);

      for (const baselineTemplateLine of baselineTemplateLines) {
        const baselineKeyMatch: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_BaselineKeyMatch = baselineTemplateLine.match(LIB_REGEX_PATTERN_ENV_VAR_KEY);

        if (baselineKeyMatch !== null) {
          baselineKeys.add(baselineKeyMatch[1] ?? '');
        }
      }
    } catch {
      /* empty */
    }

    // Build the custom variable lines for each file.
    const envLines: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_EnvLines = [];
    const sampleLines: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_SampleLines = [];

    for (const variable of variables) {
      // Skip config variables that collide with a key already shipped in the template.
      if (baselineKeys.has(variable['key']) === true) {
        continue;
      }

      envLines.push(`${variable['key']}=""`);

      // A managed value carries no default; every other reach may declare one.
      const variableDefault: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_VariableDefault = ('defaultValue' in variable && variable['defaultValue'] !== undefined) ? variable['defaultValue'] : '';

      sampleLines.push(`${variable['key']}="${Runner.escapeSampleValue(variableDefault)}"`);
    }

    const customSection: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_CustomSection = envLines.join('\n');
    const customSectionSample: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_CustomSectionSample = sampleLines.join('\n');

    // Read the existing ".env" so already-filled values survive a regenerate.
    const existingEnvPath: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_ExistingEnvPath = join(targetDirectory, '.env');
    const existingEnv: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_ExistingEnv = await Runner.parseExistingEnv(existingEnvPath);

    for (const fileName of files) {
      const templateFileName: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_TemplateFileName = fileName.replace(LIB_REGEX_PATTERN_LEADING_DOT, '');
      const templatePath: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_TemplatePath = join(templateDirectory, templateFileName);
      const targetPath: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_TargetPath = join(targetDirectory, fileName);

      let content: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Content = undefined;

      try {
        content = await fs.readFile(templatePath, 'utf-8');
      } catch {
        Logger.customize({
          name: 'Runner.generateForTarget',
          purpose: 'read',
        }).error(`Failed to read template "${templatePath}". Skipping ...`);

        continue;
      }

      // Append the configured variables under the project variables section.
      const appendSection: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_AppendSection = (fileName === '.env.sample') ? customSectionSample : customSection;

      if (appendSection !== '') {
        content = `${content}${appendSection}\n`;
      }

      // Preserve filled values for declared keys when rewriting the ".env" file only.
      if (fileName === '.env' && existingEnv.size > 0) {
        const contentLines: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_ContentLines = content.split('\n');
        const seenKeys: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_SeenKeys = new Set();
        const preservedLines: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_PreservedLines = contentLines.map((contentLine) => {
          const keyMatch: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_KeyMatch = contentLine.match(LIB_REGEX_PATTERN_ENV_VAR_KEY);

          if (keyMatch === null) {
            return contentLine;
          }

          const contentLineKey: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_ContentLineKey = keyMatch[1] ?? '';

          seenKeys.add(contentLineKey);

          const originalLine: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_OriginalLine = existingEnv.get(contentLineKey);

          if (originalLine === undefined) {
            return contentLine;
          }

          return originalLine;
        });

        content = preservedLines.join('\n');

        // Keys still present in the local ".env" but no longer declared are preserved by default so a
        // filled line is never dropped silently; "--prune" (with confirmation) is the only way to strip them.
        const orphanKeys: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_OrphanKeys = [...existingEnv.keys()].filter((existingKey) => seenKeys.has(existingKey) === false);

        if (orphanKeys.length > 0) {
          let isPruneConfirmed: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_IsPruneConfirmed = false;

          if (isPrune === true && isDryRun === false) {
            isPruneConfirmed = await Runner.confirmPrune(existingEnvPath, orphanKeys);
          }

          if (isPruneConfirmed === false) {
            const orphanLines: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_OrphanLines = orphanKeys.map((orphanKey) => existingEnv.get(orphanKey) ?? '');

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
      });
    }

    return;
  }

  /**
   * CLI - Generate - Must Haves - Dotenv - Confirm Prune.
   *
   * Asks the operator to confirm dropping keys that are no longer declared from the local
   * ".env". Returns false on cancellation so a filled line is never stripped without a yes.
   *
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_FilePath} filePath - File path.
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Keys}     keys     - Keys.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Returns}
   *
   * @since 0.21.0
   */
  private static async confirmPrune(filePath: Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_FilePath, keys: Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Keys): Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Returns {
    const response: Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Response = await prompts({
      type: 'confirm',
      name: 'confirm',
      message: `Remove undeclared keys from "${filePath}"? ${keys.join(', ')}`,
      initial: false,
    }, {
      onCancel: () => false,
    });

    return response['confirm'] === true;
  }

  /**
   * CLI - Generate - Must Haves - Dotenv - Parse Existing Env.
   *
   * Reads an existing .env file and maps each declared key to its full original line so the
   * generator can re-insert filled values. Missing files resolve to an empty map.
   *
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_FilePath} filePath - File path.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_Returns}
   *
   * @since 0.20.0
   */
  private static async parseExistingEnv(filePath: Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_FilePath): Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_Returns {
    const existing: Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_Existing = new Map();

    let raw: Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_Raw = '';

    try {
      raw = await fs.readFile(filePath, 'utf-8');
    } catch {
      return existing;
    }

    const lines: Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_Lines = raw.split(LIB_REGEX_LINEBREAK_CRLF_OR_LF);

    let lineIndex: Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_LineIndex = 0;

    while (lineIndex < lines.length) {
      const line: Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_Line = lines[lineIndex] ?? '';
      const keyMatch: Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_KeyMatch = line.match(LIB_REGEX_PATTERN_ENV_VAR_KEY);

      if (keyMatch === null) {
        lineIndex += 1;

        continue;
      }

      const lineKey: Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_LineKey = keyMatch[1] ?? '';
      const valuePortion: Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_ValuePortion = line.slice(keyMatch[0].length);
      const blockLines: Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_BlockLines = [line];

      // Accumulate continuation lines when the value opens a double-quoted string not closed on this line.
      let isValueOpen: Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_IsValueOpen = Runner.isQuoteOpen(valuePortion, false);

      while (isValueOpen === true && lineIndex + 1 < lines.length) {
        lineIndex += 1;

        const continuationLine: Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_ContinuationLine = lines[lineIndex] ?? '';

        blockLines.push(continuationLine);

        isValueOpen = Runner.isQuoteOpen(continuationLine, true);
      }

      existing.set(lineKey, blockLines.join('\n'));

      lineIndex += 1;
    }

    return existing;
  }

  /**
   * CLI - Generate - Must Haves - Dotenv - Is Quote Open.
   *
   * Scans a slice of text for unbalanced double quotes, honoring backslash escapes inside the
   * quoted region. Used to detect multi-line .env values that span several physical lines.
   *
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_IsQuoteOpen_Text}      text      - Text.
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_IsQuoteOpen_StartOpen} startOpen - Start open.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Dotenv_Runner_IsQuoteOpen_Returns}
   *
   * @since 0.20.0
   */
  private static isQuoteOpen(text: Cli_Generate_MustHaves_Dotenv_Runner_IsQuoteOpen_Text, startOpen: Cli_Generate_MustHaves_Dotenv_Runner_IsQuoteOpen_StartOpen): Cli_Generate_MustHaves_Dotenv_Runner_IsQuoteOpen_Returns {
    let inQuote: Cli_Generate_MustHaves_Dotenv_Runner_IsQuoteOpen_InQuote = startOpen;
    let escaped: Cli_Generate_MustHaves_Dotenv_Runner_IsQuoteOpen_Escaped = false;

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
   * CLI - Generate - Must Haves - Dotenv - Escape Sample Value.
   *
   * Escapes a default value for safe interpolation into a double-quoted ".env.sample" line.
   * Backslash-escapes embedded double quotes and strips newlines and other control characters
   * so a single value cannot corrupt the file.
   *
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_EscapeSampleValue_Value} value - Value.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Dotenv_Runner_EscapeSampleValue_Returns}
   *
   * @since 0.20.0
   */
  private static escapeSampleValue(value: Cli_Generate_MustHaves_Dotenv_Runner_EscapeSampleValue_Value): Cli_Generate_MustHaves_Dotenv_Runner_EscapeSampleValue_Returns {
    let result: Cli_Generate_MustHaves_Dotenv_Runner_EscapeSampleValue_Result = '';

    for (const character of value) {
      // Strip newlines and other control characters (code points below the space and the DEL character).
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
}
